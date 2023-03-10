# Generated by Django 4.1.3 on 2022-11-18 01:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0015_classes_cancel_enrollment_is_active_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomEnrollDrop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cid', models.CharField(max_length=200, null=True)),
                ('cname', models.CharField(max_length=200, null=True)),
                ('ctime', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='CustomSchedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('customid', models.CharField(max_length=200, null=True)),
                ('customname', models.CharField(max_length=200, null=True)),
                ('customtime', models.CharField(max_length=200, null=True)),
                ('customisactive', models.CharField(max_length=200, null=True)),
                ('customstatus', models.CharField(max_length=200, null=True)),
            ],
        ),
    ]
