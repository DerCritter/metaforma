# Dossier: Moving from architectural sketch to photorealistic output

## 1. Verifiable Facts & Sources
- **Stable Diffusion WebUI (Automatic1111)**: The standard interface for local AI rendering workflows. (Source: https://github.com/AUTOMATIC1111/stable-diffusion-webui)
- **ControlNet**: A neural network structure to control diffusion models by adding extra conditions. Version 1.1 introduced specific models for Sketch and Scribble, which are crucial for architectural massing. (Source: https://github.com/lllyasviel/ControlNet-v1-1-nightly)
- **ControlNet Scribble/Sketch Models**: `control_v11p_sd15_scribble` and `control_v11p_sd15_sketch` are used for hand-drawn or rough tablet sketches. `control_v11p_sd15_mlsd` is used for rigid straight lines (useful if the sketch is a raw SketchUp export).

## 2. Hard Numbers & Versions
- **Base Model**: Stable Diffusion 1.5 (still preferred for architectural ControlNet precision over SDXL due to mature ControlNet ecosystem, though SDXL ControlNets exist, SD 1.5 with high-res fix is standard for strict constraint adherence).
- **ControlNet Weight**: 0.85 to 1.15. (Below 0.85, the AI invents windows and volumes where none exist; above 1.15, the output looks like a colored drawing rather than a photograph).
- **Denoising Strength (High-Res Fix)**: 0.35 to 0.45. (Allows for material details like brick bump mapping without shifting the global geometry).
- **CFG Scale**: 6 to 8 for realistic architectural constraints.
- **Hardware Requirements**: Minimum 8GB VRAM (NVIDIA RTX 3060 or better) to run SD 1.5 + multiple ControlNet layers + High-res fix at 2048px resolution locally without out-of-memory errors.

## 3. Workflow Specifics (Order of Operations)
1. **Input Preparation**: Export a pure black-and-white lines/massing sketch from iPad, SketchUp, or Rhino. No shading.
2. **Prompting**: Define materials strictly (e.g., "board-formed concrete, corten steel panels, 8k resolution, architectural photography").
3. **ControlNet Layer 1 (Geometry)**: Load the sketch into ControlNet Unit 0. Select `Scribble` or `MLSD` preprocessor depending on line straightness. Set Control Weight to 1.0.
4. **ControlNet Layer 2 (Optional - Depth/Context)**: If integrating into a site photo, use a Depth ControlNet for the background.
5. **First Pass Generation**: Generate at 512x768 (or similar ratio) to test prompt adherence to the sketch.
6. **High-Res Fix**: Enable High-Res Fix (Latent upscaler) at 2x scale, Denoising strength at 0.4. This creates the final 1024x1536 editorial render.
7. **Post-Production**: Photoshop for exact color correction and minor hallucination removal (e.g., AI adding a random downspout).

## 4. Limitations & Failure Modes
- **Proportional Drift**: Even with ControlNet set to 1.0, the AI may slightly alter window mullion thickness or floor-to-ceiling ratios to match its training data of "standard" buildings. It is not CAD-accurate.
- **Material Bleed**: If the sketch does not clearly separate volumes (e.g., where glass meets concrete), the AI will blend the materials (e.g., concrete-textured glass). 
- **Context Hallucination**: Without a depth map of the surroundings, the AI will invent a generic environment (often a generic sunny suburban street or empty field) that does not match the actual site.

## 5. What I could not verify
- Whether upcoming SD3 (Stable Diffusion 3) ControlNets will fully replace the SD 1.5 MLSD workflow for architects, as current SD3 documentation on strict line-art adherence is still in developer preview.
- Exact pricing of cloud-based alternatives (like Krea or LookX) as their tier limits frequently change, so this dossier focuses strictly on local A1111 workflows.
