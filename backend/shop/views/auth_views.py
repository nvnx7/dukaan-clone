from rest_framework.authtoken.models import Token
from ..serializers.auth_serializers import RegisterSerializer, LoginSerializer
from ..models.auth import User

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


class SignUpView(APIView):

    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token = serializer.get_auth_token()
            serializer.validated_data.pop('password')

            response = {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': user.phone,
                'date_joined': user.date_joined,
                'token': token
            }

            return Response(response, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self, request, format=None):
        # Create token & save
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            # Generate a new token and return in response
            serializer.validated_data.pop('password')

            user = User.objects.get(
                phone=serializer.validated_data.get('phone'))
            token = serializer.get_auth_token()
            response = {
                'id': user.id,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'phone': user.phone,
                'date_joined': user.date_joined,
                'token': token
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, format=None):
        # Delete the token related to User session
        request.user.auth_token_delete()
        return Response("logged out!", status=status.HTTP_200_OK)
