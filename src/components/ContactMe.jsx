const ContactMe = () => {
  return (
    <div className="contact-me-section">
      <h2>Contact Me</h2>
      <form action="" id="contact-me-form">
        <label htmlFor="name">Name:</label>
        <input type="text" name="contact-name" id="contact-name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" name="contact-email" id="contact-email" required />
        <label htmlFor="message">Message:</label>
        <textarea name="meassage" id="contact-message" required></textarea>
        <button id="contact-me-button">Send Message</button>
      </form>
    </div>
  );
};

export default ContactMe;
