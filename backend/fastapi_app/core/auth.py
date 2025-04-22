from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from pydantic import BaseModel
import os
import logging

logger = logging.getLogger(__name__)
security = HTTPBearer()

class AuthSettings(BaseModel):
    jwt_secret_key: str = os.getenv("DJANGO_SECRET_KEY", "your-django-secret-key")  # Load from env or default
    jwt_algorithm: str = "HS256"

settings = AuthSettings()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = None
    try:
        token = credentials.credentials
        logger.info(f"Received token: {token}")
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        logger.info(f"Token payload: {payload}")
        return payload
    except JWTError as e:
        logger.error(f"JWT decode error: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")
    except Exception as e:
        logger.error(f"Unexpected error in token validation: {e}")
        raise HTTPException(status_code=401, detail="Invalid token")
