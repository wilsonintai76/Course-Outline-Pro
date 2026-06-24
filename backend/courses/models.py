from django.db import models
from django.conf import settings

class SystemSetting(models.Model):
    institution_name = models.CharField(max_length=255, default="Politeknik Malaysia")
    logo_url = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "System Setting"
        verbose_name_plural = "System Settings"

    def __str__(self):
        return self.institution_name

class Department(models.Model):
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='departments')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        permissions = [
            ("can_manage_departments", "Can manage departments"),
        ]

    def __str__(self):
        return f"{self.code} - {self.name}"

class Programme(models.Model):
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='programmes')
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='programmes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        permissions = [
            ("can_manage_programmes", "Can manage programmes"),
        ]

    def __str__(self):
        return f"{self.code} - {self.name}"

class Course(models.Model):
    programme = models.ForeignKey(Programme, on_delete=models.CASCADE, related_name='courses')
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='courses_created')
    coordinator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='coordinated_courses')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        permissions = [
            ("can_manage_courses", "Can manage courses"),
        ]

    def __str__(self):
        return f"{self.code} - {self.name}"

class CourseOutline(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE, related_name='outline')
    content = models.JSONField(default=dict, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Outline for {self.course.name}"

class CQI(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE, related_name='cqi')
    content = models.JSONField(default=dict, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"CQI for {self.course.name}"

class JSU(models.Model):
    course = models.OneToOneField(Course, on_delete=models.CASCADE, related_name='jsu')
    content = models.JSONField(default=dict, blank=True)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"JSU for {self.course.name}"
