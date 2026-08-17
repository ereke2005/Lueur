import os
from django.shortcuts import render

def home(request):
    context = {
        'project_id': os.getenv('PROJECT_ID', '6a82ce959aea688b4abdfd13')
    }
    return render(request, 'home.html', context)