# app/schemas/job.py
from pydantic import BaseModel
from typing import Optional


class ExecuteRequest(BaseModel):
    user_email: str
    code: str


class ExecuteResponse(BaseModel):
    status: str
    run_id: int


class StatusResponse(BaseModel):
    status: str
    output: Optional[str] = None
