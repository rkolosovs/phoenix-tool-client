"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
// attach handlers to mouse events and canvas resizing
window.addEventListener('resize', types_1.Drawing.resizeCanvas, false);
types_1.GUI.getCanvas().addEventListener('mousedown', types_1.MouseFunctions.mouseDown, true);
document.addEventListener('mouseup', types_1.MouseFunctions.mouseUp, true);
types_1.GUI.getCanvas().addEventListener('mousemove', types_1.MouseFunctions.mouseMove, true);
types_1.GUI.getCanvas().addEventListener('wheel', types_1.MouseFunctions.mouseWheel, true);
// initializing the tool
types_1.Loading.getNewDataFromServer();
types_1.Loading.loadTurnNumber();
types_1.Loading.loadImages(types_1.Drawing.tileset);
types_1.Drawing.setHexParts(types_1.Drawing.scale);
// activating periodic reloading of data from server
setInterval(types_1.Loading.getNewDataFromServer, 30000);
//# sourceMappingURL=phoenixclient.js.map