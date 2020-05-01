import logging
import json

from django.shortcuts import render
from django.http import HttpResponse

def load_content():
    with open('Session/content.json') as f:
        return json.load(f)

content = load_content()


def home(request):
    return render(request, 'Session/home.html')
