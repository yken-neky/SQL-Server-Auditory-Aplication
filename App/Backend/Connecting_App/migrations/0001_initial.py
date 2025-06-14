# Generated by Django 5.0.10 on 2025-01-22 19:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='ActiveConnection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('driver', models.CharField(max_length=255)),
                ('server', models.CharField(max_length=255)),
                ('db_user', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('is_connected', models.BooleanField(default=False)),
                ('last_connected', models.DateTimeField(auto_now=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
