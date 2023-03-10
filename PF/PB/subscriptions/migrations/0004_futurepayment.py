# Generated by Django 4.1.3 on 2022-11-15 02:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('subscriptions', '0003_remove_cardinfo_user_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='FuturePayment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField()),
                ('time', models.DateTimeField()),
                ('cardInfo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='subscriptions.cardinfo')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
