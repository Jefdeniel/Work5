# @Work5 Smart Calendar Tool

![cover](https://restomanager.net/wp-content/uploads/2024/06/readme.png)

## Overview

The @Work5 Smart Calendar Tool is a full-featured calendar application with both frontend and backend components. This tool allows users to manage events and schedules efficiently. The application is built with a React frontend and a Django backend.

## Table of Contents

- [@Work5 Smart Calendar Tool](#work5-smart-calendar-tool)
  - [Overview](#overview)
  - [Table of Contents](#table-of-contents)
  - [Frontend](#frontend)
    - [Starting the Frontend Locally](#starting-the-frontend-locally)
  - [Backend](#backend)
    - [Requirements](#requirements)
    - [Managing dependencies](#managing-dependencies)
    - [How to start](#how-to-start)
  - [Admin and API access](#admin-and-api-access)
  - [Handy links](#handy-links)

## Frontend

### Starting the Frontend Locally

To start the frontend locally, you need to build the `dist` folder first and then start the development server.

1. Install all the dependencies with `yarn`
2. Building the frontend for production is crucial before starting the backend server to prevent crashes with `yarn build`, this results in a `dist` folder

This step is necessary due to the configuration in settings.py for STATICFILES_DIRS.

## Backend

### Requirements

- **Python 3.8.12**: Ensure you have Python 3.8.12 installed. You can verify the installation by running: `python --version`
- **Pipenv**: Make sure Pipenv is installed and properly set up in your PATH. For more information, see the handy links.
- **Django**
- **Black**: Use Black for code formatting. [Link](https://github.com/psf/black)

### Managing dependencies

Run the following command: `pip install -r requirements.txt`

### How to start

1. Activate your virtual environment first with `pipenv shell` from your root folder
2. Run one of the 2 following commands from the backend folder: `python manage.py seed_data`
3. Run `python manage.py runserver`

## Admin and API access

You first need to login on the admin panel before you can test the API endpoints.

- Admin dashboard: [Link](http://localhost:8000/admin)
- Swagger API: [Link](http://localhost:8000/swagger)

**Username**: jefdeniel@icloud.com (after seeding)
**Password**: admin

## Handy links

[Python 3.8.12](https://www.python.org/downloads/release/python-3812/)
[Pipenv installation](https://pipenv.pypa.io/en/latest/install/)
[Black formatter](https://github.com/psf/black)
[BVSC - Python formatting](https://code.visualstudio.com/docs/python/formatting)
