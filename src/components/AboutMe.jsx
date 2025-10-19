import { useState, useEffect } from "react";
import teacherImage from "../assets/images/teacherImage.jpg";

const AboutMe = () => {
  const [teacherData, setTeacherData] = useState(null);
  // On page load useeffect will rended that teacher data for one time.
  useEffect(() => {
    // function to fetch teacher data from database
    const fetchTeacher = async () => {
      try {
        const res = await fetch("http://localhost:4000/teacher");
        const data = await res.json();
        if (data.success) {
          setTeacherData(data.teacher);
        }
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };
    fetchTeacher();
  }, []);

  return (
    <div className="about-me-container">
      <h2>About Me</h2>
      {teacherData && (
        <div className="about-me-child-container">
          <div className="about-me-image">
            <img
              src={teacherData.imageUrl}
              alt="teacher image"
              srcSet=""
              id="about-me-teacher-image"
            />
          </div>
          <div className="about-me-content">
            <h3>{teacherData.name}</h3>
            <p>{teacherData.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutMe;
