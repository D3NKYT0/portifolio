import multiprocessing
import os

bind = "0.0.0.0:8000"
workers = int(os.environ.get("GUNICORN_WORKERS", max(2, multiprocessing.cpu_count())))
timeout = 60
accesslog = "-"
errorlog = "-"
reload = os.environ.get("GUNICORN_RELOAD", "false").lower() == "true"
