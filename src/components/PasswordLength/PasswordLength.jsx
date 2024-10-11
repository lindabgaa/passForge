// tools
import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";

// styles
import "./PasswordLength.css";

export default function PasswordLength({ passwordLength, setPasswordLength }) {
  const rangeRef = useRef(null);
  const MIN_LENGTH = 7;
  const MAX_LENGTH = 100;

  // ---- Function to handle range input change
  const handleInputRangeChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setPasswordLength(value);
  };

  // ---- Function to update range progress
  const updateRangeProgress = useCallback((value) => {
    const range = rangeRef.current;
    if (range) {
      const rangeProgress =
        ((value - MIN_LENGTH) / (MAX_LENGTH - MIN_LENGTH)) * 100;
      range.style.background = `linear-gradient(to right, #0571ed ${rangeProgress}%, #e6e6e6 ${rangeProgress}%)`;
    }
  }, []);

  // ---- useEffect to update range progress on length change
  useEffect(() => {
    updateRangeProgress(passwordLength);
  }, [passwordLength, updateRangeProgress]);

  // ---- Function to handle number input change
  const handleInputNumberChange = (e) => {
    let value = e.target.value;

    if (value === "") {
      setPasswordLength("");
      return;
    }

    value = parseInt(value, 10);

    if (Number.isNaN(value)) {
      return;
    }

    setPasswordLength(Math.min(value, 100) || 100);
  };

  // Function to handle number input blur
  const handleInputNumberBlur = (e) => {
    let value = parseInt(e.target.value, 10);
    setPasswordLength(Math.max(value, 7) || 7);
  };

  return (
    <div className="length-container">
      <label id="password-length-label" className="length-label">
        Character
      </label>
      <span className="show-on-mobile">{`Character (${passwordLength})`}</span>
      <input
        ref={rangeRef}
        type="range"
        min={MIN_LENGTH}
        max={MAX_LENGTH}
        value={passwordLength || MIN_LENGTH}
        className="range-input"
        aria-labelledby="password-length-label"
        onChange={handleInputRangeChange}
      ></input>
      <input
        type="number"
        min={MAX_LENGTH}
        max={MIN_LENGTH}
        value={passwordLength}
        className="number-input hide-on-mobile"
        aria-labelledby="password-length-label"
        onChange={handleInputNumberChange}
        onBlur={handleInputNumberBlur}
      ></input>
    </div>
  );
}

PasswordLength.propTypes = {
  passwordLength: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([""])])
    .isRequired,
  setPasswordLength: PropTypes.func.isRequired,
};
