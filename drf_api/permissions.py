from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(sef, request, view, object):
        if request.method in permissions.SAFE_METHODS:
            return True
        return object.owner == request.user