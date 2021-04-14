import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/users/registerUser/",
      data: {
        username: username,
        email: email,
        number: localStorage.number,
        password: password,
      },
    })
      .then((res) => {
        if (res.data.IntegrityError === true) {
          alert("All Fields must be Unique");
        } else {
          alert("User Registered");
          localStorage.clear();
          // history.push("/login")
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="text-center login-body d-flex justify-content-center align-items-center container">
      <div className="form-signin registrationCard py-5 px-4">
        <h1 className="h3 mb-3 fw-normal">Register</h1>
        <label for="inputEmail" className="visually-hidden">
          Username
        </label>
        <input
          type="text"
          id="inputUsername"
          className="form-control mb-3"
          placeholder="Username"
          required
          autoFocus
          onChange={(event) => setUsername(event.target.value)}
        />

        <label for="inputEmail" className="visually-hidden">
          Email Address
        </label>
        <input
          type="text"
          id="inputEmail"
          className="form-control mb-3"
          placeholder="Email Address"
          required
          autoFocus
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="text"
          id="inputUsername"
          className="form-control mb-3"
          value={localStorage.number}
          required
          autoFocus
          disabled="disabled"
          onChange={(event) => setUsername(event.target.value)}
        />

        <label for="inputPassword" className="visually-hidden">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-3"
          placeholder="Password"
          required
          onChange={(event) => setPassword(event.target.value)}
        />

        <label for="inputPassword" className="visually-hidden">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-3"
          placeholder="Confirm Password"
          required
        />

        <button
          type="submit"
          className="btn btn-outline-primary btn-lg"
          onClick={() => {
            handleSubmit();
          }}
        >
          Regsiter Me
        </button>
      </div>
    </div>
  );
}
