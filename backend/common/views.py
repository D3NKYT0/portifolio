from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


@api_view(["GET"])
@permission_classes([AllowAny])
def health_check(request):
    return Response({"status": "ok", "service": "denky-portfolio"})


class VersionView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"version": settings.API_VERSION, "name": "denky-portfolio"})


version_view = VersionView.as_view()
