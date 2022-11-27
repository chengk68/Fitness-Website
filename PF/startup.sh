#! /bin/sh
python3 -m virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
chmod u=rwx ./PB/manage.py
./PB/manage.py makemigrations
./PB/manage.py migrate