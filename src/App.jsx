// tools
import { useCallback, useState } from "react";

// utils
import { checkOption } from "./utils";

// assets
import checkIcon from "./assets/check-icon.svg";
import crossIcon from "./assets/cross-icon.svg";

// components
import PasswordDisplay from "./components/PasswordDisplay/PasswordDisplay";
import PasswordLength from "./components/PasswordLength/PasswordLength";
import PasswordOptions from "./components/PasswordOptions/PasswordOptions";
import PasswordStrength from "./components/PasswordStrength/PasswordStrength";

// styles
import "./App.css";

const PASSWORD_STRENGTH = {
  VERY_WEAK: "Very Weak",
  WEAK: "Weak",
  MODERATE: "Moderate",
  STRONG: "Strong",
  VERY_STRONG: "Very Strong",
};

export default function App() {
  // states
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
  const [passwordStrength, setPasswordStrength] = useState("");
  const [copySuccess, setCopySuccess] = useState(null);

  // ---- Function to update the strength indicator based on the password length and character types (options)
  const updateStrengthIndicator = useCallback(() => {
    let score = 0;

    // Add points for length
    if (passwordLength > 18) score += 3;
    else if (passwordLength > 12) score += 2;
    else if (passwordLength > 10) score += 1;

    // Add points for character types
    // checkOption verifies if a specific password option is enabled
    if (checkOption(passwordOptions, "uppercase")) score += 1;
    if (checkOption(passwordOptions, "lowercase")) score += 1;
    if (checkOption(passwordOptions, "numbers")) score += 1;
    if (checkOption(passwordOptions, "symbols")) score += 1;

    // Determine strength based on the total score
    if (score >= 6) setPasswordStrength(PASSWORD_STRENGTH.VERY_STRONG);
    else if (score >= 5) setPasswordStrength(PASSWORD_STRENGTH.STRONG);
    else if (score >= 4) setPasswordStrength(PASSWORD_STRENGTH.MODERATE);
    else if (score >= 3) setPasswordStrength(PASSWORD_STRENGTH.WEAK);
    else setPasswordStrength(PASSWORD_STRENGTH.VERY_WEAK);
  }, [passwordOptions, passwordLength]);

  return (
    <main className="main-container">
      <div className="copy-feedback-container">
        {copySuccess === true && (
          <>
            <img src={checkIcon} alt="" aria-hidden="true"></img>
            <p className="copy-success-text">Copied generated password</p>
          </>
        )}

        {copySuccess === false && (
          <>
            <img src={crossIcon} alt="" aria-hidden="true"></img>
            <p className="copy-error-text">
              Failed to copy generated password.
            </p>
          </>
        )}
      </div>

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

        <PasswordStrength passwordStrength={passwordStrength} />
      </div>
    </main>
  );
}
