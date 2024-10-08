// tools
import { useState } from "react";

// components
import PasswordDisplay from "./components/PasswordDisplay/PasswordDisplay";
import PasswordLength from "./components/PasswordLength/PasswordLength";
import PasswordOptions from "./components/PasswordOptions/PasswordOptions";

// styles
import "./App.css";

export default function App() {
  const [copySuccess, setCopySuccess] = useState(null);
  const [passwordLength, setPasswordLength] = useState(7);
  const [passwordOptions, setPasswordOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });

  return (
    <main className="main-container">
      <PasswordDisplay
        setCopySuccess={setCopySuccess}
        passwordLength={passwordLength}
        passwordOptions={passwordOptions}
      />

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

      {copySuccess === true ? (
        <p className="copy-success">Copied generated password</p>
      ) : copySuccess === false ? (
        <p className="copy-error">Failed to copy generated password</p>
      ) : null}
    </main>
  );
}
