from django.db import models

from common.models import BaseModel


class ContactMessage(BaseModel):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    read = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Mensagem de contato"
        verbose_name_plural = "Mensagens de contato"

    def __str__(self):
        return f"{self.name} <{self.email}>"
