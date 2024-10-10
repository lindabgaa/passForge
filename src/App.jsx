// tools
import { useState } from "react";

// utils
import { checkOption } from "./utils";

// components
import PasswordDisplay from "./components/PasswordDisplay/PasswordDisplay";
import PasswordLength from "./components/PasswordLength/PasswordLength";
import PasswordOptions from "./components/PasswordOptions/PasswordOptions";

// styles
import "./App.css";

export default function App() {
  const [copySuccess, setCopySuccess] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordLength, setPasswordLength] = useState(10);
  const [passwordOptions, setPasswordOptions] = useState([
    {
      id: "uppercase",
      checked: true,
      label: "Uppercase Letters",
      disabled: false,
    },
    {
      id: "lowercase",
      checked: true,
      label: "Lowercase Letters",
      disabled: false,
    },
    {
      id: "numbers",
      checked: true,
      label: "Numbers",
      disabled: false,
    },
    {
      id: "symbols",
      checked: true,
      label: "Symbols(!?#@&*%$+)",
      disabled: false,
    },
  ]);

  const updateStrengthIndicator = () => {
    const hasUppercase = checkOption(passwordOptions, "uppercase");
    const hasLowerCase = checkOption(passwordOptions, "lowercase");
    const hasNumbers = checkOption(passwordOptions, "numbers");
    const hasSymbols = checkOption(passwordOptions, "symbols");

    if (
      passwordLength > 18 &&
      hasNumbers &&
      hasSymbols &&
      (hasUppercase || hasLowerCase)
    ) {
      setPasswordStrength("Very Strong");
    } else if (
      (passwordLength > 12 && hasNumbers && hasSymbols) ||
      passwordLength > 25
    ) {
      setPasswordStrength("Strong");
    } else if (
      (passwordLength > 10 && (hasNumbers || hasSymbols)) ||
      passwordLength > 15
    ) {
      setPasswordStrength("Moderate");
    } else if (passwordLength < 10) {
      setPasswordStrength("Very Weak");
    } else {
      setPasswordStrength("Weak");
    }
  };

  return (
    <main className="main-container">
      <PasswordDisplay
        setCopySuccess={setCopySuccess}
        passwordLength={passwordLength}
        passwordOptions={passwordOptions}
        updateStrengthIndicator={updateStrengthIndicator}
      />

      <div className="password-configuration-container">
        <PasswordLength
          passwordLength={passwordLength}
          setPasswordLength={setPasswordLength}
        />

        <PasswordOptions
          passwordOptions={passwordOptions}
          setPasswordOptions={setPasswordOptions}
        />

        <div className="password-strength-container">
          <div className="password-strength-bar">
            <div
              className={`strength-bar-segment ${
                passwordStrength === "Very Weak"
                  ? "very-weak"
                  : passwordStrength === "Weak"
                  ? "weak"
                  : passwordStrength === "Moderate"
                  ? "moderate"
                  : passwordStrength === "Strong"
                  ? "strong"
                  : passwordStrength === "Very Strong"
                  ? "very-strong"
                  : ""
              }`}
            ></div>
            <div
              className={`strength-bar-segment ${
                passwordStrength === "Weak"
                  ? "weak"
                  : passwordStrength === "Moderate"
                  ? "moderate"
                  : passwordStrength === "Strong"
                  ? "strong"
                  : passwordStrength === "Very Strong"
                  ? "very-strong"
                  : ""
              }`}
            ></div>
            <div
              className={`strength-bar-segment ${
                passwordStrength === "Moderate"
                  ? "moderate"
                  : passwordStrength === "Strong"
                  ? "strong"
                  : passwordStrength === "Very Strong"
                  ? "very-strong"
                  : ""
              }`}
            ></div>
            <div
              className={`strength-bar-segment ${
                passwordStrength === "Strong"
                  ? "strong"
                  : passwordStrength === "Very Strong"
                  ? "very-strong"
                  : ""
              }`}
            ></div>
            <div
              className={`strength-bar-segment ${
                passwordStrength === "Very Strong" ? "very-strong" : ""
              }`}
            ></div>
          </div>
          <p
            className={`password-strength-text ${
              passwordStrength === "Very Weak"
                ? "very-weak"
                : passwordStrength === "Weak"
                ? "weak"
                : passwordStrength === "Moderate"
                ? "moderate"
                : passwordStrength === "Strong"
                ? "strong"
                : passwordStrength === "Very Strong"
                ? "very-strong"
                : ""
            }`}
          >
            {passwordStrength}
          </p>
        </div>
      </div>

      <div className="copy-feedback-container">
        {copySuccess === true && (
          <p className="copy-success">Copied generated password</p>
        )}

        {copySuccess === false && (
          <p className="copy-error">
            Failed to copy generated password. Please try again.
          </p>
        )}
      </div>
    </main>
  );
}
