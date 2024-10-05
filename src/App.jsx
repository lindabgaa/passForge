// tools
import { useState } from "react";

// components
import PasswordDisplay from "./components/PasswordDisplay/PasswordDisplay";
import PasswordLength from "./components/PasswordLength/PasswordLength";
import PasswordOptions from "./components/PasswordOptions/PasswordOptions";

// styles
import "./App.css";

export default function App() {
  const [passwordLength, setPasswordLength] = useState("7");
  const [password, setPassword] = useState("P4$5W0rD!");
  const [passwordOptions, setPasswordOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  return (
    <main className="main-container">
      <PasswordDisplay password={password} />

      <div className="input-wrapper">
        <PasswordLength
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
        />
        <PasswordOptions
          passwordOptions={passwordOptions}
          setPasswordOptions={setPasswordOptions}
        />
      </div>
    </main>
  );
}
