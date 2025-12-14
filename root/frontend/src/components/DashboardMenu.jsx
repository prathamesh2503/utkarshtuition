import { useNavigate } from "react-router-dom";
const DashboardMenu = () => {
  const navigate = useNavigate();
  // About Me

  const handleAboutMe = () => {
    navigate("/editAboutMe");
  };

  const handleAchievement = () => {
    navigate("/editAchievement");
  };

  // Logout
  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/logout`, {
        method: "Post",
        credentials: "include",
      });
      navigate("/login");
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <div className="dashboard-menu-container">
      <h5 className="dashboard-menu" onClick={handleAboutMe}>
        Edit About Me
      </h5>
      <h5 className="dashboard-menu" onClick={handleAchievement}>
        Edit Achievements
      </h5>
      <h5 className="dashboard-menu" onClick={handleLogout}>
        Logout
      </h5>
    </div>
  );
};

export default DashboardMenu;
