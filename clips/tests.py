from django.contrib.auth.models import User
from .models import Clip
from rest_framework import status
from rest_framework.test import APITestCase

# Tests
class ClipListViewTest(APITestCase):
    def setUp(self):
        User.objects.create_user(username='thiago', password='Cuiaba1983')

    def test_can_list_clips(self):
        thiago = User.objects.get(username='thiago')
        Clip.objects.create(owner=thiago, caption='test caption')
        response = self.client.get('/clips/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        print(len(response.data))

    def test_logged_in_user_can_create_clip(self):
        self.client.login(username='thiago', password='Cuiaba1983')
        response = self.client.post('/clips/', {'caption': 'testing caption'})
        count = Clip.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_unauth_user_cannot_create_clip(self):
        response = self.client.post('/clips/', {'caption': 'testing caption'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class ClipDetailViewTests(APITestCase):
    def setUp(self):
        thiago = User.objects.create_user(username='thiago', password='Cuiaba1983')
        john = User.objects.create_user(username='john', password='London2007')
        Clip.objects.create(
            owner=thiago,
            caption='About Thiago', 
            topic='Thiago\'s content'
        )
        Clip.objects.create(
            owner=john,
            caption='About John', 
            topic='John\'s content'
        )
    
    def test_can_get_clip_by_id(self):
        response = self.client.get('/clips/1/')
        self.assertEqual(response.data['caption'], 'About Thiago')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_cannot_get_clip_by_invalid_id(self):
        response = self.client.get('/clips/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_auth_user_can_update_own_clip(self):
        self.client.login(username='thiago', password='Cuiaba1983')
        response = self.client.put('/clips/1/', {'caption': 'updating clip caption'})
        clip = Clip.objects.filter(id=1).first()
        self.assertEqual(clip.caption, 'updating clip caption')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
   
