# Backend

## Requirements

- Python 3.8.12
  - You can download the Python 3.8.12 interpreter and runtime. To verify, run `python` in your terminal (inside the backend folder).
- Pipenv
  - Make sure Pipenv is installed and your PATH variables are set up properly. See handy links for more information.
- Django
- Will to live
- Please use Black formatter to format the code. You can find it [here](https://code.visualstudio.com/docs/python/formatting).

## DB

- Make sure your virtual environment is active with `pipenv shell` (run from root).
- After making changes, such as adding models, re-run `python manage.py makemigrations calendar`.

## How to start

- Create new migration: `python manage.py makemigrations`
- Apply migration to update database schema: `python manage.py migrate`.
- Start the server: `python manage.py runserver`.
- Admin dashboard: `http://localhost:8000/admin`
- API: `http://localhost:8000/api`

## Handy links

- [DigitalOcean Tutorial: Build a To-Do Application using Django and React](https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react)
- [Stack Overflow: Pip 10.0.1 warning - Consider adding this directory to PATH or](https://stackoverflow.com/questions/49966547/pip-10-0-1-warning-consider-adding-this-directory-to-path-or)
