# Generated by Django 5.1.4 on 2024-12-10 18:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('InsideDB_App', '0002_alter_controls_information_index'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='controls_scripts',
            name='expected_results',
        ),
        migrations.RemoveField(
            model_name='controls_scripts',
            name='validation_type',
        ),
    ]
