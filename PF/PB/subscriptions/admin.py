from django.contrib import admin
from subscriptions.models import CardInfo, SubscriptionPlan, PaymentHistory

# Register your models here.

admin.site.register(CardInfo)
admin.site.register(SubscriptionPlan)
admin.site.register(PaymentHistory)
