# app/api/v1/endpoints/execute.py
from fastapi import APIRouter, HTTPException
from sparkbricks.backend.fastapi_app.schemas.job import ExecuteRequest, ExecuteResponse
from sparkbricks.backend.fastapi_app.services.execution_service import CodeExecutionService
import time

router = APIRouter()
execution_service = CodeExecutionService()

@router.post("/execute", response_model=ExecuteResponse)
def run_user_code(payload: ExecuteRequest):
    try:
        start_time = time.time()
        result = execution_service.execute_code(payload.code)
        run_id = result.get("run_id", "")
        status = execution_service.get_run_status(run_id)
        return {
            "status": status["status"],
            "run_id": run_id,
            "message": status.get("message", "")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
