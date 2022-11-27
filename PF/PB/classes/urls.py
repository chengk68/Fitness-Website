from classes.views import *
from django.urls import path

app_name = "classes"
urlpatterns = [
    path('<int:id>/enroll/',  EnrollView.as_view()),
    path('<int:id>/enrollall/', EnrollAll.as_view()),
    path('<int:id>/drop/',  DropView.as_view()),
    path('<int:id>/dropall/', DropAll.as_view()),
    path('myschedule/',  myschedule.as_view()),
    path('myhistory/', MyHistory.as_view()),


]
