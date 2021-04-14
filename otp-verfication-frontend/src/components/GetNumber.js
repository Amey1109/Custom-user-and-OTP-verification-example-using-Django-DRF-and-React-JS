import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import secureAxios from "../src/Config/secureAxios/secureAxios"

export default function GetNumber(props) {
  const [inputNumber, setInputNumber] = useState("");

  const history = useHistory();

  localStorage.setItem("number", inputNumber);

  const SendOtp = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:8000/users/sendOTP/",
      data: {
        number: inputNumber,
      },
    })
      .then((res) => {
        if (res.data.OTPSent === true) {
          history.push("/CheckOTP");
        } else {
          alert("OTP Was Not sent");
        }
      })
      .catch((e) => console.log(e));
    console.log("This is Input Number", inputNumber);
  };

  return (
    <div className="d-flex justify-content-center align-items-center container">
      <div className="col form-signin card py-5 px-3">
        <h1 className="h3 mb-3 fw-normal">Enter Mobile Number</h1>

        <div className="form-floating">
          <input
            type="text"
            name="Number"
            className="form-control"
            id="floatingInput"
            onChange={(e) => {
              setInputNumber(e.target.value);
            }}
            // {...register("Number", { pattern: /^[0-9]{10}$/ })}
          />

          <label for="floatingInput">Enter Your Mobile Number</label>
        </div>

        {/* <div style={{ marginTop: "5%" }}>
            {errors.Number && <span style={style.error}>Invalid Number</span>}
          </div> */}

        <button
          className="btn btn-lg btn-outline-primary  my-4 mx-5"
          type="submit"
          onClick={() => {
            SendOtp();
          }}
        >
          Get OTP
        </button>
      </div>
    </div>
  );
}
