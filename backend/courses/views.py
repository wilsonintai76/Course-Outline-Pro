from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import DjangoModelPermissions, IsAuthenticated
from .models import Department, Programme, Course, CourseOutline, CQI, JSU, SystemSetting
from .serializers import (
    DepartmentSerializer, ProgrammeSerializer, CourseSerializer, 
    CourseOutlineSerializer, CQISerializer, JSUSerializer, SystemSettingSerializer
)

class SystemSettingViewSet(viewsets.ModelViewSet):
    serializer_class = SystemSettingSerializer
    queryset = SystemSetting.objects.all()

    # Allow any authenticated user to view settings, but restrict updates
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        return [DjangoModelPermissions()]

    # Ensure singleton pattern by always returning the first setting
    def list(self, request, *args, **kwargs):
        setting, _ = SystemSetting.objects.get_or_create(id=1)
        serializer = self.get_serializer(setting)
        return Response([serializer.data])

class DepartmentViewSet(viewsets.ModelViewSet):
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated] # We will simplify permissions here for now, enforcing logic later if needed
    
    def get_queryset(self):
        return Department.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ProgrammeViewSet(viewsets.ModelViewSet):
    serializer_class = ProgrammeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Programme.objects.all()

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Course.objects.all()

    def perform_create(self, serializer):
        coordinator = serializer.validated_data.get('coordinator', None)
        if not coordinator:
            coordinator = self.request.user
        serializer.save(author=self.request.user, coordinator=coordinator)

    def _get_document(self, request, model, serializer_class, related_name):
        course = self.get_object()
        doc, created = model.objects.get_or_create(course=course)
        
        if request.method == 'GET':
            serializer = serializer_class(doc)
            return Response(serializer.data)
            
        elif request.method in ['PUT', 'PATCH']:
            serializer = serializer_class(doc, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get', 'put', 'patch'])
    def outline(self, request, pk=None):
        return self._get_document(request, CourseOutline, CourseOutlineSerializer, 'outline')

    @action(detail=True, methods=['get', 'put', 'patch'])
    def cqi(self, request, pk=None):
        return self._get_document(request, CQI, CQISerializer, 'cqi')

    @action(detail=True, methods=['get', 'put', 'patch'])
    def jsu(self, request, pk=None):
        return self._get_document(request, JSU, JSUSerializer, 'jsu')
