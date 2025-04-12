from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer
from jose import jwt
from pydantic import BaseModel

security = HTTPBearer()

class AuthSettings(BaseModel):
    jwt_secret_key: str = "your-django-secret-key"  # Should match Django's SECRET_KEY
    jwt_algorithm: str = "HS256"

settings = AuthSettings()

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        return payload
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid token")
