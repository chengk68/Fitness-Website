import datetime
import math

from django.contrib.auth.models import User
from django.db.models import F, ExpressionWrapper, FloatField, Count
from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from studios.serializers import StudioSerializer, StudioDetailSerializer, RecurrenceSerializer
from studios.models import Studio
from classes.models import Recurrence


class Paginator(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'

    def get_paginated_response(self, data):
        return Response({
            'num_pages': self.page.paginator.num_pages,
            'has_next': self.page.has_next(),
            'has_previous': self.page.has_previous(),
            'results': data
        })

# Create your views here.
class StudioScheduleList(generics.ListAPIView):
    queryset = Recurrence.objects.all()
    serializer_class = RecurrenceSerializer
    pagination_class = Paginator

    def list(self, request, *args, **kwargs):
        params = dict(request.GET)
        queryset = self.get_queryset().filter(
            targetclass__studio__id=kwargs['id']).filter(
            targetclass__cancel=False).filter(cancelled=False)
        for p in ['name', 'coach', 'start_date', 'end_date', 'start_time', 'end_time']:
            if p in params:
                if params[p][0] == '':
                    params.pop(p)

        paramnames = {'targetclass__' + p + '__in': params[p][0].split(',') for p in params if p in ['name', 'coach']}
        if paramnames:
            queryset = queryset.filter(**paramnames)

        if 'start_date' in params:
            startdate_s = params['start_date'][0].split('-')
            startdate = datetime.date(int(startdate_s[0]), int(startdate_s[1]), int(startdate_s[2]))
            queryset = queryset.filter(date__gte=startdate)

        if 'end_date' in params:
            enddate_s = params['end_date'][0].split('-')
            enddate = datetime.date(int(enddate_s[0]), int(enddate_s[1]), int(enddate_s[2]))
            queryset = queryset.filter(date__lte=enddate)

        if 'start_time' in params:
            time_s = params['start_time'][0].split(':')
            time = datetime.time(int(time_s[0]), int(time_s[1]))
            queryset = queryset.filter(targetclass__start__gte=time)

        if 'end_time' in params:
            time_s = params['end_time'][0].split(':')
            time = datetime.time(int(time_s[0]), int(time_s[1]))
            queryset = queryset.filter(targetclass__end__lte=time)

        queryset = queryset.filter(date__gte=datetime.datetime.today()).order_by('date', 'targetclass__start')

        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class StudioList(generics.ListAPIView):
    queryset = Studio.objects.all()
    serializer_class = StudioSerializer
    pagination_class = Paginator

    def list(self, request, *args, **kwargs):
        params = dict(request.GET)
        for p in ['loc', 'coach', 'class', 'amenities', 'name', 'address']:
            if p in params:
                if params[p][0] == '' or params[p][0] == '(,)':
                    params.pop(p)

        queryset = self.get_queryset()
        paramsnew = {p + '__contains': params[p][0] for p in params if p in ['name', 'address']}
        queries = []
        if 'coach' in params:
            coaches = {'classes__coach__in': params['coach'][0].split(',')}
            queryset_coach = queryset.filter(
                **coaches).alias(
                num_coach=Count('classes__coach')).filter(
                num_coach=len(coaches['classes__coach__in'])).all()
            queries.append(queryset_coach)

        if 'class' in params:
            classes = {'classes__name__in': params['class'][0].split(',')}
            queryset_class = queryset.filter(
                **classes).alias(
                num_c=Count('classes__name')).filter(
                num_c=len(classes['classes__name__in'])).all()
            queries.append(queryset_class)

        if 'amenities' in params:
            amenities = {'amenities__name__in': params['amenities'][0].split(',')}
            queryset_am = queryset.filter(
                **amenities).alias(num_am=Count('amenities')).filter(
                num_am=len(amenities['amenities__name__in'])).all()
            queries.append(queryset_am)

        try:
            location = params['loc'][0].strip('()').split(',')
            lat = float(location[0])
            long = float(location[1])
        except KeyError:
            lat = 0
            long = 0
        except ValueError:
            return Response(status=404)

        for q in queries:
            queryset = queryset.filter(id__in=q)
        queryset = queryset.filter(
            **paramsnew).alias(
            distance=ExpressionWrapper((F('lat') - lat) ** 2 + (F('lon') - long) ** 2,
                                       output_field=FloatField())).order_by('distance')
        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)


class StudioDetailsView(generics.RetrieveAPIView):
    serializer_class = StudioDetailSerializer

    def get_object(self):
        return get_object_or_404(Studio, id=self.kwargs['id'])
