from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET'])
def api_root(request, format=None):
    return Response('<h1>Hello!</h1>', status=status.HTTP_200_OK)
