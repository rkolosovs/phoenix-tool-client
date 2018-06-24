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
const types_1 = require("../types");
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
        Drawing.gW = types_1.Constants.SIN60 * scale;
    }
    Drawing.setHexParts = setHexParts;
    // canvas resizing method
    function resizeCanvas() {
        types_1.GUI.getCanvas().width = window.innerWidth;
        types_1.GUI.getCanvas().height = window.innerHeight;
        drawStuff();
    }
    Drawing.resizeCanvas = resizeCanvas;
    // all the stuff to be drawn goes in this method
    function drawStuff() {
        types_1.GUI.getContext().clearRect(0, 0, types_1.GUI.getCanvas().width, types_1.GUI.getCanvas().height); // clear
        // do all drawing/element selection in respect to these coordinates
        // current origin for drawing + offset from dragged mouse
        let pos = [types_1.Controls.origin[0] + types_1.Controls.move[0], types_1.Controls.origin[1] + types_1.Controls.move[1]];
        drawMap(pos, Drawing.scale);
        drawFieldSelection(pos, Drawing.scale);
        drawArmies(pos, Drawing.scale);
        drawArmySelection(pos, Drawing.scale, types_1.Controls.selectedArmyIndex);
        drawPossibleMoves(pos, Drawing.scale, types_1.Controls.selectedArmyIndex);
        drawPossibleShootingTargets(pos, Drawing.scale, types_1.GameState.armies[types_1.Controls.selectedArmyIndex]);
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
        types_1.GameState.realms.forEach(realm => {
            let color = realm.color;
            types_1.GUI.getContext().lineWidth = (scale / 14); //line thickness for borders
            types_1.GUI.getContext().strokeStyle = 'rgb(' + color + ')'; //set line color
            types_1.GUI.getContext().lineCap = "round";
            types_1.GUI.getContext().fillStyle = 'rgba(' + color + ', 0.3)'; //set fill color
            let land = realm.territory;
            land.forEach(hex => {
                let point = types_1.HexFunction.computePosition(pos, hex.coordinates, scale);
                let neighbours = types_1.HexFunction.getAdjacency(hex.coordinates, land.map(field => field.coordinates));
                let start;
                if (neighbours[0]) { //determine start in the top corner
                    if (neighbours[1]) {
                        start = [(point[0] + 0.5 * Drawing.gW), point[1]];
                    }
                    else {
                        start = [(point[0] + 0.5 * Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + 0.5 * offset)];
                    }
                }
                else {
                    if (neighbours[1]) {
                        start = [(point[0] + 0.5 * Drawing.gW + types_1.Constants.SIN60 * offset), (point[1] + 0.5 * offset)];
                    }
                    else {
                        start = [(point[0] + 0.5 * Drawing.gW), (point[1] + offset)];
                    }
                }
                types_1.GUI.getContext().beginPath(); //begin border drawing
                types_1.GUI.getContext().moveTo(start[0], start[1]);
                if (neighbours[1]) { //go to upper right corner
                    if (neighbours[2]) {
                        types_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.c));
                    }
                    else {
                        types_1.GUI.getContext().moveTo((point[0] + Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[2]) {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c + offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[2]) { //go to lower right corner
                    if (neighbours[3]) {
                        types_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.gH));
                    }
                    else {
                        types_1.GUI.getContext().moveTo((point[0] + Drawing.gW), (point[1] + Drawing.gH - offset));
                    }
                }
                else {
                    if (neighbours[3]) {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[3]) { //go to bottom corner
                    if (neighbours[4]) {
                        types_1.GUI.getContext().moveTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale));
                    }
                    else {
                        types_1.GUI.getContext().moveTo((point[0] + 0.5 * Drawing.gW + types_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[4]) {
                        types_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale - offset));
                    }
                }
                if (neighbours[4]) { //go to lower left corner
                    if (neighbours[5]) {
                        types_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.gH));
                    }
                    else {
                        types_1.GUI.getContext().moveTo((point[0] + types_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[5]) {
                        types_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH - offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + types_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[5]) { //go to upper left corner
                    if (neighbours[0]) {
                        types_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.c));
                    }
                    else {
                        types_1.GUI.getContext().moveTo(point[0], (point[1] + Drawing.c + offset));
                    }
                }
                else {
                    if (neighbours[0]) {
                        types_1.GUI.getContext().lineTo((point[0] + types_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + types_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[0]) {
                    types_1.GUI.getContext().moveTo(start[0], start[1]);
                } //back to top corner
                else {
                    types_1.GUI.getContext().lineTo(start[0], start[1]);
                }
                types_1.GUI.getContext().stroke();
                types_1.GUI.getContext().beginPath(); //begin area filling
                types_1.GUI.getContext().moveTo(start[0], start[1]);
                if (neighbours[1]) { //go to upper right corner
                    if (neighbours[2]) {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[2]) {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.c + offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[2]) { //go to lower right corner
                    if (neighbours[3]) {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.gH));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW), (point[1] + Drawing.gH - offset));
                    }
                }
                else {
                    if (neighbours[3]) {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[3]) { //go to bottom corner
                    if (neighbours[4]) {
                        types_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW + types_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[4]) {
                        types_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW - types_1.Constants.SIN60 * offset), (point[1] + scale - 0.5 * offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + 0.5 * Drawing.gW), (point[1] + scale - offset));
                    }
                }
                if (neighbours[4]) { //go to lower left corner
                    if (neighbours[5]) {
                        types_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + types_1.Constants.SIN60 * offset), (point[1] + Drawing.gH + 0.5 * offset));
                    }
                }
                else {
                    if (neighbours[5]) {
                        types_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.gH - offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + types_1.Constants.SIN60 * offset), (point[1] + Drawing.gH - 0.5 * offset));
                    }
                }
                if (neighbours[5]) { //go to upper left corner
                    if (neighbours[0]) {
                        types_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.c));
                    }
                    else {
                        types_1.GUI.getContext().lineTo(point[0], (point[1] + Drawing.c + offset));
                    }
                }
                else {
                    if (neighbours[0]) {
                        types_1.GUI.getContext().lineTo((point[0] + types_1.Constants.SIN60 * offset), (point[1] + Drawing.c - 0.5 * offset));
                    }
                    else {
                        types_1.GUI.getContext().lineTo((point[0] + types_1.Constants.SIN60 * offset), (point[1] + Drawing.c + 0.5 * offset));
                    }
                }
                if (neighbours[0]) {
                    types_1.GUI.getContext().lineTo(start[0], start[1]);
                } //back to top corner
                else {
                    types_1.GUI.getContext().lineTo(start[0], start[1]);
                }
                types_1.GUI.getContext().fill();
            });
        });
    }
    function drawBuildings(screenPos, scale) {
        types_1.GUI.getContext().lineWidth = (scale / 8); //line style for roads
        types_1.GUI.getContext().strokeStyle = "#C8AB37";
        types_1.GUI.getContext().lineCap = "round";
        for (let i = 0; i < types_1.GameState.buildings.length; i++) {
            let building = types_1.GameState.buildings[i];
            let buildingPos = undefined;
            if (building.type !== 8 /* STREET */) {
                buildingPos = types_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
            }
            let tileImg; //declare the tile image variable
            switch (building.type) { //set the tileImg to match the building type
                case 0 /* CASTLE */:
                    tileImg = types_1.Images.castle;
                    break;
                case 1 /* CITY */:
                    tileImg = types_1.Images.city;
                    break;
                case 2 /* FORTRESS */:
                    tileImg = types_1.Images.fortress;
                    break;
                case 3 /* CAPITAL */:
                    tileImg = types_1.Images.capital;
                    break;
                case 4 /* CAPITAL_FORT */:
                    tileImg = types_1.Images.capitalFort;
                    break;
                case 5 /* WALL */:
                    switch (building.facing) {
                        case 0 /* NW */:
                            tileImg = types_1.Images.wallNW;
                            break;
                        case 1 /* NE */:
                            tileImg = types_1.Images.wallNE;
                            break;
                        case 2 /* E */:
                            tileImg = types_1.Images.wallE;
                            break;
                        case 3 /* SE */:
                            tileImg = types_1.Images.wallSE;
                            break;
                        case 4 /* SW */:
                            tileImg = types_1.Images.wallSW;
                            break;
                        case 5 /* W */:
                            tileImg = types_1.Images.wallW;
                            break;
                        default:
                            tileImg = types_1.Images.wallNW;
                            break;
                    }
                    break;
                case 6 /* HARBOR */:
                    let harborDir = types_1.HexFunction.getDirectionToNeighbor(building.getPosition(), building.getSecondPosition());
                    switch (harborDir) {
                        case 0 /* NW */:
                            tileImg = types_1.Images.harborNW;
                            break;
                        case 1 /* NE */:
                            tileImg = types_1.Images.harborNE;
                            break;
                        case 2 /* E */:
                            tileImg = types_1.Images.harborE;
                            break;
                        case 3 /* SE */:
                            tileImg = types_1.Images.harborSE;
                            break;
                        case 4 /* SW */:
                            tileImg = types_1.Images.harborSW;
                            break;
                        case 5 /* W */:
                            tileImg = types_1.Images.harborW;
                            break;
                        default:
                            tileImg = types_1.Images.harborNW;
                            break;
                    }
                    break;
                case 7 /* BRIDGE */:
                    let bridgeDir = types_1.HexFunction.getDirectionToNeighbor(building.getPosition(), building.getSecondPosition());
                    switch (bridgeDir) {
                        case 0 /* NW */:
                            tileImg = types_1.Images.bridgeNW;
                            break;
                        case 1 /* NE */:
                            tileImg = types_1.Images.bridgeNE;
                            break;
                        case 2 /* E */:
                            tileImg = types_1.Images.bridgeE;
                            break;
                        case 3 /* SE */:
                            tileImg = types_1.Images.bridgeSE;
                            break;
                        case 4 /* SW */:
                            tileImg = types_1.Images.bridgeSW;
                            break;
                        case 5 /* W */:
                            tileImg = types_1.Images.bridgeW;
                            break;
                        default:
                            tileImg = types_1.Images.bridgeNW;
                            break;
                    }
                    break;
                default:
                    tileImg = types_1.Images.default;
                    break;
            }
            if (building.type <= 4 && buildingPos !== undefined) { //regular one tile buildings excluding walls
                types_1.GUI.getContext().drawImage(tileImg, buildingPos[0], buildingPos[1], scale * types_1.Constants.SIN60, scale); //draw the image
            }
            else if (building.type === 5 && buildingPos !== undefined) { //walls - one tile buildings handled differently from cities
                types_1.GUI.getContext().drawImage(tileImg, buildingPos[0], buildingPos[1], scale * types_1.Constants.SIN60, scale); //draw the image
            }
            else if (building.type <= 7 && buildingPos !== undefined) { //harbors and bridges - "oversized" buildings
                types_1.GUI.getContext().drawImage(tileImg, buildingPos[0] - Drawing.gW, buildingPos[1] - (0.5 * scale), 3 * Drawing.gW, 2 * scale); //draw the image
            }
            else if (building.type === 8) { //streets - currently drawn as simple lines
                let posFirst = types_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
                let posSecond = types_1.HexFunction.computePosition(screenPos, building.getPosition(), scale);
                types_1.GUI.getContext().beginPath();
                types_1.GUI.getContext().moveTo((posFirst[0] + (0.5 * Drawing.gW)), (posFirst[1] + 2 * Drawing.c));
                types_1.GUI.getContext().lineTo((posSecond[0] + (0.5 * Drawing.gW)), (posSecond[1] + 2 * Drawing.c));
                types_1.GUI.getContext().stroke();
            }
        }
    }
    function drawRivers(screenPos, scale) {
        types_1.GUI.getContext().lineWidth = (scale / 8);
        types_1.GUI.getContext().strokeStyle = "#0099FF";
        types_1.GUI.getContext().lineCap = "round";
        types_1.GameState.rivers.forEach(river => {
            let pos = types_1.HexFunction.computePosition(screenPos, river.leftBank, scale);
            let points = [pos, pos];
            let rowOdd = (((river.leftBank[1]) % 2) !== 0);
            if ((river.leftBank[1]) === (river.rightBank[1])) { //same row (w/e)
                if ((river.leftBank[0]) > (river.rightBank[0])) { //second field left (w)
                    points = [[(pos[0]), (pos[1] + Drawing.c)], [(pos[0]), (pos[1] + Drawing.gH)]];
                }
                else { //second field right (e)
                    points = [[(pos[0] + Drawing.gW), (pos[1] + Drawing.c)], [(pos[0] + Drawing.gW), (pos[1] + Drawing.gH)]];
                }
            }
            else if ((river.leftBank[1]) > (river.rightBank[1])) { //second field above (nw/ne)
                //second field right (ne)
                if ((rowOdd && (river.leftBank[0]) === (river.rightBank[0])) || (!rowOdd && (river.leftBank[0]) < (river.rightBank[0]))) {
                    points = [[(pos[0] + 0.5 * Drawing.gW), (pos[1])], [(pos[0] + Drawing.gW), (pos[1] + Drawing.c)]];
                }
                else { //second field left (nw)
                    points = [[(pos[0]), (pos[1] + Drawing.c)], [(pos[0] + 0.5 * Drawing.gW), (pos[1])]];
                }
            }
            else { //second field below (sw/se)
                //second field right (se)
                if ((rowOdd && (river.leftBank[0]) === (river.rightBank[0])) || (!rowOdd && (river.leftBank[0]) < (river.rightBank[0]))) {
                    points = [[(pos[0] + 0.5 * Drawing.gW), (pos[1] + scale)], [(pos[0] + Drawing.gW), (pos[1] + Drawing.gH)]];
                }
                else { //second field left (sw)
                    points = [[(pos[0]), (pos[1] + Drawing.gH)], [(pos[0] + 0.5 * Drawing.gW), (pos[1] + scale)]];
                }
            }
            types_1.GUI.getContext().beginPath();
            types_1.GUI.getContext().moveTo((points[0][0]), (points[0][1]));
            types_1.GUI.getContext().lineTo((points[1][0]), (points[1][1]));
            types_1.GUI.getContext().stroke();
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
        types_1.GameState.fields.forEach(field => {
            let hexPosition = types_1.HexFunction.computePosition(screenPos, field.coordinates, scale);
            switch (field.type) { //set the tileImg to match the field type
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
                        tileImg = types_1.Images.shallows;
                        break;
                    case 1 /* DEEPSEA */:
                        tileImg = types_1.Images.deepsea;
                        break;
                    case 2 /* LOWLANDS */:
                        tileImg = types_1.Images.lowlands;
                        break;
                    case 3 /* WOODS */:
                        tileImg = types_1.Images.woods;
                        break;
                    case 4 /* HILLS */:
                        tileImg = types_1.Images.hills;
                        break;
                    case 5 /* HIGHLANDS */:
                        tileImg = types_1.Images.highlands;
                        break;
                    case 6 /* MOUNTAINS */:
                        tileImg = types_1.Images.mountains;
                        break;
                    case 7 /* DESERT */:
                        tileImg = types_1.Images.desert;
                        break;
                    case 8 /* SWAMP */:
                        tileImg = types_1.Images.swamp;
                        break;
                    default:
                        tileImg = types_1.Images.default;
                        break;
                }
                for (let j = 0; j < currFields.length; j++) {
                    currentField = currFields[j];
                    //draw the image
                    types_1.GUI.getContext().drawImage(tileImg, currentField[0], currentField[1], (scale * types_1.Constants.SIN60), scale);
                }
            }
        }
        else if (drawingMode === 'primitives') {
            let currFields;
            for (let i = 0; i < sortedFields.length; i++) {
                currFields = sortedFields[i];
                switch (i) {
                    case 0 /* SHALLOWS */:
                        types_1.GUI.getContext().fillStyle = '#7dbada';
                        break;
                    case 1 /* DEEPSEA */:
                        types_1.GUI.getContext().fillStyle = '#35668b';
                        break;
                    case 2 /* LOWLANDS */:
                        types_1.GUI.getContext().fillStyle = '#82d33d';
                        break;
                    case 3 /* WOODS */:
                        types_1.GUI.getContext().fillStyle = '#266d16';
                        break;
                    case 4 /* HILLS */:
                        types_1.GUI.getContext().fillStyle = '#c19663';
                        break;
                    case 5 /* HIGHLANDS */:
                        types_1.GUI.getContext().fillStyle = '#854f36';
                        break;
                    case 6 /* MOUNTAINS */:
                        types_1.GUI.getContext().fillStyle = '#d3d0d0';
                        break;
                    case 7 /* DESERT */:
                        types_1.GUI.getContext().fillStyle = '#e3a72a';
                        break;
                    case 8 /* SWAMP */:
                        types_1.GUI.getContext().fillStyle = '#7f40aa';
                        break;
                    default:
                        types_1.GUI.getContext().fillStyle = 'Black';
                        break;
                }
                types_1.GUI.getContext().beginPath();
                for (let j = 0; j < currFields.length; j++) {
                    currentField = currFields[j];
                    types_1.GUI.getContext().moveTo((currentField[0] + 0.5 * Drawing.gW), currentField[1]);
                    types_1.GUI.getContext().lineTo((currentField[0] + Drawing.gW), (currentField[1] + Drawing.c));
                    types_1.GUI.getContext().lineTo((currentField[0] + Drawing.gW), (currentField[1] + Drawing.gH));
                    types_1.GUI.getContext().lineTo((currentField[0] + 0.5 * Drawing.gW), (currentField[1] + scale));
                    types_1.GUI.getContext().lineTo(currentField[0], (currentField[1] + Drawing.gH));
                    types_1.GUI.getContext().lineTo(currentField[0], (currentField[1] + Drawing.c));
                    types_1.GUI.getContext().lineTo((currentField[0] + 0.5 * Drawing.gW), currentField[1]);
                }
                types_1.GUI.getContext().fill();
            }
        }
    }
    //drawing all possible moves to neighboring fields if army was selected
    function drawPossibleMoves(screenPos, scale, selectedArmyIndex) {
        if (selectedArmyIndex != undefined) {
            let moves = types_1.GameState.armies[types_1.Controls.selectedArmyIndex].possibleMoves;
            for (let i = 0; i < moves.length; i++) {
                types_1.GUI.getContext().lineWidth = scale / 6;
                types_1.GUI.getContext().strokeStyle = '#00FF00';
                let pos = types_1.HexFunction.computePosition(screenPos, moves[i].destination, scale); //get fields position
                types_1.GUI.getContext().beginPath();
                types_1.GUI.getContext().arc(pos[0] + (0.5 * scale * types_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 12, 0, 2 * Math.PI, false);
                types_1.GUI.getContext().stroke();
            }
        }
    }
    function drawFieldSelection(screenPos, scale) {
        types_1.GUI.getContext().lineWidth = 5;
        types_1.GUI.getContext().strokeStyle = "blue";
        for (let i = 0; i < types_1.Controls.selectedFields.length; i++) {
            let pos = types_1.HexFunction.computePosition(screenPos, types_1.Controls.selectedFields[i], scale);
            types_1.GUI.getContext().beginPath();
            types_1.GUI.getContext().arc(pos[0] + (0.5 * scale * types_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2, 0, 2 * Math.PI, false);
            types_1.GUI.getContext().stroke();
        }
    }
    function drawArmySelection(screenPos, scale, armyIndex) {
        types_1.GUI.getContext().lineWidth = 5;
        types_1.GUI.getContext().strokeStyle = "green";
        if (armyIndex != undefined) {
            let pos = types_1.HexFunction.computePosition(screenPos, types_1.GameState.armies[armyIndex].getPosition(), scale);
            types_1.GUI.getContext().beginPath();
            types_1.GUI.getContext().arc(pos[0] + (0.5 * scale * types_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2.2, 0, 2 * Math.PI, false);
            types_1.GUI.getContext().stroke();
        }
    }
    function drawShootingTargetSelection(screenPos, scale) {
        types_1.GUI.getContext().lineWidth = 5;
        types_1.GUI.getContext().strokeStyle = "red";
        if (types_1.Controls.shootingTarget != undefined) {
            let pos = types_1.HexFunction.computePosition(screenPos, types_1.Controls.shootingTarget, scale);
            types_1.GUI.getContext().beginPath();
            types_1.GUI.getContext().arc(pos[0] + (0.5 * scale * types_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 2.2, 0, 2 * Math.PI, false);
            types_1.GUI.getContext().stroke();
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
        for (let i = 0; i < types_1.GameState.armies.length; i++) {
            types_1.MultiFieldFunctions.createMultifield(types_1.GameState.armies[i]);
        }
        for (let i = 0; i < types_1.GameState.armies.length; i++) {
            let armyData = types_1.GameState.armies[i]; // get army coordinates
            let pos = types_1.HexFunction.computePosition(screenPos, armyData.getPosition(), scale);
            types_1.GUI.getContext().fillStyle = 'black';
            types_1.GUI.getContext().textAlign = 'center';
            types_1.GUI.getContext().textBaseline = 'middle';
            //GUI.getContext().fillText(armyData.armyId, pos[0]+((scale * 0.866)/2), pos[1]+(scale /2));
            //check if its is on a multifield. if it is ignore
            if (!armyData.onMultifield) {
                if (armyData instanceof types_1.FootArmy) {
                    types_1.GUI.getContext().drawImage(types_1.Images.troops, pos[0], pos[1], (scale * types_1.Constants.SIN60), scale);
                }
                else if (armyData instanceof types_1.RiderArmy) {
                    types_1.GUI.getContext().drawImage(types_1.Images.mounts, pos[0], pos[1], (scale * types_1.Constants.SIN60), scale);
                }
                else if (armyData instanceof types_1.Fleet) {
                    types_1.GUI.getContext().drawImage(types_1.Images.boats, pos[0], pos[1], (scale * types_1.Constants.SIN60), scale);
                }
            }
            if (armyData.owner.tag === types_1.GameState.login || types_1.GameState.login === "sl") {
                if (armyData.possibleMoves.length > 0) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof types_1.FootArmy && armyData.getMovePoints() === 9) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof types_1.RiderArmy && armyData.getMovePoints() === 21) {
                    drawRemainingMovement(pos, scale);
                }
                else if (armyData instanceof types_1.Fleet && armyData.getMovePoints() >= 42) {
                    drawRemainingMovement(pos, scale);
                }
                //draw if it took fire
                if (armyData.wasShotAt === true) {
                    drawTookFire(pos, scale);
                }
            }
        }
        //drawing the multifield armies
        for (let j = 0; j < Drawing.listOfMultiArmyFields.length; j++) { //for every field
            for (let i = 0; i < Drawing.listOfMultiArmyFields[j].length; i++) { //for every army on that field
                let armyData = Drawing.listOfMultiArmyFields[j][i]; // get army coordinates
                let pos = types_1.HexFunction.computePosition(screenPos, Drawing.listOfMultiArmyFields[j][i].getPosition(), scale);
                let circleScale = (scale * types_1.Constants.SIN60) / Drawing.listOfMultiArmyFields[j].length;
                //const double Angle = (M_PI * 2.0) / n;
                //Für jedes i-te Objekt dann die Position des Mittelpunktes:
                //const double MidPosX = (cos(Angle * i) * RadiusX) + CirclePosX;
                //const double MidPosY =(sin(Angle * i) * RadiusY) + CirclePosY;
                let angle = (Math.PI * 2.0) / Drawing.listOfMultiArmyFields[j].length; //Total armies on field
                let xPosArmy = (Math.cos(angle * i) * scale / 4) + pos[0] + scale / 4;
                let yPosArmy = (Math.sin(angle * i) * scale / 4) + pos[1];
                if (armyData instanceof types_1.FootArmy) {
                    types_1.GUI.getContext().drawImage(types_1.Images.troops, xPosArmy, yPosArmy, circleScale, scale);
                }
                else if (armyData instanceof types_1.RiderArmy) {
                    types_1.GUI.getContext().drawImage(types_1.Images.mounts, xPosArmy, yPosArmy, circleScale, scale);
                }
                else if (armyData instanceof types_1.Fleet) {
                    types_1.GUI.getContext().drawImage(types_1.Images.boats, xPosArmy, yPosArmy, circleScale, scale);
                }
            }
        }
    }
    function drawRemainingMovement(screenPos, scale) {
        types_1.GUI.getContext().lineWidth = scale / 8;
        types_1.GUI.getContext().strokeStyle = '#00FFFF';
        types_1.GUI.getContext().beginPath();
        types_1.GUI.getContext().arc(screenPos[0] + (0.5 * scale * types_1.Constants.SIN60) - Drawing.c, screenPos[1] + (scale * 0.5) - Drawing.c, scale / 16, Math.PI * 1.25, Math.PI * 1.75, false);
        types_1.GUI.getContext().stroke();
    }
    function drawTookFire(screenPos, scale) {
        types_1.GUI.getContext().lineWidth = scale / 8;
        types_1.GUI.getContext().strokeStyle = '#FF0000';
        types_1.GUI.getContext().beginPath();
        types_1.GUI.getContext().arc(screenPos[0] + (0.5 * scale * types_1.Constants.SIN60) + Drawing.c, screenPos[1] + (scale * 0.5) + Drawing.c, scale / 16, Math.PI * 1.25, Math.PI * 1.75, false);
        types_1.GUI.getContext().stroke();
    }
    function drawPossibleShootingTargets(screenPos, scale, selectedArmy) {
        if (selectedArmy != undefined && types_1.GameState.armies[types_1.Controls.selectedArmyIndex].possibleTargets.length > 0 &&
            types_1.BoxVisibility.shootingModeOn) {
            let targets = types_1.GameState.armies[types_1.Controls.selectedArmyIndex].possibleTargets;
            for (let i = 0; i < targets.length; i++) {
                types_1.GUI.getContext().lineWidth = scale / 10;
                types_1.GUI.getContext().strokeStyle = '#FF0000';
                let pos = types_1.HexFunction.computePosition(screenPos, targets[i].coordinates, scale); //get fields position
                types_1.GUI.getContext().beginPath();
                types_1.GUI.getContext().arc(pos[0] + (0.5 * scale * types_1.Constants.SIN60), pos[1] + (scale * 0.5), scale / 20, 0, 2 * Math.PI, false);
                types_1.GUI.getContext().stroke();
            }
        }
    }
    function writeFieldInfo() {
        let minimapBox = document.getElementById('minimapBox');
        let index = 0;
        if (types_1.BoxVisibility.shootingModeOn) {
            index = 1;
        }
        if (minimapBox !== null) {
            if (types_1.Controls.selectedFields[index] == undefined) {
                minimapBox.innerHTML = '';
            }
            else {
                let fieldPositionInList = types_1.HexFunction.positionInList(types_1.Controls.selectedFields[index]);
                let localfieldType = '';
                switch (types_1.HexFunction.fieldType(types_1.Controls.selectedFields[index])) {
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
                let fieldOwner = types_1.GameState.realms.find(realm => (realm.territory.some(field => (field.coordinates[0] === types_1.Controls.selectedFields[index][0] &&
                    field.coordinates[1] === types_1.Controls.selectedFields[index][1]))));
                let fieldOwnerString = (fieldOwner == undefined) ? 'keiner' : fieldOwner.tag;
                minimapBox.innerHTML = '<p>Feld: (' + types_1.Controls.selectedFields[index][0] + ', ' + types_1.Controls.selectedFields[index][1] + ')' +
                    '</p><p>Gelände: ' + localfieldType +
                    '</p><p>Höhe: ' + types_1.HexFunction.height(types_1.Controls.selectedFields[index]) +
                    '</p><p>Besitzer: ' + fieldOwnerString + '</p>';
            }
        }
    }
    function writeTurnNumber() {
        // get the top bar element from the HTML document
        let topBar = types_1.GUI.getTopBar();
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
                if (types_1.GameState.currentTurn.realm == undefined) {
                    message = "Do you want to end the pre-turn phase?";
                }
                else if (types_1.GameState.currentTurn.status === 'fi') {
                    let unprocessedEvents = types_1.GameState.loadedEvents.some(function (event) {
                        return (event.getStatus() === 4 /* Available */ ||
                            event.getStatus() === 3 /* Withheld */ ||
                            event.getStatus() === 2 /* Impossible */);
                    });
                    if (unprocessedEvents) {
                        message = "Some events are unprocessed.";
                    }
                    message += ("Do you want to end processing the turn of " + types_1.GameState.currentTurn.realm + "?");
                }
                else if (types_1.GameState.login === 'sl') {
                    message = "Do you want to end the turn of " + types_1.GameState.currentTurn.realm + "?";
                }
                else {
                    message = "Do you want to end your turn?";
                }
                if (confirm(message)) {
                    if (types_1.GameState.login === 'sl' && types_1.GameState.currentTurn.status === 'fi') { //SL sends DB change requests
                        types_1.GameState.loadedEvents.forEach(function (event) {
                            if (event.getStatus() === 0 /* Checked */) {
                                if (event.getDatabasePrimaryKey() !== undefined) {
                                    types_1.Saving.sendCheckEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                                }
                            }
                            else if (event.getStatus() === 1 /* Deleted */) {
                                if (event.getDatabasePrimaryKey() !== undefined) {
                                    types_1.Saving.sendDeleteEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                                }
                            }
                        }, this);
                        types_1.Saving.saveBuildings();
                        types_1.Saving.saveFactionsTerritories();
                        types_1.Saving.saveArmies();
                    }
                    else { //Players and SL during player's turn send events
                        types_1.Saving.sendEventlistInOrder(0);
                    }
                    types_1.Saving.sendNextTurn();
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
                if (types_1.GameState.login === 'sl') {
                    if (confirm("Do you want to save the events handled so far without ending the turn?" +
                        " Once saved the progress can't be reverted anymore.")) {
                        types_1.GameState.newEvents.forEach(function (event) {
                            if (event.getStatus() === 0 /* Checked */) {
                                types_1.Saving.sendCheckEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                            }
                            else if (event.getStatus() === 1 /* Deleted */) {
                                types_1.Saving.sendDeleteEvent(event.getDatabasePrimaryKey(), event.typeAsString());
                            }
                        }, this);
                        types_1.GameState.newEvents = [];
                        types_1.GameState.loadedEvents = [];
                        types_1.Saving.saveBuildings();
                        types_1.Saving.saveFactionsTerritories();
                        types_1.Saving.saveArmies();
                    }
                }
                else {
                    if (confirm("Do you want to save the events issued so far without ending the turn?" +
                        " Once saved the progress can only be reverted by the SL.")) {
                        console.log(3);
                        types_1.Saving.sendEventlistInOrder(0);
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
                    types_1.GameState.newEvents = [];
                    types_1.GameState.loadedEvents = [];
                    types_1.Loading.loadArmies();
                    types_1.Loading.loadBuildingData();
                    types_1.Loading.loadBorderData();
                    types_1.Loading.loadPendingEvents();
                    writeTurnNumber();
                    drawStuff();
                }
            });
        }
        if (types_1.GameState.login !== 'sl' && (types_1.GameState.currentTurn.realm == undefined || types_1.GameState.currentTurn.status === 'fi' ||
            types_1.GameState.login !== types_1.GameState.currentTurn.realm)) {
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
        if (types_1.GameState.login === 'sl' && types_1.GameState.currentTurn.status === 'fi') {
            types_1.Loading.loadPendingEvents();
            types_1.BoxVisibility.show(types_1.GUI.getBigBox().getEventTabsButton());
        }
        else {
            types_1.BoxVisibility.hide(types_1.GUI.getBigBox().getEventTabsButton());
            stepBtn.disabled = true;
            stepBtn.style.cursor = "not-allowed";
            revertBtn.disabled = true;
            revertBtn.style.cursor = "not-allowed";
        }
        date.innerHTML = "Monat " + Drawing.months[types_1.GameState.currentTurn.turn % 8] + " des Jahres " +
            Math.ceil(types_1.GameState.currentTurn.turn / 8) + " (Zug " + types_1.GameState.currentTurn.turn + ", ";
        if (types_1.GameState.currentTurn.realm == undefined || types_1.GameState.currentTurn.status === 'fi') {
            // GM's turn
            date.innerHTML += "SL) ";
        }
        else { // a realm's turn
            date.innerHTML += types_1.GameState.currentTurn.realm + ") ";
        }
        date.setAttribute("width", "340px");
        date.setAttribute("float", "left");
        date.setAttribute("line-height", "30px");
        if (types_1.GameState.currentTurn.turn % 8 === 1 || types_1.GameState.currentTurn.turn % 8 === 5) {
            spec.innerHTML = " Rüstmonat";
            date.setAttribute("width", "100px");
            date.setAttribute("float", "left");
            date.setAttribute("line-height", "30px");
        }
        else if (types_1.GameState.currentTurn.turn % 8 === 4 || types_1.GameState.currentTurn.turn % 8 === 0) {
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
//# sourceMappingURL=drawingFunctions.js.map