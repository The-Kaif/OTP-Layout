import React, { useContext, useEffect, useRef, useState } from "react";
import "./OtpLayout.css";
import { otpContext } from "../App";
// Type Define
type OtpLayoutType = {
  method: any;
  attempt: number;
  timer: number;
};

function OtpLayout(props: OtpLayoutType) {
  let value: any = useContext(otpContext);
  // let clock:any=useContext(otpContext)
  const [input, setInput] = useState<any>([]);
  const [refs, setRefs] = useState<any>([]);
  // UseState for enable/disable button
  const [disable, setDisable] = useState(true);
  const regexForValidation = /^[0-9\b]+$/;
  // UseState for timer
  const [timer, setTimer] = useState(props.timer);
  const [press, setPress] = useState<any>([]);
  // UseState for alert message popup
  const [message, setMessage] = useState("");
  const divref: any = useRef();

  useEffect(() => {
    // firstFocus()
  }, []);

  useEffect(() => {
    let tempOtp = JSON.stringify(value.otp);
    setInput(tempOtp.split(""));
    let temp: any = [];
    let res: any = [];
    let length = JSON.stringify(value.otp).length;
    while (length !== 0) {
      temp.push(React.createRef());
      length--;
      res.push(" ");
    }
    setRefs(temp);
    setPress(res);
  }, [value.otp]);
  useEffect(() => {
    let time = setTimeout(() => {
      setTimer((val) => --val);
    }, 1000);
    if (timer === 0) {
      clearInterval(time);
      setDisable(false);
    }
    divref.current.addEventListener("shown.bs.modal", function () {
      refs[0].current.focus();
    });
  }, []);
  console.log(refs);
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>, index: any) => {
    if (regexForValidation.test(refs[index].current.value) === true) {
      if (refs[index].current.value !== "") {
        setPress(press.splice(index, 1, refs[index].current.value));
        setPress([...press]);
        MatchValues();
        refs[index].current.nextSibling.focus();
      }
    } else {
      refs[index].current.value = "";
    }
  };
  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: any
  ) => {
    const pressedKey = e.key;
    if (
      (pressedKey === "Backspace" || pressedKey === "Delete") &&
      refs[index].current.value === ""
    ) {
      setPress(press.splice(index, 1, " "));
      setPress([...press]);
      refs[index - 1].current.focus();
    } else if (pressedKey === "ArrowRight") {
      refs[index + 1].current.focus();
    } else if (pressedKey === "ArrowLeft") {
      refs[index - 1].current.focus();
    }
    MatchValues();
  };
  function MatchValues() {
    if (JSON.stringify(input) === JSON.stringify(press)) {
      setMessage("OTP sent successfully");
      refs[refs.length - 1].current.blur();
    } else if (
      JSON.stringify(input) !== JSON.stringify(press) &&
      JSON.stringify(press).includes(" ") === false
    ) {
      setMessage("OTP is incorrect");
    } else {
      setMessage("");
    }
  }
  // Resend OTP handler
  const resendHandler = () => {
    if (props.attempt !== 0) {
      setTimer(60);
      setDisable(true);
      props.method();
    } else if (props.attempt === 0) {
      alert("Your resend attempts limit over !!");
      setDisable(true);
    }
  };

  return (
    <div
      ref={divref}
      className="modal fade"
      id="myModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Verify Email Addres({value.otp})
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <p>Enter Your Code Here :</p>
            {refs.map((val: any, index: any) => (
              <input
                autoFocus={refs[0]}
                type={"text"}
                id="input"
                onKeyUp={(e) => handleOnKeyDown(e, index)}
                maxLength={1}
                onChange={(e) => inputHandler(e, index)}
                ref={refs[index]}
                className={
                  message === "OTP is incorrect"
                    ? "wrongVal"
                    : message === ""
                    ? ""
                    : "rightVal"
                }
              />
            ))}
            {/* Alert Message Content */}
            {message !== "" ? (
              <p className={message === "OTP is incorrect" ? "wrong" : "right"}>
                {message}
              </p>
            ) : null}
          </div>
          <div className="modal-footer">
            <div className="resendBtn">
              {/* resend Button */}
              <button
                onClick={resendHandler}
                disabled={disable}
                type="button"
                className="btn btn-primary"
              >
                Resend OTP
              </button>
            </div>
            ({props.attempt} Attempts left)
            {/* Timer */}
            <p className="timer">
              {timer >= 0 && timer <= 9 ? `00:0${timer}` : `00:${timer}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpLayout;
