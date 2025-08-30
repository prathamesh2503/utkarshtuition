import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNavLinksVisible, setNavLinksVisibility] = useState(false);

  const increaseHeight = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setNavLinksVisibility(false);
    } else {
      setIsExpanded(true);
    }
  };

  const handleTransitionEnd = (e) => {
    if (e.propertyName === "height" && isExpanded) {
      setNavLinksVisibility(true);
    }
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/Login");
  };

  return (
    <>
      <div
        className={`nav-button-container ${isExpanded ? "expanded" : ""}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <button id="nav-menu-btn" onClick={increaseHeight}>
          ☰
        </button>
        <nav id="nav-links-container">
          <a
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#corousal"
          >
            Home
          </a>
          <a
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#about"
          >
            About Me
          </a>
          <a
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#achievement"
          >
            Achievements
          </a>
          <a
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#blogs"
          >
            Blogs
          </a>
          <a
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#contact-me"
          >
            Contact Me
          </a>
        </nav>
        <button id="teacher-login-btn" onClick={goToLogin}>
          Teacher Login
        </button>
      </div>
    </>
  );
};

export default Navigation;
