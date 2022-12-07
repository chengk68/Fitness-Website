import django
from django.db import models
from django.contrib.postgres.fields import ArrayField
from recurrence.fields import *
from django.db.models import *
from django.core.signals import request_finished
from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save
from datetime import *
from accounts.models import *
from studios.models import *


# Create your models here.

class Keyword(models.Model):
    keywords = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.keywords}"


class Classes(models.Model):
    name = models.CharField(max_length=200, null=False)
    description = models.TextField()
    coach = models.CharField(max_length=200, null=False)
    keyword = models.ManyToManyField(Keyword, blank=True)
    capacity = models.PositiveIntegerField(default=0)
    start = models.TimeField(auto_now=False, auto_now_add=False)
    end = models.TimeField(auto_now=False, auto_now_add=False)
    startdate = models.DateField(default=django.utils.timezone.now)
    enddate = models.DateField(auto_now=False)
    studio = models.ForeignKey(Studio, on_delete=CASCADE, related_name='classes', null=True)
    cancel = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"

    def showKeyword(self):
        return ', '.join([k.keywords for k in self.keyword.all()])

    class Meta:
        verbose_name_plural = "classes"


class Recurrence(models.Model):
    capacity = models.PositiveIntegerField(default=0)
    date = models.DateField()
    targetclass = models.ForeignKey(to=Classes, on_delete=CASCADE, related_name='targetclass')
    cancelled = models.BooleanField(default=False)

    def __str__(self):
        this_id = str(self.id)
        this_date = str(self.date)
        return f"id: {this_id} class: {self.targetclass} date:{this_date}"


@receiver(pre_save, sender=Classes)
def class_change(sender, instance: Classes, **kwargs):
    if Classes.objects.filter(id=instance.id).exists():

        previous = Classes.objects.get(id=instance.id)
        if previous.startdate != instance.startdate:
            diff = instance.startdate - previous.startdate
            allrecurrence = Recurrence.objects.filter(targetclass=instance)
            for r in allrecurrence:
                r.date = r.date + diff
                if r.date > instance.enddate:
                    r.cancelled = True
                r.save()
        if previous.enddate != instance.enddate:
            allrecurrence = Recurrence.objects.filter(targetclass=instance)
            if instance.enddate < previous.enddate:
                for r in allrecurrence:
                    if r.date > instance.enddate:
                        r.cancelled = True
                        r.save()
            else:
                length = len(allrecurrence)
                date = allrecurrence[length - 1].date
                date = date + timedelta(days=7)
                while date <= instance.enddate:
                    Recurrence.objects.create(capacity=instance.capacity, date=date, targetclass=instance)
                    date = date + timedelta(days=7)
        if previous.capacity != instance.capacity:
            diff = instance.capacity - previous.capacity
            allrecurrence = Recurrence.objects.filter(targetclass=instance)
            for r in allrecurrence:
                r.capacity = r.capacity + diff
                if r.capacity < 0:
                    r.capacity = 0
                r.save()
        if instance.cancel:
            allrecurrence = Recurrence.objects.filter(targetclass=instance)
            for r in allrecurrence:
                r.cancelled = True
                r.save()


@receiver(post_save, sender=Classes)
def create_recurrence(sender, instance, created, **kwargs):
    if created:
        date = instance.startdate
        dateend = instance.enddate
        while date <= dateend:
            Recurrence.objects.create(capacity=instance.capacity, date=date, targetclass=instance)
            date = date + timedelta(days=7)


class Enrollment(models.Model):
    enrolluser = models.ForeignKey(to=User, on_delete=CASCADE, related_name='enrolluser', null=True)
    enrollrecurrence = models.ForeignKey(to=Recurrence, on_delete=CASCADE, related_name='enrollrecurrence')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.enrolluser} Enrolled in {self.enrollrecurrence}"


class CustomSchedule(models.Model):
    customid = models.CharField(max_length=200, null=True)
    customname = models.CharField(max_length=200, null=True)
    customstart = models.CharField(max_length=200, null=True)
    customend = models.CharField(max_length=200, null=True)
    customisactive = models.CharField(max_length=200, null=True)
    customstatus = models.CharField(max_length=200, null=True)
    customclass = models.CharField(max_length=200, null=True)


class CustomEnrollDrop(models.Model):
    cid = models.CharField(max_length=200, null=True)
    cname = models.CharField(max_length=200, null=True)
    ctime = models.CharField(max_length=200, null=True)
