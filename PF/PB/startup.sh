#! /bin/sh
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
chmod u=rwx ./manage.py
./manage.py makemigrations
./manage.py migrate
