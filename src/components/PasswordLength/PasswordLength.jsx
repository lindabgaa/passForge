// tools
import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

// styles
import styles from "./PasswordLength.module.css";

export default function PasswordLength({ passwordLength, setPasswordLength }) {
  const rangeRef = useRef(null);

  // ---- Function to handle range input change
  const handleInputRangeChange = (e) => {
    const value = e.target.value;
    setPasswordLength(value);
  };

  // ---- Function to update range progress
  const updateRangeProgress = (value) => {
    const range = rangeRef.current;
    const rangeProgress = (value / range.max) * 100;
    range.style.background = `linear-gradient(to right, #293241 ${rangeProgress}%, #e6e6e6 ${rangeProgress}%)`;
  };

  // ---- UseEffect to update range progress on length change
  useEffect(() => {
    updateRangeProgress(length);
  }, [passwordLength]);

  // ---- Function to handle number input change
  const handleInputNumberChange = (e) => {
    let value = e.target.value;

    if (value > 100) {
      value = 100;
    }

    setPasswordLength(value);
  };

  // Function to handle number input blur
  const handleInputNumberBlur = (e) => {
    let value = e.target.value;

    if (value < 7) {
      value = 7;
    }

    setPasswordLength(value);
  };

  return (
    <div className={styles.container}>
      <p>Character</p>
      <input
        ref={rangeRef}
        type="range"
        min="7"
        max="100"
        value={!passwordLength ? 7 : passwordLength}
        className={styles.lengthSlider}
        onChange={handleInputRangeChange}
      ></input>
      <input
        type="number"
        min="7"
        max="100"
        value={passwordLength}
        className={styles.lengthInput}
        onChange={handleInputNumberChange}
        onBlur={handleInputNumberBlur}
      ></input>
    </div>
  );
}

PasswordLength.propTypes = {
  passwordLength: PropTypes.string.isRequired,
  setPasswordLength: PropTypes.func.isRequired,
};
