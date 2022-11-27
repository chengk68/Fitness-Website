from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
import datetime


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    avatar = models.ImageField(upload_to="PB/images/")
    is_subscribe = models.BooleanField(default=False)
    paid_until = models.DateField(null=True, blank=True)
    subscribe_plan = models.IntegerField(null=True, blank=True)

    def has_paid(self):
        current_date = datetime.date.today()
        return current_date < self.paid_until

