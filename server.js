const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { fal } = require('@fal-ai/client');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('./')); // Serve the HTML file

// Configure FAL client
fal.config({
  credentials: process.env.FAL_API_KEY
});

// Convert base64 to blob and upload to FAL storage
async function uploadImageToFal(base64Data) {
  try {
    // Remove data URL prefix if present
    const base64 = base64Data.replace(/^data:image\/[a-z]+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    
    // Upload to FAL storage
    const file = new Blob([buffer], { type: 'image/jpeg' });
    const url = await fal.storage.upload(file);
    return url;
  } catch (error) {
    console.error('Error uploading to FAL storage:', error);
    throw error;
  }
}

// Generate multi-view images using Nano Banana
app.post('/api/generate-views', async (req, res) => {
  try {
    const { imageBase64, objectDescription } = req.body;
    
    if (!imageBase64 || !objectDescription) {
      return res.status(400).json({ error: 'Missing imageBase64 or objectDescription' });
    }

    // Upload image to FAL storage first
    const imageUrl = await uploadImageToFal(imageBase64);
    console.log('Uploaded image to:', imageUrl);

    // Generate different view prompts
    const viewPrompts = [
      `isolate and show ${objectDescription} from the front view, white background`,
      `isolate and show ${objectDescription} from the side view, white background`,
      `isolate and show ${objectDescription} from the back view, white background`,
      `isolate and show ${objectDescription} from a 45-degree angle, white background`
    ];

    const generatedViews = [];

    // Generate each view
    for (const prompt of viewPrompts) {
      console.log('Generating view with prompt:', prompt);
      
      const result = await fal.subscribe("fal-ai/nano-banana/edit", {
        input: {
          prompt: prompt,
          image_urls: [imageUrl],
          num_images: 1,
          output_format: "jpeg"
        },
        logs: true,
        onQueueUpdate: (update) => {
          if (update.status === "IN_PROGRESS") {
            update.logs?.map((log) => log.message).forEach(console.log);
          }
        },
      });

      if (result.data && result.data.images && result.data.images.length > 0) {
        generatedViews.push({
          prompt: prompt,
          url: result.data.images[0].url,
          description: result.data.description
        });
      }
    }

    res.json({ 
      success: true, 
      views: generatedViews,
      originalImageUrl: imageUrl
    });

  } catch (error) {
    console.error('Error generating views:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create 3D mesh using Hyper3D Rodin
app.post('/api/create-mesh', async (req, res) => {
  try {
    const { viewUrls, geometry_file_format, material, quality, use_hyper } = req.body;
    
    if (!viewUrls || !Array.isArray(viewUrls) || viewUrls.length === 0) {
      return res.status(400).json({ error: 'Missing or invalid viewUrls' });
    }

    console.log('Creating 3D mesh from views:', viewUrls);
    console.log('Advanced options:', { geometry_file_format, material, quality, use_hyper });

    const result = await fal.subscribe("fal-ai/hyper3d/rodin", {
      input: {
        input_image_urls: viewUrls,
        condition_mode: "concat", // Multi-view mode
        geometry_file_format: geometry_file_format || "glb",
        material: material || "PBR",
        quality: quality || "medium",
        use_hyper: use_hyper || false
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs?.map((log) => log.message).forEach(console.log);
        }
      },
    });

    if (result.data && result.data.model_mesh) {
      res.json({
        success: true,
        meshUrl: result.data.model_mesh.url,
        textures: result.data.textures || [],
        seed: result.data.seed
      });
    } else {
      throw new Error('No 3D mesh generated');
    }

  } catch (error) {
    console.error('Error creating 3D mesh:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Membatron server running on http://localhost:${PORT}`);
});
