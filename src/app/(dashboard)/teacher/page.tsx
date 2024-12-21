"use client"
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";

const TeacherPage = () => {
  return (
    <div className=" flex-1 flex flex-col xl:flex-row p-4 gap-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
        <div className="h-full bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold">Schedule (Hacer Kılıç) </h1>
          <BigCalendar/>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage
