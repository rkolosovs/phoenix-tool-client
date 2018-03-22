"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const gui_1 = require("./gui");
const controlVariables_1 = require("../controls/controlVariables");
const gameState_1 = require("../gameState");
const boxVisibilty_1 = require("./boxVisibilty");
const hexFunctions_1 = require("../libraries/hexFunctions");
const images_1 = require("./images");
const footArmy_1 = require("../armies/footArmy");
const riderArmy_1 = require("../armies/riderArmy");
const fleet_1 = require("../armies/fleet");
const savingFunctions_1 = require("../serverInteraction/savingFunctions");
const loadingDataFunctions_1 = require("../serverInteraction/loadingDataFunctions");
const multifieldFunctions_1 = require("./multifieldFunctions");
var Drawing;
(function (Drawing) {
    Drawing.c = 1;
    Drawing.gH = 1;
    Drawing.gW = 1;
    Drawing.switchScale = 50;
    // the scale of the elements, specifically the width
    Drawing.scale = 16;
    // tileset name. available tilesets: "erkenfara_altestool", "erkenfara_folienzug", "mbits_painted", "simple"
    Drawing.tileset = "mbits_painted";
    Drawing.listOfMultiArmyFields = [];
    Drawing.months = ['Agul', 'Hawar', 'Rim', 'Naliv', 'Larn', 'Hel', 'Jawan', 'Lud'];
    function setHexParts(scale) {
        Drawing.c = 0.25 * scale;
        Drawing.gH = 0.75 * scale;
        Drawing.gW = constants_1.Constants.SIN60 * scale;
    }
    Drawing.setHexParts = setHexParts;
    // canvas resizing method
    function resizeCanvas() {
        gui_1.GUI.getCanvas().width = window.innerWidth;
        gui_1.GUI.getCanvas().height = window.innerHeight;
        drawStuff();
    }
    Drawing.resizeCanvas = resizeCanvas;
    // all the stuff to be drawn goes in this method
    function drawStuff() {
        gui_1.GUI.getContext().clearRect(0, 0, gui_1.GUI.getCanvas().width, gui_1.GUI.getCanvas().height); // clear
        // do all drawing/element selection in respect to these coordinates
        // current origin for drawing + offset from dragged mouse
        let pos = [controlVariables_1.Controls.origin[0] + controlVariables_1.Controls.move[0], controlVariables_1.Controls.origin[1] + controlVariables_1.Controls.move[1]];
        drawMap(pos, Drawing.scale);
        drawFieldSelection(pos, Drawing.scale);
        drawArmies(pos, Drawing.scale);
        drawArmySelection(pos, Drawing.scale, controlVariables_1.Controls.selectedArmyIndex);
        drawPossibleMoves(pos, Drawing.scale, controlVariables_1.Controls.selectedArmyIndex);
        drawPossibleShootingTargets(pos, Drawing.scale, gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex]);
        drawShootingTargetSelection(pos, Drawing.scale);
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
        gameState_1.GameState.realms.forEach(realm => {
            let color = realm.color;
            gui_1.GUI.getContext().lineWidth = (scale / 14); //line thickness for borders
            gui_1.GUI.getContext().strokeStyle = 'rgb(' + color + ')'; //set line color
            gui_1.GUI.getContext().lineCap = "round";
            gui_1.GUI.getContext().fillStyle = 'rgba(' + color + ', 0.3)'; //set fill color
            let land = realm.territory;
            land.forEach(hex => {
                let point = hexFunctions_1.HexFunction.computePosition(pos, hex.coordinates, scale);
                let neighbours = hexFunctions_1.HexFunction.getAdjacency(hex.coordinates, land.map(field => field.coordinates));
                let start;
                if (neighbours[0]) {
                    if (neighbours[1]) {
                        start = [(point[0] + 0.5 * Drawing.gW), point[1]];
                    }
                    else {
                        start = [(point[0] + 0.5 * Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + 0.5 * offset)];
                    }
                }
                else {
                    if (neighbours[1]) {
                        start = [(point[0] + 0.5 * Drawing.gW + constants_1.Constants.SIN60 * offset), (point[1] + 0.5 * offset)];
                    }
                    else {
                        start = [(point[0] + 0.5 * Drawing.gW), (point[1] + offset)];
                    }
                }
                gui_1.GUI.getContext().beginPath(); //begin border drawing
                gui_1.GUI.getContext().moveTo(start[0], start[1]);
                if (neighbours[1]) {
                    if (neighbours[2]) {
                        gui_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.c));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[2]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c + offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[2]) {
                    if (neighbours[3]) {
                        gui_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.gH));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.gH - offset));
                    }
                }
                else {
                    if (neighbours[3]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[3]) {
                    if (neighbours[4]) {
                        gui_1.GUI.getContext().moveTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo((point[0] + 0.5 * Drawing.gW + constants_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[4]) {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale - offset));
                    }
                }
                if (neighbours[4]) {
                    if (neighbours[5]) {
                        gui_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.gH));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[5]) {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH - offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[5]) {
                    if (neighbours[0]) {
                        gui_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.c));
                    }
                    else {
                        gui_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.c + offset));
                    }
                }
                else {
                    if (neighbours[0]) {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[0]) {
                    gui_1.GUI.getContext().moveTo(start[0], start[1]);
                } //back to top corner
                else {
                    gui_1.GUI.getContext().lineTo(start[0], start[1]);
                }
                gui_1.GUI.getContext().stroke();
                gui_1.GUI.getContext().beginPath(); //begin area filling
                gui_1.GUI.getContext().moveTo(start[0], start[1]);
                if (neighbours[1]) {
                    if (neighbours[2]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[2]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c + offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[2]) {
                    if (neighbours[3]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.gH));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.gH - offset));
                    }
                }
                else {
                    if (neighbours[3]) {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[3]) {
                    if (neighbours[4]) {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW + constants_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[4]) {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW - constants_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale - offset));
                    }
                }
                if (neighbours[4]) {
                    if (neighbours[5]) {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[5]) {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH - offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[5]) {
                    if (neighbours[0]) {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.c));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.c + offset));
                    }
                }
                else {
                    if (neighbours[0]) {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                    else {
                        gui_1.GUI.getContext().lineTo((point[0] + constants_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[0]) {
                    gui_1.GUI.getContext().lineTo(start[0], start[1]);
                } //back to top corner
                else {
                    gui_1.GUI.getContext().lineTo(start[0], start[1]);
                }
                gui_1.GUI.getContext().fill();
            });
        });
    }
    function drawBuildings(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = (scale / 8); //line style for roads
        gui_1.GUI.getContext().strokeStyle = "#C8AB37";
        gui_1.GUI.getContext().lineCap = "round";
        for (let i = 0; i < gameState_1.GameState.buildings.length; i++) {
            let building = gameState_1.GameState.buildings[i];
            let buildingPos = undefined;
            if (building.type !== 8 /* STREET */) {
                buildingPos = hexFunctions_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
            }
            let tileImg; //declare the tile image variable
            switch (building.type) {
                case 0 /* CASTLE */:
                    tileImg = images_1.Images.castle;
                    break;
                case 1 /* CITY */:
                    tileImg = images_1.Images.city;
                    break;
                case 2 /* FORTRESS */:
                    tileImg = images_1.Images.fortress;
                    break;
                case 3 /* CAPITAL */:
                    tileImg = images_1.Images.capital;
                    break;
                case 4 /* CAPITAL_FORT */:
                    tileImg = images_1.Images.capitalFort;
                    break;
                case 5 /* WALL */:
                    switch (building.facing) {
                        case 0 /* NW */:
                            tileImg = images_1.Images.wallNW;
                            break;
                        case 1 /* NE */:
                            tileImg = images_1.Images.wallNE;
                            break;
                        case 2 /* E */:
                            tileImg = images_1.Images.wallE;
                            break;
                        case 3 /* SE */:
                            tileImg = images_1.Images.wallSE;
                            break;
                        case 4 /* SW */:
                            tileImg = images_1.Images.wallSW;
                            break;
                        case 5 /* W */:
                            tileImg = images_1.Images.wallW;
                            break;
                        default:
                            tileImg = images_1.Images.wallNW;
                            break;
                    }
                    break;
                case 6 /* HARBOR */:
                    let harborDir = hexFunctions_1.HexFunction.getDirectionToNeighbor(building.getPosition(), building.getSecondPosition());
                    switch (harborDir) {
                        case 0 /* NW */:
                            tileImg = images_1.Images.harborNW;
                            break;
                        case 1 /* NE */:
                            tileImg = images_1.Images.harborNE;
                            break;
                        case 2 /* E */:
                            tileImg = images_1.Images.harborE;
                            break;
                        case 3 /* SE */:
                            tileImg = images_1.Images.harborSE;
                            break;
                        case 4 /* SW */:
                            tileImg = images_1.Images.harborSW;
                            break;
                        case 5 /* W */:
                            tileImg = images_1.Images.harborW;
                            break;
                        default:
                            tileImg = images_1.Images.harborNW;
                            break;
                    }
                    break;
                case 7 /* BRIDGE */:
                    let bridgeDir = hexFunctions_1.HexFunction.getDirectionToNeighbor(building.getPosition(), building.getSecondPosition());
                    switch (bridgeDir) {
                        case 0 /* NW */:
                            tileImg = images_1.Images.bridgeNW;
                            break;
                        case 1 /* NE */:
                            tileImg = images_1.Images.bridgeNE;
                            break;
                        case 2 /* E */:
                            tileImg = images_1.Images.bridgeE;
                            break;
                        case 3 /* SE */:
                            tileImg = images_1.Images.bridgeSE;
                            break;
                        case 4 /* SW */:
                            tileImg = images_1.Images.bridgeSW;
                            break;
                        case 5 /* W */:
                            tileImg = images_1.Images.bridgeW;
                            break;
                        default:
                            tileImg = images_1.Images.bridgeNW;
                            break;
                    }
                    break;
                default:
                    tileImg = images_1.Images.default;
                    break;
            }
            if (building.type <= 4 && buildingPos !== undefined) {
                gui_1.GUI.getContext().drawImage(tileImg, buildingPos[0], buildingPos[1], scale * constants_1.Constants.SIN60, scale); //draw the image
            }
            else if (building.type === 5 && buildingPos !== undefined) {
                gui_1.GUI.getContext().drawImage(tileImg, buildingPos[0], buildingPos[1], scale * constants_1.Constants.SIN60, scale); //draw the image
            }
            else if (building.type <= 7 && buildingPos !== undefined) {
                gui_1.GUI.getContext().drawImage(tileImg, buildingPos[0] - Drawing.gW, buildingPos[1] - (0.5 * scale), 3 * Drawing.gW, 2 * scale); //draw the image
            }
            else if (building.type === 8) {
                let posFirst = hexFunctions_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
                let posSecond = hexFunctions_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
                gui_1.GUI.getContext().beginPath();
                gui_1.GUI.getContext().moveTo((posFirst[0] + (0.5 * Drawing.gW)), (posFirst[1] + 2 * Drawing.c));
                gui_1.GUI.getContext().lineTo((posSecond[0] + (0.5 * Drawing.gW)), (posSecond[1] + 2 * Drawing.c));
                gui_1.GUI.getContext().stroke();
            }
        }
    }
    function drawRivers(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = (scale / 8);
        gui_1.GUI.getContext().strokeStyle = "#0099FF";
        gui_1.GUI.getContext().lineCap = "round";
        gameState_1.GameState.rivers.forEach(river => {
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, river.leftBank, scale);
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
            gui_1.GUI.getContext().beginPath();
            gui_1.GUI.getContext().moveTo((points[0][0]), (points[0][1]));
            gui_1.GUI.getContext().lineTo((points[1][0]), (points[1][1]));
            gui_1.GUI.getContext().stroke();
        });
    }
    function drawFields(screenPos, scale) {
        let drawingMode = 'image';
        // let drawingMode = 'primitives';
        if (scale < Drawing.switchScale) {
            drawingMode = 'primitives';
        }
        else {
            drawingMode = 'image';
        }
        let currentField;
        let tileImg; //declare the tile image variable
        let sortedFields = [[], [], [], [], [], [], [], [], [], []];
        gameState_1.GameState.fields.forEach(field => {
            let hexPosition = hexFunctions_1.HexFunction.computePosition(screenPos, field.coordinates, scale);
            switch (field.type) {
                case 0 /* SHALLOWS */:
                    sortedFields[0].push(hexPosition);
                    break;
                case 1 /* DEEPSEA */:
                    sortedFields[1].push(hexPosition);
                    break;
                case 2 /* LOWLANDS */:
                    sortedFields[2].push(hexPosition);
                    break;
                case 3 /* WOODS */:
                    sortedFields[3].push(hexPosition);
                    break;
                case 4 /* HILLS */:
                    sortedFields[4].push(hexPosition);
                    break;
                case 5 /* HIGHLANDS */:
                    sortedFields[5].push(hexPosition);
                    break;
                case 6 /* MOUNTAINS */:
                    sortedFields[6].push(hexPosition);
                    break;
                case 7 /* DESERT */:
                    sortedFields[7].push(hexPosition);
                    break;
                case 8 /* SWAMP */:
                    sortedFields[8].push(hexPosition);
                    break;
                default:
                    sortedFields[9].push(hexPosition);
                    break;
            }
        });
        if (drawingMode === 'image') {
            let currFields;
            for (let i = 0; i < sortedFields.length; i++) {
                currFields = sortedFields[i];
                switch (i) {
                    case 0 /* SHALLOWS */:
                        tileImg = images_1.Images.shallows;
                        break;
                    case 1 /* DEEPSEA */:
                        tileImg = images_1.Images.deepsea;
                        break;
                    case 2 /* LOWLANDS */:
                        tileImg = images_1.Images.lowlands;
                        break;
                    case 3 /* WOODS */:
                        tileImg = images_1.Images.woods;
                        break;
                    case 4 /* HILLS */:
                        tileImg = images_1.Images.hills;
                        break;
                    case 5 /* HIGHLANDS */:
                        tileImg = images_1.Images.highlands;
                        break;
                    case 6 /* MOUNTAINS */:
                        tileImg = images_1.Images.mountains;
                        break;
                    case 7 /* DESERT */:
                        tileImg = images_1.Images.desert;
                        break;
                    case 8 /* SWAMP */:
                        tileImg = images_1.Images.swamp;
                        break;
                    default:
                        tileImg = images_1.Images.default;
                        break;
                }
                for (let j = 0; j < currFields.length; j++) {
                    currentField = currFields[j];
                    //draw the image
                    gui_1.GUI.getContext().drawImage(tileImg, currentField[0], currentField[1], (scale * constants_1.Constants.SIN60), scale);
                }
            }
        }
        else if (drawingMode === 'primitives') {
            let currFields;
            for (let i = 0; i < sortedFields.length; i++) {
                currFields = sortedFields[i];
                switch (i) {
                    case 0 /* SHALLOWS */:
                        gui_1.GUI.getContext().fillStyle = '#7dbada';
                        break;
                    case 1 /* DEEPSEA */:
                        gui_1.GUI.getContext().fillStyle = '#35668b';
                        break;
                    case 2 /* LOWLANDS */:
                        gui_1.GUI.getContext().fillStyle = '#82d33d';
                        break;
                    case 3 /* WOODS */:
                        gui_1.GUI.getContext().fillStyle = '#266d16';
                        break;
                    case 4 /* HILLS */:
                        gui_1.GUI.getContext().fillStyle = '#c19663';
                        break;
                    case 5 /* HIGHLANDS */:
                        gui_1.GUI.getContext().fillStyle = '#854f36';
                        break;
                    case 6 /* MOUNTAINS */:
                        gui_1.GUI.getContext().fillStyle = '#d3d0d0';
                        break;
                    case 7 /* DESERT */:
                        gui_1.GUI.getContext().fillStyle = '#e3a72a';
                        break;
                    case 8 /* SWAMP */:
                        gui_1.GUI.getContext().fillStyle = '#7f40aa';
                        break;
                    default:
                        gui_1.GUI.getContext().fillStyle = 'Black';
                        break;
                }
                gui_1.GUI.getContext().beginPath();
                for (let j = 0; j < currFields.length; j++) {
                    currentField = currFields[j];
                    gui_1.GUI.getContext().moveTo((currentField[0] + 0.5 * Drawing.gW), currentField[1]);
                    gui_1.GUI.getContext().lineTo((currentField[0] + Drawing.gW), (currentField[1] + Drawing.c));
                    gui_1.GUI.getContext().lineTo((currentField[0] + Drawing.gW), (currentField[1] + Drawing.gH));
                    gui_1.GUI.getContext().lineTo((currentField[0] + 0.5 * Drawing.gW), (currentField[1] + scale));
                    gui_1.GUI.getContext().lineTo(currentField[0], (currentField[1] + Drawing.gH));
                    gui_1.GUI.getContext().lineTo(currentField[0], (currentField[1] + Drawing.c));
                    gui_1.GUI.getContext().lineTo((currentField[0] + 0.5 * Drawing.gW), currentField[1]);
                }
                gui_1.GUI.getContext().fill();
            }
        }
    }
    //drawing all possible moves to neighboring fields if army was selected
    function drawPossibleMoves(screenPos, scale, selectedArmyIndex) {
        if (selectedArmyIndex != undefined) {
            let moves = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].possibleMoves;
            for (let i = 0; i < moves.length; i++) {
                gui_1.GUI.getContext().lineWidth = scale / 6;
                gui_1.GUI.getContext().strokeStyle = '#00FF00';
                let pos = hexFunctions_1.HexFunction.computePosition(screenPos, moves[i].destination, scale); //get fields position
                gui_1.GUI.getContext().beginPath();
                gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 12, 0, 2 * Math.PI, false);
                gui_1.GUI.getContext().stroke();
            }
        }
    }
    function drawFieldSelection(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = 5;
        gui_1.GUI.getContext().strokeStyle = "blue";
        for (let i = 0; i < controlVariables_1.Controls.selectedFields.length; i++) {
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, controlVariables_1.Controls.selectedFields[i], scale);
            gui_1.GUI.getContext().beginPath();
            gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2, 0, 2 * Math.PI, false);
            gui_1.GUI.getContext().stroke();
        }
    }
    function drawArmySelection(screenPos, scale, armyIndex) {
        gui_1.GUI.getContext().lineWidth = 5;
        gui_1.GUI.getContext().strokeStyle = "green";
        if (armyIndex != undefined) {
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, gameState_1.GameState.armies[armyIndex].getPosition(), scale);
            gui_1.GUI.getContext().beginPath();
            gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2.2, 0, 2 * Math.PI, false);
            gui_1.GUI.getContext().stroke();
        }
    }
    function drawShootingTargetSelection(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = 5;
        gui_1.GUI.getContext().strokeStyle = "red";
        if (controlVariables_1.Controls.shootingTarget != undefined) {
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, controlVariables_1.Controls.shootingTarget, scale);
            gui_1.GUI.getContext().beginPath();
            gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2.2, 0, 2 * Math.PI, false);
            gui_1.GUI.getContext().stroke();
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
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            multifieldFunctions_1.MultiFieldFunctions.createMultifield(gameState_1.GameState.armies[i]);
        }
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            let armyData = gameState_1.GameState.armies[i]; // get army coordinates
            let pos = hexFunctions_1.HexFunction.computePosition(screenPos, armyData.getPosition(), scale);
            gui_1.GUI.getContext().fillStyle = 'black';
            gui_1.GUI.getContext().textAlign = 'center';
            gui_1.GUI.getContext().textBaseline = 'middle';
            //GUI.getContext().fillText(armyData.armyId, pos[0]+((scale * 0.866)/2), pos[1]+(scale /2));
            //check if its is on a multifield. if it is ignore
            if (!armyData.onMultifield) {
                if (armyData instanceof footArmy_1.FootArmy) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.troops, pos[0], pos[1], (scale * constants_1.Constants.SIN60), scale);
                }
                else if (armyData instanceof riderArmy_1.RiderArmy) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.mounts, pos[0], pos[1], (scale * constants_1.Constants.SIN60), scale);
                }
                else if (armyData instanceof fleet_1.Fleet) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.boats, pos[0], pos[1], (scale * constants_1.Constants.SIN60), scale);
                }
            }
            if (armyData.owner.tag === gameState_1.GameState.login || gameState_1.GameState.login === "sl") {
                if (armyData.possibleMoves.length > 0) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof footArmy_1.FootArmy && armyData.getMovePoints() === 9) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof riderArmy_1.RiderArmy && armyData.getMovePoints() === 21) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof fleet_1.Fleet && armyData.getMovePoints() >= 42) {
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
                let pos = hexFunctions_1.HexFunction.computePosition(screenPos, Drawing.listOfMultiArmyFields[j][i].getPosition(), scale);
                let circleScale = (scale * constants_1.Constants.SIN60) / Drawing.listOfMultiArmyFields[j].length;
                //const double Angle = (M_PI * 2.0) / n;
                //Für jedes i-te Objekt dann die Position des Mittelpunktes:
                //const double MidPosX = (cos(Angle * i) * RadiusX) + CirclePosX;
                //const double MidPosY =(sin(Angle * i) * RadiusY) + CirclePosY;
                let angle = (Math.PI * 2.0) / Drawing.listOfMultiArmyFields[j].length; //Total armies on field
                let xPosArmy = (Math.cos(angle * i) * scale / 4) + pos[0] + scale / 4;
                let yPosArmy = (Math.sin(angle * i) * scale / 4) + pos[1];
                if (armyData instanceof footArmy_1.FootArmy) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.troops, xPosArmy, yPosArmy, circleScale, scale);
                }
                else if (armyData instanceof riderArmy_1.RiderArmy) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.mounts, xPosArmy, yPosArmy, circleScale, scale);
                }
                else if (armyData instanceof fleet_1.Fleet) {
                    gui_1.GUI.getContext().drawImage(images_1.Images.boats, xPosArmy, yPosArmy, circleScale, scale);
                }
            }
        }
    }
    function drawRemainingMovement(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = scale / 8;
        gui_1.GUI.getContext().strokeStyle = '#00FFFF';
        gui_1.GUI.getContext().beginPath();
        gui_1.GUI.getContext().arc(screenPos[0] + (0.5 * scale * constants_1.Constants.SIN60) - Drawing.c, screenPos[1] + (scale * 0.5) - Drawing.c, scale / 16, Math.PI * 1.25, Math.PI * 1.75, false);
        gui_1.GUI.getContext().stroke();
    }
    function drawTookFire(screenPos, scale) {
        gui_1.GUI.getContext().lineWidth = scale / 8;
        gui_1.GUI.getContext().strokeStyle = '#FF0000';
        gui_1.GUI.getContext().beginPath();
        gui_1.GUI.getContext().arc(screenPos[0] + (0.5 * scale * constants_1.Constants.SIN60) + Drawing.c, screenPos[1] + (scale * 0.5) + Drawing.c, scale / 16, Math.PI * 1.25, Math.PI * 1.75, false);
        gui_1.GUI.getContext().stroke();
    }
    function drawPossibleShootingTargets(screenPos, scale, selectedArmy) {
        if (selectedArmy != undefined && gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].possibleTargets.length > 0 &&
            boxVisibilty_1.BoxVisibility.shootingModeOn) {
            let targets = gameState_1.GameState.armies[controlVariables_1.Controls.selectedArmyIndex].possibleTargets;
            for (let i = 0; i < targets.length; i++) {
                gui_1.GUI.getContext().lineWidth = scale / 10;
                gui_1.GUI.getContext().strokeStyle = '#FF0000';
                let pos = hexFunctions_1.HexFunction.computePosition(screenPos, targets[i].coordinates, scale); //get fields position
                gui_1.GUI.getContext().beginPath();
                gui_1.GUI.getContext().arc(pos[0] + (0.5 * scale * constants_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 20, 0, 2 * Math.PI, false);
                gui_1.GUI.getContext().stroke();
            }
        }
    }
    function writeFieldInfo() {
        let minimapBox = document.getElementById('minimapBox');
        let index = 0;
        if (boxVisibilty_1.BoxVisibility.shootingModeOn) {
            index = 1;
        }
        if (minimapBox !== null) {
            if (controlVariables_1.Controls.selectedFields[index] == undefined) {
                minimapBox.innerHTML = '';
            }
            else {
                let fieldPositionInList = hexFunctions_1.HexFunction.positionInList(controlVariables_1.Controls.selectedFields[index]);
                let localfieldType = '';
                switch (hexFunctions_1.HexFunction.fieldType(controlVariables_1.Controls.selectedFields[index])) {
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
                let fieldOwner = gameState_1.GameState.realms.find(realm => (realm.territory.some(field => (field.coordinates[0] === controlVariables_1.Controls.selectedFields[index][0] &&
                    field.coordinates[1] === controlVariables_1.Controls.selectedFields[index][1]))));
                let fieldOwnerString = (fieldOwner == undefined) ? 'keiner' : fieldOwner.tag;
                minimapBox.innerHTML = '<p>Feld: (' + controlVariables_1.Controls.selectedFields[index][0] + ', ' + controlVariables_1.Controls.selectedFields[index][1] + ')' +
                    '</p><p>Gelände: ' + localfieldType +
                    '</p><p>Höhe: ' + hexFunctions_1.HexFunction.height(controlVariables_1.Controls.selectedFields[index]) +
                    '</p><p>Besitzer: ' + fieldOwnerString + '</p>';
            }
        }
    }
    function writeTurnNumber() {
        // get the top bar element from the HTML document
        let topBar = gui_1.GUI.getTopBar();
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
                if (gameState_1.GameState.currentTurn.realm == undefined) {
                    message = "Do you want to end the pre-turn phase?";
                }
                else if (gameState_1.GameState.currentTurn.status === 'fi') {
                    let unprocessedEvents = gameState_1.GameState.loadedEvents.some(function (event) {
                        return (event.getStatus() === 4 /* Available */ ||
                            event.getStatus() === 3 /* Withheld */ ||
                            event.getStatus() === 2 /* Impossible */);
                    });
                    if (unprocessedEvents) {
                        message = "Some events are unprocessed.";
                    }
                    message += ("Do you want to end processing the turn of " + gameState_1.GameState.currentTurn.realm + "?");
                }
                else if (gameState_1.GameState.login === 'sl') {
                    message = "Do you want to end the turn of " + gameState_1.GameState.currentTurn.realm + "?";
                }
                else {
                    message = "Do you want to end your turn?";
                }
                if (confirm(message)) {
                    if (gameState_1.GameState.login === 'sl' && gameState_1.GameState.currentTurn.status === 'fi') {
                        gameState_1.GameState.loadedEvents.forEach(function (event) {
                            if (event.getStatus() === 0 /* Checked */) {
                                if (event.getDatabasePrimaryKey() !== undefined) {
                                    savingFunctions_1.Saving.sendCheckEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                                }
                            }
                            else if (event.getStatus() === 1 /* Deleted */) {
                                if (event.getDatabasePrimaryKey() !== undefined) {
                                    savingFunctions_1.Saving.sendDeleteEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                                }
                            }
                        }, this);
                        savingFunctions_1.Saving.saveBuildings();
                        savingFunctions_1.Saving.saveFactionsTerritories();
                        savingFunctions_1.Saving.saveArmies();
                    }
                    else {
                        savingFunctions_1.Saving.sendEventlistInOrder(0);
                    }
                    savingFunctions_1.Saving.sendNextTurn();
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
                if (gameState_1.GameState.login === 'sl') {
                    if (confirm("Do you want to save the events handled so far without ending the turn?" +
                        " Once saved the progress can't be reverted anymore.")) {
                        gameState_1.GameState.newEvents.forEach(function (event) {
                            if (event.getStatus() === 0 /* Checked */) {
                                savingFunctions_1.Saving.sendCheckEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                            }
                            else if (event.getStatus() === 1 /* Deleted */) {
                                savingFunctions_1.Saving.sendDeleteEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                            }
                        }, this);
                        gameState_1.GameState.newEvents = [];
                        gameState_1.GameState.loadedEvents = [];
                        savingFunctions_1.Saving.saveBuildings();
                        savingFunctions_1.Saving.saveFactionsTerritories();
                        savingFunctions_1.Saving.saveArmies();
                    }
                }
                else {
                    if (confirm("Do you want to save the events issued so far without ending the turn?" +
                        " Once saved the progress can only be reverted by the SL.")) {
                        console.log(3);
                        savingFunctions_1.Saving.sendEventlistInOrder(0);
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
                    gameState_1.GameState.newEvents = [];
                    gameState_1.GameState.loadedEvents = [];
                    loadingDataFunctions_1.Loading.loadArmies();
                    loadingDataFunctions_1.Loading.loadBuildingData();
                    loadingDataFunctions_1.Loading.loadBorderData();
                    loadingDataFunctions_1.Loading.loadPendingEvents();
                    writeTurnNumber();
                    drawStuff();
                }
            });
        }
        if (gameState_1.GameState.login !== 'sl' && (gameState_1.GameState.currentTurn.realm == undefined || gameState_1.GameState.currentTurn.status === 'fi' ||
            gameState_1.GameState.login !== gameState_1.GameState.currentTurn.realm)) {
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
        if (gameState_1.GameState.login === 'sl' && gameState_1.GameState.currentTurn.status === 'fi') {
            loadingDataFunctions_1.Loading.loadPendingEvents();
            boxVisibilty_1.BoxVisibility.show(gui_1.GUI.getBigBox().getEventTabsButton());
        }
        else {
            boxVisibilty_1.BoxVisibility.hide(gui_1.GUI.getBigBox().getEventTabsButton());
            stepBtn.disabled = true;
            stepBtn.style.cursor = "not-allowed";
            revertBtn.disabled = true;
            revertBtn.style.cursor = "not-allowed";
        }
        date.innerHTML = "Monat " + Drawing.months[gameState_1.GameState.currentTurn.turn % 8] + " des Jahres " +
            Math.ceil(gameState_1.GameState.currentTurn.turn / 8) + " (Zug " + gameState_1.GameState.currentTurn.turn + ", ";
        if (gameState_1.GameState.currentTurn.realm == undefined || gameState_1.GameState.currentTurn.status === 'fi') {
            // GM's turn
            date.innerHTML += "SL) ";
        }
        else {
            date.innerHTML += gameState_1.GameState.currentTurn.realm + ") ";
        }
        date.setAttribute("width", "340px");
        date.setAttribute("float", "left");
        date.setAttribute("line-height", "30px");
        if (gameState_1.GameState.currentTurn.turn % 8 === 1 || gameState_1.GameState.currentTurn.turn % 8 === 5) {
            spec.innerHTML = " Rüstmonat";
            date.setAttribute("width", "100px");
            date.setAttribute("float", "left");
            date.setAttribute("line-height", "30px");
        }
        else if (gameState_1.GameState.currentTurn.turn % 8 === 4 || gameState_1.GameState.currentTurn.turn % 8 === 0) {
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
})(Drawing = exports.Drawing || (exports.Drawing = {}));
