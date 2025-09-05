# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import random

app = FastAPI()

# Enable CORS for your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or replace "*" with ["http://localhost:5500", "http://127.0.0.1:5500"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request model (topic required, others optional)
class PromptRequest(BaseModel):
    topic: str
    tone: Optional[str] = "neutral"
    style: Optional[str] = "general"

class PromptResponse(BaseModel):
    prompt: str

# API routes
@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/generate", response_model=PromptResponse)
def generate_prompt(req: PromptRequest):
    templates = [
        "Imagine you're {tone} about {topic}. Write a {style} that captures the essence.",
        "Create a {style} based on the idea of {topic}, using a {tone} perspective.",
        "Describe {topic} in a {style}, keeping the tone {tone}."
    ]
    template = random.choice(templates)
    prompt = template.format(topic=req.topic, tone=req.tone, style=req.style)
    return {"prompt": prompt}
