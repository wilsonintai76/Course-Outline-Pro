from rest_framework import generics, permissions, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import Permission
from .serializers import UserSerializer
from .models import CustomUser

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

class ProfileView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        # Include permissions
        data = serializer.data
        data['permissions'] = [p.codename for p in request.user.user_permissions.all()]
        data['is_superuser'] = request.user.is_superuser
        return Response(data)

    def put(self, request):
        user = request.user
        if 'username' in request.data:
            user.username = request.data['username']
        if 'email' in request.data:
            user.email = request.data['email']
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] # Simplified for now

    def list(self, request, *args, **kwargs):
        users = self.get_queryset()
        data = []
        for user in users:
            s_data = self.get_serializer(user).data
            s_data['permissions'] = [p.codename for p in user.user_permissions.all()]
            data.append(s_data)
        return Response(data)

    def update(self, request, *args, **kwargs):
        user = self.get_object()
        
        # PBAC: update permissions
        if 'permissions' in request.data:
            perms_codenames = request.data['permissions']
            perms = Permission.objects.filter(codename__in=perms_codenames)
            user.user_permissions.set(perms)

        # Standard update
        response = super().update(request, *args, **kwargs)
        response.data['permissions'] = [p.codename for p in user.user_permissions.all()]
        return response
