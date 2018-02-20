import {MouseFunctions} from "./controls/mouseFunctions";
import {Drawing} from "./gui/drawingFunctions";
import {GUI} from "./gui/gui";

// attach handlers to mouse events and canvas resizing
window.addEventListener('resize', Drawing.resizeCanvas, false);
GUI.getCanvas().addEventListener('mousedown', MouseFunctions.mouseDown, true );
document.addEventListener('mouseup', MouseFunctions.mouseUp, true );
GUI.getCanvas().addEventListener('mousemove', MouseFunctions.mouseMove, true );
GUI.getCanvas().addEventListener('wheel', MouseFunctions.mouseWheel, true );
// initializing the tool
Loading.getNewDataFromServer();
Loading.loadTurnNumber();
Loading.loadImages(Drawing.tileset);
Drawing.setHexParts(Drawing.scale);
// activating periodic reloading of data from server
setInterval(Loading.getNewDataFromServer, 30000);
