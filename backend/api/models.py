from django.db import models

class About(models.Model):
    mission = models.TextField()
    vision = models.TextField()
    history = models.TextField()

    def __str__(self):
        return "About Us Page Content"

class TeamMember(models.Model):
    about = models.ForeignKey(About, related_name='team', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    bio = models.TextField()

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    icon = models.CharField(max_length=100, default='Cpu')

    def __str__(self):
        return self.title

class Capability(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    progress = models.IntegerField(default=80)

    def __str__(self):
        return self.title

class Project(models.Model):
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    client = models.CharField(max_length=255)
    year = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.name

class Career(models.Model):
    title = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    salary = models.CharField(max_length=100)
    description = models.TextField()
    requirements = models.TextField()

    def __str__(self):
        return self.title

class Inquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    resume = models.CharField(max_length=255, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Inquiry from {self.name} - {self.email}"

class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    content = models.TextField()
    rating = models.IntegerField(default=5)
    avatar = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return f"Testimonial from {self.name}"

class AdminCredential(models.Model):
    username = models.CharField(max_length=255, default='admin')
    password = models.CharField(max_length=255, default='admin')

    def __str__(self):
        return self.username

class OtpCode(models.Model):
    phone_number = models.CharField(max_length=20)
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"OTP {self.code} for {self.phone_number}"

