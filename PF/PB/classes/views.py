from django.contrib.auth.models import User
from rest_framework import *
from rest_framework.response import *
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from classes.models import *
from classes.serializers import *
from rest_framework.views import APIView
from studios.models import *
from datetime import *
from rest_framework.pagination import PageNumberPagination


class Paginator(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'page_size'


class EnrollView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        if not Recurrence.objects.filter(id=kwargs['id']).exists():
            return Response({"Message": "Recurrence not found!! Please try another timeslot!"},
                            status=status.HTTP_404_NOT_FOUND)
        if Profile.objects.get(user=request.user).is_subscribe == False:
            return Response({"Message": "You do not have active subscription!!"}, status=status.HTTP_403_FORBIDDEN)
        recurrence = Recurrence.objects.get(id=kwargs['id'])

        datenow = datetime.now().date()
        timenow = datetime.now().time()
        classes = recurrence.targetclass
        starttime = classes.start
        startt = datetime.combine(recurrence.date, recurrence.targetclass.start)
        endt = datetime.combine(recurrence.date, recurrence.targetclass.end)
        combine = str(startt) + " - " + str(endt)
        success = {}
        if recurrence.capacity > 0 and recurrence.date >= datenow and not recurrence.cancelled:
            if (recurrence.date == datenow and starttime < timenow):
                pass
            elif Enrollment.objects.filter(enrolluser=request.user, enrollrecurrence=recurrence).exists():
                if Enrollment.objects.get(enrolluser=request.user, enrollrecurrence=recurrence).is_active:
                    return Response({"Message": "You already enrolled in this class!!"}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    update = Enrollment.objects.get(enrolluser=request.user, enrollrecurrence=recurrence)
                    update.is_active = True
                    recurrence.capacity = recurrence.capacity - 1
                    recurrence.save()
                    update.save()
                    enroll = {}
                    enroll['ID'] = recurrence.id
                    enroll['Class Name'] = classes.name
                    enroll['Time'] = combine
                    success['Detail'] = enroll
                    return Response(success)
            else:
                Enrollment.objects.create(enrolluser=request.user, enrollrecurrence=recurrence)
                recurrence.capacity = recurrence.capacity - 1
                recurrence.save()
                enroll = {}
                enroll['ID'] = recurrence.id
                enroll['Class Name'] = classes.name
                enroll['Time'] = combine
                success['Detail'] = enroll
                return Response(success)
        return Response({"Message": "Enroll failed! Please try another date."}, status=status.HTTP_400_BAD_REQUEST)


class EnrollAll(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = Paginator
    serializer_class = CustomEnrollDropSerializer

    def post(self, request, *args, **kwargs):

        if not Classes.objects.filter(id=kwargs['id']).exists():
            return Response({"Message": "Class not found!! Please try another class!"},
                            status=status.HTTP_404_NOT_FOUND)
        if Profile.objects.get(user=request.user).is_subscribe == False:
            return Response({"Message": "You do not have active subscription!!"}, status=status.HTTP_403_FORBIDDEN)
        wantclass = Classes.objects.get(id=kwargs['id'])
        recurrence = Recurrence.objects.filter(targetclass=wantclass)

        canenroll = False
        for r in recurrence:
            classname = r.targetclass.name
            starttime = datetime.combine(r.date, r.targetclass.start)
            endtime = datetime.combine(r.date, r.targetclass.end)
            combine = str(starttime) + " - " + str(endtime)

            if Enrollment.objects.filter(enrolluser=request.user, enrollrecurrence=r).exists():
                enrollment = Enrollment.objects.get(enrolluser=request.user, enrollrecurrence=r)
                if enrollment.is_active or enrollment.enrollrecurrence.cancelled:
                    pass
                else:
                    enrollment.is_active = True
                    enrollment.save()
                    enrollment.enrollrecurrence.capacity = enrollment.enrollrecurrence.capacity - 1
                    enrollment.enrollrecurrence.save()
                    CustomEnrollDrop.objects.create(cid=str(r.id), cname=classname, ctime=combine)
                    canenroll = True

            else:
                Enrollment.objects.create(enrolluser=request.user, enrollrecurrence=r)
                r.capacity = r.capacity - 1
                r.save()
                canenroll = True

        queryset = CustomEnrollDrop.objects.all()
        queryset = queryset.order_by('id')

        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        CustomEnrollDrop.objects.all().delete()

        if not canenroll:
            return Response({'Message: ': 'You already enrolled in all the valid occurence in this class'}, status=status.HTTP_400_BAD_REQUEST)
        return self.get_paginated_response(serializer.data)


class DropView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):

        if Profile.objects.get(user=request.user).is_subscribe == False:
            return Response({"Message": "You do not have active subscription!!"}, status=status.HTTP_403_FORBIDDEN)

        if Recurrence.objects.filter(id=kwargs['id']).exists():
            deleteclass = Recurrence.objects.get(id=kwargs['id'])

            datenow = datetime.now()
            classes = deleteclass.targetclass
            starttime = classes.start
            classname = deleteclass.targetclass.name
            startt = datetime.combine(deleteclass.date, deleteclass.targetclass.start)
            endt = datetime.combine(deleteclass.date, deleteclass.targetclass.end)
            combine = str(startt) + " - " + str(endt)
            success = {}
            if deleteclass.date < datenow.date() or (
                    deleteclass.date == datenow.date() and deleteclass.targetclass.start < datenow.time()):
                return Response({"Message": "Drop failed!! Please drop future classes"})

            if Enrollment.objects.filter(enrolluser=request.user).exists():
                allenroll = Enrollment.objects.all()
                userenroll = allenroll.filter(enrolluser=request.user)

                if userenroll.filter(enrollrecurrence=deleteclass).exists():
                    drop = Enrollment.objects.get(enrolluser=request.user, enrollrecurrence=deleteclass)
                    if not drop.is_active:
                        return Response({"Message": "You already dropped this class!!"})
                    drop.is_active = False
                    drop.save()
                    deleteclass.capacity = deleteclass.capacity + 1
                    deleteclass.save()
                    drop = {}
                    drop['ID'] = deleteclass.id
                    drop['Class Name'] = classes.name
                    drop['Time'] = combine
                    success['Detail'] = drop
                    return Response(success)

        return Response({"Message": "Drop failed! Please try another class"}, status=status.HTTP_400_BAD_REQUEST)


class DropAll(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = Paginator
    serializer_class = CustomEnrollDropSerializer

    def post(self, request, *args, **kwargs):

        if Profile.objects.get(user=request.user).is_subscribe == False:
            return Response({"Message": "You do not have active subscription!!"}, status=status.HTTP_403_FORBIDDEN)
        if not Classes.objects.filter(id=kwargs['id']).exists():
            return Response({"Message": "There is no such class!! Please try other class"},
                            status=status.HTTP_404_NOT_FOUND)

        wantclass = Classes.objects.get(id=kwargs['id'])
        recurrence = Recurrence.objects.filter(targetclass=wantclass)
        datenow = datetime.now()
        candrop = False
        for r in recurrence:
            classname = r.targetclass.name
            starttime = datetime.combine(r.date, r.targetclass.start)
            endtime = datetime.combine(r.date, r.targetclass.end)
            combine = str(starttime) + " - " + str(endtime)

            if Enrollment.objects.filter(enrolluser=request.user, enrollrecurrence=r).exists():
                if r.date > datenow.date() or (r.date == datenow.date() and r.targetclass.start >= datenow.time()):

                    drop = Enrollment.objects.get(enrolluser=request.user, enrollrecurrence=r)
                    if drop.is_active:
                        drop.is_active = False
                        drop.save()
                        r.capacity = r.capacity + 1
                        r.save()
                        CustomEnrollDrop.objects.create(cid=str(r.id), cname=classname, ctime=combine)
                        candrop = True

        queryset = CustomEnrollDrop.objects.all()
        queryset = queryset.order_by('id')

        page = self.paginate_queryset(queryset)
        serializer = self.get_serializer(page, many=True)
        CustomEnrollDrop.objects.all().delete()

        if not candrop:
            return Response({'Message: ': 'You already dropped in all the valid occurence in this class'})
        return self.get_paginated_response(serializer.data)


class myschedule(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = Paginator
    serializer_class = CustomScheduleSerializer

    def get(self, request):
        if Profile.objects.get(user=request.user).is_subscribe == False:
            return Response({"Message": "You do not have active subscription!!"}, status=status.HTTP_403_FORBIDDEN)
        if Enrollment.objects.filter(enrolluser=request.user).exists():
            allenroll = Enrollment.objects.all()
            userenroll = allenroll.filter(enrolluser=request.user).order_by('enrollrecurrence__date')

            datenow = datetime.now()
            for user in userenroll:

                if datenow.date() <= user.enrollrecurrence.date:
                    if (
                            datenow.date() == user.enrollrecurrence.date and datenow.time() > user.enrollrecurrence.targetclass.start) or not user.is_active:
                        pass
                    else:
                        classname = user.enrollrecurrence.targetclass.name
                        starttime = datetime.combine(user.enrollrecurrence.date,
                                                     user.enrollrecurrence.targetclass.start)
                        endtime = datetime.combine(user.enrollrecurrence.date, user.enrollrecurrence.targetclass.end)
                        combine = str(starttime) + " - " + str(endtime)

                        active = ""
                        if user.is_active:
                            active = "Enrolled"
                        else:
                            active = "Dropped"
                        iscancel = ""
                        if user.enrollrecurrence.cancelled:
                            iscancel = "Cancelled"
                        else:
                            iscancel = "Ongoing"

                        CustomSchedule.objects.create(customid=str(user.enrollrecurrence.id), customname=classname, customstart=starttime, customend=endtime
                                                    , customisactive=active, customstatus=iscancel, customclass=user.enrollrecurrence.targetclass.id)

            queryset = CustomSchedule.objects.all()
            queryset = queryset.order_by('id')
            page = self.paginate_queryset(queryset)
            serializer = self.get_serializer(page, many=True)
            CustomSchedule.objects.all().delete()

            return self.get_paginated_response(serializer.data)

        return Response({"Message": " Checking schedule failed!"}, status=status.HTTP_404_NOT_FOUND)


class MyHistory(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    pagination_class = Paginator
    serializer_class = CustomScheduleSerializer

    def get(self, request):

        if Enrollment.objects.filter(enrolluser=request.user).exists():
            allenroll = Enrollment.objects.all()
            userenroll = allenroll.filter(enrolluser=request.user).order_by('enrollrecurrence__date')

            schedule = []
            allschedule = {}
            datenow = datetime.now()
            for user in userenroll:

                if datenow.date() >= user.enrollrecurrence.date:
                    if datenow.date() == user.enrollrecurrence.date and datenow.time() <= user.enrollrecurrence.targetclass.start:
                        pass
                    else:
                        classname = user.enrollrecurrence.targetclass.name
                        starttime = datetime.combine(user.enrollrecurrence.date,
                                                     user.enrollrecurrence.targetclass.start)
                        endtime = datetime.combine(user.enrollrecurrence.date, user.enrollrecurrence.targetclass.end)
                        combine = str(starttime) + " - " + str(endtime)

                        active = ""
                        if user.is_active:
                            active = "Enrolled"
                        else:
                            active = "Dropped"

                        iscancel = ""
                        if user.enrollrecurrence.cancelled:
                            iscancel = "Cancelled"
                        else:
                            iscancel = "Ongoing"

                        CustomSchedule.objects.create(customid=str(user.enrollrecurrence.id), customname=classname, customstart=starttime, customend=endtime
                                                    , customisactive=active, customstatus=iscancel)

            queryset = CustomSchedule.objects.all()
            queryset = queryset.order_by('id')
            page = self.paginate_queryset(queryset)
            serializer = self.get_serializer(page, many=True)
            CustomSchedule.objects.all().delete()

            return self.get_paginated_response(serializer.data)

        return Response({"Message": " Checking schedule failed!"}, status=status.HTTP_404_NOT_FOUND)
