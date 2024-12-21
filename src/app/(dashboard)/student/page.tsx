"use client"
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalendar from "@/components/EventCalendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React from "react";

const StudentPage = () => {
  return (
    <div className="flex flex-col xl:flex-row p-4">
      {/* LEFT */}
      <div className="w-full xl:w-2/3 ">
        <div className="h-full bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold">Schedule 1A </h1>
          <BigCalendar/>
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
