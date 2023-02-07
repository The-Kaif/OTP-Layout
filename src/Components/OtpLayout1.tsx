import React, { memo, useEffect, useState } from 'react'
import "./OtpLayout.css"
// Type Define
type OtpLayoutType = {
    otp: number
    method: any
}

function OtpLayout1(props: OtpLayoutType) {
    // UseState for holds otp value
    const [value, setValue] = useState("")
    // useState for input boxes
    const [input1, setInput1] = useState("")
    const [input2, setInput2] = useState("")
    const [input3, setInput3] = useState("")
    const [input4, setInput4] = useState("")
    const [input5, setInput5] = useState("")
    // UseState for check number of resend attempts left
    const [count, setCount] = useState(5)
    // UseState for alert message popup
    const [message, setMessage] = useState("")
    // UseState for enable/disable button
    const [disable, setDisable] = useState(true)
    // UseState for timer
    const [timer, setTimer] = useState(60);
    //flag UseState for check when user press resend buttton
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        // When page render so focus on first input box
        if (input1 === "") {
            document.getElementById("Input1")?.focus()
        }
        let temp = JSON.stringify(props.otp)
        // set OTP value into state
        setValue(temp)
        // Countdown function
        let time = setTimeout(function () {
            setTimer((val) => --val)
        }, 1000)
        // Clear Interval check
        if (timer === 0) {
            clearInterval(time)
            setDisable(false)
        }
        // When any input box value is blank then remove alert message
        if (input1 === "" || input2 === "" || input3 === "" || input4 === "" || input5 === "") {
            setMessage("")
        }

    }, [timer, disable, flag])
    // Input 1 that take user input values
    const input1Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Validation Check
        if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 9) {
            setInput1(e.target.value)
            if (e.target.value.length >= 1) {
                document.getElementById("Input2")?.focus()
            }
        } else if (e.target.value.length === 0) {
            setInput1("")
        }
    }
    // Input 2 that take user input values
    const input2Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Validation Check
        if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 9) {
            setInput2(e.target.value)
            if (e.target.value.length >= 1) {
                document.getElementById("Input3")?.focus()
            }
        } else if (e.target.value.length === 0) {
            setInput2("")
            document.getElementById("Input1")?.focus()
        }
    }
    // Input 3 that take user input values
    const input3Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Validation Check
        if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 9) {
            setInput3(e.target.value)
            if (e.target.value.length >= 1) {
                document.getElementById("Input4")?.focus()
            }
        } else if (e.target.value.length === 0) {
            setInput3("")
            document.getElementById("Input2")?.focus()
        }
    }
    // Input 4 that take user input values
    const input4Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Validation Check
        if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 9) {
            setInput4(e.target.value)
            if (e.target.value.length >= 1) {
                document.getElementById("Input5")?.focus()
            }
        } else if (e.target.value.length === 0) {
            setInput4("")
            document.getElementById("Input3")?.focus()
        }
    }
    // Input 5 that take user input values
    const input5Handler = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Validation Check
        if (parseInt(e.target.value) >= 0 && parseInt(e.target.value) <= 9) {
            setInput5(e.target.value)
            // Concat all input data
            let tempVal = input1 + input2 + input3 + input4 + e.target.value
            // When time is not equal to zero then match otherwise so alerts
            if (timer !== 0) {
                // Check with OTP value
                if (tempVal === value) {
                    setMessage("OTP sent successfully")
                    document.getElementById("Input5")?.blur()
                    setTimeout(function () {
                        alert("Component Will Unmount")
                        window.location.reload()
                    }, 1000)
                } else {
                    setMessage("OTP is incorrect")
                    document.getElementById("Input5")?.blur()
                }
            } else {
                alert("Your OTP is expire please click on Resend OTP")
            }

        } else if (e.target.value.length === 0) {
            setInput5("")
            document.getElementById("Input4")?.focus()
        }

    }
    // Resend OTP handler
    const resendHandler = () => {
        if (count !== 0) {
            alert("Resend OTP sent successfully!")
            // Make resend button disable
            setDisable(true)
            // Decrease Count by 1
            setCount((val) => --val)
            // Again Set Timer
            setTimer(60)
            // Call OTP generate method
            props.method()
            // Set value into state
            setValue(JSON.stringify(props.otp))
            setFlag(true)
            // Make Input fields blank
            setInput1("");
            setInput2("");
            setInput3("");
            setInput4("");
            setInput5("");
        } else {
            alert("Resend OTP Limit exceed!!!")
        }

    }
    return (
        <div>
            <div className="d-grid gap-2 col-6 mx-auto title">
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Validate OTP
                </button>
            </div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Verify Email Addres ({value})</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Enter Your Code Here : </p>
                            {/* All Input Fields */}
                            <div className='inputDiv'>
                                <input value={input1} onChange={input1Handler} maxLength={1} id="Input1" type={"text"} className={message === "OTP is incorrect" ? "wrongVal" : message === "" ? "" : "rightVal"} />
                                <input value={input2} onChange={input2Handler} maxLength={1} id="Input2" type={"text"} className={message === "OTP is incorrect" ? "wrongVal" : message === "" ? "" : "rightVal"} />
                                <input value={input3} onChange={input3Handler} maxLength={1} id="Input3" type={"text"} className={message === "OTP is incorrect" ? "wrongVal" : message === "" ? "" : "rightVal"} />
                                <input value={input4} onChange={input4Handler} maxLength={1} id="Input4" type={"text"} className={message === "OTP is incorrect" ? "wrongVal" : message === "" ? "" : "rightVal"} />
                                <input value={input5} onChange={input5Handler} maxLength={1} id="Input5" type={"text"} className={message === "OTP is incorrect" ? "wrongVal" : message === "" ? "" : "rightVal"} />
                            </div>
                            {/* Alert Message Content */}
                            {message !== "" ? <p className={message === "OTP is incorrect" ? "wrong" : "right"}>{message}</p> : null}
                        </div>
                        <div className="modal-footer">
                            <div className='resendBtn'>
                                {/* resend Button */}
                                <button onClick={resendHandler} disabled={disable} type="button" className="btn btn-primary">Resend OTP</button>
                            </div>
                            ({count} Attempts left)
                            {/* Timer */}
                            <p className='timer'>{timer >= 0 && timer <= 9 ? `00:0${timer}` : `00:${timer}`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(OtpLayout1) 