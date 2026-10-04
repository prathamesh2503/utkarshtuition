import Home from "./components/Home";
import TeacherLogin from "./components/TeacherLogin";
import Dashboard from "./components/Dashboard";
import EditAboutMe from "./components/EditAboutMe";
import EditAchievement from "./components/EditAchievement";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<TeacherLogin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/editAboutMe" element={<EditAboutMe />} />
      <Route path="/editAchievement" element={<EditAchievement />} />
    </Routes>
  );
}

export default App;
