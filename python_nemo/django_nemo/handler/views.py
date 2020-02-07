from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from . import models
import json
import socketio
# Create your views here.

sio = socketio.Client()
sio.connect('http://localhost:4444')
#sio.wait()

@sio.on("post_in_express")
def message_handler(msg):
	print('inside socketio event receiver function')
	print(msg)


def home_view(request,*args,**kwargs):
	return render(request,"home.html",{})

@require_http_methods(['GET'])
def viewer(request,*args,**kwargs):

	context= models.Test_model.objects.values('name','action','message')

	#there is a posible bug when no data in database

	if context is None:
		context = {"name":"Aun no hay data",
		"action":"Aun no hay data",
		"message":"aun no hay data"}

	return render(request,'viewer.html',{'context':context})
