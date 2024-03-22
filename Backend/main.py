import requests
from flask import Flask, jsonify, request, make_response
from flask_restful import Api, Resource

from Database.database_connection import Data

from flask_cors import CORS

app = Flask(__name__)

CORS(app)


@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, DELETE, HEAD, OPTIONS'
    return response


@app.route('/api/create_tables', methods=['GET'])
def create_tables():
    Data.create_connection()

    return jsonify({'hello': 'world'})


@app.route('/api/registration', methods=['POST'])
def registration():
    data = request.get_json()

    origin = request.headers.get('Origin')
    print(f'Запрос пришел с источника: {origin}')

    print('Полученные данные:', data['surname'], data['name'], data['patronymic'], data['login'], data['password'])
    is_complete = Data.register_user(
        surname=data['surname'],
        name=data['name'],
        patronymic=data['patronymic'],
        login=data['login'],
        password=data['password'])
    print(f'Метод Data.register_user вызван с результатом: {is_complete}')

    if is_complete:
        result = {"message": "Метод успешно вызван", "data": data}
    else:
        result = {"message": "Пользователь не зарегистрирован"}

    return jsonify(result)


@app.route('/api/authorization', methods=['GET'])
def authorization():
    login = request.args.get('login')
    password = request.args.get('password')

    print(login, password)

    data_user = Data.search_user(login, password)

    result = {'message': 'Метод успешно вызван', 'data_user': data_user}

    return jsonify(result)


@app.route('/api/events_by_audience', methods=['GET'])
def search_events_by_audience():
    id_audience = request.args.get('id_audience')

    data_events = Data.search_events_by_audience(id_audience)

    result = {'message': 'Метод успешно вызван', 'data_events': data_events}

    return jsonify(result)


@app.route('/api/create_media', methods={'POST'})
def create_media():
    data = request.get_json()
    is_complete = Data.create_media(
        category=data['category'],
        path=data['path'],
        id_event=data['id_event'])

    if is_complete:
        result = {"message": "Метод успешно вызван", "data": data}
    else:
        result = {"message": "Метод не выполнен"}

    return jsonify(result)


@app.route('/api/search_media_by_event', methods=['GET'])
def search_media_by_event():
    id_event = request.args.get('id_event')

    print(id_event)

    data_media = Data.search_media_by_event(id_event)

    result = {'message': 'Метод успешно вызван', 'data_media': data_media}

    return jsonify(result)


@app.route('/api/create_event', methods={'POST'})
def create_event():
    data = request.get_json()
    is_complete = Data.create_event(
        id_audience=data['id_audience'],
        title_event=data['title_event'],
        time_start_event=data['time_start_event'],
        time_end_event=data['time_end_event'],
        date=data['date'],
        responsible=data['responsible'],
        category=data['category'],
        number_participants=data['number_participants'],
        max_number_participants=data['max_number_participants'],
        category_participants=data['category_participants'],
        datetime_create_event=data['datetime_create_event'])
    print(f'Метод Data.register_user вызван с результатом: {is_complete}')

    if is_complete:
        result = {"message": "Метод успешно вызван", "data": data}
    else:
        result = {"message": "Метод не выполнен"}

    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, port=80, host='26.49.94.205')
