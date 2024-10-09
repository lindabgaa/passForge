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
  const [passwordLength, setPasswordLength] = useState(20);
  const [passwordOptions, setPasswordOptions] = useState({
    uppercase: {
      checked: true,
      label: "Uppercase Letters",
      disabled: false,
    },
    lowercase: {
      checked: true,
      label: "Lowercase Letters",
      disabled: false,
    },
    numbers: {
      checked: true,
      label: "Numbers",
      disabled: false,
    },
    symbols: {
      checked: true,
      label: "Symbols (@&$!#?)",
      disabled: false,
    },
  });

  return (
    <main className="main-container">
      <div className="content-wrapper">
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
      </div>

      <p
        className={`copy-message ${
          copySuccess === true
            ? "copy-valid"
            : copySuccess === false
            ? "copy-error"
            : ""
        }`}
      >
        {copySuccess === true
          ? "Copied generated password"
          : copySuccess === false
          ? " Failed to copy generated password. Please try again."
          : ""}
      </p>
    </main>
  );
}
