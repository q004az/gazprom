import React, { useState } from "react";
import "../../styles/EventModal.css"; // Импортируем стили

const EventMenu = ({ onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    responsible: "",
    goal: "",
    targetAudience: "",
    participantsCount: "",
    label: "",
    startDate: "", // Пустая строка для начальной даты
    endDate: "" // Пустая строка для конечной даты
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    setFormData({
      title: "",
      responsible: "",
      goal: "",
      targetAudience: "",
      participantsCount: "",
      label: "",
      startDate: "",
      endDate: ""
    });
  };

  return (
    <div className="event-menu-container">
      <h3>Create Event</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Название:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
        Ответственный:
          <input
            type="text"
            name="responsible"
            value={formData.responsible}
            onChange={handleChange}
          />
        </label>
        <label>
          Цель:
          <input
            type="text"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
          />
        </label>
        <label>
        Целевая группа:
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
          />
        </label>
        <label>
        Количество участников:
          <input
            type="number"
            name="participantsCount"
            value={formData.participantsCount}
            onChange={handleChange}
          />
        </label>
        <label>
          Метка (цвет):
          <input
            type="color"
            name="label"
            value={formData.label}
            onChange={handleChange}
            style={{ backgroundColor: formData.label }}
          />
          <div
            className="color-preview"
            
          ></div>
        </label>
        <label>
          Начало:
          <input
            type="datetime-local"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Окончание:
          <input
            type="datetime-local"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default EventMenu;
