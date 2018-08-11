import * as React from "react";
import * as ReactDOM from "react-dom";
import LoginWindow from "./gui/windows/loginWindow";
import Canvas from "./gui/canvas/canvas";

let body: HTMLElement = document.getElementById("body");

ReactDOM.render(
    <div id={'root'}>
        <Canvas/>
        <LoginWindow/>
    </div>,
  body
);
