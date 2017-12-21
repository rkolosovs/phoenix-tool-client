// contains helper functions to get information about a field out of the fields array with just its coordinates.
// this.id = function(){
//     //TODO: GroßhexKleinhex Zahl bestimmen.
// }
var HexFunction;
(function (HexFunction) {
    //just for compilation TODO delete
    var rivers;
    var buildings;
    var fields;
    var Building = /** @class */ (function () {
        function Building() {
        }
        return Building;
    }());
    var Field = /** @class */ (function () {
        function Field() {
        }
        return Field;
    }());
    //end TODO
    // returns the fields neighbors in the usual order
    function neighbors(x, y) {
        //reihenfolge NW,NO,O,SO,SW,W
        if (y % 2 === 0) {
            return [[x, y - 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x - 1, y]];
        }
        else {
            return [[x - 1, y - 1], [x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y + 1], [x - 1, y]];
        }
    }
    HexFunction.neighbors = neighbors;
    // reihenfolge NW,NO,O,SO,SW,W, 0 heißt kein fluss, 1 heißt fluss
    function fluesse(x, y) {
        var flussAcc = [0, 0, 0, 0, 0, 0];
        var surroundings = neighbors(x, y);
        for (var i = 0; i < rivers.length; i++) {
            var river = rivers[i];
            if ((x === river[0][0] && y === river[0][1]) || (x === river[1][0] && y === river[1][1])) {
                for (var j = 0; j < surroundings.length; j++) {
                    if ((surroundings[j][0] === river[0][0] && surroundings[j][1] === river[0][1]) || (surroundings[j][0] === river[1][0] && surroundings[j][1] === river[1][1])) {
                        flussAcc[j] = 1;
                    }
                }
            }
        }
        return flussAcc;
    }
    HexFunction.fluesse = fluesse;
    // where in the field list is this field
    function positionInList(x, y) {
        for (var i = 0; i < fields.length; i++) {
            if ((fields[i].x === x) && (fields[i].y === y)) {
                return i;
            }
        }
        return -1;
    }
    HexFunction.positionInList = positionInList;
    // what type is this field
    function fieldType(x, y) {
        for (var i = 0; i < fields.length; i++) {
            if ((fields[i].x === x) && (fields[i].y === y)) {
                return fields[i].type;
            }
        }
        return -1;
    }
    HexFunction.fieldType = fieldType;
    // what height is this field
    function height(x, y) {
        switch (fieldType(x, y)) {
            case 0:
            case 1: return 0;
            case 2:
            case 7:
            case 8:
            case 3: return 1;
            case 4: return 2;
            case 5: return 3;
            case 6: return 4;
        }
        return -1;
    }
    HexFunction.height = height;
    //reihenfolge NW,NO,O,SO,SW,W
    //returns the number value corresponting to the direction. if it has a .5 it is 
    function getDirectionToNeighbor(fromX, fromY, toX, toY) {
        if (distance(fromX, fromY, toX, toY) === 1) {
            var possibleDir = neighbors(fromX, fromY);
            for (var i = 0; i < possibleDir.length; i++) {
                if (possibleDir[i][0] == toX && possibleDir[i][1] === toY)
                    return i;
            }
        }
        else if (distance(fromX, fromY, toX, toY) === 2) {
            var targetNeighbors = neighbors(toX, toY);
            var originNeighbors = neighbors(fromX, fromY);
            var foundNeigh = false;
            var direction = -1;
            for (var j = 0; j < targetNeighbors.length; j++) {
                for (var k = 0; k < originNeighbors.length; k++) {
                    if (targetNeighbors[j][0] === originNeighbors[k][0] && targetNeighbors[j][1] === originNeighbors[k][1]) {
                        if (foundNeigh === false) {
                            foundNeigh = true;
                            direction = k;
                        }
                        else {
                            direction -= 0.5;
                        }
                    }
                }
            }
            return direction;
        }
        return -1; //in case the to field is not a neighbor
    }
    HexFunction.getDirectionToNeighbor = getDirectionToNeighbor;
    //returns the distance from here to target Hex
    //to properly do this we use a 3D/Cube coordinate system as described at
    //https://www.redblobgames.com/grids/hexagons/
    function distance(originX, originY, toX, toY) {
        //this is the cube coordinates for the current Hex
        var thisCubeX = originX - (originY + (originY & 1)) / 2;
        var thisCubeZ = originY;
        var thisCubeY = -thisCubeX - thisCubeZ;
        //this is the cube coordinates for the current Hex
        var targetCubeX = toX - (toY + (toY & 1)) / 2; //bitwise & as an alternative to modulo that works without exceptions(negative numbers)
        var targetCubeZ = toY;
        var targetCubeY = -targetCubeX - targetCubeZ;
        return Math.max(Math.abs(thisCubeX - targetCubeX), Math.abs(thisCubeY - targetCubeY), Math.abs(thisCubeZ - targetCubeZ));
    }
    HexFunction.distance = distance;
    function neighborInRange(x, y, range) {
        var neighbors = [];
        for (var i = x - range; i <= x + range; i++) {
            for (var j = y - range; j <= y + range; j++) {
                var dist = distance(x, y, i, j);
                if (i != x || j != y) {
                    if (dist <= range) {
                        neighbors.push([i, j]);
                    }
                }
            }
        }
        return neighbors;
    }
    HexFunction.neighborInRange = neighborInRange;
    function findCommonNeighbor(fromX, fromY, toX, toY) {
        var targetNeighbors = neighbors(toX, toY);
        var originNeighbors = neighbors(fromX, fromY);
        var foundCommon = [];
        for (var j = 0; j < targetNeighbors.length; j++) {
            for (var k = 0; k < originNeighbors.length; k++) {
                if (targetNeighbors[j][0] == originNeighbors[k][0] && targetNeighbors[j][1] == originNeighbors[k][1]) {
                    foundCommon.push(targetNeighbors[j]);
                }
            }
        }
        return foundCommon;
    }
    HexFunction.findCommonNeighbor = findCommonNeighbor;
    // does the field has a street on it in any direction
    function hasStreet(x, y) {
        return buildings.some(function (elem) { return elem.type === 8 && ((elem.firstX === x && elem.firstY === y) ||
            (elem.secondX === x && elem.secondY === y)); });
    }
    HexFunction.hasStreet = hasStreet;
    // in which directions does this field have walls (order as above, only walls build on this field)
    function walls(x, y) {
        var result = [0, 0, 0, 0, 0, 0];
        var walls = buildings.filter(function (elem) { return (elem.type === 5 && elem.x === x && elem.y === y); });
        walls.forEach(function (wall) {
            switch (wall.direction) {
                case "nw":
                    result[0] = 1;
                    break;
                case "ne":
                    result[1] = 1;
                    break;
                case "e":
                    result[2] = 1;
                    break;
                case "se":
                    result[3] = 1;
                    break;
                case "se":
                    result[4] = 1;
                    break;
                case "w":
                    result[5] = 1;
                    break;
            }
        });
        return result;
    }
    HexFunction.walls = walls;
    // in which directions does this field have bridges (order as above)
    function bridges(x, y) {
        var result = [0, 0, 0, 0, 0, 0];
        var neighbor = neighbors(x, y);
        var bridges = buildings.forEach(function (elem) {
            if (elem.type === 7) {
                if (elem.x === x && elem.y === y) {
                    switch (elem.direction) {
                        case "nw":
                            result[0] = 1;
                            break;
                        case "ne":
                            result[1] = 1;
                            break;
                        case "e":
                            result[2] = 1;
                            break;
                        case "se":
                            result[3] = 1;
                            break;
                        case "se":
                            result[4] = 1;
                            break;
                        case "w":
                            result[5] = 1;
                            break;
                    }
                }
                else {
                    neighbor.forEach(function (val, index) {
                        if (val[0] === elem.x && val[1] === elem.y) {
                            switch (index) {
                                case 0:
                                    elem.direction === "se" ? result[0] = 1 : 0;
                                    break;
                                case 1:
                                    elem.direction === "sw" ? result[1] = 1 : 0;
                                    break;
                                case 2:
                                    elem.direction === "w" ? result[2] = 1 : 0;
                                    break;
                                case 3:
                                    elem.direction === "nw" ? result[3] = 1 : 0;
                                    break;
                                case 4:
                                    elem.direction === "ne" ? result[4] = 1 : 0;
                                    break;
                                case 5:
                                    elem.direction === "e" ? result[5] = 1 : 0;
                                    break;
                            }
                        }
                    });
                }
            }
        });
        return result;
    }
    HexFunction.bridges = bridges;
    // does the field has a street on it in any direction
})(HexFunction || (HexFunction = {}));
