# app/api/v1/endpoints/status.py
from fastapi import APIRouter, Depends
from sparkbricks.backend.fastapi_app.schemas.job import StatusResponse
from sparkbricks.backend.fastapi_app.services.execution_service import get_run_status
from sparkbricks.backend.fastapi_app.dependencies import get_auth_user

router = APIRouter()


@router.get("/status/{run_id}", response_model=StatusResponse)
def check_run_status(
    run_id: str,
    user: dict = Depends(get_auth_user)
):
    status, output = get_run_status(run_id)
    return {"status": status, "output": output}
