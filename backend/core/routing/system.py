from django.urls import path

from common.views import health_check, version_view

urlpatterns = [
    path("health/", health_check, name="system-health"),
    path("version/", version_view, name="system-version"),
]
