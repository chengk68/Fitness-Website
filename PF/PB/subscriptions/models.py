from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class CardInfo(models.Model):
    cardNumber = models.CharField(max_length=50)
    expirationDate = models.DateField()
    cvv = models.CharField(max_length=5)
    postcode = models.CharField(max_length=7)
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)


class PaymentHistory(models.Model):
    amount = models.FloatField()
    cardNumber = models.CharField(max_length=50, blank=True, null=True)
    expirationDate = models.DateField(blank=True, null=True)
    cvv = models.CharField(max_length=5, blank=True, null=True)
    postcode = models.CharField(max_length=7, blank=True, null=True)
    time = models.DateTimeField(blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)

    class Meta:
        verbose_name_plural = "payment histories"



class FuturePayment(models.Model):
    amount = models.FloatField()
    cardInfo = models.ForeignKey(CardInfo, on_delete=models.CASCADE)
    time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class SubscriptionPlan(models.Model):
    amount = models.FloatField()
    days = models.IntegerField()
