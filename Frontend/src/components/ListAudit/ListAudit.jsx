import {Link} from 'react-router-dom'
import '../../styles/ListAudit.css'
import React, { useState, useEffect } from 'react';




//вывод списка доступных аудиторий
export default function ListAudit() {

    // const [images, setImages] = useState([]);

    const images = [
        { id: 1, title: "Видеостудия дополненной реальности", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/video.png" },
        { id: 2, title: "Аудитория виртуальной реальности", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/VR.png" },
        { id: 3, title: "Симуляционный центр", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/simulete.png" },
        { id: 2, title: "Музей ", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/musem.png" }
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
                <Link to="/homepage-1" className='list__link' >
                    <div className="list__icon" key={id} style={{ backgroundImage: `url(${url})` }}>
                        <h2 className="list__title">{title}</h2>
                        <p className="list__text">{text}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>


    )
}