from django.db import models
from django.contrib.auth.models import User

class Challenge(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    difficulty = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class TestCase(models.Model):
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE, related_name='test_cases')
    input_data = models.TextField()
    expected_output = models.TextField()

    def __str__(self):
        return f"TestCase for {self.challenge.title}"


class Submission(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    challenge = models.ForeignKey(Challenge, on_delete=models.CASCADE)
    submitted_code = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)
    uuid = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=50, default='Pending')  # e.g., Pending, Success, Failed

    def __str__(self):
        return f"{self.user.username} - {self.challenge.title}"


class EvaluationResult(models.Model):
    submission = models.OneToOneField(Submission, on_delete=models.CASCADE)
    passed = models.BooleanField()
    score = models.IntegerField()
    feedback = models.TextField(blank=True, null=True)
    evaluated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Result for {self.submission}"

