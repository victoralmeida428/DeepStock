from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
import string
import numpy as np 

class APISendCode(APIView):

    def post(self, form, *args, **kargs):
        email = form.data.get('email')
        user = form.data.get('username')
        
        letters = string.ascii_uppercase
        number = np.random.randint(1000,9999)
        code_letter = ''.join(np.random.choice(list(letters), 3))
        form.data['code']=f'{code_letter}-{number}'
        print(form.data)
        send_mail('Account Verifier', f'Hello {user}, your Code is: {code_letter}-{number}', 'suport.deepstock@gmail.com', recipient_list=[email])
        return Response(form.data)
