from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from accounts.serializers import SignupSerializer, ProfileSerializer, UserSerializer
from accounts.models import Profile
from rest_framework.permissions import IsAuthenticated


# Create your views here.
class SignupView(generics.GenericAPIView):
    serializer_class = SignupSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "Message": "User created successfully",
                "User": serializer.data
            }, status=status.HTTP_201_CREATED)

        return Response({"Errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(generics.RetrieveAPIView, generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer

    def get_object(self):
        user = User.objects.get(id=self.request.user.id)
        return get_object_or_404(Profile, user=user)


