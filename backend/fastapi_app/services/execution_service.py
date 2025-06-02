import threading
import uuid
import logging
import time
from typing import Dict, Optional
from sparkbricks.backend.fastapi_app.dbx.utils import submit_job_to_databricks
from sparkbricks.backend.fastapi_app.dbx.client import db

logger = logging.getLogger(__name__)

# Dictionary to store job statuses and outputs
job_store = {}

class CodeExecutionService:
    def __init__(self):
        pass

    def execute_code(self, code: str, timeout: int = 300) -> Dict[str, str]:
        """
        Execute the given code asynchronously on Databricks and return a run_id.
        The code is submitted as a job to Databricks and status is polled.
        """
        run_id = str(uuid.uuid4())
        job_store[run_id] = {
            "status": "RUNNING",
            "output": ""
        }

        def run():
            try:
                logger.info(f"Submitting code to Databricks for run_id: {run_id}")
                # Submit job to Databricks
                databricks_run_id = submit_job_to_databricks(code)
                logger.info(f"Databricks job submitted with run_id: {databricks_run_id}")

                # Poll Databricks job status
                while True:
                    run_info = db.jobs.get_run(databricks_run_id)
                    life_cycle_state = run_info.get("state", {}).get("life_cycle_state", "")
                    result_state = run_info.get("state", {}).get("result_state", "")

                    if life_cycle_state == "TERMINATED":
                        if result_state == "SUCCESS":
                            job_store[run_id]["status"] = "SUCCESS"
                        else:
                            job_store[run_id]["status"] = "FAILED"
                        break
                    elif life_cycle_state == "INTERNAL_ERROR":
                        job_store[run_id]["status"] = "FAILED"
                        break
                    else:
                        job_store[run_id]["status"] = "RUNNING"
                    time.sleep(5)

                # Get job output/logs
                run_output = db.jobs.get_run_output(databricks_run_id)
                logs = run_output.get("logs", [])
                output_text = "".join(logs) if logs else "No output available"
                print(f"[DEBUG] Databricks logs: {output_text}")
                job_store[run_id]["output"] = output_text

            except Exception as e:
                logger.error(f"Error executing code on Databricks for run_id {run_id}: {e}")
                job_store[run_id]["output"] = f"Error: {str(e)}"
                job_store[run_id]["status"] = "ERROR"

        # Start the execution in a new thread
        thread = threading.Thread(target=run)
        thread.start()

        return {"run_id": run_id, "status": "RUNNING"}

    def get_run_status(self, run_id: str) -> Dict[str, Optional[str]]:
        """
        Retrieve the status and output of a given run_id.
        """
        job = job_store.get(run_id)
        if not job:
            return {"status": "NOT_FOUND", "output": None}
        return {"status": job["status"], "output": job.get("output", "")}
