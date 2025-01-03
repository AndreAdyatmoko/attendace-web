"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react"; // Corrected import
import { Trash } from "lucide-react"; // Corrected import
import React, { useState } from "react";

const StudentListTable = ({ studentList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 5;

  const CustomButtons = () => {
    return (
      <Button variant="destructive">
        <Trash />
      </Button>
    );
  };

  // Filter students based on search query
  const filteredList = studentList.filter((student) =>
    Object.values(student)
      .join("")
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Pagination logic using the filtered list
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredList.slice(indexOfFirstRow, indexOfLastRow); // Apply pagination to filtered list

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredList.length / rowsPerPage); // Use filtered list for total pages

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student List Table</h2>
      {studentList.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          {/* Fixed Search Bar */}
          <div
            style={styles.searchWrapper}
            className="relative mb-4 max-w-sm items-center"
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search
                style={styles.searchIconInside}
                className="text-gray-400"
              />
            </div>
            <input
              type="text"
              placeholder="Search here"
              style={styles.searchInputWithIcon}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 rounded-lg shadow-sm w-full pl-10"
            />
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>No</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Grade</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((student, index) => (
                  <tr key={index} style={styles.tr}>
                    <td style={styles.td}>{indexOfFirstRow + index + 1}</td>
                    <td style={styles.td}>{student.name}</td>
                    <td style={styles.td}>{student.address}</td>
                    <td style={styles.td}>{student.contact}</td>
                    <td style={styles.td}>{student.grade}</td>
                    <td style={styles.td}>
                      <CustomButtons />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={styles.td}>
                    No students match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              style={{
                ...styles.pageButton,
                backgroundColor:
                  currentPage === index + 1 ? "#007bff" : "#f4f4f4",
                color: currentPage === index + 1 ? "#fff" : "#000",
              }}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    margin: "auto",
    maxWidth: "100%",
    boxSizing: "border-box",
  },
  title: {
    textAlign: "center",
    fontSize: "1.5rem",
    marginBottom: "20px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  searchIconInside: {
    color: "#666",
    fontSize: "20px",
  },
  searchInputWithIcon: {
    padding: "8px",
    paddingLeft: "35px", // Space for the search icon
    border: "1px solid #ddd",
    borderRadius: "4px",
    flexGrow: 1,
    boxSizing: "border-box", // Make sure padding does not affect input size
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    minWidth: "600px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
  tr: {
    transition: "background-color 0.3s ease",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    flexWrap: "wrap",
    gap: "5px",
  },
  pageButton: {
    border: "1px solid #ddd",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    minWidth: "40px",
    textAlign: "center",
  },
};

export default StudentListTable;
