
import '../../styles/ListAudit.css'
import React, { useState, useEffect } from 'react';




//вывод списка доступных аудиторий
export default function ListAudit() {

    // const [images, setImages] = useState([]);

    const images = [
        { id: 1, title: "Видеостудия дополненной реальности", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/video.png" },
        { id: 2, title: "Видеостудия дополненной реальности", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/VR.png" },
        { id: 3, title: "Видеостудия дополненной реальности", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/simulete.png" },
        { id: 2, title: "Видеостудия дополненной реальности", text: "Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.", url: "assets/img/musem.png" }
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
                <div className="list__icon" key={id} style={{ backgroundImage: `url(${url})` }}>
                    <h2 className="list__title">{title}</h2>
                    <p className="list__text">{text}</p>
                </div>
            ))}
        </div>
    </div>


        // <div className="list__container">

        //         <div className="list__icons">
        //             <div className="list__icon" key={image.id} style={{ backgroundImage: `url(${image.url})` }}>
        //                 <h2 className="list__title">Видеостудия дополненной реальности</h2>
        //                 <p className="list__text">Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.</p>
        //             </div>

        //             <div className="list__icon">
        //                 <h2 className="list__title">Аудитория виртуальной реальности</h2>
        //                 <p className="list__text">Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.</p>
        //             </div>

        //             <div className="list__icon">
        //                 <h2 className="list__title">Симуляционный центр</h2>
        //                 <p className="list__text">Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.</p>
        //             </div>

        //             <div className="list__icon">
        //                 <h2 className="list__title">Музей</h2>
        //                 <p className="list__text">Наша видеостудия звукозаписи хорошо подходит для проведения онлайн-уроков и вебинаров, благодаря наличию современного звукового и технического оборудования.</p>
        //             </div>
        //         </div>


        // </div>
    )
}