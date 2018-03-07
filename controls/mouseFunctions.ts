import {Controls} from "./controlVariables";
import {GameState} from "../gameState";
import {Drawing} from "../gui/drawingFunctions";
import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";
import {RiderArmy} from "../armies/riderArmy";
import {HexFunction} from "../libraries/hexFunctions";
import {FootArmy} from "../armies/footArmy";
import {Realm} from "../realm";
import {Fleet} from "../armies/fleet";

export namespace MouseFunctions{
    import skpBuffer = BoxVisibility.skpBuffer;
    import leaderBuffer = BoxVisibility.leaderBuffer;
    import countBuffer = BoxVisibility.countBuffer;
    import armyIdBuffer = BoxVisibility.armyIdBuffer;
    import guardBuffer = BoxVisibility.guardBuffer;
    import lkpBuffer = BoxVisibility.lkpBuffer;
    import ownerBuffer = BoxVisibility.ownerBuffer;
    import armyWithNextClick = BoxVisibility.armyWithNextClick;
    import mountsBuffer = BoxVisibility.mountsBuffer;
    import switchBtnBoxTo = BoxVisibility.switchBtnBoxTo;
    import switchModeTo = BoxVisibility.switchModeTo;
    import worldCreationModeOnClick = BoxVisibility.worldCreationModeOnClick;
    import changeFieldToType = BoxVisibility.changeFieldToType;
    import shootingModeOn = BoxVisibility.shootingModeOn;
    import restoreInfoBox = BoxVisibility.restoreInfoBox;
    import updateInfoBox = BoxVisibility.updateInfoBox;

    export function mouseDown(event: MouseEvent){
        if (event.button === 0) {
            Controls.leftMousePressed = true;
            // record the x coordinate of the mouse when it was clicked
            Controls.click[0] = event.pageX;
            // record the y coordinate of the mouse when it was clicked
            Controls.click[1] = event.pageY;
        } else if (event.button === 2) {
            Controls.rightMousePressed = true;
            // record the x coordinate of the mouse when it was clicked
            Controls.click[0] = event.pageX;
            // record the y coordinate of the mouse when it was clicked
            Controls.click[1] = event.pageY;
        }
        Drawing.drawStuff();
    }

    export function mouseUp(event: MouseEvent){
        if (Controls.leftMousePressed && event.button === 0) {
            if (Controls.isDragging) { // mouse was dragged; run panning finish routine
                // add the x offset from dragged mouse to the current x origin for drawing
                Controls.origin[0] += Controls.move[0];
                // add the y offset from dragged mouse to the current y origin for drawing
                Controls.origin[1] += Controls.move[1];
            }
            else {
                registerLeftClick(); // do whatever has to be done on leftclick
            }
            // reset mouse click parameters
            Controls.leftMousePressed = false; // mouse is no longer pressed
            Controls.isDragging = false; // mouse is no longer being dragged
            Controls.click = [0, 0]; // reset click registration
            Controls.move = [0, 0]; // reset move registration
        } else if (Controls.rightMousePressed && event.button === 2) {
            if (!Controls.isDragging) {
                registerRightClick();
            }
            // reset mouse click parameters
            Controls.rightMousePressed = false; // mouse is no longer pressed
            Controls.isDragging = false; // mouse is no longer being dragged
            Controls.click = [0, 0]; // reset click registration
            Controls.move = [0, 0]; // reset move registration
        }
        Drawing.drawStuff();
    }

    export function mouseMove(event: MouseEvent){
        if (Controls.leftMousePressed === true) {
            Controls.isDragging = true; // for later click detection; no click if mouse was previously dragged
            Controls.move[0] = event.pageX - Controls.click[0]; // compute the x offset from dragged mouse
            Controls.move[1] = event.pageY - Controls.click[1]; // compute the y offset from dragged mouse
            Drawing.drawStuff();
        }
    }

    export function mouseWheel(event: MouseWheelEvent) {
        let deltaY: number = event.deltaY; // get amount scrolled
        let mouse: [number, number] = [event.pageX, event.pageY]; // get current mouse position
        // get the tile the mouse is currently in (and the position in the tile)
        let pos: [number, number] = [(mouse[0] - Controls.origin[0]) / Drawing.scale,
            (mouse[1] - Controls.origin[1]) / Drawing.scale];
        if (deltaY < 0) { // do the actuall scrolling
            Drawing.scale *= 1 + Controls.scrollSpeed;
        } else {
            Drawing.scale *= 1 - Controls.scrollSpeed;
        }
        Drawing.setHexParts(Drawing.scale); // compute the scale dependant values used for map drawing
        // compute the new distance of mouse from origin
        let newPos: [number, number] = [pos[0] * Drawing.scale, pos[1] * Drawing.scale];
        // move origin so that the tile stays the same  with the new scaling
        Controls.origin = [mouse[0] - newPos[0], mouse[1] - newPos[1]];
        Drawing.drawStuff();
    }

    function registerLeftClick() {
        let clickedField: [number, number] = getClickedField(); // get selected field
        // If mount or unmount is activated, cancel it.
        if (armyWithNextClick) {
            let owner: Realm|undefined = GameState.realms.find(realm => realm.tag === ownerBuffer);
            if(owner == undefined){
                throw new Error("Realm not found.");
            }
            switch (Math.floor(armyIdBuffer / 100)) {
                case 3: GameState.armies.push(new Fleet(armyIdBuffer, owner, countBuffer, leaderBuffer, lkpBuffer, skpBuffer,
                    clickedField, Fleet.MAX_MOVE_POINTS, guardBuffer));
                    break;
                case 2: GameState.armies.push(new RiderArmy(armyIdBuffer, owner, countBuffer, leaderBuffer, clickedField,
                    RiderArmy.MAX_MOVE_POINTS, RiderArmy.MAX_HEIGHT_POINTS, guardBuffer));
                    break;
                case 1: GameState.armies.push(new FootArmy(armyIdBuffer, owner, countBuffer, leaderBuffer, lkpBuffer, skpBuffer,
                    clickedField, FootArmy.MAX_MOVE_POINTS, FootArmy.MAX_HEIGHT_POINTS, guardBuffer));
                    break;
            }
            ownerBuffer = GUI.getArmyGeneratorBox().getOwnerField().value;
            armyIdBuffer = 0;
            GUI.getArmyGeneratorBox().getArmyNumberField().value = "0";
            countBuffer = 0;
            GUI.getArmyGeneratorBox().getCountField().value = "0";
            leaderBuffer = 0;
            GUI.getArmyGeneratorBox().getLeaderField().value = "0";
            mountsBuffer = 0;
            GUI.getArmyGeneratorBox().getMountsField().value = "0";
            lkpBuffer = 0;
            GUI.getArmyGeneratorBox().getLKPField().value = "0";
            skpBuffer = 0;
            GUI.getArmyGeneratorBox().getSKPField().value = "0";

            switchBtnBoxTo(GUI.getButtonsBox());
            switchModeTo("none");
        } else if(worldCreationModeOnClick){
            let posi = HexFunction.positionInList(clickedField);
            if(changeFieldToType === -1){
                // checks if Field should be changed to a specific type, if not use
                // normal world creation mode on click
                if (GameState.fields[posi].type === 8 || GameState.fields[posi].type === 9) {
                    GameState.fields[posi].type = 0;
                } else {
                    GameState.fields[posi].type++;
                }
            } else if ((changeFieldToType <= 9) && (changeFieldToType >= 0)) {
                GameState.fields[posi].type = changeFieldToType;
            }
            let found = false;
            for (let i = 0; i < changedFields.length; i++) {
                if ((changedFields[i].x === GameState.fields[posi].coordinates[0]) &&
                    (changedFields[i].y === GameState.fields[posi].coordinates[1])) {
                    changedFields[i].type = GameState.fields[posi].type;
                    found = true;
                }
            }
            if (!found) {
                changedFields.push({ "type": GameState.fields[posi].type,
                    "x": GameState.fields[posi].coordinates[0],
                    "y": GameState.fields[posi].coordinates[1] });
            }
        } else {
            // Feldauswahl
            let index = -1;
            let sf = Controls.selectedFields[0];
            if (sf != undefined && (sf[0] === clickedField[0]) && (sf[1] === clickedField[1])) {
                Controls.selectedFields = [];
            } else {
                Controls.selectedFields[0] = clickedField;
            }
            // Armeeauswahl
            restoreInfoBox();
            Controls.selectedArmyIndex = -1;
            let possibleSelections = [];
            GameState.armies.forEach((army, index) => {
                if(army.getPosition()[0] === clickedField[0] && army.getPosition()[1] === clickedField[1]){
                    possibleSelections.push(index);
                    selectedArmyIndex = index;
                }});
            if (document.getElementById("btnSection") != undefined) {
                let d = GUI.getButtonsBox();
                d.removeChild(document.getElementById("btnSection"));
            }
            if (possibleSelections.length !== 0) {
                let x = document.createElement("SECTION");
                x.setAttribute("id", "btnSection")
                for (let i = 0; i < possibleSelections.length; i++) {
                    let btn: HTMLButtonElement = document.createElement("BUTTON") as HTMLButtonElement;
                    btn.setAttribute("class", "fixedPrettyButton");
                    btn.name = GameState.armies[possibleSelections[i]].getErkenfaraID() + " " +
                        GameState.armies[possibleSelections[i]].owner.tag;
                    let t = document.createTextNode(""+ GameState.armies[possibleSelections[i]].getErkenfaraID());
                    btn.appendChild(t);
                    btn.addEventListener('click', function (event) {
                        let idToSearchFor = this.name.split(" ")[0];
                        let ownerToSearchFor = this.name.split(" ")[1];
                        for (let j = 0; j < GameState.armies.length; j++) {
                            if (GameState.armies[j].getErkenfaraID() === parseInt(idToSearchFor) &&
                                GameState.armies[j].owner.tag === ownerToSearchFor) {
                                selectedArmyIndex = j;
                            }
                        }
                        updateInfoBox();
                        restoreInfoBox();
                        if (selectedArmyIndex !== undefined) {
                            GameState.armies[selectedArmyIndex].clickedMoves();
                        }
                        Drawing.drawStuff();
                    });
                    x.appendChild(btn);
                }
                GUI.getButtonsBox().appendChild(x);
            }
            updateInfoBox();
            if (selectedArmyIndex !== undefined) {
                GameState.armies[selectedArmyIndex].clickedMoves();
            }
        }
    }

    function registerRightClick() {
        let clickedField = getClickedField();
        if(worldCreationModeOnClick){
            let posi = HexFunction.positionInList(clickedField);
            if(changeFieldToType == -1){
                // checks if Field should be changed to a specific type (then
                // rightclick is disabled)
                if (GameState.fields[posi].type === 0 || GameState.fields[posi].type === 9) {
                    GameState.fields[posi].type = 8;
                } else {
                    GameState.fields[posi].type--;
                }
                let found = false;
                for (let i = 0; i < changedFields.length; i++) {
                    if ((changedFields[i].x == GameState.fields[posi].coordinates[0]) &&
                        (changedFields[i].y == GameState.fields[posi].coordinates[1])) {
                        changedFields[i].type = GameState.fields[posi].type;
                        found = true;
                    }
                }
                if (!found) {
                    changedFields.push({ "type": GameState.fields[posi].type,
                        "x": GameState.fields[posi].coordinates[0],
                        "y": GameState.fields[posi].coordinates[1] });
                }
            }
        } else if(shootingModeOn){
            //for shooting the bastards
            Controls.shootingTarget = clickedField;
        } else {
            if(selectedArmyIndex === undefined){
                console.log("Can't move with no army selected");
            } else {
                let clickedArmy: [number, number] = [GameState.armies[selectedArmyIndex].getPosition()[0],
                    GameState.armies[selectedArmyIndex].getPosition()[1]];
                let localNeighbors = HexFunction.neighbors(clickedArmy);
                for (let i = 0; i < localNeighbors.length; i++){
                    if(localNeighbors[i][0] === clickedField[0] && localNeighbors[i][1] === clickedField[1]){
                        let moveSuccessfull: boolean = true;
                        if (GameState.armies[selectedArmyIndex].owner.tag === login || login === "sl") {
                            try{
                                GameState.armies[selectedArmyIndex].move(i);
                            } catch (e){
                                console.log(e);
                                moveSuccessfull = false;
                            }
                        } else {
                            console.log("Can only move your own armies.");
                        }
                        if (moveSuccessfull) {
                            preparedEvents.push({
                                type: "move", content: {
                                    armyId: GameState.armies[selectedArmyIndex].getErkenfaraID(),
                                    realm: GameState.armies[selectedArmyIndex].owner.tag,
                                    fromX: clickedArmy[0], fromY: clickedArmy[1],
                                    toX: GameState.armies[selectedArmyIndex].getPosition()[0],
                                    toY: GameState.armies[selectedArmyIndex].getPosition()[1]
                                }
                            });

                            let battlePossible = false;
                            let participants = [];

                            for (let j = 0; j < GameState.armies.length; j++) {
                                let someArmy = GameState.armies[j];
                                if (someArmy.getPosition()[0] === GameState.armies[selectedArmyIndex].getPosition()[0] &&
                                    someArmy.getPosition()[1] === GameState.armies[selectedArmyIndex].getPosition()[1]
                                    && someArmy !== GameState.armies[selectedArmyIndex]) {
                                    participants.push({ armyId: someArmy.getErkenfaraID(), realm: someArmy.owner.tag });
                                    //in case they are enemies
                                    if (someArmy.owner !== GameState.armies[selectedArmyIndex].owner) {
                                        battlePossible = true;
                                    }
                                    //MultipleArmies - even if not friendly
                                    //5 cases
                                    //1. move to create multifield
                                    //2. move to existing multifield
                                    //3. move from multi and leaving regular field
                                    //4. move from multi but still multifield left
                                    //5. move from multi to multi
                                }
                            }

                            if (battlePossible) {
                                let inserted = false;
                                participants.push({
                                    armyId: GameState.armies[selectedArmyIndex].getErkenfaraID(),
                                    realm: GameState.armies[selectedArmyIndex].owner.tag
                                });
                                for (let j = 0; j < preparedEvents.length; j++) {
                                    if (preparedEvents[j].type === "battle" &&
                                        preparedEvents[j].content.x === GameState.armies[selectedArmyIndex].getPosition()[0] &&
                                        preparedEvents[j].content.y === GameState.armies[selectedArmyIndex].getPosition()[1]) {
                                        preparedEvents[j].content.participants = participants;
                                        inserted = true;
                                    }
                                }
                                if (!inserted) {
                                    preparedEvents.push({
                                        type: "battle", content: {
                                            participants: participants,
                                            x: GameState.armies[selectedArmyIndex].getPosition()[0],
                                            y: GameState.armies[selectedArmyIndex].getPosition()[1]
                                        }
                                    });
                                }
                            } else { //no battle -> conquer land (TODO: diplomacy goes here)
                                GameState.armies[selectedArmyIndex].conquer();
                            }
                        }
                    }
                }
                updateInfoBox();
            }
        }
    }

    function getClickedField(): [number, number] {
        let x = Controls.click[0] - Controls.origin[0]; // reverse our x/y origin offset
        let y = Controls.click[1] - Controls.origin[1];
        let m = Drawing.c / (Drawing.gW * 0.5); // the inclination of the hexes upper triangle side

        let row = Math.floor(y / Drawing.gH); // get the rectangle clicked in
        let rowIsOdd = (row % 2 !== 0);
        let column = Math.floor((rowIsOdd ? ((x + 0.5 * Drawing.gW) / Drawing.gW) : (x / Drawing.gW)));

        let relY = y - (row * Drawing.gH); // compute relative position of the click in
        // respect to the rectangle
        let relX = rowIsOdd ? ((x + 0.5 * Drawing.gW) - (column * Drawing.gW)) : (x - (column * Drawing.gW));

        if (relY < (-m) * relX + Drawing.c) { // click is in upper left corner
            row--;
            if (rowIsOdd) { column--; }
        } else if (relY < m * relX - Drawing.c) { // click is in upper right corner
            row--;
            if (!rowIsOdd) { column++; }
        }
        return [column, row]; // return result
    }
}