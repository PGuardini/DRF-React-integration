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

3. Create a folder called assets/ to drop all your jsx and css files, creating a new folder respectively
4. So, now we need to set up the vite pipeline that allow us to bundle our react code into js
5. Create at the root folder a new file called vite.config.js and paste this code: 

```js
import { defineConfig  } from "vite";
import path from 'path';

export default defineConfig({
    plugins: [],
    base: '/static/', // This should match Django's settings.STATIC_URL
    build: {
        // Where Vite will save its output files
        // This should be something in your settings.STATICFILES_DIRS
        outDir: path.resolve(__dirname, './static'),
        emptyOutDir: false, // Preserve the outDir to not clobber Django's other files
        manifest: 'manifest.json',
        rollupOptions: {
            input: {
                'main': path.resolve(__dirname, './assets/js/index.jsx'),
            },
            output: {
                // Output JS bundles to js/ directory with -bundle suffix
                entryFileNames: `js/[name]-bundle.js`,
                assetFileNames: `css/[name].css`,
            },
        },
    },
});
```
6. After that, add to your package.json file the follow line:

```json
  "scripts": {
    //(other scripts commands here...),
    "build": "vite build"
  },
```

7. Now, when we need to transpile our react code into js, we can run the command below:

```bash
    npm run build
```

8. To connect our vite bundles in Django (for our production code): inside the template, we need to call `{% load static %}` command and add by script tag our bundled code: `<script src="{% static 'js/index-bundle.js' %}"></script>`.

```html

    {% load static %}
    <html>
    <head>
        <title>Your title</title>
    </head>
    <body>
        <script src="{% static 'js/index-bundle.js' %}"></script>
    </body>
    </html>

```

9. To use react files, we need to add the react-plugin to vite:

```bash

    npm install -D @vitejs/plugin-react

```
10. Completed the installation, we need to add the react-plugin in our vite.config file:
    
```js
    
    import react from '@vitejs/plugin-react'

```

and create (or add) a plugins section, adding react() into that:

```js
    export default defineConfig({
        plugins: [react()],
        // rest of our vite config
    });
```

11. Now we can start to use jsx files in our development enviroment
12. Now we will actually add react in our project:

```bash

    npm install react react-dom

```

13. The vite js pipeline is finally setted, we can bundle our jsx files into js, for our production code.
14. Now we need to connect django to vite hot module replacement (HMR), which is nothing more than an auto refresh
15. To add to django we run the follow command:
```bash
    uv add django-vite
```

And add to our installed_apps in settings.py:

```py

INSTALLED_APPS = [
    # other apps...,
    "django_vite",
]

```

Still in our settings.py, we must add the follow constants, that will allow django load our static files:

```py
    STATIC_ROOT = BASE_DIR / "static_root"
    STATIC_URL = "static/"

    STATICFILES_DIRS = [
        BASE_DIR / 'static',
    ]

    DJANGO_VITE = {
            "default": {
            "dev_mode": DEBUG,
            'manifest_path': 'static/manifest.json',
        }
    }   
```

16. Perfect, we have our all enviroment setted and we can now start to develop our application
17. We gonna write our first Hello, World! with react in our django project
18. In our template index.html, we'll add this code:
```html

<!-- to load the django_vite app -->
{% load django_vite %}
<html>
  <head>
    <title>Getting Started with Django and Vite</title>
    <!-- to load the vite HMR, that will refresh our page for each change in our javascript -->
    {% vite_hmr_client %}
  </head>
  <body>
  </body>
</html>

```

19. Creating our view and adding the route into our urls.py:

```py
# views.py

from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'todo/index.html')

```

and:

```py
from django.contrib import admin
from django.urls import path

from setup.views import index

urlpatterns = [
    path('', index, name='index')
]

```

20. Using the django routing, we can map and add our app ease
