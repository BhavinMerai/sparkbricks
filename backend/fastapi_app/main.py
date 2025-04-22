from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sparkbricks.backend.fastapi_app.api.v1.endpoints import execute, status

# Import config to load environment variables and validate config
import sparkbricks.backend.fastapi_app.core.config as config

print("Config loaded in main.py")
print(f"DATABRICKS_INSTANCE={config.DATABRICKS_INSTANCE}")
print(f"DATABRICKS_TOKEN={'set' if config.DATABRICKS_TOKEN else 'not set'}")
print(f"DATABRICKS_CLUSTER_ID={config.DATABRICKS_CLUSTER_ID}")

app = FastAPI(title="Databricks code executor")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development only - restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define a simple route to test
@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

# Register endpoints
app.include_router(execute.router, prefix="/v1")
app.include_router(status.router, prefix="/v1")
