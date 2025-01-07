"use client";

import React, { useEffect, useState } from "react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

// Import AG Grid styles
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import moment from "moment";

function AttendanceGrid({ attendaceList, selectedMonth }) {
  const [rowData, setRowData] = useState([]);
  const [colDefs, setColDefs] = useState([]);

  useEffect(() => {
    console.log("Attendance List:", attendaceList); // Log data attendaceList yang diterima

    // Generate column definitions
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const numberOfDays = daysInMonth(
      moment(selectedMonth).format("YYYY"),
      moment(selectedMonth).format("MM") - 1
    );
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    const initialColDefs = [
      { field: "id", headerName: "ID", width: 70 },
      { field: "studentName", headerName: "Name", width: 200 },
      ...daysArray.map((date) => ({
        field: date.toString(),
        headerName: `${date}`,
        width: 50,
        editable: true,
      })),
    ];

    setColDefs(initialColDefs);

    // Process and set row data
    const userList = getUniqueRecord();

    console.log("Unique User List:", userList); // Log daftar siswa yang unik

    // Add default attendance fields (false for each day)
    const enrichedUserList = userList.map((obj) => {
      daysArray.forEach((day) => {
        obj[day] = isPresent(obj.id, day); // Initialize attendance for each day as false
      });
      return obj;
    });

    console.log("Enriched User List:", enrichedUserList); // Log daftar siswa yang sudah di-enrich

    setRowData(enrichedUserList);
  }, [attendaceList, selectedMonth]);

  // Function to get unique students based on studentId
  const getUniqueRecord = () => {
    const uniqueRecord = [];
    const existingUser = new Set();

    attendaceList?.forEach((record, index) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push({
          ...record,
          id: uniqueRecord.length + 1, // Sequential ID
        });
      }
    });

    return uniqueRecord;
  };

  // Function to check if a student is present on a given day
  const isPresent = (studentId, day) => {
    const result = attendaceList.find(item => item.day === day && item.studentId === studentId);
    console.log(`Checking presence for student ${studentId} on day ${day}:`, result); // Log hasil pengecekan
    return result ? true : false;
  };

  return (
    <div>
      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default AttendanceGrid;
