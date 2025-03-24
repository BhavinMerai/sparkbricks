# backend/fastapi_app/main.py
from fastapi import FastAPI

# This is the FastAPI app instance that Uvicorn is looking for
app = FastAPI()


# Define a simple route to test
@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}
