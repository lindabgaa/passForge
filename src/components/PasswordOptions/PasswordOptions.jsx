// tools
import PropTypes from "prop-types";
import { useEffect } from "react";

// utils
import { checkOption } from "../../utils";

// styles
import "./PasswordOptions.css";

export default function PasswordOptions({
  passwordOptions,
  setPasswordOptions,
}) {
  // Get the checked (true / false) state of each option
  // We don't need the 'symbols' option here because it's not a requirement for the password
  const uppercaseChecked = checkOption(passwordOptions, "uppercase");
  const lowercaseChecked = checkOption(passwordOptions, "lowercase");
  const numbersChecked = checkOption(passwordOptions, "numbers");

  // ---- Function to handle checkbox change
  const handleCheckboxChange = (index) => {
    setPasswordOptions((prevOptions) => {
      // Map over the previous options array
      return prevOptions.map((option, i) => {
        // If the current index (i) matches the clicked index, toggle the checked property
        if (i === index) {
          return {
            ...option,
            checked: !option.checked, // Toggle the checked state : if true, make it false, if false, make it true
          };
        }
        // return other options as they are
        return option;
      });
    });
  };

  // ---- UseEffect that forces at least one option to be checked between 'uppercase', 'lowercase', and 'numbers'
  // ---- If only one option is checked, the other two options will be disabled
  useEffect(() => {
    setPasswordOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.id === "uppercase") {
          if (!lowercaseChecked && !numbersChecked) {
            return {
              ...option,
              disabled: true,
            };
          }

          return {
            ...option,
            disabled: false,
          };
        }

        if (option.id === "lowercase") {
          if (!uppercaseChecked && !numbersChecked) {
            return {
              ...option,
              disabled: true,
            };
          }

          return {
            ...option,
            disabled: false,
          };
        }

        if (option.id === "numbers") {
          if (!uppercaseChecked && !lowercaseChecked) {
            return {
              ...option,
              disabled: true,
            };
          }

          return {
            ...option,
            disabled: false,
          };
        }

        return option;
      });
    });
  }, [uppercaseChecked, lowercaseChecked, numbersChecked, setPasswordOptions]);

  return (
    <ul className="options-list">
      {passwordOptions.map((option, index) => {
        const { id, checked, label, disabled } = option;
        return (
          <li key={id} className="options-item">
            <label htmlFor={id}>{label}</label>
            <input
              checked={checked}
              disabled={disabled}
              type="checkbox"
              id={id}
              className="option-input"
              aria-checked={checked}
              aria-disabled={disabled}
              onChange={() => handleCheckboxChange(index)}
            ></input>
          </li>
        );
      })}
    </ul>
  );
}

PasswordOptions.propTypes = {
  passwordOptions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      checked: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  setPasswordOptions: PropTypes.func.isRequired,
};
