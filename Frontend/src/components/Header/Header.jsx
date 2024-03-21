import { Link } from 'react-router-dom';
import '../../styles/Header.css'
import React, { useState, useEffect } from 'react';

export default function Header(){
    const [isUserRegistered, setIsUserRegistered] = useState(false);

    useEffect(() => {
      // Здесь происходит запрос к серверу для получения информации о пользователе
      // Предположим, что сервер возвращает информацию о зарегистрированном пользователе в виде объекта с полем isRegistered
      // Пример запроса к серверу:
    //   fetch('/api/userinfo')
    //     .then(response => response.json())
    //     .then(data => setIsUserRegistered(data.isRegistered))
    //     .catch(error => console.error('Error fetching user info:', error));
  
      // Вместо реального запроса, используем имитацию ответа от сервера
      setTimeout(() => {
        setIsUserRegistered(true); // Предположим, что пользователь зарегистрирован
      }, 2000); // Имитация задержки запроса в 2 секунды
    }, []);

    return(
        <div className="header__container">
            <div className="header__left">
                <button className="header__menu">
                    <img src="./assets/icons/burger.svg" className="header__menu-btn" alt="btn" />
                </button>
                

                <div className="header__logo">
                    <img src="./assets/icons/logo.svg" className="header__logo" alt="logo" />
                </div>
            </div>
            
            {window.location.pathname === '/'&& (
                <li><a href="" class="header__link">Выбрать аудиторию</a>
                    <ul class="header__submenu">
                        <li><a href="">Видеостудия дополненной реальности</a></li>
                        <li><a href="">Аудитория виртуальной реальности</a></li>
                        <li><a href="">Симуляционный центр</a></li>
                        <li><a href="">Музей</a></li>
                    </ul>
                </li>
            )}
            

            <Link to="/" className="header__acount">
                Войти
            </Link>

        </div>
    )
}