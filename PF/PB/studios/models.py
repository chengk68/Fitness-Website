from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import CASCADE, PROTECT, DO_NOTHING
import re


# Create your models here.
class Studio(models.Model):
    name = models.CharField(max_length=64)
    address = models.CharField(max_length=64)
    lat = models.FloatField(verbose_name='Latitude')
    lon = models.FloatField(verbose_name='Longitude')
    postal_code = models.CharField(max_length=7)
    phone = models.CharField(max_length=20)

    def clean(self):
        if not re.match(r"^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$", str(self.postal_code)):
            raise ValidationError('Invalid Postal code')
        if not re.match(r"^(1-)?\d{3}-\d{3}-\d{4}$", str(self.phone)):
            raise ValidationError("Invalid phone")


class StudioImage(models.Model):
    image = models.ImageField(upload_to="PB/images/studios/")
    studio = models.ForeignKey(Studio, on_delete=CASCADE, related_name='images')

    def __str__(self):
        return self.image.url


class Amenity(models.Model):
    name = models.CharField(max_length=64)
    quantity = models.PositiveIntegerField()
    studio = models.ForeignKey(Studio, related_name='amenities', blank=True, null=True, on_delete=CASCADE)

    class Meta:
        verbose_name_plural = "amenities"

    def __str__(self):
        return f'{self.name}: {self.quantity}'
