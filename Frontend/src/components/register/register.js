import '../../styles/register.css';
import '../../styles/zero.css';
import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="register__error-message">
      <p>{message}</p>
    </div>
  );
}

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [surname, setSurname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false); // Добавляем состояние для отслеживания успеха

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleSubmit = async () => {
    setErrorMessage(''); // Сброс ошибки перед проверкой

    if (username.length === 0) {
      setErrorMessage('Пожалуйста, введите логин');
      return;
    }

    if (firstName.length === 0) {
      setErrorMessage('Пожалуйста, введите имя');
      return;
    }

    if (lastName.length === 0) {
      setErrorMessage('Пожалуйста, введите фамилию');
      return;
    }

    if (surname.length === 0) {
      setErrorMessage('Пожалуйста, введите отчество');
      return;
    }

    if (password.length < 5 || password.length > 50) {
      setErrorMessage('Пароль должен быть не менее 5 и не более 50 символов');
      return;
    }

    if (confirmPassword !== password) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    try {
      const response = await fetch('http://26.32.128.252/api/registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "surname": lastName,
          "name": firstName,
          "patronymic": surname,
          "login": username,
          "password": password,
        }),
      });
  
      const data = await response.json();
  
      console.log('Sent data:', {
        'surname': lastName,
        'name': firstName,
        'patronymic': surname,
        'login': username,
        'password': password,
      });
      console.log('Server response:', data);
  
      if (response.ok) {
        setSuccess(true); // Set success state
      } else {
        setErrorMessage('Error registering'); // Set error message
      }
    } catch (error) {
      console.error('Error sending request:', error);
      setErrorMessage('Error sending request');
    }
    
    
  };

  if (success) {
    return redirect("/homepage");
  }

  return (
    <div className="register">
      <ErrorMessage message={errorMessage} />
      <div className="register__container">
        <img src="./assets/icons/logo.svg" className="register__logo" alt="logo"></img>
        <p className="register__title">Регистрация</p>
        <input
          type="text"
          value={firstName}
          onChange={handleFirstNameChange}
          placeholder="Имя"
          className="register__input"
        />
        <input
          type="text"
          value={lastName}
          onChange={handleLastNameChange}
          placeholder="Фамилия"
          className="register__input"
        />
        <input
          type="text"
          value={surname}
          onChange={handleSurnameChange}
          placeholder="Отчество"
          className="register__input"
        />

        <input
          type="email"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Почта"
          className="register__input"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Пароль"
          className="register__input"
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          placeholder="Подтвердите пароль"
          className="register__input"
        />
        <button onClick={handleSubmit} className="register__button">
          Зарегистрироваться
        </button>
        <div className="register__bottom-cont">
          <Link to="/" className="register__back">
            Назад
          </Link>

          <Link to="/homepage" href="#" className="register__as-guest">
            Войти как гость
          </Link>
        </div>
      </div>

      <p className="register__desc">Сайт по бронированию аудиторий, для ваших мероприятий</p>
    </div>
  );
}

export default Register;
