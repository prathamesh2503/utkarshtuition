import Logo from "./Logo";
import DashboardMenu from "./DashboardMenu";
import { useEffect, useState } from "react";
const EditAchievement = () => {
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentStandard, setStudentStandard] = useState("");
  const [studentPassoutYear, setStudentPassoutYear] = useState("");
  const [studentPercentage, setStudentPercentage] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/student`);
        const data = await res.json();
        if (data.success) {
          setStudents(data.students);
        }
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };
    fetchStudents();
  }, [students]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    if (editingStudentId !== null) {
      formData.append("student-id", String(editingStudentId));
    }

    const studentImage = formData.get("student-image");
    const studentName = formData.get("student-name");
    const studentStandard = formData.get("student-standard");
    const studentPassoutYear = formData.get("student-passout-year");
    const studentPercentage = formData.get("student-percentage");

    const newErrors = {};

    if (editingStudentId === null && studentImage.name === "") {
      newErrors.studentImage = "Please select image file.";
    }

    if (!studentName || studentName.trim().length < 3) {
      newErrors.studentName = "Name shoud be atleast 3 characters";
    }

    if (!studentStandard) {
      newErrors.studentStandard = "Please select student standard";
    }
    if (!studentPassoutYear) {
      newErrors.studentPassoutYear = "Please select student passout year";
    }
    if (!studentPercentage) {
      newErrors.studentPercentage = "Student percentage is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(studentPercentage)) {
      newErrors.studentPercentage =
        "Percentage must be a positive number (up to 2 decimals).";
    } else if (parseFloat(studentPercentage) > 100) {
      newErrors.studentPercentage = "Percentage cannot be greater than 100.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    alert("Student added successfully!");

    setErrors({});

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/student`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    if (!response.ok || !data.success) {
      throw new Error(data.message || data.error || "Could not save student");
    }
    console.log(data);
    setStudentName("");
    setStudentStandard("");
    setStudentPassoutYear("");
    setStudentPercentage("");
  };

  useEffect(() => {
    if (errors.studentImage) {
      alert(errors.studentImage);
    }
    if (errors.studentName) {
      alert(errors.studentName);
    }
    if (errors.studentStandard) {
      alert(errors.studentStandard);
    }
    if (errors.studentPassoutYear) {
      alert(errors.studentPassoutYear);
    }
    if (errors.studentPercentage) {
      alert(errors.studentPercentage);
    }
  }, [errors]);

  const handleEdit = (studentId) => {
    const studentToEdit = students.find((student) => student.id === studentId);
    if (!studentToEdit) return;
    setEditingStudentId(studentToEdit.id);
    setStudentName(studentToEdit.studentName);
    setStudentStandard(studentToEdit.studentStandard);
    setStudentPassoutYear(String(studentToEdit.studentPassoutYear));
    setStudentPercentage(String(studentToEdit.studentPercentage));
  };

  const handleDelete = async (studentId, imagePath) => {
    const encodedImagePath = encodeURIComponent(imagePath);

    const responseDel = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/student/${studentId}?imagePath=${encodedImagePath}`,
      {
        method: "DELETE",
      },
    );

    const data = await responseDel.json();
    console.log(data);
    setStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  return (
    <>
      <header id="main-header">
        <Logo />
      </header>
      <main className="dashboard-container">
        <DashboardMenu />
        <div className="dashboard-function-container">
          <h3 className="dashboard-heading">Edit Achievement</h3>
          <form
            onSubmit={handleSubmit}
            action=""
            className="edit-about-me-form"
          >
            <div>
              <label htmlFor="student-image">Student Photo</label>
              <input type="file" name="student-image" id="student-image" />
            </div>

            <label htmlFor="student-name">Student Name</label>
            <input
              type="text"
              name="student-name"
              id="student-name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
            <label htmlFor="student-standard">Student Standard</label>
            <select
              name="student-standard"
              id="student-standard"
              value={studentStandard}
              onChange={(e) => setStudentStandard(e.target.value)}
            >
              <option value="">Select</option>
              <option value="First">First</option>
              <option value="Second">Second</option>
              <option value="Third">Third</option>
              <option value="Fourth">Fourth</option>
              <option value="Fifth">Fifth</option>
            </select>
            <label htmlFor="student-passout-year">Student Passout Year</label>
            <select
              name="student-passout-year"
              id="student-passout-year"
              value={studentPassoutYear}
              onChange={(e) => setStudentPassoutYear(e.target.value)}
            >
              <option value="">Select</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <label htmlFor="student-percentage">Student Percentage</label>
            <input
              type="number"
              name="student-percentage"
              id="student-percentage"
              step="0.01"
              value={studentPercentage}
              onChange={(e) => setStudentPercentage(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
          <div className="data-container">
            <h3>Display Student List</h3>
            <div className="data-scroll">
              <div className="data-row">
                <div className="data-style">Student Image</div>
                <div className="data-style">Student Name</div>
                <div className="data-style">Student Standard</div>
                <div className="data-style">Student Passout Year</div>
                <div className="data-style">Student Percentage </div>
                <div className="data-style">Delete</div>
              </div>

              {Array.isArray(students) &&
                students.map((student) => (
                  <div className="data-row" key={student.id}>
                    <div className="data-style">
                      <img
                        src={student.imageUrl}
                        alt="image"
                        margin="5px"
                        width="90px"
                        height="90px"
                      />
                    </div>
                    <div className="data-style">{student.studentName}</div>
                    <div className="data-style">{student.studentStandard}</div>
                    <div className="data-style">
                      {student.studentPassoutYear}
                    </div>
                    <div className="data-style">
                      {student.studentPercentage}
                    </div>
                    <div className="data-style">
                      <div>
                        <button onClick={() => handleEdit(student.id)}>
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          onClick={() =>
                            handleDelete(student.id, student.imageUrl)
                          }
                        >
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditAchievement;
