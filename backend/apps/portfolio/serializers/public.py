from rest_framework import serializers

from apps.portfolio.models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ("name", "email", "subject", "message")

    def validate_message(self, value):
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Mensagem muito curta (mínimo 10 caracteres).")
        return value.strip()

    def validate_name(self, value):
        return value.strip()


class ContactResponseSerializer(serializers.Serializer):
    success = serializers.BooleanField()
    message = serializers.CharField()
