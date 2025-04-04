# app/dbx/client.py
from databricks_api import DatabricksAPI
from app.core.config import DATABRICKS_INSTANCE, DATABRICKS_TOKEN

db = DatabricksAPI(host=DATABRICKS_INSTANCE, token=DATABRICKS_TOKEN)
