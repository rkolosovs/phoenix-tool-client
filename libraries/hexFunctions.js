"use strict";
// contains helper functions to get information about a field out of the fields array with just its coordinates.
// this.id = function(){
//     //TODO: GroßhexKleinhex Zahl bestimmen.
// }
var HexFunction;
(function (HexFunction) {
    // returns the fields neighbors in the usual order
    function neighbors(hex) {
        //usual order: NW,NO,O,SO,SW,W
        if (hex[1] % 2 === 0) {
            return [[hex[0], hex[1] - 1], [hex[0] + 1, hex[1] - 1], [hex[0] + 1, hex[1]],
                [hex[0] + 1, hex[1] + 1], [hex[0], hex[1] + 1], [hex[0] - 1, hex[1]]];
        }
        else {
            return [[hex[0] - 1, hex[1] - 1], [hex[0], hex[1] - 1], [hex[0] + 1, hex[1]],
                [hex[0], hex[1] + 1], [hex[0] - 1, hex[1] + 1], [hex[0] - 1, hex[1]]];
        }
    }
    HexFunction.neighbors = neighbors;
    // order: NW,NO,O,SO,SW,W,
    function fluesse(hex) {
        let result = [false, false, false, false, false, false];
        let surroundings = neighbors(hex);
        GameState.rivers.forEach(river => {
            if ((hex[0] === river.leftBank[0] && hex[1] === river.leftBank[1]) ||
                (hex[0] === river.rightBank[0] && hex[1] === river.rightBank[1])) {
                surroundings.forEach((surrounding, index) => {
                    if ((surrounding[0] === river.leftBank[0] && surrounding[1] === river.leftBank[1]) ||
                        (surrounding[0] === river.rightBank[0] && surrounding[1] === river.rightBank[1])) {
                        result[index] = true;
                    }
                });
            }
        });
        return result;
    }
    HexFunction.fluesse = fluesse;
    // where in the field list is this field
    function positionInList(hex) {
        return GameState.fields.findIndex(field => field.coordinates[0] === hex[0] && field.coordinates[1] === hex[1]);
    }
    HexFunction.positionInList = positionInList;
    // what type is this field
    function fieldType(hex) {
        let foundField = GameState.fields.find(field => field.coordinates[0] === hex[0] &&
            field.coordinates[1] === hex[1]);
        return (foundField != undefined) ? foundField.type : -1;
    }
    HexFunction.fieldType = fieldType;
    // what height is this field
    function height(hex) {
        let field = GameState.fields.find(field => field.coordinates[0] === hex[0] && field.coordinates[1] === hex[1]);
        return (field != undefined) ? field.getHeight() : -1;
    }
    HexFunction.height = height;
    //order: NW,NO,O,SO,SW,W
    //returns the number value corresponting to the direction. if it has a .5 it is 
    function getDirectionToNeighbor(from, to) {
        if (distance(from, to) === 1) {
            let possibleDir = neighbors(from);
            for (let i = 0; i < possibleDir.length; i++) {
                if (possibleDir[i][0] == to[0] && possibleDir[i][1] === to[1])
                    return i;
            }
        }
        else if (distance(from, to) === 2) {
            let targetNeighbors = neighbors(to);
            let originNeighbors = neighbors(from);
            let foundNeigh = false;
            let direction = -1;
            targetNeighbors.forEach(targetNeighbor => {
                originNeighbors.forEach((originNeighbor, index) => {
                    if (targetNeighbor[0] === originNeighbor[0] && targetNeighbor[1] === originNeighbor[1]) {
                        if (foundNeigh === false) {
                            foundNeigh = true;
                            direction = index;
                        }
                        else {
                            direction -= 0.5;
                        }
                    }
                });
            });
            return direction;
        }
        return -1; //in case the to field is not a neighbor
    }
    HexFunction.getDirectionToNeighbor = getDirectionToNeighbor;
    //returns the distance from here to target Hex
    //to properly do this we use a 3D/Cube coordinate system as described at
    //https://www.redblobgames.com/grids/hexagons/
    function distance(origin, to) {
        //this is the cube coordinates for the current Hex
        let thisCubeX = origin[0] - (origin[1] + (origin[1] & 1)) / 2;
        let thisCubeZ = origin[1];
        let thisCubeY = -thisCubeX - thisCubeZ;
        //this is the cube coordinates for the current Hex
        //bitwise & as an alternative to modulo that works without exceptions(negative numbers)
        let targetCubeX = to[0] - (to[1] + (to[1] & 1)) / 2;
        let targetCubeZ = to[1];
        let targetCubeY = -targetCubeX - targetCubeZ;
        return Math.max(Math.abs(thisCubeX - targetCubeX), Math.abs(thisCubeY - targetCubeY), Math.abs(thisCubeZ - targetCubeZ));
    }
    HexFunction.distance = distance;
    function neighborInRange(hex, range) {
        let neighbors = [];
        for (let i = hex[0] - range; i <= hex[0] + range; i++) {
            for (let j = hex[1] - range; j <= hex[1] + range; j++) {
                let dist = distance(hex, [i, j]);
                if (i != hex[0] || j != hex[1]) {
                    if (dist <= range) {
                        neighbors.push([i, j]);
                    }
                }
            }
        }
        return neighbors;
    }
    HexFunction.neighborInRange = neighborInRange;
    function findCommonNeighbor(from, to) {
        let targetNeighbors = neighbors(to);
        let originNeighbors = neighbors(from);
        let foundCommon = [];
        targetNeighbors.forEach(targetNeighbor => {
            originNeighbors.forEach(originNeighbor => {
                if (targetNeighbor[0] === originNeighbor[0] && targetNeighbor[1] === originNeighbor[1]) {
                    foundCommon.push(targetNeighbor);
                }
            });
        });
        return foundCommon;
    }
    HexFunction.findCommonNeighbor = findCommonNeighbor;
    // does the field has a street on it in any direction
    function hasStreet(hex) {
        return GameState.buildings.some((elem) => elem.type === BuildingType.STREET &&
            ((elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]) ||
                (elem.getSecondPosition()[0] === hex[0] &&
                    elem.getSecondPosition()[1] === hex[1])));
    }
    HexFunction.hasStreet = hasStreet;
    // in which directions does this field have walls (order as above, only walls build on this field)
    function walls(hex) {
        let result = [false, false, false, false, false, false];
        let walls = GameState.buildings.filter(elem => (elem instanceof Wall &&
            elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]));
        walls.forEach(wall => {
            switch (wall.facing) {
                case Direction.NW:
                    result[0] = true;
                    break;
                case Direction.NE:
                    result[1] = true;
                    break;
                case Direction.E:
                    result[2] = true;
                    break;
                case Direction.SE:
                    result[3] = true;
                    break;
                case Direction.SW:
                    result[4] = true;
                    break;
                case Direction.W:
                    result[5] = true;
                    break;
            }
        });
        return result;
    }
    HexFunction.walls = walls;
    // in which directions does this field have bridges (order as above)
    function bridges(hex) {
        let result = [false, false, false, false, false, false];
        let neighbor = neighbors(hex);
        GameState.buildings.forEach(elem => {
            if (elem.type === BuildingType.BRIDGE) {
                if (elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]) {
                    result[neighbor.indexOf(elem.getSecondPosition())] = true;
                }
                else if (elem.getSecondPosition()[0] === hex[0] &&
                    elem.getSecondPosition()[1] === hex[1]) {
                    result[neighbor.indexOf(elem.getPosition())] = true;
                }
            }
        });
        return result;
    }
    HexFunction.bridges = bridges;
    function reverseDirection(direction) {
        switch (direction) {
            case Direction.NW: return Direction.SE;
            case Direction.NE: return Direction.SW;
            case Direction.E: return Direction.W;
            case Direction.SE: return Direction.NW;
            case Direction.SW: return Direction.NE;
            case Direction.W: return Direction.E;
            default: return Direction.SE; //TODO: Shouldn't this throw an error?
        }
    }
    HexFunction.reverseDirection = reverseDirection;
    //computes a fields position (upper left corner of inscribing rectangle)
    function computePosition(orig, curr, scale) {
        //get the current field's x position
        let xpos = orig[0] + (curr[0] * scale * SIN60);
        //each odd row is offset half a hex to the left
        return [(((curr[1] % 2) !== 0) ? (xpos - (0.5 * scale * SIN60)) : (xpos)), orig[1] + (curr[1] * Drawing.gH)];
    }
    HexFunction.computePosition = computePosition;
    //for all directions in the usual order (nw, ne, e, se, sw, w)
    //returns true if candidates contains the neighbor of field in the respective direction
    function getAdjacency(field, candidates) {
        let result = [false, false, false, false, false, false];
        let neighbors = HexFunction.neighbors(field);
        neighbors.forEach((neighbor, neighborIndex) => result[neighborIndex] = candidates.some(candidate => candidate[0] === neighbor[0] && candidate[1] === neighbor[1]));
        return result;
    }
    HexFunction.getAdjacency = getAdjacency;
})(HexFunction || (HexFunction = {}));
