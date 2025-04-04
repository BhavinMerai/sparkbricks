# app/core/config.py
import os
from dotenv import load_dotenv

load_dotenv()

DATABRICKS_INSTANCE = os.getenv("DATABRICKS_INSTANCE")
DATABRICKS_TOKEN = os.getenv("DATABRICKS_TOKEN")
DATABRICKS_CLUSTER_ID = os.getenv("DATABRICKS_CLUSTER_ID")
