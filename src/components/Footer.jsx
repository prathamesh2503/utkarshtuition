import ScrollToTop from "./ScrollToTop";

const Footer = () => {
  return (
    <footer id="footer">
      <div id="info-table">
        <table>
          <thead>
            <tr>
              <th>Quick Links</th>
              <th>Information</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Home</td>
              <td>Terms of Service</td>
            </tr>
            <tr>
              <td>Gallary</td>
              <td>Privacy Policy</td>
            </tr>
            <tr>
              <td>About Me</td>
              <td>Cookie Setting</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p id="copyright-text">@copyrights</p>

      <ScrollToTop />
    </footer>
  );
};

export default Footer;
