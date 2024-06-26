from auth_token import auth_token
from fastapi import FastAPI,Response
from fastapi.middleware.cors import CORSMiddleware
import torch
from torch import autocast
from diffusers import StableDiffusionPipeline
from io import BytesIO
import base64

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"], 
)
#device = "cuda" if torch.cuda.is_available() else "cpu"

device = "cpu"
model_id="CompVis/stable-diffusion-v1-4"
torch_dtype = torch.float16 if device == "cuda" else torch.float32

try:
    pipe = StableDiffusionPipeline.from_pretrained(
        model_id,
        revision="fp16",
        torch_dtype=torch_dtype,
        use_auth_token=auth_token
    )
    pipe = pipe.to(device)
except Exception as e:
    print(f"Error initializing pipeline: {e}")


@app.get("/")
def generate(prompt: str):
    try:
        image = pipe(prompt, guidance_scale=8.5).images[0]
        
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        imgstr = base64.b64encode(buffer.getvalue()).decode()

        return Response(content=imgstr, media_type="image/png")
    except Exception as e:
        return {"error": str(e)}