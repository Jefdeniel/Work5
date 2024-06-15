# @Work5 Smart Calendar Tool

## Frontend

### Start the frontend locally

Start with executing the following command in the terminal:

```
yarn && yarn start
```

### Building for production

Note: Building first is important, otherwise you will have crashes when starting up the backend server.

```
yarn build

- https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
- - https://stackoverflow.com/questions/49966547/pip-10-0-1-warning-consider-adding-this-directory-to-path-or

```

## Backend

### Requirements

docker build -t backend .
docker run -p 8000:8000 backend

- Python 3.8.12
  - You can download the **Python** 3.8.12 interpreter and runtime. To verify, run `python` in your terminal (inside the backend folder).
- Pipenv
  - Make sure **Pipenv** is installed and your PATH variables are set up properly. See handy links for more information.
- Django
- Please use Black formatter to format the code. You can find it [here](https://code.visualstudio.com/docs/python/formatting).

### Managing Dependencies

- Freeze your current dependencies to get them from requirements.txt file: `pip freeze > requirements.txt`
- Install dependencies after freeze: `pip install -r requirements.txt`

### DB

- Build dist folder into frontend with `yarn build`. (reason in settings.py for STATICFILES_DIRS)

### How to start

1. Make sure your virtual environment is active with `pipenv shell` (run from root).
2. Create new migration from backend folder: `python manage.py makemigrations`
   1. After making changes, such as adding models, re-run `python manage.py makemigrations calendar_app`
3. Apply migration to update database schema: `python manage.py migrate`
4. Seed: `python manage.py seed_data`
5. Build dist folder into frontend with `yarn build`. (reason in settings.py for STATICFILES_DIRS)

6. Start the server: `python manage.py runserver`
   1. Admin dashboard: `http://localhost:8000/admin`
   2. API: `http://localhost:8000/api`
7. after seeding you can try to login with **jefdeniel@icloud.com** and pw: **admin**

Resetting your database, redo migrations and seed at once with `python manage.py reset_and_migrate_seed` from backend folder
