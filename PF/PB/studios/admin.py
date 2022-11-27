from django.contrib import admin
from studios.models import Studio, StudioImage, Amenity
from classes.models import Classes


class AmenityInline(admin.TabularInline):
    model = Amenity
    min_num = 0
    extra = 0


class StudioImageInline(admin.TabularInline):
    model = StudioImage
    min_num = 0
    extra = 0


class ClassInline(admin.TabularInline):
    model = Classes
    min_num = 0
    extra = 0


class StudioAdmin(admin.ModelAdmin):
    model = Studio
    inlines = [AmenityInline, StudioImageInline, ClassInline]


admin.site.register(Studio, StudioAdmin)
admin.site.register(StudioImage)
admin.site.register(Amenity)
# Register your models here.
