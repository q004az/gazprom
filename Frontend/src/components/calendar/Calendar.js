import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/ru'; // Импортируем русский язык для moment
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventMenu from "../EventModal/EventModal";

moment.locale("ru");
const localizer = momentLocalizer(moment);

const WORK_START_HOUR = 8;
const WORK_END_HOUR = 17;

export default function CalendarG() {
  const [eventsData, setEventsData] = useState(events);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelect = ({ start, end }) => {
    setSelectedSlot({ start, end });
  };

  const handleSaveEvent = (formData) => {
    const { title, responsible, goal, targetAudience, participantsCount, label, startDate, endDate } = formData;

    if (!title || !startDate || !endDate) {
      alert("Please fill in all required fields");
      return;
    }

    const newEvent = {
      start: new Date(startDate),
      end: new Date(endDate),
      title: title,
      responsible: responsible,
      goal: goal,
      targetAudience: targetAudience,
      participantsCount: participantsCount,
      label: label,
    };

    setEventsData([...eventsData, newEvent]);
    setSelectedSlot(null);
  };

  const eventMonthFormat = (event, culture, localizer) => {
    const startDate = moment(event.start).format("LT");
    const endDate = moment(event.end).format("LT");
    return (
      <div>
        <strong>{event.title}</strong>
        <div>{`${startDate} - ${endDate}`}</div>
      </div>
    );
  };

  const eventPropGetter = (event) => {
    let backgroundColor = "#3174ad";
    if (event.label) {
      backgroundColor = event.label;
    }
    return {
      style: {
        backgroundColor: backgroundColor,
        borderRadius: "0px",
        opacity: 0.8,
        color: "white",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <div className="calendar-container">
      <div className="calendar-content">
        <Calendar
          views={["day", "week", "month"]}
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          events={eventsData}
          style={{ width: "80%" }} // Устанавливаем ширину календаря
          onSelectSlot={handleSelect}
          min={new Date().setHours(WORK_START_HOUR, 0, 0, 0)}
          max={new Date().setHours(WORK_END_HOUR, 0, 0, 0)}
          formats={{
            eventMonthFormat: eventMonthFormat
          }}
          eventPropGetter={eventPropGetter}
        />
      </div>
      <div className="event-menu">
        <EventMenu onSave={handleSaveEvent} />
      </div>
    </div>
  );
}
