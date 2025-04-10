import React, { useState, useEffect } from 'react';
import AddStudent from './components/AddStudent';
import GetStudent from './components/GetStudent';
import UpdateStudent from './components/UpdateStudent';
import DeleteStudent from './components/DeleteStudent';
import axios from 'axios';
import './App.css';

function App() {
  const [activeComponent, setActiveComponent] = useState(null);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch students from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/student/');
      setStudents(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setIsLoading(false);
    }
  };

  // Initial fetch and refresh when active component changes
  useEffect(() => {
    fetchStudents();
  }, [activeComponent]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'add':
        return <AddStudent onSuccess={() => { setActiveComponent(null); fetchStudents(); }} />;
      case 'get':
        return <GetStudent onBack={() => setActiveComponent(null)} />;
      case 'update':
        return <UpdateStudent onSuccess={() => { setActiveComponent(null); fetchStudents(); }} />;
      case 'delete':
        return <DeleteStudent onSuccess={() => { setActiveComponent(null); fetchStudents(); }} />;
      default:
        return (
          <div className="button-container">
            <h3>Select an operation</h3>
            <button className="btn" onClick={() => setActiveComponent('add')}>
              Add Student
            </button>
            <button className="btn" onClick={() => setActiveComponent('get')}>
              View Student
            </button>
            <button className="btn" onClick={() => setActiveComponent('update')}>
              Update Student
            </button>
            <button className="btn" onClick={() => setActiveComponent('delete')}>
              Delete Student
            </button>
          </div>
        );
    }
  };

  const handleBack = () => {
    setActiveComponent(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          {activeComponent && (
            <button className="back-btn" onClick={handleBack}>
              &larr; Back
            </button>
          )}
          <h1>Student Record Manager</h1>
        </div>
      </header>
      <main className="app-main">
        {!activeComponent && (
          <div className="students-table-container">
            <h2>Registered Students</h2>
            {isLoading ? (
              <p>Loading students...</p>
            ) : students.length === 0 ? (
              <p>No students registered yet.</p>
            ) : (
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Reg. No</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Marks in IA 1</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.registrationNo}>
                      <td>{student.registrationNo}</td>
                      <td>{student.name}</td>
                      <td>{student.class}</td>
                      <td>{student.subject1_IAMarks}</td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        {renderComponent()}
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Student Management System</p>
      </footer>
    </div>
  );
}

export default App;