import { useEffect, useState } from "react";

const Achievement = () => {
  const [students, setStudents] = useState([]);
  const [selectedStandard, setSelectedStandard] = useState("");
  const [appliedStandard, setAppliedStandard] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
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

    fetchStudent();
  }, []);

  const filteredStudents = students.filter(
    (student) =>
      !appliedStandard || student.studentStandard === appliedStandard,
  );

  return (
    <section id="achievement">
      <div className="achivement-container">
        <h2>Achievement of Students</h2>
        <form
          className="achievement-filter"
          onSubmit={(event) => {
            event.preventDefault();
            setAppliedStandard(selectedStandard);
          }}
        >
          <label htmlFor="achievement-standard-filter">
            Filter by standard
          </label>
          <select
            id="achievement-standard-filter"
            value={selectedStandard}
            onChange={(event) => setSelectedStandard(event.target.value)}
          >
            <option value="">All standards</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
            <option value="Third">Third</option>
            <option value="Fourth">Fourth</option>
            <option value="Fifth">Fifth</option>
          </select>
          <button type="submit">Apply filter</button>
          <button
            onClick={() => {
              setAppliedStandard("");
              setSelectedStandard("");
            }}
          >
            Reset
          </button>
        </form>
        <div className="achievement-cards-container">
          {Array.isArray(filteredStudents) &&
            filteredStudents.map((student) => {
              return (
                <div className="achievement-student-card" key={student.id}>
                  <img
                    src={student.imageUrl}
                    alt="image"
                    margin="5px"
                    width="90px"
                    height="90px"
                    loading="lazy"
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
          {filteredStudents.length === 0 && (
            <p className="achievement-empty-state">
              No student achievements found for this standard.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Achievement;
