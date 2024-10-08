// tools
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// styles
import "./PasswordOptions.css";

export default function PasswordOptions({
  passwordOptions,
  setPasswordOptions,
}) {
  const [disabledOptions, setDisabledOptions] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  // ---- Function to handle options change
  const handleOptionsChange = (e) => {
    // ---- Get the id and checked status of the input
    const id = e.target.id;
    const isChecked = e.target.checked;

    // ---- Update the options state
    setPasswordOptions((prevOptions) => {
      // Create a projected version of the options with the current change
      const updatedOptions = {
        ...prevOptions,
        [id]: isChecked,
      };

      // If all options are unchecked in the projected version, return the previous options
      if (
        !updatedOptions.uppercase &&
        !updatedOptions.lowercase &&
        !updatedOptions.numbers
      ) {
        return prevOptions;
      }

      // If any options are checked in the projected version, return the projected version
      return updatedOptions;
    });
  };

  // ---- UseEffect to update disabled options
  useEffect(() => {
    const { uppercase, lowercase, numbers } = passwordOptions;

    setDisabledOptions({
      uppercase: !lowercase && !numbers, // Disable 'uppercase' if both 'lowercase' and 'numbers' are unchecked
      lowercase: !uppercase && !numbers, // Disable 'lowercase' if both 'uppercase' and 'numbers' are unchecked
      numbers: !uppercase && !lowercase, // Disable 'numbers' if both 'uppercase' and 'lowercase' are unchecked
      symbols: false,
    });
  }, [passwordOptions]);

  return (
    <ul className="options-list">
      <li className="options-item">
        <label htmlFor="uppercase">Uppercase Letters</label>
        <input
          checked={passwordOptions.uppercase}
          disabled={disabledOptions.uppercase}
          type="checkbox"
          id="uppercase"
          className="option-input"
          onChange={handleOptionsChange}
        ></input>
      </li>
      <li className="options-item">
        <label htmlFor="lowercase">Lowercase Letters</label>
        <input
          checked={passwordOptions.lowercase}
          disabled={disabledOptions.lowercase}
          type="checkbox"
          id="lowercase"
          className="option-input"
          onChange={handleOptionsChange}
        ></input>
      </li>
      <li className="options-item">
        <label htmlFor="numbers">Numbers</label>
        <input
          checked={passwordOptions.numbers}
          disabled={disabledOptions.numbers}
          type="checkbox"
          id="numbers"
          className="option-input"
          onChange={handleOptionsChange}
        ></input>
      </li>
      <li className="options-item">
        <label htmlFor="symbols">Symbols (@&$!#?)</label>
        <input
          checked={passwordOptions.symbols}
          disabled={disabledOptions.symbols}
          type="checkbox"
          id="symbols"
          className="option-input"
          onChange={handleOptionsChange}
        ></input>
      </li>
    </ul>
  );
}

PasswordOptions.propTypes = {
  passwordOptions: PropTypes.object.isRequired,
  setPasswordOptions: PropTypes.func.isRequired,
};
