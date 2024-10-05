// tools
import PropTypes from "prop-types";
import { useState } from "react";

// assets
import copyIcon from "../../assets/copy-icon.svg";

// styles
import styles from "./PasswordDisplay.module.css";

export default function PasswordDisplay({ password }) {
  const [copySuccess, setCopySuccess] = useState(null);

  // ---- Function to handle copy icon click
  const handleCopyIconClick = () => {
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
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <div className={styles.container}>
      <p className={styles.passwordText}>{password}</p>
      {copySuccess === null ? (
        <img
          src={copyIcon}
          className={styles.copyIcon}
          alt="copy icon"
          aria-label="copy password"
          onClick={handleCopyIconClick}
        />
      ) : copySuccess === true ? (
        <p className={styles.copySuccess}>copied</p>
      ) : copySuccess === false ? (
        <p className={styles.copyError}>failed to copy</p>
      ) : null}
    </div>
  );
}

PasswordDisplay.propTypes = {
  password: PropTypes.string.isRequired,
};
