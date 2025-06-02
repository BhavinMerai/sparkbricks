from fastapi import Depends
from .core.auth import get_current_user

def get_auth_user():
    return Depends(get_current_user)
