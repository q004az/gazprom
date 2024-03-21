import React from "react";
import Header from "../Header/Header";
import CalendarG from "../calendar/Calendar";

export default function Audience1() {
  const role = "Admin"; // Установите нужное значение для роли
  const id = 1; // Установите нужное значение для id

  return (
    <div className="Audience">
      <Header />
      <CalendarG role={role} id={id} />
    </div>
  );
}
