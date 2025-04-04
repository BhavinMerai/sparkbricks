# app/api/v1/endpoints/execute.py
from fastapi import APIRouter
from schemas.job import ExecuteRequest, ExecuteResponse
from services.execution_service import execute_code

router = APIRouter()


@router.post("/execute", response_model=ExecuteResponse)
def run_user_code(payload: ExecuteRequest):
    run_id = execute_code(payload.user_email, payload.code)
    return {"status": "running", "run_id": run_id}
