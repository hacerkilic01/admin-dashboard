"use client";
type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
import 'react-calendar/dist/Calendar.css';


import React, { useState } from "react";
import Calendar from "react-calendar";

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='bg-white '>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default EventCalendar;
