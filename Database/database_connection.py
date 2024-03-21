from PySide6 import QtSql
from cryptography.fernet import Fernet


class Data:
    def __init__(self):
        super(Data, self).__init__()
        self.create_connection()

    def create_connection(self) -> bool:
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
                   "Name VARCHAR(30),"
                   "Surname VARCHAR(30),"
                   "Patronymic VARCHAR(30),"
                   "Login VARCHAR(50),"
                   "Password VARCHAR(50),"
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

    def execute_query_with_params(self, sql_query, query_values=None) -> bool:
        """
        :param sql_query: it's string with code on SQL.
        :param query_values: It's list of params for sql_query. They already have the correct sequence.
        :return: True, if the query has been added.
                 False, if the query hasn't been added.
        """

        query = QtSql.QSqlQuery()
        query.prepare(sql_query)

        if query_values is not None:
            for query_value in query_values:
                query.addBindValue(query_value)

        succes = query.exec()

        return succes

    def Crypt_password(self, password: str, crypt_key: str) -> str:
        """
        :param password.
        :param crypt_key: the key generated to encrypt the password
        :return: encrypted password
        """

        cipher = Fernet(crypt_key.encode('utf-8'))
        crypt_password = cipher.encrypt(password.encode('utf-8'))

        return crypt_password.decode('utf-8')

    def Decrypt_password(self, password: str, crypt_key: str) -> str:
        """
        :param password
        :param crypt_key: the key used to decrypt the password stored in the database
        :return: decrypted password
        """

        cipher = Fernet(crypt_key.encode('utf-8'))
        decrypt_password = cipher.decrypt(password.encode('utf-8'))

        return decrypt_password.decode('utf-8')

    def get_crypt_key(self, user_id: int) -> str:
        """
        Returns the value of the encryption key for a specific user
        :param user_id:
        :return: the encryption key (string)
        """
        sql_query = QtSql.QSqlQuery()
        sql_query.prepare("SELECT Crypt_key FROM users WHERE ID=?")
        sql_query.addBindValue(user_id)
        sql_query.exec()

        if sql_query.next():
            key = sql_query.value(0)
            return key
        else:
            return ''  # Нужно подумать!

    def register_user(self, surname: str, name: str, patronymic: str, login: str, password: str) -> bool:
        """
        :param surname:
        :param name:
        :param patronymic:
        :param login:
        :param password:
        :return: True, if the user is registered
                 False, if the user isn't registered
        """

        crypt_key = Fernet.generate_key().decode('utf-8')
        encrypted_password = self.Crypt_password(password, crypt_key)
        sql_query = "INSERT INTO users (Name, Surname, Patronymic, Login, Password, Crypt_key)" \
                    " VALUES (?, ?, ?, ?, ?, ?)"
        return self.execute_query_with_params(sql_query,
                                              [name, surname, patronymic, login, encrypted_password, crypt_key])

    def update_user_query(self, password: str, id_user: int) -> bool:
        """
        :param password.
        :param id_user.
        :return: True, if the query is updated
                 False, if the query isn't updated
        """
        crypt_key = self.get_crypt_key(id_user)
        encrypted_password = self.Crypt_password(password, crypt_key)
        sql_query = "UPDATE users SET Password=? WHERE ID=?"

        return self.execute_query_with_params(sql_query, [encrypted_password, id_user])

    def delete_user_query(self, id_user: int) -> bool:
        """
        :param id_user.
        :return: True, if the query is deleted
                 False, if the query isn't deleted
        """

        sql_query = "DELETE FROM users WHERE ID=?"

        return self.execute_query_with_params(sql_query, [id_user])

    def create_event(self, id_audience: int, title_event: str, time_start_event: str, time_end_event: str, date: str,
                     responsible: int, category: str, number_participants: int, max_number_participants: int,
                     category_participants: str, datetime_create_event: str) -> bool:

        sql_query = "INSERT INTO events (Id_audience, Title_event, Time_start_event, Time_end_event, Date," \
                    "Responsible, Category," \
                    "Max_number_participants," \
                    "Number_participants," \
                    "Category_participants," \
                    "Datetime_create_event)" \
                    " VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        return self.execute_query_with_params(sql_query,
                                              [id_audience, title_event, time_start_event, time_end_event, date,
                                               responsible, category, number_participants, max_number_participants,
                                               category_participants, datetime_create_event])

    def create_media(self, category: str, path: str, id_event: int) -> bool:
        sql_query = "INSERT INTO media (Category, Path, Id_event)" \
                    " VALUES (?, ?, ?)"
        return self.execute_query_with_params(sql_query, [category, path, id_event])
