import time
import base64
import requests
from sparkbricks.backend.fastapi_app.core.config import DATABRICKS_CLUSTER_ID, DATABRICKS_INSTANCE, DATABRICKS_TOKEN
from sparkbricks.backend.fastapi_app.dbx.client import db
from sparkbricks.backend.fastapi_app.core.cluster import start_cluster_if_stopped


def submit_job_to_databricks(code: str) -> int:
    # Removed TEST_MODE check to always use real credentials
    start_cluster_if_stopped(DATABRICKS_CLUSTER_ID)
    time.sleep(5)  # Wait for cluster to be ready

    dbfs_path = f"dbfs:/user-scripts/{int(time.time())}.py"
    
    # Encode the code string to base64 as required by Databricks DBFS API
    encoded_content = base64.b64encode(code.encode("utf-8")).decode("utf-8")
    url = f"{DATABRICKS_INSTANCE}/api/2.0/dbfs/put"
    headers = {"Authorization": f"Bearer {DATABRICKS_TOKEN}"}
    data = {"path": dbfs_path, "contents": encoded_content, "overwrite": True}

    # Upload the code to DBFS
    response = requests.post(url, headers=headers, json=data)
    if not response.ok:
        raise Exception(f"Failed to upload code to DBFS: {response.text}")

    # Submit the job pointing to the uploaded file
    run = db.jobs.submit_run(
        existing_cluster_id=DATABRICKS_CLUSTER_ID,
        spark_python_task={"python_file": dbfs_path}
    )
    return run.get("run_id")
