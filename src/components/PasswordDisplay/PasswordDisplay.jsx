// tools
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

// assets
import copyIcon from "../../assets/copy-icon.svg";
import generateIcon from "../../assets/generate-icon.svg";

// utils
import { shuffleArray } from "../../utils.js";

// styles
import "./PasswordDisplay.css";

export default function PasswordDisplay({
  setCopySuccess,
  passwordLength,
  passwordOptions,
}) {
  const [password, setPassword] = useState("");

  // ---- Function to generate password based on password length and options
  const generatePassword = useCallback(() => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789=!?#@&*%$+-";

    const { uppercase, lowercase, numbers, symbols } = passwordOptions;

    const selectedLength = Math.max(passwordLength, 7); // Make sure password length is at least 7 characters
    let selectedCharacters = []; // Array to store selected characters based on selected options
    let guaranteedCharacters = []; // Array to store at least one character from each selected option

    const addCharacters = (start, end, count) => {
      selectedCharacters.push(...characters.slice(start, end).split(""));
      guaranteedCharacters.push(
        characters.charAt(Math.floor(Math.random() * count) + start)
      );
    };

    if (uppercase) {
      addCharacters(0, 26, 26);
    }

    if (lowercase) {
      addCharacters(26, 52, 26);
    }

    if (numbers) {
      addCharacters(52, 62, 10);
    }

    if (symbols) {
      addCharacters(62, 73, 11);
    }

    let generatedPassword = "";
    generatedPassword += guaranteedCharacters.join("");
    for (let i = 0; i < selectedLength - guaranteedCharacters.length; i++) {
      const randomIndex = Math.floor(Math.random() * selectedCharacters.length);
      generatedPassword += selectedCharacters[randomIndex];
    }

    generatedPassword = shuffleArray(generatedPassword.split("")).join("");

    setPassword(generatedPassword);
  }, [passwordLength, passwordOptions]);

  // ---- useEffect to generate password on initial render and when password length or options change
  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  // ---- Function to handle generate password button click event
  const handleGenerateButtonClick = () => {
    generatePassword();
  };

  // ---- Function to handle copy password button click event
  const handleCopyButtonClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          setCopySuccess(true);
        })
        .catch((error) => {
          setCopySuccess(false);
          console.error("Failed to copy: ", error);
        });
    } else {
      setCopySuccess(false);
      console.error("Clipboard API not supported");
    }

    // ---- Reset copy success message after 2 seconds
    setTimeout(() => setCopySuccess(null), 3000);
  };

  return (
    <>
      <div className="password-wrapper">
        <p className="password-text">
          {password.split("").map(function (char, index) {
            return (
              <span
                key={index}
                style={{
                  color: Number.isInteger(parseInt(char))
                    ? "#0571ed"
                    : /[!?%@#=+$&*-]/.test(char)
                    ? "#d90429"
                    : "black",
                }}
              >
                {char}
              </span>
            );
          })}
        </p>
        <button
          type="button"
          className="generate-button"
          aria-label="Generate new password"
          onClick={handleGenerateButtonClick}
        >
          <img
            src={generateIcon}
            alt=""
            className="generate-icon"
            aria-hidden="true"
          ></img>
        </button>
        <button
          type="button"
          className="copy-button"
          aria-label="Copy password"
          onClick={handleCopyButtonClick}
        >
          <img src={copyIcon} alt="" className="copy-icon" aria-hidden="true" />
        </button>
      </div>
    </>
  );
}

PasswordDisplay.propTypes = {
  setCopySuccess: PropTypes.func.isRequired,
  passwordLength: PropTypes.number.isRequired,
  passwordOptions: PropTypes.shape({
    uppercase: PropTypes.bool.isRequired,
    lowercase: PropTypes.bool.isRequired,
    numbers: PropTypes.bool.isRequired,
    symbols: PropTypes.bool.isRequired,
  }).isRequired,
};
