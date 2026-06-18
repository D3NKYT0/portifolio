from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from apps.portfolio.serializers.public import ContactMessageSerializer, ContactResponseSerializer
from apps.portfolio.services.contact_service import create_contact_message
from apps.portfolio.services.portfolio_data import get_portfolio_data


@api_view(["GET"])
@permission_classes([AllowAny])
def portfolio_view(request):
    return Response(get_portfolio_data())


@api_view(["POST"])
@permission_classes([AllowAny])
def contact_view(request):
    serializer = ContactMessageSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    create_contact_message(
        name=serializer.validated_data["name"],
        email=serializer.validated_data["email"],
        subject=serializer.validated_data.get("subject", ""),
        message=serializer.validated_data["message"],
        request=request,
    )

    response = ContactResponseSerializer(
        {"success": True, "message": "Mensagem enviada! Obrigado pelo contato."}
    )
    return Response(response.data, status=status.HTTP_201_CREATED)
