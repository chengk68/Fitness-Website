from django.urls import path
from studios.views import StudioList, StudioDetailsView, StudioScheduleList

app_name = "studios"

urlpatterns = [
    path('all/', StudioList.as_view()),
    path('<id>/details/', StudioDetailsView.as_view()),
    path('<id>/schedule/', StudioScheduleList.as_view())
]
