import './css.css';
import './zero.css';
import logo from "./icons/logo.svg";
import React, { useState } from 'react';


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Отправленные данные:', { username, password });
  };

  return (
      <div className="app">
        <div className="login__container">
          <img src={logo} className="login__logo" alt="logo"></img>
          <p className="login__title">Войти</p>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Логин"
            className="login__input"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Пароль"
            className="login__input"
          />
          <a href="#" className="login__forgot-password">
            Забыли пароль?
          </a>
          <button onClick={handleSubmit} className="login__button">
            Вход
          </button>

          <button className="login__button">
            Регистрация
          </button>

          <a href="#" className="login__as-guest">
            Войти как гость
          </a>
        </div>

        <p className="app-desc">Сайт по бронированию аудиторий, для ваших мероприятий</p>
      </div>

  );
}

export default App;
