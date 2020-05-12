import React, { useEffect, useState } from "react";
import "./App.css";
import { createScene } from "./three";
import { COLORS, MODEL_PARTS } from "./cons";
import { loadModel } from "./three";
import { selectSwatch } from "./utils";

function App() {
  const [selectedPart, setSelectedPart] = useState("legs");

  function changeColor(color) {
    selectSwatch(color, loadModel, selectedPart);
  }

  useEffect(() => {
    createScene();
  }, []);

  return (
    <div>
      <div id="js-tray" className="tray">
        <div id="js-tray-slide" className="tray__slide">
          {COLORS.map((color, i) => {
            return (
              <div
                className="tray__swatch"
                key={color.color}
                data-key={i}
                style={{
                  backgroundColor: `#${color.color}`,
                }}
                onClick={(e) => changeColor(e)}
              />
            );
          })}
        </div>
      </div>
      <div className="options">
        {MODEL_PARTS.map((part, i) => {
          return (
            <div
              className={`option ${
                selectedPart === part.name && "--is-active"
              }`}
              key={i}
              onClick={() => setSelectedPart(part.name)}
            >
              <img src={`${part.img}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
