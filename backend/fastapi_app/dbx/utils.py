# app/dbx/utils.py
import time
from sparkbricks.backend.fastapi_app.core.config import DATABRICKS_CLUSTER_ID, TEST_MODE
from sparkbricks.backend.fastapi_app.dbx.client import db
from sparkbricks.backend.fastapi_app.core.cluster import start_cluster_if_stopped


def submit_job_to_databricks(code: str) -> int:
    if TEST_MODE:
        print("Mocking job submission")
        return "mock-run-123"
        
    start_cluster_if_stopped(DATABRICKS_CLUSTER_ID)
    time.sleep(5)  # reduced wait time for testing
    run = db.jobs.submit_run(
        existing_cluster_id=DATABRICKS_CLUSTER_ID,
        spark_python_task={"python_file": f"dbfs:/user-scripts/{int(time.time())}.py"}
    )
    return run.get("run_id")
