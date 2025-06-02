from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

from sparkbricks.backend.fastapi_app.api.v1.endpoints import execute, status

app = FastAPI(title="Databricks code executor")

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

app.include_router(execute.router, prefix="/v1")
app.include_router(status.router, prefix="/v1")
