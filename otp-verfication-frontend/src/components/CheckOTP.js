import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import secureAxios from "../src/Config/secureAxios/secureAxios"

export default function CheckOTP(props) {
 
  const [status, setStatus] = useState(false);
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");
  let finalOTP = first + second + third + fourth;

  const history = useHistory();

  const checkOtp = async () => {
    await axios({
      method: "PUT",
      url: "http://127.0.0.1:8000/users/checkOTP/",
      data: {
        number: localStorage.number,
        otp: finalOTP,
      },
    })
      .then((res) => {
        setStatus(res.data.status);
        if (res.data.status === true) {
          history.push("/Registration");
        } else {
          alert("Incorrect OTP");
        }
      })
      .catch((e) => console.log(e));
    console.log("Status: ", status);
  };

  return (
    <div className="h-100 row align-items-center">
      <div className="d-flex justify-content-center align-items-center container">
        <div className="card py-5 px-3">
          <h5 className="m-0">Mobile phone verification</h5>
          <span className="mobile-text">
            Enter the code we just send on your mobile phone 
            <b className="text-danger">+91 {localStorage.number}</b>
          </span>
          <div className="d-flex flex-row mt-5">
            <input
              type="text"
              className="form-control"
              autoFocus=""
              maxLength="1"
              onChange={(e) => setFirst(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              maxLength="1"
              onChange={(e) => setSecond(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              maxLength="1"
              onChange={(e) => setThird(e.target.value)}
            />
            <input
              type="text"
              className="form-control"
              maxLength="1"
              onChange={(e) => setFourth(e.target.value)}
            />
          </div>
          <button
            className="btn btn-lg btn-outline-primary  my-4 mx-5"
            onClick={() => {
              checkOtp();
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
