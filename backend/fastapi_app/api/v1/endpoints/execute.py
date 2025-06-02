# app/api/v1/endpoints/execute.py
from fastapi import APIRouter, HTTPException, Depends
from sparkbricks.backend.fastapi_app.schemas.job import ExecuteRequest, ExecuteResponse
from sparkbricks.backend.fastapi_app.services.execution_service import CodeExecutionService
from sparkbricks.backend.fastapi_app.core.auth import get_current_user
import logging

router = APIRouter()
execution_service = CodeExecutionService()
logger = logging.getLogger(__name__)

# TEMPORARY AUTH BYPASS FOR DEBUGGING - REMOVE BEFORE PRODUCTION
@router.post("/execute", response_model=ExecuteResponse)
def execute_code(
    payload: ExecuteRequest,
    # user: dict = Depends(get_current_user)  # Auth bypassed temporarily
):
    """
    Endpoint to execute code submitted by user.
    Auth bypassed temporarily for debugging.
    """
    try:
        # user_email = user.get("email", "unknown")
        logger.info(f"Code execution requested (auth bypassed).")
        result = execution_service.execute_code(payload.code)
        return ExecuteResponse(status=result["status"], run_id=result["run_id"])
    except Exception as e:
        logger.error(f"Error in execute_code endpoint: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
