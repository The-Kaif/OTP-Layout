// Import Component
import Register from "./Components/Register";
import RegisterComponent from "./Components/RegisterComponent";
import "./App.css";
import OtpLayout from "./Components/OtpLayout";
import { createContext, useState } from "react";

export const otpContext = createContext({});

function App() {
  const [otp, setOtp] = useState(0);
  const [timer, setTimer] = useState(60);
  return (
    <div>
      {/* <Register /> */}
      <otpContext.Provider value={{ otp, setOtp, timer, setTimer }}>
        <RegisterComponent />
      </otpContext.Provider>
    </div>
  );
}

export default App;
