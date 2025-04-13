from typing import Dict, Tuple
import uuid
import logging

logger = logging.getLogger(__name__)

class CodeExecutionService:
    def __init__(self):
        # Mock configuration
        self.mock_responses = {
            "execute": {
                "run_id": str(uuid.uuid4()),
                "status": "RUNNING"
            },
            "status": {
                "state": {
                    "life_cycle_state": "TERMINATED",
                    "result_state": "SUCCESS"
                },
                "output": "Mock execution completed successfully"
            }
        }

    def execute_code(self, code: str, timeout: int = 30) -> Dict[str, str]:
        """Mock execution of code"""
        logger.info(f"Executing code: {code} with timeout: {timeout}")
        return self.mock_responses["execute"]

    def get_run_status(self, run_id: str) -> Dict[str, str]:
        """Mock getting the status of a run"""
        logger.info(f"Getting status for run_id: {run_id}")
        return self.mock_responses["status"]
