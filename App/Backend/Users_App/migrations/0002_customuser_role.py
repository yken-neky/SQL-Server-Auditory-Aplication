# Generated by Django 5.1.4 on 2024-12-27 21:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users_App', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='role',
            field=models.CharField(choices=[('client', 'Client'), ('moderator', 'Moderator'), ('admin', 'Admin')], default='client', max_length=10),
        ),
    ]