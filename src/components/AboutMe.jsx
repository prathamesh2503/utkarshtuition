import teacherImage from "../assets/images/teacherImage.jpg";
const AboutMe = () => {
  return (
    <div className="about-me-container">
      <h2>About Me</h2>
      <div className="about-me-child-container">
        <div className="about-me-image">
          <img
            src={teacherImage}
            alt=""
            srcset=""
            id="about-me-teacher-image"
          />
        </div>
        <div className="about-me-content">
          <h3>Teacher Name</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae
            officiis est debitis veritatis nostrum libero architecto blanditiis
            consectetur fuga veniam!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
