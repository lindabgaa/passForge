// tools
import { useState } from "react";

// assets
import copyIcon from "./assets/copy-icon.svg";

// styles
import "./App.css";

export default function App() {
  const [password, setPassword] = useState("P4$5W0rD!");
  const [length, setLength] = useState(0);
  const [options, setOptions] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const handleRangeChange = (e) => {
    setLength(e.currentTarget.value);
  };

  const handleCopyIconClick = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <main className="main-container">
      <div className="display-wrapper">
        <p>{password}</p>
        <div className="copy-wrapper">
          <p></p>
          <img
            src={copyIcon}
            className="copy-icon"
            alt="copy icon"
            onClick={handleCopyIconClick}
          />
        </div>
      </div>
      <form action="" className="form-wrapper">
        <div className="length-wrapper">
          <p>Character</p>
          <input
            className="length-slider"
            type="range"
            min="0"
            max="100"
            value={length}
            onChange={handleRangeChange}
          ></input>
          <div className="length-value">{length}</div>
        </div>

        <ul className="options-list">
          <li className="option-item">
            <label htmlFor="uppercase">Uppercase Letters</label>
            <input type="checkbox" id="uppercase"></input>
          </li>
          <li className="option-item">
            <label htmlFor="lowercase">Lowercase Letters</label>
            <input type="checkbox" id="lowercase"></input>
          </li>
          <li className="option-item">
            <label htmlFor="number">Numbers</label>
            <input type="checkbox" id="number"></input>
          </li>
          <li className="option-item">
            <label htmlFor="symbols">Symbols (@&$!#?)</label>
            <input type="checkbox" id="symbols"></input>
          </li>
        </ul>
      </form>
    </main>
  );
}
