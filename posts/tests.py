from django.contrib.auth.models import User
from .models import Post
from rest_framework import status
from rest_framework.test import APITestCase

# Tests
class PostListViewTest(APITestCase):
    def setUp(self):
        User.objects.create_user(username='thiago', password='Cuiaba1983')

    def test_can_list_posts(self):
        thiago = User.objects.get(username='thiago')
        Post.objects.create(owner=thiago, title='test title')
        response = self.client.get('/posts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print(response.data)
        print(len(response.data))

    def test_logged_in_user_can_create_post(self):
        self.client.login(username='thiago', password='Cuiaba1983')
        response = self.client.post('/posts/', {'title': 'testing title'})
        count = Post.objects.count()
        self.assertEqual(count, 1)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    
    def test_unauth_user_cannot_create_post(self):
        response = self.client.post('/posts/', {'title': 'testing title'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class PostDetailViewTests(APITestCase):
    def setUp(self):
        thiago = User.objects.create_user(username='thiago', password='Cuiaba1983')
        john = User.objects.create_user(username='john', password='London2007')
        Post.objects.create(
            owner=thiago,
            title='About Thiago', 
            content='Thiagos content'
        )
        Post.objects.create(
            owner=john,
            title='About John', 
            content='johns content'
        )
    
    def test_can_get_post_by_id(self):
        response = self.client.get('/posts/1/')
        self.assertEqual(response.data['title'], 'About Thiago')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_cannot_get_post_by_invalid_id(self):
        response = self.client.get('/posts/999/')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_auth_user_can_udpate_own_post(self):
        self.client.login(username='thiago', password='Cuiaba1983')
        respose = self.client.put('/posts/1/', {'title': 'updating post title'})
        post = Post.objects.filter(id=1).first()
        self.assertEqual(post.title, 'updating post title')
        self.assertEqual(respose.status_code, status.HTTP_200_OK)
    
    def test_unauthorized_user_cannot_update_others_post(self):
        self.client.login(username='thiago', password='Cuiaba1983')
        response = self.client.put('/posts/2/', {'title': 'updating post title'})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)