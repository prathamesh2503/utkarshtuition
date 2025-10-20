import Logo from "./Logo";
import DashboardMenu from "./DashboardMenu";

const Dashboard = () => {
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
