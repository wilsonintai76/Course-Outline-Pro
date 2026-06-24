from rest_framework import serializers
from .models import Department, Programme, Course, CourseOutline, CQI, JSU, SystemSetting

class SystemSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemSetting
        fields = ['id', 'institution_name', 'logo_url']

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'name', 'code', 'created_at']

class ProgrammeSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = Programme
        fields = ['id', 'department', 'department_name', 'name', 'code', 'created_at']

class CourseOutlineSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseOutline
        fields = ['id', 'content', 'last_updated']

class CQISerializer(serializers.ModelSerializer):
    class Meta:
        model = CQI
        fields = ['id', 'content', 'last_updated']

class JSUSerializer(serializers.ModelSerializer):
    class Meta:
        model = JSU
        fields = ['id', 'content', 'last_updated']

class CourseSerializer(serializers.ModelSerializer):
    programme_name = serializers.CharField(source='programme.name', read_only=True)
    coordinator_name = serializers.CharField(source='coordinator.username', read_only=True)
    outline_id = serializers.IntegerField(source='outline.id', read_only=True)
    cqi_id = serializers.IntegerField(source='cqi.id', read_only=True)
    jsu_id = serializers.IntegerField(source='jsu.id', read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'programme', 'programme_name', 'name', 'code', 'coordinator', 'coordinator_name', 'created_at', 'outline_id', 'cqi_id', 'jsu_id']
