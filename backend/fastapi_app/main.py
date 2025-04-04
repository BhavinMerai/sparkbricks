# backend/fastapi_app/main.py
from fastapi import FastAPI
from api.v1.endpoints import execute, status
# This is the FastAPI app instance that Uvicorn is looking for
app = FastAPI(title="Databricks code executor")

# # Define a simple route to test
# @app.get("/")
# def read_root():
#     return {"message": "FastAPI is running!"}

#Register endpoints
app.include_router(execute.router, prefix="/v1")
app.include_router(status.router, prefix="/v1")
