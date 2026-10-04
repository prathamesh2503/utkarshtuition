import Logo from "./Logo";
import DashboardMenu from "./DashboardMenu";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
const Dashboard = () => {
  const { user, isLoading } = useAuth();
  console.log("User state in Dashboard is:", user);
  if (isLoading) {
    return <div>Loading session wait..</div>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <header id="main-header">
        <Logo />
      </header>
      <main className="dashboard-container">
        <DashboardMenu />
        <div className="dashboard-function-container">
          <h3 className="dashboard-heading">Welcome to Dashboard</h3>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
