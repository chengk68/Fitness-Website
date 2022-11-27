from django.db import IntegrityError
from rest_framework import serializers

from accounts.models import Profile
from subscriptions.models import SubscriptionPlan, PaymentHistory, CardInfo, FuturePayment
import datetime


class PaymentSerializer(serializers.ModelSerializer):
    subscription_id = serializers.IntegerField()

    class Meta:
        model = CardInfo
        fields = ['subscription_id', 'cardNumber', 'expirationDate', 'cvv', 'postcode']

    def create(self, validated_data):
        if SubscriptionPlan.objects.filter(id=validated_data['subscription_id']).exists():
            subscription_plan = SubscriptionPlan.objects.get(id=validated_data['subscription_id'])
            amount = subscription_plan.amount
            days = datetime.timedelta(days=subscription_plan.days)
        else:
            days = datetime.timedelta(days=0)
            amount = 0

        try:
            card_info = CardInfo.objects.create(cardNumber=validated_data['cardNumber'],
                                                expirationDate=validated_data['expirationDate'], cvv=validated_data['cvv'],
                                                postcode=validated_data['postcode'], user=self.context['request'].user)
            PaymentHistory.objects.create(amount=amount, cardNumber=validated_data['cardNumber'],
                                          expirationDate=validated_data['expirationDate'], cvv=validated_data['cvv'],
                                          postcode=validated_data['postcode'], time=datetime.datetime.now(),
                                          user=self.context['request'].user)
            FuturePayment.objects.create(amount=amount, cardInfo=card_info, time=datetime.date.today() + days, user=self.context['request'].user)
            p = Profile.objects.get(user=self.context['request'].user)
            p.is_subscribe = True
            p.paid_until = datetime.date.today() + days
            p.subscribe_plan = validated_data['subscription_id']
            p.save()
            return validated_data
        except IntegrityError:
            raise serializers.ValidationError({"error": "you have already subscribed"})


class CardInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CardInfo
        fields = ['cardNumber', 'expirationDate', 'cvv', 'postcode']
        lookup_field = 'user'


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentHistory
        fields = ['amount', 'cardNumber', 'expirationDate', 'cvv', 'postcode', 'time']


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = ['id', 'amount', 'days']


class FuturePaymentSerializer(serializers.ModelSerializer):
    cardInfo = CardInfoSerializer()

    class Meta:
        model = FuturePayment
        fields = ['amount', 'cardInfo', 'time']
