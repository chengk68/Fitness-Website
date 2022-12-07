from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from accounts.models import *
from classes.models import *




class CustomScheduleSerializer(serializers.ModelSerializer):
    recurrence_id = serializers.CharField(source='customid')
    class_name = serializers.CharField(source='customname')
    starttime = serializers.CharField(source='customstart')
    endtime = serializers.CharField(source='customend')
    is_active = serializers.CharField(source='customisactive')
    status = serializers.CharField(source='customstatus')
    class_id = serializers.CharField(source='customclass')

    class Meta:
        model = CustomSchedule
        fields = ['recurrence_id', 'class_name', 'starttime', 'endtime', 'is_active', 'status', 'class_id']

class CustomEnrollDropSerializer(serializers.ModelSerializer):
    recurrence_id = serializers.CharField(source='cid')
    class_name = serializers.CharField(source='cname')
    time = serializers.CharField(source='ctime')

    class Meta:
        model = CustomEnrollDrop
        fields = ['recurrence_id', 'class_name', 'time']
