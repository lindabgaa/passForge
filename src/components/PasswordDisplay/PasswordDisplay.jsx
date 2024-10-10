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
  // ---- Characters to generate password from
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#@&*%$+";

  // ---- State to store generated password
  const [password, setPassword] = useState("");

  // ---- Function to generate password based on password length and options
  const generatePassword = useCallback(() => {
    // Get checked value of each option
    const uppercaseChecked = passwordOptions.find(
      (option) => option.id === "uppercase"
    ).checked;

    const lowercaseChecked = passwordOptions.find(
      (option) => option.id === "lowercase"
    ).checked;

    const numbersChecked = passwordOptions.find(
      (option) => option.id === "numbers"
    ).checked;

    const symbolsChecked = passwordOptions.find(
      (option) => option.id === "symbols"
    ).checked;

    const selectedLength = Math.max(passwordLength, 7); // Make sure password length is at least 7 characters
    const selectedCharacters = []; // Array to store selected characters based on selected options
    const guaranteedCharacters = []; // Array to store at least one character from each selected option

    // Constants to store start index of each character type in characters string
    const UPPERCASE_START = 0;
    const LOWERCASE_START = 26;
    const NUMBERS_START = 52;
    const SYMBOLS_START = 62;

    // Constants to store count of each character type
    const UPPERCASE_COUNT = 26;
    const LOWERCASE_COUNT = 26;
    const NUMBERS_COUNT = 10;
    const SYMBOLS_COUNT = 9;

    // Function to add characters to selectedCharacters and guaranteedCharacters arrays based on selected options
    const addCharacters = (start, count) => {
      const end = start + count;
      selectedCharacters.push(...characters.slice(start, end).split(""));
      guaranteedCharacters.push(
        characters.charAt(Math.floor(Math.random() * count) + start)
      );
    };

    // Add uppercase characters to selectedCharacters and guaranteedCharacters if uppercase option is checked
    if (uppercaseChecked) {
      addCharacters(UPPERCASE_START, UPPERCASE_COUNT);
    }

    // Add lowercase characters to selectedCharacters and guaranteedCharacters if lowercase option is checked
    if (lowercaseChecked) {
      addCharacters(LOWERCASE_START, LOWERCASE_COUNT);
    }

    // Add numbers to selectedCharacters and guaranteedCharacters if numbers option is checked
    if (numbersChecked) {
      addCharacters(NUMBERS_START, NUMBERS_COUNT);
    }

    // Add symbols to selectedCharacters and guaranteedCharacters if symbols option is checked
    if (symbolsChecked) {
      addCharacters(SYMBOLS_START, SYMBOLS_COUNT);
    }

    // Shuffle selected characters for better randomness
    const shuffledSelectedCharacters = shuffleArray(selectedCharacters);

    let generatedPassword = [];
    generatedPassword.push(...guaranteedCharacters); // Add guaranteed characters
    for (let i = 0; i < selectedLength - guaranteedCharacters.length; i++) {
      const randomIndex = Math.floor(
        Math.random() * shuffledSelectedCharacters.length
      );
      generatedPassword.push(shuffledSelectedCharacters[randomIndex]); // Add random characters from selected options
    }

    // Shuffle generated password for better randomness and make it a string
    generatedPassword = shuffleArray(generatedPassword).join("");

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
    <div className="password-wrapper">
      <p className="password-text">
        {password.split("").map(function (char, index) {
          return (
            <span
              key={index}
              className={`password-char
                ${
                  Number.isInteger(parseInt(char))
                    ? "number"
                    : /[!?%@#+$&*]/.test(char)
                    ? "special"
                    : ""
                }
              `}
            >
              {char}
            </span>
          );
        })}
      </p>
      <button
        type="button"
        className="generate-button"
        onClick={handleGenerateButtonClick}
      >
        <img
          src={generateIcon}
          alt="Generate new password"
          className="generate-icon"
        ></img>
      </button>
      <button
        type="button"
        className="copy-button"
        onClick={handleCopyButtonClick}
      >
        <img src={copyIcon} alt="Copy password" className="copy-icon" />
      </button>
    </div>
  );
}

PasswordDisplay.propTypes = {
  setCopySuccess: PropTypes.func.isRequired,
  passwordLength: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([""])])
    .isRequired,
  passwordOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
};
