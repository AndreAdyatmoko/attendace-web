"use client";

import GradeSelect from "@/app/_components/GradeSelect";
import MonthSelection from "@/app/_components/MonthSelection";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

function Attendance() {
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState(); // State to store selected grade

  const onSearchHandler = () => {
    console.log(selectedMonth, selectedGrade); // Log the selected values
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
          {/* Correctly pass the function to GradeSelect */}
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
        <Button onClick={onSearchHandler}>Search</Button>
      </div>

      {/* Student Attendance Grid */}
    </div>
  );
}

export default Attendance;
