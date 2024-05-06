# @Work5 Agenda Tool

## Backend

### Requirements

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

- Make sure your virtual environment is active with `pipenv shell` (run from root).
- Build dist folder into frontend with `yarn build`. (reason in settings.py for STATICFILES_DIRS)
- After making changes, such as adding models, re-run `python manage.py makemigrations calendar_app`.

### How to start

- Create new migration: `python manage.py makemigrations`
- Apply migration to update database schema: `python manage.py migrate`.
- Start the server: `python manage.py runserver`.
- Admin dashboard: `http://localhost:8000/admin`
- API: `http://localhost:8000/api`

## Frontend

### Start the frontend locally

Start with executing the following command in the terminal:

```
yarn && yarn start
```

### Building for production

```
yarn build

- https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react
- - https://stackoverflow.com/questions/49966547/pip-10-0-1-warning-consider-adding-this-directory-to-path-or

```
