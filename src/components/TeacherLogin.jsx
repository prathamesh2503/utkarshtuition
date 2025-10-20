import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regex Pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validateErrors = {};
    //Email Validation
    if (!emailPattern.test(email)) {
      validateErrors.email = "Please enter a valid email address.";
    }

    // Password Validation
    if (!passwordPattern.test(password)) {
      validateErrors.password =
        "Password must be at least 8 characters, include 1 uppercase, 1 lowercase, 1 number and 1 special character.";
    }

    setErrors(validateErrors);

    try {
      // Send data to backend
      const response = await fetch("/api/login", {
        method: "POST", // method to send data to server
        headers: {
          "Content-Type": "application/json", // telling server we are sending JSON
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Important to send/receive cookies
      });

      /*
response = raw HTTP response (headers, status, body as stream). (Object)
.json() = parses the body into a JavaScript object.
data = actual usable object you can work with.
*/
      const data = await response.json();
      console.log(response);
      console.log(response.ok);
      console.log(data);

      if (response.ok) {
        console.log(data.message);
        navigate("/Dashboard");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <>
      <Header />
      <main className="login-page">
        <h3>Registered Teacher Login</h3>
        <form
          action=""
          className="login-form"
          id="login-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Teacher Login" className="login-btn" />
        </form>
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        {errors.password && (
          <p style={{ color: "red", fontSize: "15px", margin: "0px 10px" }}>
            {errors.password}
          </p>
        )}
      </main>
    </>
  );
};

export default TeacherLogin;
