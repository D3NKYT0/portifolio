from django.urls import path

from apps.portfolio.views.public import contact_view, portfolio_view

urlpatterns = [
    path("portfolio/", portfolio_view, name="public-portfolio"),
    path("contact/", contact_view, name="public-contact"),
]
