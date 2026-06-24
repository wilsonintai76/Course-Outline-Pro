from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DepartmentViewSet, ProgrammeViewSet, CourseViewSet, SystemSettingViewSet

router = DefaultRouter()
router.register(r'settings', SystemSettingViewSet, basename='setting')
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'programmes', ProgrammeViewSet, basename='programme')
router.register(r'courses', CourseViewSet, basename='course')

urlpatterns = [
    path('', include(router.urls)),
]
