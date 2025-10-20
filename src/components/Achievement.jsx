import { useEffect, useState } from "react";

const Achievement = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/student");
        const data = await res.json();

        if (data.success) {
          setStudents(data.students);
        }
      } catch (error) {
        console.error("Error fetching students", error);
      }
    };

    fetchStudent();
  }, []);

  return (
    <section id="achievement">
      <div className="achivement-container">
        <h2>Achievement of Students</h2>
        <div className="achievement-cards-container">
          {Array.isArray(students) &&
            students.map((student) => {
              return (
                <div className="achievement-student-card">
                  <img
                    src={student.imageUrl}
                    alt="image"
                    className="student-image"
                  />
                  <div className="student-name">
                    Name : {student.studentName}
                  </div>
                  <div className="student-standard">
                    Standard : {student.studentStandard}
                  </div>
                  <div className="student-passout-year">
                    Passount Year : {student.studentPassoutYear}
                  </div>
                  <div className="student-percentage">
                    Percentage : {student.studentPercentage}%
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Achievement;
