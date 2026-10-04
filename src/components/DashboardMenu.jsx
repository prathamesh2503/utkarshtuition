// import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardMenu = () => {
  const navigate = useNavigate();
  // About Me

  const handleAboutMe = () => {
    navigate("/editAboutMe");
  };

  const handleAchievement = () => {
    navigate("/editAchievement");
  };

  const { logout } = useAuth();

  // Logout
  // const handleLogout = async () => {

  // };
  return (
    <div className="dashboard-menu-container">
      <h5 className="dashboard-menu" onClick={handleAboutMe}>
        Edit About Me
      </h5>
      <h5 className="dashboard-menu" onClick={handleAchievement}>
        Edit Achievements
      </h5>
      <h5 className="dashboard-menu" onClick={logout}>
        Logout
      </h5>
    </div>
  );
};

export default DashboardMenu;
