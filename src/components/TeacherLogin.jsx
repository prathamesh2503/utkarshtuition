import { useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  // hook useState used to read and update state values from input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //errors is state variable used to store mistakes made by user while filling form fields. setErrors sets an errors once they occured while test conducted on user input values.
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Regex Pattern used to validate input format of input fields
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // async and await - It used to specific function to pause there to get data from server and gives control to event loop to handle other operations.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // created empty object to store error message
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

    // try {risky operation that can be crashed and isolated from stable part} catch { code which runs when error occurs}
    try {
      // Send data to backend and pauses untill respose arrives
      const response = await fetch("http://localhost:4000/login", {
        // method to send data to server for process complext action[to authonicate login data] and get response back
        method: "POST",
        // telling server we are sending JSON
        headers: {
          "Content-Type": "application/json",
        },
        // converts a JavaScript object into a JSON string so it can be sent to a server.
        body: JSON.stringify({ email, password }),
        // Important to send/receive cookies. Always sends cookies, even for cross-origin (third-party) API requests
        credentials: "include",
      });
      /*
          response = raw HTTP response (headers, status, body as stream). (Object)
          .json() = parses the body into a JavaScript object.
          data = actual usable object you can work with.
      */
      // pauses untill parsing gets completed
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
        <h3>Teacher Login</h3>
        {/* form tag used to submit data collected from input fields */}
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
            // on every keystroke react update state
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type="submit" value="Login" className="login-btn" />
        </form>

        {/* Conditional operator used to show text */}
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
