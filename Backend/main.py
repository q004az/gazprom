import requests
from flask import Flask, jsonify, request
from flask_restful import Api, Resource

from Database.database_connection import Data

app = Flask(__name__)


@app.route('/api/registration', methods=['POST'])
def registration():
    data = request.get_json()

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


@app.route('/api/homepage', methods={'GET'})
def homepage():
    data = request.get_json()

    result = {"message": "Метод успешно вызван", "data": data}

    return jsonify(result)




if __name__ == '__main__':
    app.run(debug=True, port=80, host='26.49.94.205')
