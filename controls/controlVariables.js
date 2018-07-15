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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Controls {
    }
    Controls.selectedFields = []; // list of fields to be highlighted
    Controls.selectedArmyIndex = -1; // index of the currently selected army in the GameState.armies
    Controls.scrollSpeed = 0.2; // increment to scroll with each step
    Controls.changedFields = []; // Fields that were changes with World Builder
    // boolean is true if added or changed, false if removed
    Controls.changedBuildings = [];
    Controls.leftMousePressed = false; // was the left mouse button clicked but not yet released?
    Controls.rightMousePressed = false; // was the right mouse button clicked but not yet released?
    Controls.isDragging = false; // was the mouse moved while the button is down?
    //coordinate of the origin in respect to which all drawing is done
    Controls.origin = [900, 490];
    //coordinate of the point where the mouse was clicked
    Controls.click = [0, 0];
    //distance the mouse was dragged
    Controls.move = [0, 0];
    exports.Controls = Controls;
});
//# sourceMappingURL=controlVariables.js.map