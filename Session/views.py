import json

from django.shortcuts import render
from django.http import HttpResponse


def load_content():
    with open('Session/content.json') as f:
        return json.load(f)


def home(request):
    content = load_content()
    return render(request, 'Session/home.html', content)
