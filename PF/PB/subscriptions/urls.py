from django.urls import path
from subscriptions.views import SubscribeView, PaymentHistoryView, CardInfoView, PlansView, CancelSubscription, FuturePaymentView

app_name = 'subscriptions'

urlpatterns = [
    path('subscribe/', SubscribeView.as_view()),
    path('paymentHistory/', PaymentHistoryView.as_view()),
    path('cardInfo/', CardInfoView.as_view()),
    path('plans/', PlansView.as_view()),
    path('cancel/', CancelSubscription.as_view()),
    path('futurePayment/', FuturePaymentView.as_view())
]
