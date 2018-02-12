// contains helper functions to get information about a field out of the fields array with just its coordinates.

// this.id = function(){
//     //TODO: GroßhexKleinhex Zahl bestimmen.
// }
namespace HexFunction {

    // returns the fields neighbors in the usual order
    export function neighbors(hex: [number, number]): [number, number][] {
        //usual order: NW,NO,O,SO,SW,W
        if (hex[1] % 2 === 0) {
            return [[hex[0], hex[1]-1], [hex[0]+1, hex[1]-1], [hex[0]+1, hex[1]],
                [hex[0]+1, hex[1]+1], [hex[0], hex[1]+1], [hex[0]-1, hex[1]]];
        } else {
            return [[hex[0]-1, hex[1]-1], [hex[0], hex[1]-1], [hex[0]+1, hex[1]],
                [hex[0], hex[1]+1], [hex[0]-1, hex[1]+1], [hex[0]-1, hex[1]]];
        }
    }

    // order: NW,NO,O,SO,SW,W,
    export function fluesse(hex: [number, number]): boolean[] {
        let result = [false, false, false, false, false, false];
        let surroundings = neighbors(hex);
        for (let i = 0; i < GameState.rivers.length; i++) {
            let river: River = rivers[i];
            if ((hex[0] === river.leftBank[0] && hex[1] === river.leftBank[1]) ||
                (hex[0] === river.rightBank[0] && hex[1] === river.rightBank[1])) {
                for (let j = 0; j < surroundings.length; j++) {
                    if ((surroundings[j][0] === river.leftBank[0] && surroundings[j][1] === river.leftBank[1]) ||
                        (surroundings[j][0] === river.rightBank[0] && surroundings[j][1] === river.rightBank[1])) {
                        result[j] = true;
                    }
                }
            }
        }
        return result;
    }

    // where in the field list is this field
    export function positionInList(hex: [number, number]): number {
        return GameState.fields.findIndex(field => field[0] === hex[0] && field[1] === hex[1]);
    }

    // what type is this field
    export function fieldType(hex: [number, number]): FieldType {
        let field: Field = GameState.fields.find(field => field[0] === hex[0] && field[1] === hex[1]);
        return (field != undefined)?field.type:-1;
    }

    // what height is this field
    export function height(hex: [number, number]): number {
        let field: Field = GameState.fields.find(field => field[0] === hex[0] && field[1] === hex[1]);
        return (field != undefined)?field.getHeight():-1;
    }

    //order: NW,NO,O,SO,SW,W
    //returns the number value corresponting to the direction. if it has a .5 it is 
    export function getDirectionToNeighbor(from: [number, number], to: [number, number]): number {
        if (distance(from, to) === 1) {
            let possibleDir = neighbors(from);
            for (let i = 0; i < possibleDir.length; i++) {
                if (possibleDir[i][0] == to[0] && possibleDir[i][1] === to[1])
                    return i;
            }
        } else if (distance(from, to) === 2) {
            let targetNeighbors = neighbors(to);
            let originNeighbors = neighbors(from);
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
    export function distance(origin: [number, number], to: [number, number]): number {
        //this is the cube coordinates for the current Hex
        let thisCubeX = origin[0] - (origin[1] + (origin[1] & 1)) / 2;
        let thisCubeZ = origin[1];
        let thisCubeY = - thisCubeX - thisCubeZ;

        //this is the cube coordinates for the current Hex
        let targetCubeX = to[0] - (to[1] + (to[1] & 1)) / 2;//bitwise & as an alternative to modulo that works without exceptions(negative numbers)
        let targetCubeZ = to[1];
        let targetCubeY = - targetCubeX - targetCubeZ;

        return Math.max(Math.abs(thisCubeX - targetCubeX), Math.abs(thisCubeY - targetCubeY), Math.abs(thisCubeZ - targetCubeZ));
    }

    export function neighborInRange(hex: [number, number], range: number): [number, number][] {
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


    export function findCommonNeighbor(from: [number, number], to: [number, number]): [number, number][] {
        let targetNeighbors = neighbors(to);
        let originNeighbors = neighbors(from);
        let foundCommon = [];
        for (let j = 0; j < targetNeighbors.length; j++) {
            for (let k = 0; k < originNeighbors.length; k++) {
                if (targetNeighbors[j][0] === originNeighbors[k][0] && targetNeighbors[j][1] === originNeighbors[k][1]) {
                    foundCommon.push(targetNeighbors[j]);
                }
            }
        }
        return foundCommon;
    }

    // does the field has a street on it in any direction
    export function hasStreet(hex: [number, number]): boolean {
        return buildings.some((elem) => elem.type === 8 && ((elem.firstX === hex[0] && elem.firstY === hex[1]) ||
            (elem.secondX === hex[0] && elem.secondY === hex[1])));
    }

    // in which directions does this field have walls (order as above, only walls build on this field)
    export function walls(hex: [number, number]): boolean[] {
        let result = [false, false, false, false, false, false];
        let walls = GameState.buildings.filter(elem => (elem instanceof Wall &&
            elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]));
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
    export function bridges(hex: [number, number]): boolean[] {
        let result = [false, false, false, false, false, false];
        let neighbor = neighbors(hex);
        buildings.forEach(elem => {
            if (elem.type === BuildingType.BRIDGE) {//bridge type
                if (elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]) {//bridge on this field
                    result[neighbor.indexOf((elem as NonDestructibleBuilding).getSecondPosition())] = true;
                } else if ((elem as NonDestructibleBuilding).getSecondPosition()[0] === hex[0] &&
                    elem.getSecondPosition()[1] === hex[1]) {
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