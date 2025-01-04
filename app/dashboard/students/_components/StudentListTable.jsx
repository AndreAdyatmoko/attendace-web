import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react"; // Corrected imports
import React, { useState } from "react";
import axios from "axios"; // Import axios
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const StudentListTable = ({ studentList, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const rowsPerPage = 5;

  const CustomButtons = ({ id, onDelete }) => {
    const deleteRecord = async () => {
      console.log(`Deleting student with id: ${id}`);
      try {
        // Call the backend API to delete the student using axios
        const response = await axios.delete(`/api/student/${id}`);
        console.log("Response:", response);

        if (response.status === 200) {
          console.log("Student deleted successfully");
          onDelete(id); // Remove the student from the parent state
        } else {
          console.error("Failed to delete the student");
          alert("Failed to delete student.");
        }
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("An error occurred while deleting the student.");
      }
    };

    return (
      <AlertDialog>
        <AlertDialogTrigger>
          <Button variant="destructive">
            <Trash />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              record and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={deleteRecord}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
  const currentRows = filteredList.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredList.length / rowsPerPage);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student List Table</h2>
      {studentList.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <div style={styles.tableWrapper}>
          {/* Search Bar */}
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

          {/* Student Table */}
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
                      <CustomButtons id={student.id} onDelete={onDelete} />
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
    paddingLeft: "35px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    flexGrow: 1,
    boxSizing: "border-box",
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
    textAlign: "left",
    textAlign: "left",
  },
};

export default StudentListTable;
