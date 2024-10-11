// tools
import PropTypes from "prop-types";

// styles
import "./PasswordStrength.css";

export default function PasswordStrength({ passwordStrength }) {
  // Helper function to get the appropriate CSS class based on password strength
  const getPasswordStrengthClassName = (strength) => {
    switch (strength) {
      case "Very Weak":
        return "very-weak";
      case "Weak":
        return "weak";
      case "Moderate":
        return "moderate";
      case "Strong":
        return "strong";
      case "Very Strong":
        return "very-strong";
    }
  };

  return (
    <div className="password-strength-container">
      {/* Password strength bar */}
      <div className="password-strength-bar">
        {/* Create 5 segments for the strength bar */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className={`strength-bar-segment 
              ${getPasswordStrengthClassName(passwordStrength)}`}
          ></div>
        ))}
      </div>
      {/* Display the password strength text */}
      <p
        className={`password-strength-text ${getPasswordStrengthClassName(
          passwordStrength
        )}`}
      >
        {passwordStrength}
      </p>
    </div>
  );
}

PasswordStrength.propTypes = {
  passwordStrength: PropTypes.oneOf([
    "Very Weak",
    "Weak",
    "Moderate",
    "Strong",
    "Very Strong",
  ]).isRequired,
};
