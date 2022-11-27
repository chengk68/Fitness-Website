from django.db import models


# Create your models here.
class Location(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()

    def __str__(self):
        return f'({self.latitude}, {self.longitude})'

    def __unicode__(self):
        return str(self)
