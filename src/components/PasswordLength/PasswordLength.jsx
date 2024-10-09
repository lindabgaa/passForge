// tools
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

// styles
import "./PasswordLength.css";

export default function PasswordLength({ passwordLength, setPasswordLength }) {
  const rangeRef = useRef(null);

  // ---- Function to handle range input change
  const handleInputRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPasswordLength(value);
  };

  // ---- Function to update range progress
  const updateRangeProgress = (value) => {
    const range = rangeRef.current;
    const rangeProgress = (value / range.max) * 100;
    range.style.background = `linear-gradient(to right, #0571ed ${rangeProgress}%, #e6e6e6 ${rangeProgress}%)`;
  };

  // ---- useEffect to update range progress on length change
  useEffect(() => {
    updateRangeProgress(passwordLength);
  }, [passwordLength]);

  // ---- Function to handle number input change
  const handleInputNumberChange = (e) => {
    let value = e.target.value;

    if (value === "") {
      setPasswordLength("");
      return;
    }

    if (isNaN(value)) {
      return;
    }

    value = parseInt(value, 10);

    if (value > 100) {
      value = 100;
    }

    setPasswordLength(value);
  };

  // Function to handle number input blur
  const handleInputNumberBlur = (e) => {
    let value = parseInt(e.target.value, 10);

    if (value < 7 || isNaN(value)) {
      value = 7;
    }

    setPasswordLength(value);
  };

  return (
    <div className="length-wrapper">
      <label id="password-length-label" className="length-label">
        Character
      </label>
      <input
        ref={rangeRef}
        type="range"
        min="7"
        max="100"
        value={passwordLength || 7}
        className="length-slider"
        aria-labelledby="password-length-label"
        onChange={handleInputRangeChange}
      ></input>
      <input
        type="number"
        min="7"
        max="100"
        value={passwordLength}
        className="length-input"
        aria-labelledby="password-length-label"
        onChange={handleInputNumberChange}
        onBlur={handleInputNumberBlur}
      ></input>
    </div>
  );
}

PasswordLength.propTypes = {
  passwordLength: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([""]),
  ]),
  setPasswordLength: PropTypes.func.isRequired,
};
