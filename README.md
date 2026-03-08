# DRF-React-integration
It is a study case of integration: how ReactJS can consume Django Rest Framework API using a hybrid architecture.


Setting up this repository from 0 to DRF-React app:

1. After creating a folder where to store the whole project code, run: 

```bash
    uv init
    uv add django
    uv run django-admin startproject setup .
    uv run manage.py startapp todo_app
```

2. Setted up the django structure, now we need to create a vite server for serve our development purposes:

```bash

    npm init -y
    npm install -D vite
```