from django.apps import AppConfig


class SubscriptionsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'subscriptions'

    def ready(self):
        print("starting scheduler")
        from subscriptions.payment_scheduler import payment_updater
        payment_updater.start()
