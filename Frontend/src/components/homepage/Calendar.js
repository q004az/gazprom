import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import 'moment/locale/ru'; // Импортируем русский язык для moment
import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("ru"); // Устанавливаем русский язык для moment
const localizer = momentLocalizer(moment);

const WORK_START_HOUR = 8; // Начало рабочего дня
const WORK_END_HOUR = 17; // Конец рабочего дня

export default function CalendarG() {
  const [eventsData, setEventsData] = useState(events);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("Название события:");
    if (!title) return;

    const startDate = new Date(start);
    const endDate = new Date(end);

    // Проверка наличия событий в выбранном интервале
    const isEventOverlap = eventsData.some(event => {
      return (
        (startDate >= new Date(event.start) && startDate < new Date(event.end)) ||
        (endDate > new Date(event.start) && endDate <= new Date(event.end)) ||
        (startDate <= new Date(event.start) && endDate >= new Date(event.end))
      );
    });

    if (isEventOverlap) {
      alert("Время занято");
      return;
    }

    // Если выбран весь день, создаем событие на весь день
    if (isWholeDay(start, end)) {
      const newEvent = {
        start: start,
        end: end,
        title: title
      };
      setEventsData([...eventsData, newEvent]);
      return;
    }

    const newEvent = {
      start: startDate,
      end: endDate,
      title: title
    };

    setEventsData([...eventsData, newEvent]);
  };

  // Функция для проверки, является ли интервал выбора "весь день"
  const isWholeDay = (start, end) => {
    return moment(start).startOf("day").isSame(moment(end).endOf("day"));
  };

  return (
    <div className="App">
      <Calendar
        views={["day", "week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
        min={new Date().setHours(WORK_START_HOUR, 0, 0, 0)} // Минимальное время для выбора
        max={new Date().setHours(WORK_END_HOUR, 0, 0, 0)} // Максимальное время для выбора
        formats={{
          timeGutterFormat: (date, culture, localizer) =>
            localizer.format(date, 'HH:mm', culture),
          eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
          agendaTimeRangeFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'HH:mm', culture)} - ${localizer.format(end, 'HH:mm', culture)}`,
          dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
            `${localizer.format(start, 'LL', culture)} - ${localizer.format(end, 'LL', culture)}`,
          dayHeaderFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd, LL', culture),
          dayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd, LL', culture),
          monthHeaderFormat: (date, culture, localizer) =>
            localizer.format(date, 'LLLL yyyy', culture),
          agendaDateFormat: (date, culture, localizer) =>
            localizer.format(date, 'dddd, LL', culture),
          agendaTimeFormat: (date, culture, localizer) =>
            localizer.format(date, 'HH:mm', culture),
        }}
      />
    </div>
  );
}
