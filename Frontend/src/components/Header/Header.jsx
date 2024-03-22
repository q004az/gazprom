import { Link } from 'react-router-dom';
import '../../styles/Header.css'
import React, { useState, useEffect } from 'react';

export default function Header(){
    const [isUserRegistered, setIsUserRegistered] = useState(false);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    // для определения окна
    useEffect(() => {
        const handlePathChange = () => {
            setCurrentPath(window.location.pathname);
        };

        window.addEventListener('popstate', handlePathChange);

        return () => {
            window.removeEventListener('popstate', handlePathChange);
        };
    }, []);


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
        }); // Имитация задержки запроса в 2 секунды
      }, []);

    const headerStyle = {
        
        width: currentPath.includes('/Audience-') ? '100vw' : '99vw',
        
    };

    return(
        <div className="header__container" style={headerStyle}>
            <div className="header__left">
                {/* <button className="header__menu">
                    <img src="./assets/icons/burger.svg" className="header__menu-btn" alt="btn" />
                </button> */}

                <div class="header__menu">
                    <input id="menu__toggle" type="checkbox" />
                    <label class="menu__btn" for="menu__toggle">
                    <span></span>
                    </label>

                    <ul class="menu__box">
                        <li><a class="menu__item" href="/homepage">На главную</a></li>
                        <li><a class="menu__item" href="#">Статистика</a></li>
                        <li><a class="menu__item" href="/">Выйти из акаунта</a></li>
                    </ul>
                </div>
                

                <a href='/homepage' className="header__logo">
                    <img src="./assets/icons/logo.svg" className="header__logo" alt="logo" />
                </a>
            </div>
            
            {['/Audience-1', '/Audience-2', '/Audience-3', '/Audience-4'].includes(window.location.pathname)&& (
                <ul class="topmenu">
                    <li><a  class="submenu-link">Выбрать аудиторию</a>
                        <img src="./assets/icons/arrow.svg" className="header__arrow" alt="arrow" />

                        <ul class="submenu">
                        <li className='submenu__li-d'><a href="/Audience-1" >Видеостудия дополненной реальности</a></li>
                        <li><a href="/Audience-2">Аудитория виртуальной реальности</a></li>
                        <li><a href="/Audience-3">Симуляционный центр</a></li>
                        <li><a href="/Audience-4">Музей</a></li>
                        </ul>
                    </li>
                </ul>
            )}
            
            {isUserRegistered ? (
                <div  className="header__acount-in">
                    <img src="./assets/icons/acount.svg" className="header__acount__in-img" alt="acount" />
                </div>
            ) : (
                <Link to="/" className="header__acount">
                    Войти
                </Link>
            )}
            

        </div>
    )
}