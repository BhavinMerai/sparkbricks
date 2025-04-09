# app/services/execution_service.py
from sparkbricks.backend.fastapi_app.dbx.utils import submit_job_to_databricks
from sparkbricks.backend.fastapi_app.dbx.client import db


def execute_code(user_email: str, code: str) -> int:
    return submit_job_to_databricks(code)


def get_run_status(run_id: int):
    try:
        status = db.jobs.get_run(run_id)
        life_cycle = status.get("state", {}).get("life_cycle_state")
        result_state = status.get("state", {}).get("result_state", "UNKNOWN")

        if life_cycle in ["PENDING", "RUNNING"]:
            return "RUNNING", None

        if life_cycle == "TERMINATED":
            output = db.jobs.get_run_output(run_id)
            logs = output.get("logs", [])
            return result_state, "".join(
                logs) if logs else "No output available"
    except Exception as e:
        return "ERROR", f"Error fetching run status: {str(e)}"
    return "UNKNOWN", "Status not found"
