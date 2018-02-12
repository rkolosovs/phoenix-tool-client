"use strict";
var Drawing;
(function (Drawing) {
    Drawing.c = 1;
    Drawing.gH = 1;
    Drawing.gW = 1;
    Drawing.listOfMultiArmyFields = [];
    function setHexParts(scale) {
        Drawing.c = 0.25 * scale;
        Drawing.gH = 0.75 * scale;
        Drawing.gW = SIN60 * scale;
    }
    Drawing.setHexParts = setHexParts;
    // canvas resizing method
    function resizeCanvas() {
        GUI.getCanvas().width = window.innerWidth;
        GUI.getCanvas().height = window.innerHeight;
        drawStuff();
    }
    Drawing.resizeCanvas = resizeCanvas;
    // all the stuff to be drawn goes in this method
    function drawStuff() {
        GUI.getContext().clearRect(0, 0, GUI.getCanvas().width, GUI.getCanvas().height); // clear
        // do all drawing/element selection in respect to these coordinates
        // current origin for drawing + offset from dragged mouse
        let pos = [origin[0] + move[0], origin[1] + move[1]];
        drawMap(pos, scale);
        drawFieldSelection(pos, scale);
        drawArmies(pos, scale);
        drawArmySelection(pos, scale, selectedArmyIndex);
        drawPossibleMoves(pos, scale, selectedArmyIndex);
        drawShootingTargets(pos, scale, selectedArmyIndex);
        writeFieldInfo();
    }
    Drawing.drawStuff = drawStuff;
    function drawMap(pos, scale) {
        drawFields(pos, scale);
        drawRivers(pos, scale);
        drawBorders(pos, scale);
        drawBuildings(pos, scale);
    }
    function drawBorders(pos, scale) {
        let offset = (scale / 13); //set offset of a border from the actual border of two hexes
        GameState.realms.forEach(realm => {
            let color = realm.color;
            GUI.getContext().lineWidth = (scale / 14); //line thickness for borders
            GUI.getContext().strokeStyle = 'rgb(' + color + ')'; //set line color
            GUI.getContext().lineCap = "round";
            GUI.getContext().fillStyle = 'rgba(' + color + ', 0.3)'; //set fill color
            let land = realm.territory;
            land.forEach(hex => {
                let point = HexFunction.computePosition(pos, hex.coordinates, scale);
                let neighbours = HexFunction.getAdjacency(hex.coordinates, land.map(field => field.coordinates));
                let start;
                if (neighbours[0]) {
                    if (neighbours[1]) {
                        start = [(point[0] + 0.5 * Drawing.gW), point[1]];
                    }
                    else {
                        start = [(point[0] + 0.5 * Drawing.gW - SIN60 * offset), (point[1] + 0.5 * offset)];
                    }
                }
                else {
                    if (neighbours[1]) {
                        start = [(point[0] + 0.5 * Drawing.gW + SIN60 * offset), (point[1] + 0.5 * offset)];
                    }
                    else {
                        start = [(point[0] + 0.5 * Drawing.gW), (point[1] + offset)];
                    }
                }
                GUI.getContext().beginPath(); //begin border drawing
                GUI.getContext().moveTo(start[0], start[1]);
                if (neighbours[1]) {
                    if (neighbours[2]) {
                        GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.c));
                    }
                    else {
                        GUI.getContext().moveTo((point[0] + Drawing.gW - SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[2]) {
                        GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c + offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + Drawing.gW - SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[2]) {
                    if (neighbours[3]) {
                        GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.gH));
                    }
                    else {
                        GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.gH - offset));
                    }
                }
                else {
                    if (neighbours[3]) {
                        GUI.getContext().lineTo((point[0] + Drawing.gW - SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + Drawing.gW - SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[3]) {
                    if (neighbours[4]) {
                        GUI.getContext().moveTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale));
                    }
                    else {
                        GUI.getContext().moveTo((point[0] + 0.5 * Drawing.gW + SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[4]) {
                        GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW - SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale - offset));
                    }
                }
                if (neighbours[4]) {
                    if (neighbours[5]) {
                        GUI.getContext().moveTo(point[0], (point[1] + Drawing.gH));
                    }
                    else {
                        GUI.getContext().moveTo((point[0] + SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[5]) {
                        GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH - offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[5]) {
                    if (neighbours[0]) {
                        GUI.getContext().moveTo(point[0], (point[1] + Drawing.c));
                    }
                    else {
                        GUI.getContext().moveTo(point[0], (point[1] + Drawing.c + offset));
                    }
                }
                else {
                    if (neighbours[0]) {
                        GUI.getContext().lineTo((point[0] + SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[0]) {
                    GUI.getContext().moveTo(start[0], start[1]);
                } //back to top corner
                else {
                    GUI.getContext().lineTo(start[0], start[1]);
                }
                GUI.getContext().stroke();
                GUI.getContext().beginPath(); //begin area filling
                GUI.getContext().moveTo(start[0], start[1]);
                if (neighbours[1]) {
                    if (neighbours[2]) {
                        GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + Drawing.gW - SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[2]) {
                        GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c + offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + Drawing.gW - SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[2]) {
                    if (neighbours[3]) {
                        GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.gH));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.gH - offset));
                    }
                }
                else {
                    if (neighbours[3]) {
                        GUI.getContext().lineTo((point[0] + Drawing.gW - SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + Drawing.gW - SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[3]) {
                    if (neighbours[4]) {
                        GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW + SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[4]) {
                        GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW - SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale - offset));
                    }
                }
                if (neighbours[4]) {
                    if (neighbours[5]) {
                        GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[5]) {
                        GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH - offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[5]) {
                    if (neighbours[0]) {
                        GUI.getContext().lineTo(point[0], (point[1] + Drawing.c));
                    }
                    else {
                        GUI.getContext().lineTo(point[0], (point[1] + Drawing.c + offset));
                    }
                }
                else {
                    if (neighbours[0]) {
                        GUI.getContext().lineTo((point[0] + SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                    else {
                        GUI.getContext().lineTo((point[0] + SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[0]) {
                    GUI.getContext().lineTo(start[0], start[1]);
                } //back to top corner
                else {
                    GUI.getContext().lineTo(start[0], start[1]);
                }
                GUI.getContext().fill();
            });
        });
    }
    function drawBuildings(screenPos, scale) {
        GUI.getContext().lineWidth = (scale / 8); //line style for roads
        GUI.getContext().strokeStyle = "#C8AB37";
        GUI.getContext().lineCap = "round";
        for (let i = 0; i < buildings.length; i++) {
            let building = GameState.buildings[i];
            let buildingPos;
            if (building.type !== BuildingType.STREET) {
                buildingPos = HexFunction.computePosition(screenPos, building.getPosition(), scale);
            }
            let tileImg; //declare the tile image variable
            switch (building.type) {
                case BuildingType.CASTLE:
                    tileImg = Images.castle;
                    break;
                case BuildingType.CITY:
                    tileImg = Images.city;
                    break;
                case BuildingType.FORTRESS:
                    tileImg = Images.fortress;
                    break;
                case BuildingType.CAPITAL:
                    tileImg = Images.capital;
                    break;
                case BuildingType.CAPITAL_FORT:
                    tileImg = Images.capitalFort;
                    break;
                case BuildingType.WALL:
                    switch (building.facing) {
                        case Direction.NW:
                            tileImg = Images.wallNW;
                            break;
                        case Direction.NE:
                            tileImg = Images.wallNE;
                            break;
                        case Direction.E:
                            tileImg = Images.wallE;
                            break;
                        case Direction.SE:
                            tileImg = Images.wallSE;
                            break;
                        case Direction.SW:
                            tileImg = Images.wallSW;
                            break;
                        case Direction.W:
                            tileImg = Images.wallW;
                            break;
                        default:
                            tileImg = Images.wallNW;
                            break;
                    }
                    break;
                case BuildingType.HARBOR:
                    let harborDir = HexFunction.getDirectionToNeighbor(building.getPosition(), building.getSecondPosition());
                    switch (harborDir) {
                        case Direction.NW:
                            tileImg = Images.harborNW;
                            break;
                        case Direction.NE:
                            tileImg = Images.harborNE;
                            break;
                        case Direction.E:
                            tileImg = Images.harborE;
                            break;
                        case Direction.SE:
                            tileImg = Images.harborSE;
                            break;
                        case Direction.SW:
                            tileImg = Images.harborSW;
                            break;
                        case Direction.W:
                            tileImg = Images.harborW;
                            break;
                        default:
                            tileImg = Images.harborNW;
                            break;
                    }
                    break;
                case BuildingType.BRIDGE:
                    let bridgeDir = HexFunction.getDirectionToNeighbor(building.getPosition(), building.getSecondPosition());
                    switch (bridgeDir) {
                        case Direction.NW:
                            tileImg = Images.bridgeNW;
                            break;
                        case Direction.NE:
                            tileImg = Images.bridgeNE;
                            break;
                        case Direction.E:
                            tileImg = Images.bridgeE;
                            break;
                        case Direction.SE:
                            tileImg = Images.bridgeSE;
                            break;
                        case Direction.SW:
                            tileImg = Images.bridgeSW;
                            break;
                        case Direction.W:
                            tileImg = Images.bridgeW;
                            break;
                        default:
                            tileImg = Images.bridgeNW;
                            break;
                    }
                    break;
                default:
                    tileImg = Images.default;
                    break;
            }
            if (building.type <= 4) {
                GUI.getContext().drawImage(tileImg, buildingPos[0], buildingPos[1], scale * SIN60, scale); //draw the image
            }
            else if (building.type === 5) {
                GUI.getContext().drawImage(tileImg, buildingPos[0], buildingPos[1], scale * SIN60, scale); //draw the image
            }
            else if (building.type <= 7) {
                GUI.getContext().drawImage(tileImg, buildingPos[0] - Drawing.gW, buildingPos[1] - (0.5 * scale), 3 * Drawing.gW, 2 * scale); //draw the image
            }
            else if (building.type === 8) {
                let posFirst = HexFunction.computePosition(screenPos, building.getPosition(), scale);
                let posSecond = HexFunction.computePosition(screenPos, building.getPosition(), scale);
                GUI.getContext().beginPath();
                GUI.getContext().moveTo((posFirst[0] + (0.5 * Drawing.gW)), (posFirst[1] + 2 * Drawing.c));
                GUI.getContext().lineTo((posSecond[0] + (0.5 * Drawing.gW)), (posSecond[1] + 2 * Drawing.c));
                GUI.getContext().stroke();
            }
        }
    }
    function drawRivers(screenPos, scale) {
        GUI.getContext().lineWidth = (scale / 8);
        GUI.getContext().strokeStyle = "#0099FF";
        GUI.getContext().lineCap = "round";
        GameState.rivers.forEach(river => {
            let pos = HexFunction.computePosition(screenPos, river.leftBank, scale);
            let points = [pos, pos];
            let rowOdd = (((river.leftBank[1]) % 2) !== 0);
            if ((river.leftBank[1]) === (river.rightBank[1])) {
                if ((river.leftBank[0]) > (river.rightBank[0])) {
                    points = [[(pos[0]), (pos[1] + Drawing.c)], [(pos[0]), (pos[1] + Drawing.gH)]];
                }
                else {
                    points = [[(pos[0] + Drawing.gW), (pos[1] + Drawing.c)], [(pos[0] + Drawing.gW), (pos[1] + Drawing.gH)]];
                }
            }
            else if ((river.leftBank[1]) > (river.rightBank[1])) {
                //second field right (ne)
                if ((rowOdd && (river.leftBank[0]) === (river.rightBank[0])) || (!rowOdd && (river.leftBank[0]) < (river.rightBank[0]))) {
                    points = [[(pos[0] + 0.5 * Drawing.gW), (pos[1])], [(pos[0] + Drawing.gW), (pos[1] + Drawing.c)]];
                }
                else {
                    points = [[(pos[0]), (pos[1] + Drawing.c)], [(pos[0] + 0.5 * Drawing.gW), (pos[1])]];
                }
            }
            else {
                //second field right (se)
                if ((rowOdd && (river.leftBank[0]) === (river.rightBank[0])) || (!rowOdd && (river.leftBank[0]) < (river.rightBank[0]))) {
                    points = [[(pos[0] + 0.5 * Drawing.gW), (pos[1] + scale)], [(pos[0] + Drawing.gW), (pos[1] + Drawing.gH)]];
                }
                else {
                    points = [[(pos[0]), (pos[1] + Drawing.gH)], [(pos[0] + 0.5 * Drawing.gW), (pos[1] + scale)]];
                }
            }
            GUI.getContext().beginPath();
            GUI.getContext().moveTo((points[0][0]), (points[0][1]));
            GUI.getContext().lineTo((points[1][0]), (points[1][1]));
            GUI.getContext().stroke();
        });
    }
    function drawFields(screenPos, scale) {
        let drawingMode = 'image';
        // let drawingMode = 'primitives';
        if (scale < switchScale) {
            drawingMode = 'primitives';
        }
        else {
            drawingMode = 'image';
        }
        let currentField;
        let tileImg; //declare the tile image variable
        let sortedFields = [[], [], [], [], [], [], [], [], [], []];
        GameState.fields.forEach(field => {
            switch (field.type) {
                case FieldType.SHALLOWS:
                    sortedFields[0].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                case FieldType.DEEPSEA:
                    sortedFields[1].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                case FieldType.LOWLANDS:
                    sortedFields[2].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                case FieldType.WOODS:
                    sortedFields[3].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                case FieldType.HILLS:
                    sortedFields[4].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                case FieldType.HIGHLANDS:
                    sortedFields[5].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                case FieldType.MOUNTAINS:
                    sortedFields[6].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                case FieldType.DESERT:
                    sortedFields[7].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                case FieldType.SWAMP:
                    sortedFields[8].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
                default:
                    sortedFields[9].push(HexFunction.computePosition(screenPos, field.coordinates, scale));
                    break;
            }
        });
        if (drawingMode === 'image') {
            let currFields;
            for (let i = 0; i < sortedFields.length; i++) {
                currFields = sortedFields[i];
                switch (i) {
                    case 0:
                        tileImg = Images.shallows;
                        break;
                    case 1:
                        tileImg = Images.deepsea;
                        break;
                    case 2:
                        tileImg = Images.lowlands;
                        break;
                    case 3:
                        tileImg = Images.woods;
                        break;
                    case 4:
                        tileImg = Images.hills;
                        break;
                    case 5:
                        tileImg = Images.highlands;
                        break;
                    case 6:
                        tileImg = Images.mountains;
                        break;
                    case 7:
                        tileImg = Images.desert;
                        break;
                    case 8:
                        tileImg = Images.swamp;
                        break;
                    default:
                        tileImg = Images.default;
                        break;
                }
                for (let j = 0; j < currFields.length; j++) {
                    currentField = currFields[j];
                    //draw the image
                    GUI.getContext().drawImage(tileImg, currentField[0], currentField[1], (scale * SIN60), scale);
                }
            }
        }
        else if (drawingMode === 'primitives') {
            let currFields;
            for (let i = 0; i < sortedFields.length; i++) {
                currFields = sortedFields[i];
                switch (i) {
                    case 0:
                        GUI.getContext().fillStyle = 'Aqua';
                        break;
                    case 1:
                        GUI.getContext().fillStyle = 'DarkBlue';
                        break;
                    case 2:
                        GUI.getContext().fillStyle = 'LawnGreen';
                        break;
                    case 3:
                        GUI.getContext().fillStyle = 'ForestGreen';
                        break;
                    case 4:
                        GUI.getContext().fillStyle = 'SandyBrown';
                        break;
                    case 5:
                        GUI.getContext().fillStyle = 'SaddleBrown';
                        break;
                    case 6:
                        GUI.getContext().fillStyle = 'LightGray';
                        break;
                    case 7:
                        GUI.getContext().fillStyle = 'Khaki';
                        break;
                    case 8:
                        GUI.getContext().fillStyle = 'DarkViolet';
                        break;
                    default:
                        GUI.getContext().fillStyle = 'Black';
                        break;
                }
                GUI.getContext().beginPath();
                for (let j = 0; j < currFields.length; j++) {
                    currentField = currFields[j];
                    GUI.getContext().moveTo((currentField[0] + 0.5 * Drawing.gW), currentField[1]);
                    GUI.getContext().lineTo((currentField[0] + Drawing.gW), (currentField[1] + Drawing.c));
                    GUI.getContext().lineTo((currentField[0] + Drawing.gW), (currentField[1] + Drawing.gH));
                    GUI.getContext().lineTo((currentField[0] + 0.5 * Drawing.gW), (currentField[1] + scale));
                    GUI.getContext().lineTo(currentField[0], (currentField[1] + Drawing.gH));
                    GUI.getContext().lineTo(currentField[0], (currentField[1] + Drawing.c));
                    GUI.getContext().lineTo((currentField[0] + 0.5 * Drawing.gW), currentField[1]);
                }
                GUI.getContext().fill();
            }
        }
    }
    //drawing all possible moves to neighboring fields if army was selected
    function drawPossibleMoves(screenPos, scale, selectedArmyIndex) {
        if (selectedArmyIndex != undefined) {
            let moves = GameState.armies[selectedArmyIndex].possibleMoves;
            for (let i = 0; i < moves.length; i++) {
                GUI.getContext().lineWidth = scale / 6;
                GUI.getContext().strokeStyle = '#00FF00';
                let pos = HexFunction.computePosition(screenPos, moves[i].destination, scale); //get fields position
                GUI.getContext().beginPath();
                GUI.getContext().arc(pos[0] + (0.5 * scale * SIN60), pos[1] + (scale * 0.5), scale / 12, 0, 2 * Math.PI, false);
                GUI.getContext().stroke();
            }
        }
    }
    function drawFieldSelection(screenPos, scale) {
        GUI.getContext().lineWidth = 5;
        GUI.getContext().strokeStyle = "blue";
        for (let i = 0; i < selectedFields.length; i++) {
            let pos = HexFunction.computePosition(screenPos, selectedFields[i], scale);
            GUI.getContext().beginPath();
            GUI.getContext().arc(pos[0] + (0.5 * scale * SIN60), pos[1] + (scale * 0.5), scale / 2, 0, 2 * Math.PI, false);
            GUI.getContext().stroke();
        }
    }
    function drawArmySelection(screenPos, scale, armyIndex) {
        GUI.getContext().lineWidth = 5;
        GUI.getContext().strokeStyle = "green";
        if (armyIndex !== undefined) {
            let pos = HexFunction.computePosition(screenPos, GameState.armies[armyIndex].getPosition(), scale);
            GUI.getContext().beginPath();
            GUI.getContext().arc(pos[0] + (0.5 * scale * SIN60), pos[1] + (scale * 0.5), scale / 2.2, 0, 2 * Math.PI, false);
            GUI.getContext().stroke();
        }
    }
    function drawArmies(screenPos, scale) {
        //delete all multifields
        for (let k = 0; k < Drawing.listOfMultiArmyFields.length; k++) {
            for (let l = 0; l < Drawing.listOfMultiArmyFields[k].length; l++) {
                Drawing.listOfMultiArmyFields[k][l].multiArmyField = false;
            }
        }
        Drawing.listOfMultiArmyFields = [];
        //getting the multifield list ready
        for (let i = 0; i < GameState.armies.length; i++) {
            createMultifield(GameState.armies[i]);
        }
        for (let i = 0; i < GameState.armies.length; i++) {
            let armyData = GameState.armies[i]; // get army coordinates
            let pos = HexFunction.computePosition(screenPos, armyData.getPosition(), scale);
            GUI.getContext().fillStyle = 'black';
            GUI.getContext().textAlign = 'center';
            GUI.getContext().textBaseline = 'middle';
            //GUI.getContext().fillText(armyData.armyId, pos[0]+((scale * 0.866)/2), pos[1]+(scale /2));
            //check if its is on a multifield. if it is ignore
            if (!armyData.onMultifield) {
                if (armyData instanceof FootArmy) {
                    GUI.getContext().drawImage(Images.troops, pos[0], pos[1], (scale * SIN60), scale);
                }
                else if (armyData instanceof RiderArmy) {
                    GUI.getContext().drawImage(Images.mounts, pos[0], pos[1], (scale * SIN60), scale);
                }
                else if (armyData instanceof Fleet) {
                    GUI.getContext().drawImage(Images.boats, pos[0], pos[1], (scale * SIN60), scale);
                }
            }
            if (armyData.owner.tag === login || login === "sl") {
                if (armyData.possibleMoves.length > 0) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof FootArmy && armyData.getMovePoints() === 9) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof RiderArmy && armyData.getMovePoints() === 21) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof Fleet && armyData.getMovePoints() >= 42) {
                    drawRemainingMovement(pos, scale);
                }
                //draw if it took fire
                if (armyData.wasShotAt === true) {
                    drawTookFire(pos, scale);
                }
            }
        }
        //drawing the multifield armies
        for (let j = 0; j < Drawing.listOfMultiArmyFields.length; j++) {
            for (let i = 0; i < Drawing.listOfMultiArmyFields[j].length; i++) {
                let armyData = Drawing.listOfMultiArmyFields[j][i]; // get army coordinates
                let pos = HexFunction.computePosition(screenPos, Drawing.listOfMultiArmyFields[j][i], scale);
                let circleScale = (scale * SIN60) / Drawing.listOfMultiArmyFields[j].length;
                //const double Angle = (M_PI * 2.0) / n;
                //Für jedes i-te Objekt dann die Position des Mittelpunktes:
                //const double MidPosX = (cos(Angle * i) * RadiusX) + CirclePosX;
                //const double MidPosY =(sin(Angle * i) * RadiusY) + CirclePosY;
                let angle = (Math.PI * 2.0) / Drawing.listOfMultiArmyFields[j].length; //Total armies on field
                let xPosArmy = (Math.cos(angle * i) * scale / 4) + pos[0] + scale / 4;
                let yPosArmy = (Math.sin(angle * i) * scale / 4) + pos[1];
                if (armyData instanceof FootArmy) {
                    GUI.getContext().drawImage(Images.troops, xPosArmy, yPosArmy, circleScale, scale);
                }
                else if (armyData instanceof RiderArmy) {
                    GUI.getContext().drawImage(Images.mounts, xPosArmy, yPosArmy, circleScale, scale);
                }
                else if (armyData instanceof Fleet) {
                    GUI.getContext().drawImage(Images.boats, xPosArmy, yPosArmy, circleScale, scale);
                }
            }
        }
    }
    function drawRemainingMovement(screenPos, scale) {
        GUI.getContext().lineWidth = scale / 8;
        GUI.getContext().strokeStyle = '#00FFFF';
        GUI.getContext().beginPath();
        GUI.getContext().arc(screenPos[0] + (0.5 * scale * SIN60) - Drawing.c, screenPos[1] + (scale * 0.5) - Drawing.c, scale / 16, Math.PI * 1.25, Math.PI * 1.75, false);
        GUI.getContext().stroke();
    }
    function drawTookFire(screenPos, scale) {
        GUI.getContext().lineWidth = scale / 8;
        GUI.getContext().strokeStyle = '#FF0000';
        GUI.getContext().beginPath();
        GUI.getContext().arc(screenPos[0] + (0.5 * scale * SIN60) + Drawing.c, screenPos[1] + (scale * 0.5) + Drawing.c, scale / 16, Math.PI * 1.25, Math.PI * 1.75, false);
        GUI.getContext().stroke();
    }
    function drawShootingTargets(screenPos, scale, selectedArmy) {
        if (selectedArmy !== undefined && GameState.armies[selectedArmyIndex].possibleTargets.length > 0 && shootingModeOn) {
            let targets = GameState.armies[selectedArmyIndex].possibleTargets;
            for (let i = 0; i < targets.length; i++) {
                GUI.getContext().lineWidth = scale / 10;
                GUI.getContext().strokeStyle = '#FF0000';
                let pos = HexFunction.computePosition(screenPos, targets[i].coordinates, scale); //get fields position
                GUI.getContext().beginPath();
                GUI.getContext().arc(pos[0] + (0.5 * scale * SIN60), pos[1] + (scale * 0.5), scale / 20, 0, 2 * Math.PI, false);
                GUI.getContext().stroke();
            }
        }
    }
    function writeFieldInfo() {
        let minimapBox = document.getElementById('minimapBox');
        let index = 0;
        if (shootingModeOn) {
            index = 1;
        }
        if (selectedFields[index] === undefined) {
            minimapBox.innerHTML = '';
        }
        else {
            let fieldPositionInList = HexFunction.positionInList(selectedFields[index]);
            let localfieldType = '';
            switch (HexFunction.fieldType(selectedFields[index])) {
                case 0:
                    localfieldType = 'Wasser';
                    break;
                case 1:
                    localfieldType = 'Tiefsee';
                    break;
                case 2:
                    localfieldType = 'Tiefland';
                    break;
                case 3:
                    localfieldType = 'Wald';
                    break;
                case 4:
                    localfieldType = 'Hochland';
                    break;
                case 5:
                    localfieldType = 'Bergland';
                    break;
                case 6:
                    localfieldType = 'Gebirge';
                    break;
                case 7:
                    localfieldType = 'Wüste';
                    break;
                case 8:
                    localfieldType = 'Sumpf';
                    break;
                default:
                    localfieldType = 'Unbekannt';
                    break;
            }
            let fieldOwner = GameState.realms.find(realm => (realm.territory.some(field => (field[0] === selectedFields[index][0] && field[1] === selectedFields[index][1]))));
            let fieldOwnerString = (fieldOwner == undefined) ? 'keiner' : fieldOwner.tag;
            minimapBox.innerHTML = '<p>Feld: (' + selectedFields[index][0] + ', ' + selectedFields[index][1] + ')' +
                '</p><p>Gelände: ' + localfieldType +
                '</p><p>Höhe: ' + HexFunction.height(selectedFields[index]) +
                '</p><p>Besitzer: ' + fieldOwnerString + '</p>';
        }
    }
    function writeTurnNumber() {
        // get the top bar element from the HTML document
        let topBar = document.getElementById('topBar');
        let nextTurnBtn = document.getElementById('nextTurnButton');
        let stepBtn = document.getElementById('stepButton');
        let revertBtn = document.getElementById('revertButton');
        let date = document.getElementById('date_text');
        let spec = document.getElementById('special_text');
        if (nextTurnBtn === null) {
            nextTurnBtn = document.createElement("BUTTON");
            nextTurnBtn.id = "nextTurnButton";
            nextTurnBtn.addEventListener('click', function () {
                let message = "";
                if (currentTurn.realm == undefined) {
                    message = "Do you want to end the pre-turn phase?";
                }
                else if (currentTurn.status === 'fi') {
                    let unprocessedEvents = pendingEvents.some(function (event) {
                        return (event.status === 'available' || event.status === 'withheld' ||
                            event.status === 'impossible');
                    });
                    if (unprocessedEvents) {
                        message = "Some events are unprocessed.";
                    }
                    message += ("Do you want to end processing the turn of " + currentTurn.realm + "?");
                }
                else if (login === 'sl') {
                    message = "Do you want to end the turn of " + currentTurn.realm + "?";
                }
                else {
                    message = "Do you want to end your turn?";
                }
                if (confirm(message)) {
                    if (login === 'sl' && currentTurn.status === 'fi') {
                        pendingEvents.forEach(function (event) {
                            if (event.status === 'checked') {
                                Saving.sendCheckEvent(event.pk, event.type);
                            }
                            else if (event.status === 'deleted') {
                                Saving.sendDeleteEvent(event.pk, event.type);
                            }
                        }, this);
                        Saving.saveBuildings();
                        Saving.saveFactionsTerritories();
                        Saving.saveArmies();
                    }
                    else {
                        console.log(2);
                        sendEventlistInOrder();
                    }
                    Saving.sendNextTurn();
                }
            });
            date = document.createElement("P");
            date.align = "right";
            date.id = "date_text";
            spec = document.createElement("P");
            spec.align = "left";
            spec.id = "special_text";
        }
        if (stepBtn == undefined) {
            stepBtn = document.createElement("BUTTON");
            stepBtn.id = "stepButton";
            stepBtn.style.backgroundImage = "url(images/step_button.svg)";
            stepBtn.addEventListener('click', function () {
                if (login === 'sl') {
                    if (confirm("Do you want to save the events handled so far without ending the turn?" +
                        " Once saved the progress can't be reverted anymore.")) {
                        pendingEvents.forEach(function (event) {
                            if (event.status === 'checked') {
                                Saving.sendCheckEvent(event.pk, event.type);
                            }
                            else if (event.status === 'deleted') {
                                Saving.sendDeleteEvent(event.pk, event.type);
                            }
                        }, this);
                        pendingEvents = [];
                        preparedEvents = [];
                        Saving.saveBuildings();
                        Saving.saveFactionsTerritories();
                        Saving.saveArmies();
                    }
                }
                else {
                    if (confirm("Do you want to save the events issued so far without ending the turn?" +
                        " Once saved the progress can only be reverted by the SL.")) {
                        console.log(3);
                        sendEventlistInOrder();
                    }
                }
            });
        }
        if (revertBtn == undefined) {
            revertBtn = document.createElement("BUTTON");
            revertBtn.id = "revertButton";
            revertBtn.style.backgroundImage = "url(images/revert_button.svg)";
            revertBtn.addEventListener('click', function () {
                if (confirm("Do you want to revert the events handled so far?")) {
                    pendingEvents = [];
                    preparedEvents = [];
                    Loading.loadArmies();
                    Loading.loadBuildingData();
                    Loading.loadBorderData();
                    Loading.loadPendingEvents();
                    writeTurnNumber();
                    drawStuff();
                }
            });
        }
        if (login !== 'sl' && (currentTurn.realm == undefined || currentTurn.status === 'fi' || login !== currentTurn.realm)) {
            // if not logged in as the current realm or SL
            nextTurnBtn.disabled = true;
            nextTurnBtn.style.cursor = "not-allowed";
            nextTurnBtn.style.backgroundImage = "url(images/nextturn_button_disabled.svg)";
            stepBtn.disabled = true;
            stepBtn.style.cursor = "not-allowed";
            revertBtn.disabled = true;
            revertBtn.style.cursor = "not-allowed";
        }
        else {
            nextTurnBtn.disabled = false;
            nextTurnBtn.style.cursor = "initial";
            nextTurnBtn.style.backgroundImage = "url(images/nextturn_button.svg)";
            stepBtn.disabled = false;
            stepBtn.style.cursor = "initial";
            revertBtn.disabled = false;
            revertBtn.style.cursor = "initial";
        }
        if (login === 'sl' && currentTurn.status === 'fi') {
            Loading.loadPendingEvents();
            show(document.getElementById("eventTabsButton"));
        }
        else {
            hide(document.getElementById("eventTabsButton"));
            stepBtn.disabled = true;
            stepBtn.style.cursor = "not-allowed";
            revertBtn.disabled = true;
            revertBtn.style.cursor = "not-allowed";
        }
        date.innerHTML = "Monat " + months[currentTurn.turn % 8] + " des Jahres " + Math.ceil(currentTurn.turn / 8) + " (Zug " + currentTurn.turn + ", ";
        if (currentTurn.realm == undefined || currentTurn.status === 'fi') {
            // GM's turn
            date.innerHTML += "SL) ";
        }
        else {
            date.innerHTML += currentTurn.realm + ") ";
        }
        date.setAttribute("width", "340px");
        date.setAttribute("float", "left");
        date.setAttribute("line-height", "30px");
        if (currentTurn.turn % 8 === 1 || currentTurn.turn % 8 === 5) {
            spec.innerHTML = " Rüstmonat";
            date.setAttribute("width", "100px");
            date.setAttribute("float", "left");
            date.setAttribute("line-height", "30px");
        }
        else if (currentTurn.turn % 8 === 4 || currentTurn.turn % 8 === 0) {
            spec.innerHTML = " Einkommensmonat";
            date.setAttribute("width", "160px");
            date.setAttribute("float", "left");
            date.setAttribute("line-height", "30px");
        }
        date.setAttribute("width", "0px");
        date.setAttribute("float", "left");
        date.setAttribute("line-height", "30px");
        topBar.innerHTML = '';
        topBar.appendChild(date);
        topBar.appendChild(nextTurnBtn);
        topBar.appendChild(stepBtn);
        topBar.appendChild(revertBtn);
        topBar.appendChild(spec);
    }
    Drawing.writeTurnNumber = writeTurnNumber;
})(Drawing || (Drawing = {}));
