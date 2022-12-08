import datetime

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.models import Profile
from subscriptions.serializers import PaymentSerializer, HistorySerializer, CardInfoSerializer, PlanSerializer, FuturePaymentSerializer
from subscriptions.models import PaymentHistory, CardInfo, SubscriptionPlan, FuturePayment
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from classes.models import *
from datetime import *

# Create your views here.
class Paginator(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'


class SubscribeView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PaymentSerializer


class PaymentHistoryView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = HistorySerializer
    pagination_class = Paginator

    def get_queryset(self):
        return PaymentHistory.objects.filter(user=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class CardInfoView(generics.RetrieveAPIView, generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CardInfoSerializer

    def get_object(self):
        return get_object_or_404(CardInfo, user=self.request.user)


class PlansView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PlanSerializer

    def get_queryset(self):
        return SubscriptionPlan.objects.all()


def check_subscribe():
    for profile in Profile.objects.all():
        if profile.is_subscribe and not profile.has_paid():
            card_info = CardInfo.objects.get(user=profile.user)
            future_payment = FuturePayment.objects.get(user=profile.user)
            subscription_plan = SubscriptionPlan.objects.get(id=profile.subscribe_plan)
            PaymentHistory.objects.create(amount=subscription_plan.amount, cardNumber=card_info.cardNumber,
                                          expirationDate=card_info.expirationDate, cvv=card_info.cvv,
                                          postcode=card_info.postcode, time=datetime.datetime.now(), user=profile.user)
            profile.paid_until = profile.paid_until + datetime.timedelta(days=subscription_plan.days)
            future_payment.time = future_payment.time + datetime.timedelta(days=subscription_plan.days)
            profile.save()
            future_payment.save()


class CancelSubscription(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CardInfoSerializer
    lookup_field = "user"

    def get_object(self):
        return get_object_or_404(CardInfo, user=self.request.user)

    def destroy(self, request, *args, **kwargs):
        p = Profile.objects.get(user=self.request.user)
        p.is_subscribe = False
        p.save()
        allenroll = Enrollment.objects.all()
        userenroll = allenroll.filter(enrolluser=self.request.user)
        for drop in userenroll:
            if drop.enrollrecurrence.date >= datetime.now().date():
                drop.is_active = False
                drop.save()
                drop.enrollrecurrence.capacity = drop.enrollrecurrence.capacity + 1
                drop.enrollrecurrence.save()
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class FuturePaymentView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = FuturePaymentSerializer

    def get_object(self):
        return get_object_or_404(FuturePayment, user=self.request.user)
