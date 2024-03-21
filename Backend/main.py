from flask import Flask, jsonify, request
from flask_restful import Api, Resource

from Database.database_connection import Data

app = Flask(__name__)


@app.route('/registration', methods=['POST'])
def registration():
    data = request.get_json()  # Получаем данные из тела запроса

    Data.register_user(data['surname'], data['name'], data['patronymic'], data['login'], data['password'])

    result = {"message": "Метод успешно вызван", "data": data}

    return jsonify(result)  # Возвращаем ответ в формате JSON


@app.route('/authorization', methods=['GET'])
def authorization():
    pass




if __name__ == '__main__':
    app.run(debug=True, port=3000, host='127.0.0.1')
