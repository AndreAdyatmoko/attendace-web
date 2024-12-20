"use client"

import React, { useEffect } from "react";
import AddNewStudents from "./_components/AddNewStudents";
import GlobalApi from "@/app/_services/GlobalApi";

function Student() {
  // API tht use to gel all students

  const GetAllStudent = () => {
    useEffect(() => {
      GetAllStudent();
    }, []);
    GlobalApi.GetALLStudent.then((resp) => {
      console.log(resp?.data);
    });
  };
  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudents />
      </h2>
    </div>
  );
}

export default Student;
