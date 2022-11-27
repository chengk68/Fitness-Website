from rest_framework import serializers
from django.contrib.auth.models import User
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from accounts.models import Profile


class SignupSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField()
    phone = serializers.CharField()

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'avatar', 'phone', 'username', 'password']

    def validate(self, args):
        username = args.get('username', None)
        email = args.get('email', None)
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({'username': 'username already exists'})
        try:
            validate_email(email)
        except ValidationError:
            raise serializers.ValidationError({'email': 'email is invalid'})

        return super().validate(args)

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'],
                                        first_name=validated_data['first_name'], email=validated_data['email'],
                                        last_name=validated_data['last_name'])
        Profile.objects.create(user=user, avatar=validated_data['avatar'], phone=validated_data['phone'])
        return validated_data


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email', 'username', 'password']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'avatar', 'phone']

    def update(self, instance, validated_data):
        if validated_data.get('user'):
            user_data = validated_data.pop('user')
            user_serializer = UserSerializer()
            super(UserSerializer, user_serializer).update(instance.user, user_data)

        super(self.__class__, self).update(instance, validated_data)
        return instance
