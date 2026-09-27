import Logo from "./Logo";
import DashboardMenu from "./DashboardMenu";
import { useState, useEffect } from "react";
const EditAboutMe = () => {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/teacher`);
        const data = await res.json();
        if (data.success) {
          setTeacher(data.teacher);
          console.log(data.teacher);
        } else {
          return;
        }
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };
    fetchTeacher();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherFormData = new FormData(e.target);
    console.log(teacherFormData);

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/teacher`,
      {
        method: "POST",
        body: teacherFormData,
      },
    );
    if (!response.ok) {
      console.error("Error:", response.statusText);
    }

    const data = await response.json();
    setTeacher(data.teacher);
    e.target.reset();
  };

  const handleDelete = async () => {
    const responseDel = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/teacher/${teacher.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath: teacher.imageUrl }),
      },
    );
    const resData = await responseDel.json();
    console.log(resData);

    setTeacher(null);
  };

  return (
    <>
      <header id="main-header">
        <Logo />
      </header>
      <main className="dashboard-container">
        <DashboardMenu />
        <div className="dashboard-function-container">
          <h3 className="dashboard-heading">Edit About Me </h3>
          <form
            onSubmit={handleSubmit}
            action=""
            className="edit-about-me-form"
          >
            <div className="form-row">
              <label htmlFor="teacher-image">Teacher Image</label>
              <input type="file" name="teacher-image" id="teacher-image" />
            </div>
            <div className="form-row">
              <label htmlFor="teacher-name">Full Name</label>
              <input type="text" name="teacher-name" id="teacher-name" />
            </div>
            <div className="form-row">
              <label htmlFor="about-me-description">About Me Description</label>
              <textarea
                name="about-me-description"
                id="about-me-description"
              ></textarea>
            </div>
            <input type="submit" value="Submit" />
          </form>
          {/* Display added teacher data */}
          <div className="data-container">
            <h3>Show About Me Data</h3>
            <div className="data-scroll">
              <div className="data-row">
                <div className="data-style">Teacher Image</div>
                <div className="data-style">Teacher Name</div>
                <div className="data-style">About Me Description</div>
                <div className="data-style">Add/Delete</div>
              </div>
              {teacher && (
                <div className="data-row">
                  <div className="data-style">
                    <img
                      src={teacher.imageUrl}
                      alt="teacher image"
                      className="teacher-img"
                    />
                  </div>

                  <div className="data-style"> {teacher.name}</div>
                  <div className="data-style">{teacher.description}</div>
                  <div className="data-style" id="teacher-data-btn">
                    <button onClick={handleDelete}>Delete</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditAboutMe;
