import React, { useCallback, useContext, useRef, useState } from "react";
import { otpContext } from "../App";
import OtpLayout from "./OtpLayout";

function RegisterComponent() {
  const rangeRef: any = useRef(null);
  const [modal, setModal] = useState("");
  let value: any = useContext(otpContext);
  const regexForRange = /^[4-7\b]+$/;
  const [attempt, setAttempt] = useState(5);
  const validateHandler = () => {
    if (regexForRange.test(rangeRef.current.value) === false) {
      alert("Please type range between 4-7");
      rangeRef.current.focus();
    } else {
      let val = GenerateOTP();
      value.setOtp(val);
      setModal("#myModal");
      if (attempt !== 0) {
        setAttempt((val) => --val);
      }
    }
  };
  const GenerateOTP = () => {
    let otp = 0;
    let number = parseInt(rangeRef.current.value);
    let max = "9";
    let min = "1";
    while (number !== 1) {
      max = max + "0";
      min = min + "0";
      number--;
    }
    otp = Math.floor(Math.random() * parseInt(max) + parseInt(min));
    return otp;
  };

  return (
    <div>
      <center>
        <div className="register__component">
          <h1>Register</h1>
          <div className="input-group mb-3">
            <input
              ref={rangeRef}
              type="text"
              maxLength={1}
              className="form-control"
              placeholder="Type OTP Range Between [4-7]..."
            />
            <button
              data-bs-toggle="modal"
              data-bs-target="#myModal"
              onClick={validateHandler}
              type="button"
              className="btn btn-primary"
            >
              Validate OTP
            </button>
          </div>
        </div>
      </center>
      {/* {value.otp >= 4 && value.otp <= 7 ? ( */}
        <OtpLayout attempt={attempt} method={validateHandler} />
      {/* ) : null} */}
    </div>
  );
}

export default RegisterComponent;
