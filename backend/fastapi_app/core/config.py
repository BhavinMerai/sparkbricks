# app/core/config.py
import os
from dotenv import load_dotenv

load_dotenv()

# Test mode configuration
TEST_MODE = os.getenv("TEST_MODE", "true").lower() == "true"

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
