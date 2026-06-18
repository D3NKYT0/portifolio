# Generated migration placeholder — run `python manage.py makemigrations` to regenerate if needed.

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='ContactMessage',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('name', models.CharField(max_length=120)),
                ('email', models.EmailField(max_length=254)),
                ('subject', models.CharField(blank=True, max_length=200)),
                ('message', models.TextField()),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('read', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Mensagem de contato',
                'verbose_name_plural': 'Mensagens de contato',
                'ordering': ['-created_at'],
            },
        ),
    ]
