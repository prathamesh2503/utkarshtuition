import Logo from "./logo";
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
          <p>Line 1</p>
          <p>Line 2</p>
          <p>Line 3</p>
          <p>Line 4</p>
          <p>Line 5</p>
          <p>Line 6</p>
          <p>Line 7</p>
          <p>Line 8</p>
          <p>Line 9</p>
          <p>Line 10</p>
          <p>Line 11</p>
          <p>Line 12</p>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
