# app/dbx/utils.py
import time
import base64
import requests
from core.config import DATABRICKS_INSTANCE, DATABRICKS_TOKEN, DATABRICKS_CLUSTER_ID
from dbx.client import db
from core.cluster import start_cluster_if_stopped


def upload_code_to_dbfs(code: str) -> str:
    dbfs_path = f"dbfs:/user-scripts/{int(time.time())}.py"
    encoded = base64.b64encode(code.encode("utf-8")).decode("utf-8")
    url = f"{DATABRICKS_INSTANCE}/api/2.0/dbfs/put"
    headers = {"Authorization": f"Bearer {DATABRICKS_TOKEN}"}
    data = {"path": dbfs_path, "contents": encoded, "overwrite": True}
    requests.post(url, headers=headers, json=data)
    return dbfs_path


def submit_job_to_databricks(code: str) -> int:
    start_cluster_if_stopped(DATABRICKS_CLUSTER_ID)
    time.sleep(30)  # optional wait for startup
    dbfs_path = upload_code_to_dbfs(code)
    run = db.jobs.submit_run(existing_cluster_id=DATABRICKS_CLUSTER_ID,
                             spark_python_task={"python_file": dbfs_path})
    return run.get("run_id")
