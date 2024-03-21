from PySide6 import QtSql
from cryptography.fernet import Fernet


class Data:
    def __init__(self):
        super(Data, self).__init__()
        # self.database = None
        self.create_connection()

    @staticmethod
    def create_connection() -> bool:
        """
        Creates a database file and tables in the database
        :return: True, if the database has opened
                 False, if the database hasn't opened
        """
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')

        if not db.open():
            return False

        query = QtSql.QSqlQuery()

        query.exec("CREATE TABLE IF NOT EXISTS users"
                   "("
                   "ID INTEGER primary key AUTOINCREMENT,"
                   "Surname VARCHAR(30),"
                   "Name VARCHAR(30),"
                   "Patronymic VARCHAR(30),"
                   "Login VARCHAR(50),"
                   "Password VARCHAR(1000),"
                   "Crypt_key VARCHAR(1000),"
                   "Is_admin BOOLEAN"
                   ")")

        query.exec("CREATE TABLE IF NOT EXISTS audiences"
                   "("
                   "ID INTEGER primary key AUTOINCREMENT,"
                   "Title VARCHAR(100),"
                   "time_start TIME DEFAULT '08:00:00',"
                   "time_end TIME DEFAULT '17:00:00',"
                   "Time_step TIME DEFAULT '00:10:00',"
                   "Max_participants INTEGER,"
                   "Is_active BOOLEAN DEFAULT TRUE,"
                   "Responsible INTEGER,"
                   "time_start_break TIME DEFAULT '13:00:00',"
                   "time_end_break TIME DEFAULT '14:00:00'"
                   ")")

        query.exec("CREATE TABLE IF NOT EXISTS events"
                   "("
                   "ID INTEGER primary key AUTOINCREMENT,"
                   "Id_audience INTEGER,"
                   "Title_event VARCHAR(100),"
                   "Time_start_event TIME,"
                   "Time_end_event TIME,"
                   "Date DATE DEFAULT CURRENT_DATE,"
                   "Responsible INTEGER,"
                   "Category VARCHAR(100),"
                   "Max_number_participants INTEGER,"
                   "Number_participants INTEGER,"
                   "Category_participants VARCHAR(100),"
                   "Datetime_create_event DATETIME"
                   ")")

        query.exec("CREATE TABLE IF NOT EXISTS media"
                   "("
                   "ID INTEGER primary key AUTOINCREMENT,"
                   "Category VARCHAR(100),"
                   "Path VARCHAR(100),"
                   "Id_event DATETIME DEFAULT CURRENT_TIMESTAMP"
                   ")")

        return True

    @staticmethod
    def execute_query_with_params(sql_query, query_values=None) -> bool:
        """
        :param sql_query: it's string with code on SQL.
        :param query_values: It's list of params for sql_query. They already have the correct sequence.
        :return: True, if the query has been added.
                 False, if the query hasn't been added.
        """
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        print(sql_query)

        query = QtSql.QSqlQuery()
        query.prepare(sql_query)

        success = query.exec()

        return success

    @staticmethod
    def Crypt_password(password: str, crypt_key: str) -> str:
        """
        :param password.
        :param crypt_key: the key generated to encrypt the password
        :return: encrypted password
        """
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        cipher = Fernet(crypt_key.encode('utf-8'))
        crypt_password = cipher.encrypt(password.encode('utf-8'))

        return crypt_password.decode('utf-8')

    @staticmethod
    def Decrypt_password(password: str, crypt_key: str) -> str:
        """
        :param password
        :param crypt_key: the key used to decrypt the password stored in the database
        :return: decrypted password
        """
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        cipher = Fernet(crypt_key.encode('utf-8'))
        decrypt_password = cipher.decrypt(password.encode('utf-8'))

        return decrypt_password.decode('utf-8')

    @staticmethod
    def get_crypt_key(user_id: int) -> str:
        """
        Returns the value of the encryption key for a specific user
        :param user_id:
        :return: the encryption key (string)
        """
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        sql_query = QtSql.QSqlQuery()
        sql_query.prepare("SELECT Crypt_key FROM users WHERE ID=?")
        sql_query.addBindValue(user_id)
        sql_query.exec()

        if sql_query.next():
            key = sql_query.value(0)
            return key
        else:
            return ''  # Нужно подумать!

    @staticmethod
    def register_user(surname: str, name: str, patronymic: str, login: str, password: str) -> bool:
        """
        :param surname:
        :param name:
        :param patronymic:
        :param login:
        :param password:
        :return: True, if the user is registered
                 False, if the user isn't registered
        """
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        crypt_key = Fernet.generate_key().decode('utf-8')
        encrypted_password = Data.Crypt_password(password, crypt_key)
        sql_query = f"INSERT INTO users (Surname, Name, Patronymic, Login, Password, Crypt_key, Is_admin)" \
                    f" VALUES ('{surname}', '{name}', '{patronymic}', '{login}', '{encrypted_password}', '{crypt_key}', 0)"
        return Data.execute_query_with_params(sql_query=sql_query)

    @staticmethod
    def update_user_query(password: str, id_user: int) -> bool:
        """
        :param password.
        :param id_user.
        :return: True, if the query is updated
                 False, if the query isn't updated
        """
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        crypt_key = Data.get_crypt_key(id_user)
        encrypted_password = Data.Crypt_password(password, crypt_key)
        sql_query = "UPDATE users SET Password=? WHERE ID=?"

        return Data.execute_query_with_params(sql_query, [encrypted_password, id_user])

    @staticmethod
    def delete_user_query(id_user: int) -> bool:
        """
        :param id_user.
        :return: True, if the query is deleted
                 False, if the query isn't deleted
        """
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        sql_query = "DELETE FROM users WHERE ID=?"

        return Data.execute_query_with_params(sql_query, [id_user])

    @staticmethod
    def search_user(login: str, password: str) -> dict:

        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return {}

        sql_query = QtSql.QSqlQuery()
        print(sql_query.exec("SELECT ID, Surname, Name, Patronymic, Login, Password, Crypt_key, Is_admin FROM users"))

        while sql_query.next():
            print('can')
            crypt_password = Data.Crypt_password(password, sql_query.value(6))
            if login == str(sql_query.value(4)) and password == str(sql_query.value(5)):
                print('нашло совпадение!')
                return {
                    'id': sql_query.value(0),
                    'surname': sql_query.value(1),
                    'name': sql_query.value(2),
                    'patronymic': sql_query.value(3),
                    'login': sql_query.value(4),
                    'password': Data.Decrypt_password(sql_query.value(5), sql_query.value(6)),
                    'is_admin': sql_query.value(6)
                }

        return {'hello': 'world'}

    @staticmethod
    def create_event(id_audience: int, title_event: str, time_start_event: str, time_end_event: str, date: str,
                     responsible: int, category: str, number_participants: int, max_number_participants: int,
                     category_participants: str, datetime_create_event: str) -> bool:
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        sql_query = "INSERT INTO events (Id_audience, Title_event, Time_start_event, Time_end_event, Date," \
                    "Responsible, Category," \
                    "Max_number_participants," \
                    "Number_participants," \
                    "Category_participants," \
                    "Datetime_create_event)" \
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        return Data.execute_query_with_params(sql_query,
                                              [id_audience, title_event, time_start_event, time_end_event, date,
                                               responsible, category, number_participants, max_number_participants,
                                               category_participants, datetime_create_event])

    @staticmethod
    def create_media(category: str, path: str, id_event: int) -> bool:
        db = QtSql.QSqlDatabase.addDatabase('QSQLITE')
        db.setDatabaseName('database.db')
        if not db.open():
            return False
        sql_query = "INSERT INTO media (Category, Path, Id_event)" \
                    " VALUES (?, ?, ?)"
        return Data.execute_query_with_params(sql_query, [category, path, id_event])
