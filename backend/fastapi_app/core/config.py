# app/core/config.py
import os
from dotenv import load_dotenv

# Explicitly load .env file from the correct path
dotenv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '.env')
load_dotenv(dotenv_path)

# Disable test mode by default
TEST_MODE = os.getenv("TEST_MODE", "false").lower() == "true"

if TEST_MODE:
    print("WARNING: Running in test mode - using mock Databricks client")
    DATABRICKS_INSTANCE = "https://mock.cloud.databricks.com"
    DATABRICKS_TOKEN = "mock-token"
    DATABRICKS_CLUSTER_ID = "mock-cluster-id"
else:
    # Production configuration
    DATABRICKS_INSTANCE = os.getenv("DATABRICKS_INSTANCE")
    DATABRICKS_TOKEN = os.getenv("DATABRICKS_TOKEN")
    DATABRICKS_CLUSTER_ID = os.getenv("DATABRICKS_CLUSTER_ID")
    if not all([DATABRICKS_INSTANCE, DATABRICKS_TOKEN, DATABRICKS_CLUSTER_ID]):
        raise ValueError("Missing required Databricks configuration")

# Debug prints to verify environment variables loaded correctly
print(f"DATABRICKS_INSTANCE={DATABRICKS_INSTANCE}")
print(f"DATABRICKS_TOKEN={'set' if DATABRICKS_TOKEN else 'not set'}")
print(f"DATABRICKS_CLUSTER_ID={DATABRICKS_CLUSTER_ID}")