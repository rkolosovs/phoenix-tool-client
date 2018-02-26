"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mouseFunctions_1 = require("./controls/mouseFunctions");
const drawingFunctions_1 = require("./gui/drawingFunctions");
const gui_1 = require("./gui/gui");
const loadingDataFunctions_1 = require("./serverInteraction/loadingDataFunctions");
// attach handlers to mouse events and canvas resizing
window.addEventListener('resize', drawingFunctions_1.Drawing.resizeCanvas, false);
gui_1.GUI.getCanvas().addEventListener('mousedown', mouseFunctions_1.MouseFunctions.mouseDown, true);
document.addEventListener('mouseup', mouseFunctions_1.MouseFunctions.mouseUp, true);
gui_1.GUI.getCanvas().addEventListener('mousemove', mouseFunctions_1.MouseFunctions.mouseMove, true);
gui_1.GUI.getCanvas().addEventListener('wheel', mouseFunctions_1.MouseFunctions.mouseWheel, true);
// initializing the tool
loadingDataFunctions_1.Loading.getNewDataFromServer();
loadingDataFunctions_1.Loading.loadTurnNumber();
loadingDataFunctions_1.Loading.loadImages(drawingFunctions_1.Drawing.tileset);
drawingFunctions_1.Drawing.setHexParts(drawingFunctions_1.Drawing.scale);
// activating periodic reloading of data from server
setInterval(loadingDataFunctions_1.Loading.getNewDataFromServer, 30000);
