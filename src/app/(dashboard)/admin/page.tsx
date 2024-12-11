import CountChart from "@/components/CountChart";
import UserCard from "@/components/UserCard";
import React from "react";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 ">
        {/* USER CARDS */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parents" />
          <UserCard type="staff" />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex:row"></div>
        {/* COUNT CHARTS */}
        <div className="w-full lg:w-1/3 h-[450px]">
        <CountChart/>
        </div>
        {/* ATTENDANCE CHARTS */}
        <div className="w-full lg:w-2/3 h-[450px]"></div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3">R</div>
    </div>
  );
};

export default AdminPage;
