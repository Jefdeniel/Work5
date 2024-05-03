from .views.calendar_views import CalendarListView, CalendarDetailView


# @api_view(["GET"])
# def get_calendars(request):
#     calendars = Calendar.objects.all()
#     serializer = CalendarSerializer(calendars, many=True)
#     return Response(serializer.data)


# @api_view(["POST"])
# def login_view(request):
#     data = json.loads(request.body)
#     username = data.get("username")
#     password = data.get("password")

#     if username is None or password is None:
#         return JsonResponse(
#             {"error": "Please provide both username and password"}, status=400
#         )
#     user = authenticate(request, username=username, password=password)
#     if user is None:
#         return JsonResponse({"invalid credentials": False}, status=400)
#     login(request, user)
#     return JsonResponse({"successful login": True})


# @require_POST
# def login_view(request):
#     data = json.loads(request.body)
#     username = data.get("username")
#     password = data.get("password")

#     if username is None or password is None:
#         return JsonResponse(
#             {"error": "Please provide both username and password"}, status=400
#         )
#     user = authenticate(request, username=username, password=password)
#     if user is None:
#         return JsonResponse({"invalid credentials": False}, status=400)
#     login(request, user)
#     return JsonResponse({"successful login": True})


# def logout_view(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({"error": "You are not logged in"}, status=400)
#     logout(request)
#     return JsonResponse({"successful logout": True})


# @ensure_csrf_cookie
# def session_view(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({"isAuthenticated": False})
#     return JsonResponse({"isAuthenticated": True})


# def whoami_view(request):
#     if not request.user.is_authenticated:
#         return JsonResponse({"isAuthenticated": None})
#     return JsonResponse({"isAuthenticated": request.user.username})
