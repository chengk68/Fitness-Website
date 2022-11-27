from django.contrib import admin

# Register your models here.

from classes.models import *
from django.contrib import admin


class RecurrenceInline(admin.TabularInline):
    model = Recurrence
    min_num = 0
    extra = 0


class ClassAdmin(admin.ModelAdmin):
    model = Classes
    inlines = [RecurrenceInline]


class RecurrenceAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)


admin.site.register(Classes, ClassAdmin)
admin.site.register(Keyword)
admin.site.register(Recurrence, RecurrenceAdmin)
admin.site.register(Enrollment)
#class ClassAdmin(admin.ModelAdmin):
 #   def save_model(self, request, obj, form, change):

