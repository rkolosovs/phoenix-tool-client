import {Field} from "../map/field";
import {Building} from "../buildings/building";

export class Controls{
    static selectedFields: [number, number][]  = []; // list of fields to be highlighted
    static shootingTarget: [number, number]|undefined;
    static selectedArmyIndex: number = -1; // index of the currently selected army in the GameState.armies
    static scrollSpeed: number = 0.2; // increment to scroll with each step
    static changedFields: Field[] = []; // Fields that were changes with World Builder
    // boolean is true if added or changed, false if removed
    static changedBuildings: [boolean, Building][] = [];
    static leftMousePressed: boolean = false; // was the left mouse button clicked but not yet released?
    static rightMousePressed: boolean = false; // was the right mouse button clicked but not yet released?
    static isDragging: boolean = false; // was the mouse moved while the button is down?
    //coordinate of the origin in respect to which all drawing is done
    static origin: [number, number] = [900, 490];
    //coordinate of the point where the mouse was clicked
    static click: [number, number] = [0, 0];
    //distance the mouse was dragged
    static move: [number, number] = [0, 0];
}