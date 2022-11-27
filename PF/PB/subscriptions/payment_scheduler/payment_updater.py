from apscheduler.schedulers.background import BackgroundScheduler
from subscriptions.views import check_subscribe


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(check_subscribe, "interval", days=1, id="payment_001", replace_existing=True)
    scheduler.start()
