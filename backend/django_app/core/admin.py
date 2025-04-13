from django.contrib import admin
from .models import Challenge, TestCase, Submission, EvaluationResult

class TestCaseInline(admin.TabularInline):
    model = TestCase
    extra = 1

@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    list_display = ('title', 'difficulty', 'created_at')
    inlines = [TestCaseInline]


@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('user', 'challenge', 'uuid', 'submitted_at', 'status')
    search_fields = ('uuid', 'user__username')


@admin.register(EvaluationResult)
class EvaluationResultAdmin(admin.ModelAdmin):
    list_display = ('submission', 'passed', 'score', 'evaluated_at')
    search_fields = ('submission__uuid',)
