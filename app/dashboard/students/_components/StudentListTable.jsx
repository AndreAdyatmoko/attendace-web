"use client";

import React, { useState } from "react";

const StudentListTable = ({ studentList }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = studentList.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(studentList.length / rowsPerPage);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student List Table</h2>
      {studentList.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>No</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((student, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{indexOfFirstRow + index + 1}</td>
                  <td style={styles.td}>{student.name}</td>
                  <td style={styles.td}>{student.address}</td>
                  <td style={styles.td}>{student.contact}</td>
                  <td style={styles.td}>{student.grade}</td>
                </tr>
              ))}
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
                backgroundColor: currentPage === index + 1 ? "#007bff" : "#f4f4f4",
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
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    minWidth: "600px", // Membantu memastikan tabel memiliki lebar minimum
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
    flexWrap: "wrap", // Agar tombol pagination tetap rapi di layar kecil
    gap: "5px",
  },
  pageButton: {
    border: "1px solid #ddd",
    padding: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    minWidth: "40px", // Ukuran tombol minimum
    textAlign: "center",
  },
};

export default StudentListTable;
