# app/api/v1/endpoints/status.py
from fastapi import APIRouter
from sparkbricks.backend.fastapi_app.schemas.job import StatusResponse
from sparkbricks.backend.fastapi_app.services.execution_service import get_run_status

router = APIRouter()


@router.get("/status/{run_id}", response_model=StatusResponse)
def check_run_status(run_id: int):
    status, output = get_run_status(run_id)
    return {"status": status, "output": output}
