import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const StudentListTable = ({ studentList }) => {
  const colDef = [
    { field: "id", headerName: "ID", filter: true },
    { field: "name", headerName: "Name", filter: true },
    { field: "address", headerName: "Address", filter: true },
    { field: "contact", headerName: "Contact", filter: true },
    { field: "grade", headerName: "Grade", filter: true }, // Add grade to the columns
  ];

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    console.log("Received Student List:", studentList);
    setRowData(studentList?.result || []); // Extract `result` and set to rowData
  }, [studentList]);

  return (
    <div>
      <h2>Student List Table</h2>
      <div
        className="ag-theme-alpine"
        style={{
          height: "400px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <AgGridReact
          rowData={rowData} // Use rowData for the grid
          columnDefs={colDef} // Use columnDefs to match data keys
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
};

export default StudentListTable;
