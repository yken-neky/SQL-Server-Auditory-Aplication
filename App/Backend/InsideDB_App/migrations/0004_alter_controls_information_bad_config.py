# Generated by Django 5.1.4 on 2024-12-15 02:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('InsideDB_App', '0003_remove_controls_scripts_expected_results_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='controls_information',
            name='bad_config',
            field=models.TextField(default='Este parámetro se encuentra configurado de forma incorrecta en su servidor. Para remediar esta configuración ejecute el siguiente comando: '),
        ),
    ]
