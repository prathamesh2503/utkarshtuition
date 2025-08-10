import utkarshTuitionLogo from "../assets/images/utkarshTuitionLogo.png";
const Logo = () => {
  return (
    <div id="logo-container">
      <a href="/">
        <img src={utkarshTuitionLogo} alt="logo" id="site-logo" />
      </a>
    </div>
  );
};

export default Logo;
