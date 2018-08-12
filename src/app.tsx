import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import LoginWindow from "./gui/windows/loginWindow";
import Canvas from "./gui/canvas/canvas";
import {store} from "./gameState/gameState";

let body: HTMLElement = document.getElementById("body");

ReactDOM.render(
    <Provider store={store}>
        <div id={'root'}>
            <Canvas/>
            <LoginWindow/>
        </div>
    </Provider>,
    body
);
