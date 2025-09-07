import Logo from "./logo";
import DashboardMenu from "./DashboardMenu";
import teacherImage from "../assets/images/teacherImage.jpg";
const EditAboutMe = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // This line collects all the input values from the form that was submitted and stores them in a special object (formData) so you can easily use or send them.
    const formData = new FormData(e.target);

    const response = await fetch("http://localhost:4000/teacher", {
      method: "Post",
      body: formData,
    });
    console.log(response);
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
          <div className="teacher-data-container">
            <h3>Show About Me Data</h3>
            <div className="teacher-data-scroll">
              <div className="teacher-data-row">
                <div className="teacher-data-style">Teacher Image</div>
                <div className="teacher-data-style">Teacher Name</div>
                <div className="teacher-data-style">About Me Description</div>
                <div className="teacher-data-style">Add/Delete</div>
              </div>
              <div className="teacher-data-row">
                <div className="teacher-data-style">
                  <img src={teacherImage} alt="" className="teacher-img" />
                </div>

                <div className="teacher-data-style"> Teacher Name</div>
                <div className="teacher-data-style">About Me Description</div>
                <div className="teacher-data-style" id="teacher-data-btn">
                  <button>Add</button>
                  <button>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default EditAboutMe;
