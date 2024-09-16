from rest_framework import permissions, response, status, views
from .models import Flag
from .serializers import FlagSerializer

class FlagClipView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, clip_id):
        data = {
            'user': request.user.id,
            'clip': clip_id,
            'reason': request.data.get('reason')
        }

        serializer = FlagSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FlagReasonsView(views.APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        reasons = [reason[0] for reason in Flag.reasons]
        return response.Response({ 'reasons': reasons })