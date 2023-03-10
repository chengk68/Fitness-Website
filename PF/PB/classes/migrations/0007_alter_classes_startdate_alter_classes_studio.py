# Generated by Django 4.1.3 on 2022-11-14 16:05

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0011_remove_studio_location_studio_lat_studio_lon_and_more'),
        ('classes', '0006_alter_classes_startdate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='classes',
            name='startdate',
            field=models.DateField(default=datetime.datetime(2022, 11, 14, 11, 5, 17, 847758)),
        ),
        migrations.AlterField(
            model_name='classes',
            name='studio',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='studio', to='studios.studio'),
        ),
    ]
