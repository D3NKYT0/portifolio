from django.conf import settings
from django.core.mail import send_mail

from apps.portfolio.models import ContactMessage


def get_client_ip(request) -> str | None:
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR")


def create_contact_message(*, name: str, email: str, subject: str, message: str, request) -> ContactMessage:
    contact = ContactMessage.objects.create(
        name=name,
        email=email,
        subject=subject or "Contato via portfólio",
        message=message,
        ip_address=get_client_ip(request),
    )

    _notify_contact(contact)
    return contact


def _notify_contact(contact: ContactMessage) -> None:
    body = (
        f"Nova mensagem de contato\n\n"
        f"Nome: {contact.name}\n"
        f"E-mail: {contact.email}\n"
        f"Assunto: {contact.subject}\n\n"
        f"Mensagem:\n{contact.message}\n"
    )

    try:
        send_mail(
            subject=f"[Portfólio] {contact.subject}",
            message=body,
            from_email=settings.CONTACT_EMAIL,
            recipient_list=[settings.CONTACT_EMAIL],
            fail_silently=True,
        )
    except Exception:
        pass
