// tools
import PropTypes from "prop-types";
import { useEffect } from "react";

// styles
import "./PasswordOptions.css";

export default function PasswordOptions({
  passwordOptions,
  setPasswordOptions,
}) {
  const {
    uppercase: { checked: uppercaseChecked },
    lowercase: { checked: lowercaseChecked },
    numbers: { checked: numbersChecked },
    symbols: { checked: symbolsChecked },
  } = passwordOptions;

  const {
    uppercase: { disabled: uppercaseDisabled },
    lowercase: { disabled: lowercaseDisabled },
    numbers: { disabled: numbersDisabled },
    symbols: { disabled: symbolsDisabled },
  } = passwordOptions;

  const {
    uppercase: { label: uppercaseLabel },
    lowercase: { label: lowercaseLabel },
    numbers: { label: numbersLabel },
    symbols: { label: symbolsLabel },
  } = passwordOptions;

  // ---- Function to handle options change (checkbox selection)
  const handleOptionsChange = (e) => {
    // ---- Get the id and checked value from the selected option
    const { id, checked } = e.target;

    // ---- Update the options state based on the selected option
    // ---- If the selected option was checked it will be unchecked when clicked and vice versa
    setPasswordOptions((prevOptions) => ({
      ...prevOptions,
      [id]: {
        ...prevOptions[id],
        checked: checked, // Only update the `checked` property of the selected option (true or false)
      },
    }));
  };

  // ---- UseEffect that forces at least one option to be checked between 'uppercase', 'lowercase', and 'numbers'
  useEffect(() => {
    setPasswordOptions((prevOptions) => ({
      ...prevOptions,
      uppercase: {
        ...prevOptions.uppercase,
        disabled: !lowercaseChecked && !numbersChecked, // if both 'lowercase' and 'numbers' are unchecked, disable 'uppercase'
      },
      lowercase: {
        ...prevOptions.lowercase,
        disabled: !uppercaseChecked && !numbersChecked, // if both 'uppercase' and 'numbers' are unchecked, disable 'lowercase'
      },
      numbers: {
        ...prevOptions.numbers,
        disabled: !uppercaseChecked && !lowercaseChecked, // if both 'uppercase' and 'lowercase' are unchecked, disable 'numbers'
      },
    }));
  }, [uppercaseChecked, lowercaseChecked, numbersChecked, setPasswordOptions]);

  return (
    <ul className="options-list">
      <li className="options-item">
        <label htmlFor="uppercase">{uppercaseLabel}</label>
        <input
          checked={uppercaseChecked}
          disabled={uppercaseDisabled}
          type="checkbox"
          id="uppercase"
          className="option-input"
          aria-checked={uppercaseChecked}
          aria-disabled={uppercaseDisabled}
          onChange={handleOptionsChange}
        ></input>
      </li>
      <li className="options-item">
        <label htmlFor="lowercase">{lowercaseLabel}</label>
        <input
          checked={lowercaseChecked}
          disabled={lowercaseDisabled}
          type="checkbox"
          id="lowercase"
          className="option-input"
          aria-checked={lowercaseChecked}
          aria-disabled={lowercaseDisabled}
          onChange={handleOptionsChange}
        ></input>
      </li>
      <li className="options-item">
        <label htmlFor="numbers">{numbersLabel}</label>
        <input
          checked={numbersChecked}
          disabled={numbersDisabled}
          type="checkbox"
          id="numbers"
          className="option-input"
          aria-checked={numbersChecked}
          aria-disabled={numbersDisabled}
          onChange={handleOptionsChange}
        ></input>
      </li>
      <li className="options-item">
        <label htmlFor="symbols">{symbolsLabel}</label>
        <input
          checked={symbolsChecked}
          disabled={symbolsDisabled}
          type="checkbox"
          id="symbols"
          className="option-input"
          aria-checked={symbolsChecked}
          aria-disabled={symbolsDisabled}
          onChange={handleOptionsChange}
        ></input>
      </li>
    </ul>
  );
}

PasswordOptions.propTypes = {
  passwordOptions: PropTypes.shape({
    uppercase: PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool.isRequired,
    }).isRequired,
    lowercase: PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool.isRequired,
    }).isRequired,
    numbers: PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool.isRequired,
    }).isRequired,
    symbols: PropTypes.shape({
      checked: PropTypes.bool.isRequired,
      label: PropTypes.string.isRequired,
      disabled: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  setPasswordOptions: PropTypes.func.isRequired,
};
