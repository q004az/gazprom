import React, { useState } from 'react';
import '../../styles/App.css';
import '../../styles/login.css';
import '../../styles/zero.css';
import { Link } from 'react-router-dom';

function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="login__error-message">
      <p>{message}</p>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    setErrorMessage(''); 
    
    if (username.length === 0) {
      setErrorMessage('Пожалуйста, введите логин');
      return;
    }

    if (password.length < 5 || password.length > 50) {
      setErrorMessage('Пароль должен быть не менее 5 и не более 50 символов');
      return;
    }

    console.log('Отправленные данные:', { username, password });
  };

  return (
    <div className="login">
      <ErrorMessage message={errorMessage} />
      <div className="login__container">
        <img src="./assets/icons/logo.svg" className="login__logo" alt="logo" />
        <p className="login__title">Войти</p>
        <input
          type="email"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Почта"
          className="login__input"
          maxLength="50"
        />
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Пароль"
          className="login__input"
          minLength="5"
          maxLength="50"
        />
        <button onClick={handleSubmit} className="login__button">
          Вход
        </button>

        <Link to="/register" className="login__button login__button-reg">
          Регистрация
        </Link>

        <Link to="/homepage" className="login__as-guest">
          Войти как гость
        </Link>
      </div>

      <p className="login__desc">Сайт по бронированию аудиторий, для ваших мероприятий</p>
    </div>
  );
}

export default Login;
