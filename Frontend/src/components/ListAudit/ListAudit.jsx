import '../../styles/ListAudit.css'
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';




//вывод списка доступных аудиторий
export default function ListAudit() {

    // const [images, setImages] = useState([]);

    const images = [
        { id: 1, title: "Видеостудия дополненной реальности", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/video.png" },
        { id: 2, title: "Аудитория виртуальной реальности", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/VR.png" },
        { id: 3, title: "Симуляционный центр", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/simulete.png" },
        { id: 4, title: "Музей ", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/musem.png" }
    ];

    // useEffect(() => {
    //     fetch('https://api.example.com/images')
    //         .then(response => response.json())
    //         .then(data => setImages(data))
    //         .catch(error => console.error('Error fetching images:', error));
    // }, []);

    return (
        <div className="list__container">
          <div className="list__icons">
            {images.map(({ id, title, text, url }) => (
              <Link to={`/Audience-${id}`} className='list__link' key={id}>
                <div className="list__icon" style={{ backgroundImage: `url(${url})` }}>
                  <h2 className="list__title">{title}</h2>
                  <p className="list__text">{text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
      
}