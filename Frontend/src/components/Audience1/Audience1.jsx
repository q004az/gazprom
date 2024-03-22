import React from "react";
import Header from "../Header/Header";
import CalendarG from "../calendar/Calendar";
import Footer from "../Footer/Footer";

import "../../styles/Audience1.css"

export default function Audience1 (){
    return(
        <div className="Audience">
            <Header />
            <div className="calendar__cont">
              <CalendarG />
            </div>
            
            <Footer />
        </div>
    )
}
