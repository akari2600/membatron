# Nano Banana

> Google's state-of-the-art image generation and editing model


## Overview

- **Endpoint**: `https://fal.run/fal-ai/nano-banana/edit`
- **Model ID**: `fal-ai/nano-banana/edit`
- **Category**: image-to-image
- **Kind**: inference
**Tags**: image-editing



## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.


### Input Schema

The API accepts the following input parameters:


- **`prompt`** (`string`, _required_):
  The prompt for image editing.
  - Examples: "make a photo of the man driving the car down the california coastline"

- **`image_urls`** (`list<string>`, _required_):
  List of URLs of input images for editing.
  - Array of string
  - Examples: ["https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png","https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png"]

- **`num_images`** (`integer`, _optional_):
  Number of images to generate Default value: `1`
  - Default: `1`
  - Range: `1` to `4`
  - Examples: 1

- **`output_format`** (`OutputFormatEnum`, _optional_):
  Output format for the images Default value: `"jpeg"`
  - Default: `"jpeg"`
  - Options: `"jpeg"`, `"png"`

- **`sync_mode`** (`boolean`, _optional_):
  When true, images will be returned as data URIs instead of URLs.
  - Default: `false`



**Required Parameters Example**:

```json
{
  "prompt": "make a photo of the man driving the car down the california coastline",
  "image_urls": [
    "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png",
    "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png"
  ]
}
```

**Full Example**:

```json
{
  "prompt": "make a photo of the man driving the car down the california coastline",
  "image_urls": [
    "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png",
    "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png"
  ],
  "num_images": 1,
  "output_format": "jpeg"
}
```


### Output Schema

The API returns the following output format:

- **`images`** (`list<File>`, _required_):
  The edited images
  - Array of File
  - Examples: [{"url":"https://storage.googleapis.com/falserverless/example_outputs/nano-banana-multi-edit-output.png"}]

- **`description`** (`string`, _required_):
  Text description or response from Gemini
  - Examples: "Here is a photo of the man driving the car down the California coastline. "



**Example Response**:

```json
{
  "images": [
    {
      "url": "https://storage.googleapis.com/falserverless/example_outputs/nano-banana-multi-edit-output.png"
    }
  ],
  "description": "Here is a photo of the man driving the car down the California coastline. "
}
```


## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/nano-banana/edit \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{
     "prompt": "make a photo of the man driving the car down the california coastline",
     "image_urls": [
       "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png",
       "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png"
     ]
   }'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/nano-banana/edit",
    arguments={
        "prompt": "make a photo of the man driving the car down the california coastline",
        "image_urls": ["https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png", "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png"]
    },
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/nano-banana/edit", {
  input: {
    prompt: "make a photo of the man driving the car down the california coastline",
    image_urls: ["https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png", "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png"]
  },
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```


## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/nano-banana/edit)
- [API Documentation](https://fal.ai/models/fal-ai/nano-banana/edit/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/nano-banana/edit)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)

# Hyper3D Rodin

> Rodin by Hyper3D generates realistic and production ready 3D models from text or images.


## Overview

- **Endpoint**: `https://fal.run/fal-ai/hyper3d/rodin`
- **Model ID**: `fal-ai/hyper3d/rodin`
- **Category**: image-to-3d
- **Kind**: inference
**Tags**: stylized



## API Information

This model can be used via our HTTP API or more conveniently via our client libraries.
See the input and output schema below, as well as the usage examples.


### Input Schema

The API accepts the following input parameters:


- **`prompt`** (`string`, _optional_):
  A textual prompt to guide model generation. Required for Text-to-3D mode. Optional for Image-to-3D mode. Default value: `""`
  - Default: `""`
  - Examples: "A futuristic robot with sleek metallic design."

- **`input_image_urls`** (`list<string>`, _optional_):
  URL of images to use while generating the 3D model. Required for Image-to-3D mode. Optional for Text-to-3D mode.
  - Array of string
  - Examples: "https://storage.googleapis.com/falserverless/model_tests/video_models/robot.png"

- **`condition_mode`** (`ConditionModeEnum`, _optional_):
  For fuse mode, One or more images are required.It will generate a model by extracting and fusing features of objects from multiple images.For concat mode, need to upload multiple multi-view images of the same object and generate the model.(You can upload multi-view images in any order, regardless of the order of view.) Default value: `"concat"`
  - Default: `"concat"`
  - Options: `"fuse"`, `"concat"`

- **`seed`** (`integer`, _optional_):
  Seed value for randomization, ranging from 0 to 65535. Optional.
  - Range: `0` to `65535`

- **`geometry_file_format`** (`GeometryFileFormatEnum`, _optional_):
  Format of the geometry file. Possible values: glb, usdz, fbx, obj, stl. Default is glb. Default value: `"glb"`
  - Default: `"glb"`
  - Options: `"glb"`, `"usdz"`, `"fbx"`, `"obj"`, `"stl"`

- **`material`** (`MaterialEnum`, _optional_):
  Material type. Possible values: PBR, Shaded. Default is PBR. Default value: `"PBR"`
  - Default: `"PBR"`
  - Options: `"PBR"`, `"Shaded"`
  - Examples: "Shaded"

- **`quality`** (`QualityEnum`, _optional_):
  Generation quality. Possible values: high, medium, low, extra-low. Default is medium. Default value: `"medium"`
  - Default: `"medium"`
  - Options: `"high"`, `"medium"`, `"low"`, `"extra-low"`

- **`use_hyper`** (`boolean`, _optional_):
  Whether to export the model using hyper mode. Default is false.
  - Default: `false`

- **`tier`** (`TierEnum`, _optional_):
  Tier of generation. For Rodin Sketch, set to Sketch. For Rodin Regular, set to Regular. Default value: `"Regular"`
  - Default: `"Regular"`
  - Options: `"Regular"`, `"Sketch"`

- **`TAPose`** (`boolean`, _optional_):
  When generating the human-like model, this parameter control the generation result to T/A Pose.
  - Default: `false`

- **`bbox_condition`** (`list<integer>`, _optional_):
  An array that specifies the dimensions and scaling factor of the bounding box. Typically, this array contains 3 elements, Length(X-axis), Width(Y-axis) and Height(Z-axis).
  - Array of integer

- **`addons`** (`AddonsEnum`, _optional_):
  Generation add-on features. Default is []. Possible values are HighPack. The HighPack option will provide 4K resolution textures instead of the default 1K, as well as models with high-poly. It will cost triple the billable units.
  - Options: `"HighPack"`



**Required Parameters Example**:

```json
{}
```

**Full Example**:

```json
{
  "prompt": "A futuristic robot with sleek metallic design.",
  "input_image_urls": "https://storage.googleapis.com/falserverless/model_tests/video_models/robot.png",
  "condition_mode": "concat",
  "geometry_file_format": "glb",
  "material": "Shaded",
  "quality": "medium",
  "tier": "Regular"
}
```


### Output Schema

The API returns the following output format:

- **`model_mesh`** (`File`, _required_):
  Generated 3D object file.
  - Examples: {"url":"https://v3.fal.media/files/koala/VlX4JqNI8F9HO2ETp_B7t_base_basic_pbr.glb"}

- **`seed`** (`integer`, _required_):
  Seed value used for generation.

- **`textures`** (`list<Image>`, _required_):
  Generated textures for the 3D object.
  - Array of Image



**Example Response**:

```json
{
  "model_mesh": {
    "url": "https://v3.fal.media/files/koala/VlX4JqNI8F9HO2ETp_B7t_base_basic_pbr.glb"
  },
  "textures": [
    {
      "url": "",
      "content_type": "image/png",
      "file_name": "z9RV14K95DvU.png",
      "file_size": 4404019,
      "width": 1024,
      "height": 1024
    }
  ]
}
```


## Usage Examples

### cURL

```bash
curl --request POST \
  --url https://fal.run/fal-ai/hyper3d/rodin \
  --header "Authorization: Key $FAL_KEY" \
  --header "Content-Type: application/json" \
  --data '{}'
```

### Python

Ensure you have the Python client installed:

```bash
pip install fal-client
```

Then use the API client to make requests:

```python
import fal_client

def on_queue_update(update):
    if isinstance(update, fal_client.InProgress):
        for log in update.logs:
           print(log["message"])

result = fal_client.subscribe(
    "fal-ai/hyper3d/rodin",
    arguments={},
    with_logs=True,
    on_queue_update=on_queue_update,
)
print(result)
```

### JavaScript

Ensure you have the JavaScript client installed:

```bash
npm install --save @fal-ai/client
```

Then use the API client to make requests:

```javascript
import { fal } from "@fal-ai/client";

const result = await fal.subscribe("fal-ai/hyper3d/rodin", {
  input: {},
  logs: true,
  onQueueUpdate: (update) => {
    if (update.status === "IN_PROGRESS") {
      update.logs.map((log) => log.message).forEach(console.log);
    }
  },
});
console.log(result.data);
console.log(result.requestId);
```


## Additional Resources

### Documentation

- [Model Playground](https://fal.ai/models/fal-ai/hyper3d/rodin)
- [API Documentation](https://fal.ai/models/fal-ai/hyper3d/rodin/api)
- [OpenAPI Schema](https://fal.ai/api/openapi/queue/openapi.json?endpoint_id=fal-ai/hyper3d/rodin)

### fal.ai Platform

- [Platform Documentation](https://docs.fal.ai)
- [Python Client](https://docs.fal.ai/clients/python)
- [JavaScript Client](https://docs.fal.ai/clients/javascript)