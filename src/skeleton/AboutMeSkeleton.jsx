function AboutMeSkeleton() {
  return (
    <div className="about-me-child-container about-me-skeleton-container">
      <div className="about-me-image">
        {/* Placeholder for the image */}
        <div className="about-me-skeleton-box skeleton-avatar"></div>
      </div>
      <div className="about-me-content">
        {/* Placeholder for the h3 name */}
        <div className="about-me-skeleton-box skeleton-title"></div>
        {/* Placeholders for the description text lines */}
        <div className="about-me-skeleton-box skeleton-text"></div>
      </div>
    </div>
  );
}

export default AboutMeSkeleton;
