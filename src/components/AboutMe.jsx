import { useState, useEffect } from "react";
import AboutMeSkeleton from "../skeleton/AboutMeSkeleton";

const AboutMe = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teacherData, setTeacherData] = useState(null);
  // On page load useeffect will rended that teacher data for one time.
  useEffect(() => {
    // function to fetch teacher data from database
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teacher`);

        const data = await res.json();

        if (data.success) {
          setTeacherData(data.teacher);
        }
      } catch (error) {
        console.error("Error fetching teacher:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeacher();
  }, []);

  return (
    <section id="about">
      <div className="about-me-container">
        <h2>About Me</h2>
        {isLoading ? (
          <AboutMeSkeleton />
        ) : teacherData ? (
          <div className="about-me-child-container">
            <div className="about-me-image">
              <img
                src={teacherData.imageUrl}
                alt="teacher image"
                srcSet=""
                id="about-me-teacher-image"
                width="150px"
                height="100%"
              />
            </div>
            <div className="about-me-content">
              <h3>{teacherData.name}</h3>
              <p>{teacherData.description}</p>
            </div>
          </div>
        ) : (
          <p>Teacher data is not available.</p>
        )}
      </div>
    </section>
  );
};

export default AboutMe;
