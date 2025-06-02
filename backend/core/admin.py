from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from django.utils.html import format_html

User = get_user_model()

@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    # Display in the list view
    list_display = (
        'username', 
        'email', 
        'is_active', 
        'is_staff', 
        'is_superuser', 
        'last_login', 
        'date_joined',
        'email_link'
    )

    # Add clickable link to email
    def email_link(self, obj):
        return format_html('<a href="mailto:{}">{}</a>', obj.email, obj.email)
    email_link.short_description = 'Email (clickable)'

    # Enable filtering
    list_filter = ('is_active', 'is_staff', 'is_superuser')

    # Enable search
    search_fields = ('username', 'email')

    # Enable ordering
    ordering = ('-date_joined',)

    # Bulk actions
    actions = ['activate_users', 'deactivate_users', 'make_staff', 'remove_staff']

    # Fieldsets (grouped sections when viewing/editing a user)
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )

    # Fields to use when creating a new user
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )

    # Custom bulk actions
    def activate_users(self, request, queryset):
        updated = queryset.update(is_active=True)
        self.message_user(request, f"{updated} user(s) activated.")
    activate_users.short_description = "Activate selected users"

    def deactivate_users(self, request, queryset):
        updated = queryset.update(is_active=False)
        self.message_user(request, f"{updated} user(s) deactivated.")
    deactivate_users.short_description = "Deactivate selected users"

    def make_staff(self, request, queryset):
        updated = queryset.update(is_staff=True)
        self.message_user(request, f"{updated} user(s) granted staff status.")
    make_staff.short_description = "Make selected users staff"

    def remove_staff(self, request, queryset):
        updated = queryset.update(is_staff=False)
        self.message_user(request, f"{updated} user(s) removed from staff.")
    remove_staff.short_description = "Remove selected users from staff"
