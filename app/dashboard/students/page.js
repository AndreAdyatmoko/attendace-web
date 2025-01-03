"use client";

import React, { useEffect, useState } from "react";
import AddNewStudents from "./_components/AddNewStudents";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentListTable from "./_components/StudentListTable"; // Pastikan import ini benar

function Student() {
  const [studentList, setStudentList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await GlobalApi.GetALLStudent();
        if (response?.data?.result) {
          setStudentList(response.data.result);
        } else {
          console.warn("No student data found in response");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const addStudent = (newStudent) => {
    setStudentList((prevList) => [...prevList, newStudent]);
  };

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudents onAddStudent={addStudent} />
      </h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <StudentListTable studentList={studentList} />
      )}
    </div>
  );
}

export default Student;
