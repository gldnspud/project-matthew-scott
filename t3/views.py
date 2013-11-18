from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from rest_framework.authtoken.models import Token


def index(request):
    return render(request, 'index.html')


@login_required
def profile(request):
    token, created = Token.objects.get_or_create(user=request.user)
    return render(request, 'account/profile.html', {
        'token': token,
    })
