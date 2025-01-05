"use client";

import GradeSelect from "@/app/_components/GradeSelect";
import MonthSelection from "@/app/_components/MonthSelection";
import GlobalApi from "@/app/_services/GlobalApi";
import { Button } from "@/components/ui/button";
import moment from "moment";
import React, { useState } from "react";
import AttendanceGrid from "./_components/AttendaceGrid";

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState([]);

  // Hanlder to fetch attendace

  const onSearchHandler = () => {
    if (!selectedMonth || !selectedGrade) {
      console.error("Please select both month and grade.");
      return;
    }
    const month = moment(selectedMonth).format("MM/YYYY");
    GlobalApi.GetAttendanceList(selectedGrade, month).then((resp) => {
      setAttendanceList(resp.data);
    });
  };
  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold">Attendance</h2>
      {/* Search Option */}
      <div className="flex gap-5 my-5 p-5 rounded-lg shadow-md">
        <div className="flex gap-2 items-center">
          <label>Select Month:</label>
          <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
        </div>
        <div className="flex gap-2 items-center">
          <label>Select Grade:</label>
          <GradeSelect selectedGrade={(value) => setSelectedGrade(value)} />
        </div>
        <Button onClick={onSearchHandler}>Search</Button>
      </div>

      {/* Student Attendance Grid */}
      <AttendanceGrid attendaceList={attendanceList} />
    </div>
  );
}

export default Attendance;
