import Logo from "./Logo";
import DashboardMenu from "./DashboardMenu";
import { useState, useEffect } from "react";
const EditAboutMe = () => {
  const [teacher, setTeacher] = useState(null);

  // Witout useEffect only UI renders but with useEffect it render updated teacher data when page loads.

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/teacher`);
        const data = await res.json();
        if (data.success) {
          setTeacher(data.teacher);
          console.log(data.teacher);
        }
      } catch (error) {
        console.error("Error fetching teacher:", error);
      }
    };
    fetchTeacher();
  }, []); // empty array means run only once on page load

  const handleSubmit = async (e) => {
    e.preventDefault();

    // This line collects all the input values from the form that was submitted and stores them in a special object (formData) so you can easily use or send them.
    const formData = new FormData(e.target);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/teacher`, {
      method: "Post",
      body: formData,
    });
    if (!response.ok) {
      console.error("Error:", response.statusText);
    }

    const data = await response.json();
    setTeacher(data.teacher);
    e.target.reset(); // ✅ clear form inputs
  };

  // Delete Data from database
  const handleDelete = async () => {
    const responseDel = await fetch(
      `${import.meta.env.VITE_API_URL}/teacher/${teacher.id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePath: teacher.imageUrl }),
      }
    );
    const resData = await responseDel.json();
    console.log(resData);

    setTeacher(null); // Clear UI
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
