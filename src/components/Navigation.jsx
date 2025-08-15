import { useState } from "react";

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
            class={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#corousal"
          >
            Home
          </a>
          <a
            class={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#about"
          >
            About Me
          </a>
          <a
            class={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#achievement"
          >
            Achievements
          </a>
          <a
            class={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#blogs"
          >
            Blogs
          </a>
          <a
            class={`nav-link ${isNavLinksVisible ? "navLinksVisible" : ""}`}
            href="#contact-me"
          >
            Contact Me
          </a>
        </nav>
        <button id="teacher-login-btn">Teacher Login</button>
      </div>
    </>
  );
};

export default Navigation;
