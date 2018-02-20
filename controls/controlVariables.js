"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controls {
}
Controls.selectedFields = []; // list of fields to be highlighted
Controls.selectedArmyIndex = -1; // index of the currently selected army in the GameState.armies
Controls.scrollSpeed = 0.2; // increment to scroll with each step
Controls.changedFields = []; // Fields that were changes with World Builder
// true if added false if removed, buildings that were added deleted or changed
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
