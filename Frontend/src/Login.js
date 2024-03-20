import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Импорт useHistory

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // Использование useHistory

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    console.log('Отправленные данные:', { username, password });
  };

  const handleRegisterClick = () => {
    history.push('/register');
  };

  return (
    <div className="app">
      <div className="login__container">
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
        <button onClick={handleSubmit} className="login__button">
          Вход
        </button>

        <button onClick={handleRegisterClick} className="login__button">
          Регистрация
        </button>
      </div>
    </div>
  );
}

export default Login;
