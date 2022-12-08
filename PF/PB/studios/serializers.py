from rest_framework import serializers

from studios.models import Studio
from classes.models import Recurrence, Keyword, Classes


class ClassesSerializer(serializers.ModelSerializer):
    class_name = serializers.CharField(source='name')

    class Meta:
        model = Classes
        fields = ['id', 'class_name']

class ClassesDetailedSerializer(serializers.ModelSerializer):
    class_id = serializers.CharField(source='id')
    class_name = serializers.CharField(source='name')
    keyword = serializers.StringRelatedField(many=True)
    max_capacity = serializers.CharField(source='capacity')
    start_time = serializers.CharField(source='start')
    end_time = serializers.CharField(source='end')

    class Meta:
        model = Classes
        fields = ['class_id', 'class_name', 'description', 'keyword', 'max_capacity', 'start_time', 'end_time', 'coach']

class StudioDetailSerializer(serializers.ModelSerializer):
    images = serializers.StringRelatedField(many=True)
    location = serializers.SerializerMethodField()
    amenities = serializers.StringRelatedField(many=True)
    classes = ClassesDetailedSerializer(many=True)

    class Meta:
        model = Studio
        fields = ['name', 'address', 'location', 'postal_code', 'phone', 'images', 'amenities', 'classes']

    def get_location(self, obj):
        return f"({obj.lat}, {obj.lon})"


class StudioSerializer(serializers.ModelSerializer):
    location = serializers.SerializerMethodField()

    class Meta:
        model = Studio
        fields = ['id', 'name', 'location', 'address']

    def get_location(self, obj):
        return f"({obj.lat}, {obj.lon})"


class KeywordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Keyword
        fields = ['keywords']

class RecurrenceSerializer(serializers.ModelSerializer):
    targetclass = ClassesDetailedSerializer()

    class Meta:
        model = Recurrence
        fields = ['id', 'date', 'capacity', 'targetclass']

