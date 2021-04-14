from django.contrib import admin
from .models import CustomUser,OTPVerifiaction
class OTPVerifiactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'phone_number', 'otp', 'is_verfied')


admin.site.register(CustomUser)

admin.site.register(OTPVerifiaction, OTPVerifiactionAdmin)
