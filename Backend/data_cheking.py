def is_correct_data_user(surname: str, name: str, patronymic: str, login: str, password: str)-> (bool, dict):
    is_correct_data = {'surname': True,'name': True, 'patronymic': True,'login': True,'password': True}
    digits = '1234567890'
    upper_letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    lower_letters = 'abcdefghijklmnopqrstuvwxyz'
    symbols = '!@#$%^&*()-+'
    acceptable = digits+upper_letters+lower_letters+symbols
    if any(char not in acceptable for char in password):
        return False
    elif len(password) > 8:
        return True
    else:
        if len(password) < 8:
            return False
    if any(char not in acceptable for char in login):
        return False
    elif len(login) < 8:
        return False
    else:
        if len(login) > 8:
            return True
    if surname == acceptable and surname == []:
        return False
    else:
        if len(surname) > 30:
            return False
    if name == acceptable and name == []:
        return False
    else:
        if len(name) > 30:
            return False
    if patronymic == acceptable and patronymic == []:
        return False
    else:
        if len(patronymic) > 30:
            return False

