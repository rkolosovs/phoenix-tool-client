// contains helper functions to get information about a field out of the fields array with just its coordinates.

// this.id = function(){
//     //TODO: GroßhexKleinhex Zahl bestimmen.
// }
namespace HexFunction {

    // returns the fields neighbors in the usual order
    export function neighbors(x: number, y: number): [number, number][] {
        //reihenfolge NW,NO,O,SO,SW,W
        if (y % 2 === 0) {
            return [[x, y - 1], [x + 1, y - 1], [x + 1, y], [x + 1, y + 1], [x, y + 1], [x - 1, y]];
        } else {
            return [[x - 1, y - 1], [x, y - 1], [x + 1, y], [x, y + 1], [x - 1, y + 1], [x - 1, y]];
        }
    }

    // reihenfolge NW,NO,O,SO,SW,W,
    export function fluesse(x: number, y: number): boolean[] {
        let flussAcc = [false, false, false, false, false, false];
        let surroundings = neighbors(x, y);
        for (let i = 0; i < GameState.rivers.length; i++) {
            let river: River = rivers[i];
            if ((x === river.leftBank[0] && y === river.leftBank[1]) || (x === river.rightBank[0] && y === river.rightBank[1])) {
                for (let j = 0; j < surroundings.length; j++) {
                    if ((surroundings[j][0] === river.leftBank[0] && surroundings[j][1] === river.leftBank[1]) ||
                        (surroundings[j][0] === river.rightBank[0] && surroundings[j][1] === river.rightBank[1])) {
                        flussAcc[j] = true;
                    }
                }
            }
        }
        return flussAcc;
    }
    // where in the field list is this field
    export function positionInList(x: number, y: number): number {
        for (var i = 0; i < GameState.fields.length; i++) {
            if ((GameState.fields[i].coordinates[0] === x) && (GameState.fields[i].coordinates[1] === y)) { return i; }
        }
        return -1;
    }
    // what type is this field
    export function fieldType(x: number, y: number): FieldType {
        for (var i = 0; i < GameState.fields.length; i++) {
            if ((GameState.fields[i].coordinates[0] === x) && (GameState.fields[i].coordinates[1] === y)) {
                return GameState.fields[i].type;
            }
        }
        return -1;
    }
    // what height is this field
    export function height(x: number, y: number): number {
        for (var i = 0; i < GameState.fields.length; i++) {
            if ((GameState.fields[i].coordinates[0] === x) && (GameState.fields[i].coordinates[1] === y)) {
                return GameState.fields[i].getHeight();
            }
        }
        return -1;
    }

    //reihenfolge NW,NO,O,SO,SW,W
    //returns the number value corresponting to the direction. if it has a .5 it is 
    export function getDirectionToNeighbor(fromX: number, fromY: number, toX: number, toY: number): number {
        if (distance(fromX, fromY, toX, toY) === 1) {
            let possibleDir = neighbors(fromX, fromY);
            for (let i = 0; i < possibleDir.length; i++) {
                if (possibleDir[i][0] == toX && possibleDir[i][1] === toY)
                    return i;
            }
        } else if (distance(fromX, fromY, toX, toY) === 2) {
            let targetNeighbors = neighbors(toX, toY);
            let originNeighbors = neighbors(fromX, fromY);
            let foundNeigh = false;
            let direction = -1;
            for (let j = 0; j < targetNeighbors.length; j++) {
                for (let k = 0; k < originNeighbors.length; k++) {
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
        return -1;//in case the to field is not a neighbor
    }

    //returns the distance from here to target Hex
    //to properly do this we use a 3D/Cube coordinate system as described at
    //https://www.redblobgames.com/grids/hexagons/
    export function distance(originX: number, originY: number, toX: number, toY: number): number {
        //this is the cube coordinates for the current Hex
        let thisCubeX = originX - (originY + (originY & 1)) / 2;
        let thisCubeZ = originY;
        let thisCubeY = - thisCubeX - thisCubeZ;

        //this is the cube coordinates for the current Hex
        let targetCubeX = toX - (toY + (toY & 1)) / 2;//bitwise & as an alternative to modulo that works without exceptions(negative numbers)
        let targetCubeZ = toY;
        let targetCubeY = - targetCubeX - targetCubeZ;

        return Math.max(Math.abs(thisCubeX - targetCubeX), Math.abs(thisCubeY - targetCubeY), Math.abs(thisCubeZ - targetCubeZ));
    }

    export function neighborInRange(x: number, y: number, range: number): [number, number][] {
        let neighbors = [];
        for (var i = x - range; i <= x + range; i++) {
            for (var j = y - range; j <= y + range; j++) {
                let dist = distance(x, y, i, j);
                if (i != x || j != y) {
                    if (dist <= range) {
                        neighbors.push([i, j]);
                    }
                }
            }
        }
        return neighbors;
    }


    export function findCommonNeighbor(fromX: number, fromY: number, toX: number, toY: number): [number, number][] {
        let targetNeighbors = neighbors(toX, toY);
        let originNeighbors = neighbors(fromX, fromY);
        let foundCommon = [];
        for (let j = 0; j < targetNeighbors.length; j++) {
            for (let k = 0; k < originNeighbors.length; k++) {
                if (targetNeighbors[j][0] == originNeighbors[k][0] && targetNeighbors[j][1] == originNeighbors[k][1]) {
                    foundCommon.push(targetNeighbors[j]);
                }
            }
        }
        return foundCommon;
    }

    // does the field has a street on it in any direction
    export function hasStreet(x: number, y: number): boolean {
        return buildings.some((elem) => elem.type === 8 && ((elem.firstX === x && elem.firstY === y) ||
            (elem.secondX === x && elem.secondY === y)));
    }

    // in which directions does this field have walls (order as above, only walls build on this field)
    export function walls(x: number, y: number): boolean[] {
        let result = [false, false, false, false, false, false];
        let walls = GameState.buildings.filter(elem => (elem instanceof Wall &&
            elem.getPosition()[0] === x && elem.getPosition()[1] === y));
        walls.forEach(wall => {
            switch ((wall as Wall).facing) {
                case Direction.NW: result[0] = true; break;
                case Direction.NE: result[1] = true; break;
                case Direction.E: result[2] = true; break;
                case Direction.SE: result[3] = true; break;
                case Direction.SW: result[4] = true; break;
                case Direction.W: result[5] = true; break;
            }
        });
        return result;
    }
    // in which directions does this field have bridges (order as above)
    export function bridges(x: number, y: number): boolean[] {
        let result = [false, false, false, false, false, false];
        let neighbor = neighbors(x, y);
        buildings.forEach(elem => {
            if (elem.type === BuildingType.BRIDGE) {//bridge type
                if (elem.getPosition()[0] === x && elem.getPosition()[1] === y) {//bridge on this field
                    result[neighbor.indexOf((elem as NonDestructibleBuilding).getSecondPosition())] = true;
                } else if ((elem as NonDestructibleBuilding).getSecondPosition()[0] === x &&
                    elem.getSecondPosition()[1] === y) {
                    result[neighbor.indexOf((elem as NonDestructibleBuilding).getPosition())] = true;
                }
            }
        });
        return result;
    }

    export function reverseDirection(direction: Direction): Direction {
        switch(direction){
            case Direction.NW: return Direction.SE;
            case Direction.NE: return Direction.SW;
            case Direction.E: return Direction.W;
            case Direction.SE: return Direction.NW;
            case Direction.SW: return Direction.NE;
            case Direction.W: return Direction.E;
            default: return Direction.SE; //TODO: Shouldn't this throw an error?
        }
    }
}