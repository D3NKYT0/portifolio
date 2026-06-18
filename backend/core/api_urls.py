from django.urls import include, path

urlpatterns = [
    path("public/", include("apps.portfolio.urls.public")),
    path("system/", include("core.routing.system")),
]
