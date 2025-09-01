# 🎨 Membatron

A lightweight web-based app that transforms objects in images into 3D models using AI. Upload an image, describe the object you want to extract, and get a downloadable 3D mesh in minutes.

## ✨ Features

- **Simple Workflow**: 4-step process from image to 3D model
- **AI-Powered**: Uses Google's Nano Banana for multi-view generation and Hyper3D Rodin for 3D reconstruction  
- **Advanced Options**: Choose from multiple file formats (GLB, USDZ, FBX, OBJ, STL), materials, and quality settings
- **Drag & Drop**: Upload images via drag-and-drop or paste from clipboard
- **No Cloud Storage**: All processing happens over the wire - no permanent file storage required

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ (we use Node 22)
- FAL API key from [fal.ai](https://fal.ai)

### Installation

1. **Clone and setup**:
```bash
git clone <your-repo-url>
cd membatron
nvm use  # Uses Node 22 from .nvmrc
npm install
```

2. **Configure API key**:
Create a `.env` file in the project root:
```bash
FAL_API_KEY=your-fal-api-key-here
```

3. **Start the server**:
```bash
npm run dev
```

4. **Open your browser**:
Navigate to `http://localhost:3001`

## 🎯 How to Use

1. **Upload Image**: Drag & drop an image or click to browse
2. **Describe Object**: Tell the AI what object to extract (e.g., "the red car", "the coffee mug")
3. **Generate Views**: Click to create multi-view images of your object
4. **Create 3D Mesh**: Convert the views into a downloadable 3D model

### Advanced Options

Click "⚙️ Advanced Options" to customize:
- **File Format**: GLB (default), USDZ, FBX, OBJ, STL
- **Material**: PBR (default), Shaded  
- **Quality**: Medium (default), High, Low, Extra Low
- **Hyper Mode**: Enhanced export mode

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Backend**: Node.js + Express
- **AI Models**: 
  - [Nano Banana](https://fal.ai/models/fal-ai/nano-banana/edit) - Multi-view image generation
  - [Hyper3D Rodin](https://fal.ai/models/fal-ai/hyper3d/rodin) - 3D mesh creation
- **API Client**: FAL AI JavaScript SDK

## 📁 Project Structure

```
membatron/
├── index.html          # Frontend UI
├── server.js           # Express backend  
├── package.json        # Dependencies
├── .env               # API keys (not in repo)
├── .nvmrc             # Node version (22)
├── models.md          # AI model documentation
└── README.md          # You are here
```

## 🔧 Development

### Scripts
- `npm start` - Production server
- `npm run dev` - Development with nodemon

### Environment Variables
- `FAL_API_KEY` - Required for AI model access
- `PORT` - Server port (default: 3001)

## 🐛 Troubleshooting

**"Error: Unauthorized"**: Check that your `.env` file contains the correct `FAL_API_KEY`

**Server won't start**: Ensure you're using Node 20+ with `nvm use`

**Image upload fails**: Make sure the image is in a supported format (JPEG, PNG, etc.)

## 📝 License

MIT License - see LICENSE file for details
