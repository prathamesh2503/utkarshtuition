import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
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
          <Link
            to="home"
            smooth={true}
            duration={500}
            offset={-120}
            onClick={() => {
              setIsExpanded(false);
              setNavLinksVisibility(false);
            }}
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#corousal"
          >
            Home
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={500}
            offset={-120}
            onClick={() => {
              setIsExpanded(false);
              setNavLinksVisibility(false);
            }}
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#about"
          >
            About Me
          </Link>
          <Link
            to="achievement"
            smooth={true}
            duration={500}
            offset={-120}
            onClick={() => {
              setIsExpanded(false);
              setNavLinksVisibility(false);
            }}
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#achievement"
          >
            Achievements
          </Link>
          {/* <a
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#blogs"
          >
            Blogs
          </a> */}
          <Link
            to="contact"
            smooth={true}
            duration={500}
            offset={-120}
            onClick={() => {
              setIsExpanded(false);
              setNavLinksVisibility(false);
            }}
            className={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#contact-me"
          >
            Contact Me
          </Link>
        </nav>
        <button id="teacher-login-btn" onClick={goToLogin}>
          Teacher Login
        </button>
      </div>
    </>
  );
};

export default Navigation;
