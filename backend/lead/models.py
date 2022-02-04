from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Developer Profile
class Developer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    name = models.CharField(max_length=30, null=False, blank=False)
    email = models.EmailField(max_length=50, null=False, blank=False)
    phone = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return self.name


# Lead
class Lead(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    title = models.CharField(max_length=300, null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    clientName = models.CharField(max_length=20, null=False, blank=False)
    clientEmail = models.EmailField(max_length=30, null=True, blank=True)
    clientPhone = models.CharField(max_length=20, null=True, blank=True)
    developers = models.ManyToManyField(Developer, blank=True)

    def __str__(self):
        return self.title

    def allDevelopers(self):
        return [developer.name for developer in self.developers.all()]
