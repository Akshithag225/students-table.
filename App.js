import React, { useState } from "react";
import StudentTable from "./components/StudentTable";
import StudentForm from "./components/StudentForm";
import studentsData from "./data/students.json";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function App() {

  const [students, setStudents] = useState(studentsData);

  // Add student
  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  // Delete student
  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  // Edit student
  const editStudent = (student) => {
    const newName = prompt("Enter new name", student.name);
    const newEmail = prompt("Enter new email", student.email);
    const newAge = prompt("Enter new age", student.age);

    if (newName && newEmail && newAge) {
      setStudents(
        students.map((s) =>
          s.id === student.id
            ? { ...s, name: newName, email: newEmail, age: newAge }
            : s
        )
      );
    }
  };

  // Download Excel
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const data = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });

    saveAs(data, "students.xlsx");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>Students Table</h1>

      <StudentForm addStudent={addStudent} />

      <br />

      <button onClick={downloadExcel}>
        Download Excel
      </button>

      <StudentTable
        students={students}
        deleteStudent={deleteStudent}
        editStudent={editStudent}
      />

    </div>
  );
}

export default App;
