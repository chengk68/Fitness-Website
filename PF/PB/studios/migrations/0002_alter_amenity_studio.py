# Generated by Django 4.1.3 on 2022-11-11 17:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('studios', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='amenity',
            name='studio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='amenities', to='studios.studio'),
        ),
    ]
