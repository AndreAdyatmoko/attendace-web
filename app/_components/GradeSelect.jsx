"use client";

import React, { useEffect, useState } from "react";
import GlobalApi from "../_services/GlobalApi";

// Fix: Destructure props correctly to get `selectedGrade`
function GradeSelect({ selectedGrade }) {
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    GlobalApi.GetAllGrades().then((resp) => {
      setGrades(resp.data);
    });
  }, []);

  return (
    <div>
      <select
        className="p-2 border rounded-lg font-bold"
        onChange={(e) => selectedGrade(e.target.value)} // Pass selected value to the parent
      >
        {grades.map((item, index) => (
          <option key={index} value={item.grade}>
            {item.grade}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GradeSelect;
