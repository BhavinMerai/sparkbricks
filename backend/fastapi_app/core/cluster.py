# app/core/cluster.py
from dbx.client import db


def get_cluster_status(cluster_id: str):
    try:
        cluster_info = db.cluster.get_cluster(cluster_id)
        return cluster_info.get("state", "UNKNOWN")
    except Exception as e:
        print(f"[Cluster Status Error]: {str(e)}")
        return "ERROR"


def start_cluster_if_stopped(cluster_id: str) -> bool:
    status = get_cluster_status(cluster_id)
    if status in ["TERMINATED", "STOPPED"]:
        try:
            db.cluster.start_cluster(cluster_id)
            return True
        except Exception as e:
            print(f"[Cluster Start Error]: {str(e)}")
            return False
    return False
