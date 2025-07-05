import logo from "../assets/logo.png";

function Logo({ width = "120px" }) {
  return (
    <div>
      <img src={logo} alt="logo" style={{ width }} />
    </div>
  );
}
export default Logo;
