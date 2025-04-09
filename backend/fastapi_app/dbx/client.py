# app/dbx/client.py
from databricks_api import DatabricksAPI
from sparkbricks.backend.fastapi_app.core.config import DATABRICKS_INSTANCE, DATABRICKS_TOKEN, TEST_MODE

if TEST_MODE:
    class MockDatabricksAPI:
        def __getattr__(self, name):
            def mock_method(*args, **kwargs):
                print(f"Mocking Databricks API call: {name}()")
                if name == "cluster":
                    return MockCluster()
                return {"status": "mock-success", "run_id": "mock-run-123"}
            return mock_method

    class MockCluster:
        def list_clusters(self):
            return {"clusters": [{"cluster_id": "mock-cluster", "state": "RUNNING"}]}

    db = MockDatabricksAPI()
else:
    db = DatabricksAPI(host=DATABRICKS_INSTANCE, token=DATABRICKS_TOKEN)
