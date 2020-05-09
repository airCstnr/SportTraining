# SportTraining

Sport Traing simple app to plan training sessions with exercices and timer.


## Installation

- Clone repository in your home foler
    `git clone https://github.com/airCstnr/SportTraining`
- Go to project root folder
    `cd SportTraining`
- Create virtual environment
    `python3 -m venv venv`
- Activate virtual environment
    `source venv/bin/activate`
- Update pip
    `pip install -U pip`
- Install needed modules
    `pip install -r requirements.txt`
- Edit SportTraining/settings.py and add server IP adress (see `ifconfig`) in ALLOWED_HOSTS
- Generate database
    `python manage.py migrate`


## Running instructions

Start app using this command:

`python manage.py runserver`

