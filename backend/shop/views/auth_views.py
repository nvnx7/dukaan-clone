from rest_framework.authtoken.models import Token
from ..serializers.auth_serializers import RegisterSerializer, LoginSerializer
from ..models.auth import User

from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication

from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


class SignUpView(APIView):
    def get(self, request, format=None):
        return Response('SignUp GET')

    def post(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            serializer.validated_data.pop('password')
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def get(self, request, format=None):
        return Response('Login GET')

    def post(self, request, format=None):
        # Create token & save
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            # Generate a new token and return in response
            user = User.objects.get(phone=serializer.data.get('phone'))
            token = serializer.get_auth_token(user)
            return Response({'token': token}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, format=None):
        # Delete the token related to User session
        request.user.auth_token_delete()
        return Response("logged out!", status=status.HTTP_200_OK)


# class LockedView(APIView):
#     permission_classes = [IsAuthenticatedOrReadOnly]
#     authentication_classes = [TokenAuthentication]

#     def get(self, request, format=None):
#         print(request.headers['Authorization'])
#         print(request.auth)
#         print(request.user.auth_token)
#         return Response('GET locked view')

#     def post(self, request, format=None):
#         print(type(request.user))
#         print(request.user.id)
#         print(request.user.first_name)
#         print(request.user.phone)
#         return Response("POST locked view")
