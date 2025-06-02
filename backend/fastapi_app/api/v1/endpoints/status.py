# app/api/v1/endpoints/status.py
from fastapi import APIRouter, Depends, HTTPException
from sparkbricks.backend.fastapi_app.schemas.job import StatusResponse
from sparkbricks.backend.fastapi_app.services.execution_service import CodeExecutionService
from sparkbricks.backend.fastapi_app.dependencies import get_auth_user

router = APIRouter()
execution_service = CodeExecutionService()

@router.get("/status/{run_id}", response_model=StatusResponse)
def check_run_status(
    run_id: str,
    user: dict = Depends(get_auth_user)
):
    """
    Endpoint to check the status and output of a code execution run.
    Requires authenticated user.
    """
    status = execution_service.get_run_status(run_id)
    print(f"[DEBUG] Status response for {run_id}: {status}")
    if status["status"] == "NOT_FOUND":
        raise HTTPException(status_code=404, detail="Run ID not found")
    return StatusResponse(status=status["status"], output=status.get("output", ""))
