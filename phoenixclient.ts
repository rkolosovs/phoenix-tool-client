/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

import {MouseFunctions, Drawing, GUI, Loading} from "./types";

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
