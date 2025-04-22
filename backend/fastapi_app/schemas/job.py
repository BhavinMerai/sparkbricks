# app/schemas/job.py
from pydantic import BaseModel
from typing import Optional


class ExecuteRequest(BaseModel):
    user_email: Optional[str] = None
    code: str


class ExecuteResponse(BaseModel):
    status: str
    run_id: str


class StatusResponse(BaseModel):
    status: str
    output: Optional[str] = None
