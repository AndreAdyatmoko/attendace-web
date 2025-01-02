"use client";

import React, { useEffect, useState } from "react";
import AddNewStudents from "./_components/AddNewStudents";
import GlobalApi from "@/app/_services/GlobalApi";
import StudentListTable from "./_components/StudentListTable";

function Student() {
  // Declare state at the top level of the component
  const [studentList, setStudentList] = useState([]);

  // Fetch all the data of students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await GlobalApi.GetALLStudent(); // Function to call the API
        if (response?.data) {
          setStudentList(response.data); // Update state with fetched data
          console.log("Fetched Student Data:", response.data);
        } else {
          console.warn("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="p-7">
      <h2 className="font-bold text-2xl flex justify-between items-center">
        Students
        <AddNewStudents />
      </h2>
      {/* Pass the studentList state as props to StudentListTable */}
      <StudentListTable studentList={studentList} />
    </div>
  );
}

export default Student;
