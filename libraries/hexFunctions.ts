// contains helper functions to get information about a field out of the fields array with just its coordinates.

// this.id = function(){
//     //TODO: GroßhexKleinhex Zahl bestimmen.
// }
import {Direction} from "../map/direction";

export namespace HexFunction {

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

    // where in the field list is this field
    export function positionInList(hex: [number, number]): number {
        return GameState.fields.findIndex(field =>
            field.coordinates[0] === hex[0] && field.coordinates[1] === hex[1]);
    }

    // what type is this field
    export function fieldType(hex: [number, number]): FieldType {
        let foundField: Field|undefined = GameState.fields.find(field => field.coordinates[0] === hex[0] &&
            field.coordinates[1] === hex[1]);
        return (foundField != undefined)?foundField.type:-1;
    }

    // what height is this field
    export function height(hex: [number, number]): number {
        let field: Field|undefined = GameState.fields.find(field =>
            field.coordinates[0] === hex[0] && field.coordinates[1] === hex[1]);
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
        //bitwise & as an alternative to modulo that works without exceptions(negative numbers)
        let targetCubeX = to[0] - (to[1] + (to[1] & 1)) / 2;
        let targetCubeZ = to[1];
        let targetCubeY = - targetCubeX - targetCubeZ;

        return Math.max(Math.abs(thisCubeX - targetCubeX), Math.abs(thisCubeY - targetCubeY),
            Math.abs(thisCubeZ - targetCubeZ));
    }

    export function neighborInRange(hex: [number, number], range: number): [number, number][] {
        let neighbors: [number, number][] = [];
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
        let foundCommon: [number, number][] = [];
        targetNeighbors.forEach(targetNeighbor => {
            originNeighbors.forEach(originNeighbor => {
                if (targetNeighbor[0] === originNeighbor[0] && targetNeighbor[1] === originNeighbor[1]) {
                    foundCommon.push(targetNeighbor);
                }
            });
        });
        return foundCommon;
    }

    // does the field has a street on it in any direction
    export function hasStreet(hex: [number, number]): boolean {
        return GameState.buildings.some((elem) => elem.type === BuildingType.STREET &&
            ((elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]) ||
                ((elem as NonDestructibleBuilding).getSecondPosition()[0] === hex[0] &&
                    (elem as NonDestructibleBuilding).getSecondPosition()[1] === hex[1])));
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
        GameState.buildings.forEach(elem => {
            if (elem.type === BuildingType.BRIDGE) {//bridge type
                if (elem.getPosition()[0] === hex[0] && elem.getPosition()[1] === hex[1]) {//bridge on this field
                    result[neighbor.indexOf((elem as NonDestructibleBuilding).getSecondPosition())] = true;
                } else if ((elem as NonDestructibleBuilding).getSecondPosition()[0] === hex[0] &&
                    (elem as NonDestructibleBuilding).getSecondPosition()[1] === hex[1]) {
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

    //computes a fields position (upper left corner of inscribing rectangle)
    export function computePosition(orig: [number, number], curr: [number, number], scale: number): [number,  number] {
        //get the current field's x position
        let xpos = orig[0] + (curr[0] * scale * SIN60);
        //each odd row is offset half a hex to the left
        return [ (((curr[1]%2)!==0)?(xpos - (0.5*scale*SIN60)):(xpos)), orig[1]+(curr[1] * Drawing.gH)];
    }

    //for all directions in the usual order (nw, ne, e, se, sw, w)
    //returns true if candidates contains the neighbor of field in the respective direction
    export function getAdjacency(field: [number, number], candidates: [number, number][]): boolean[] {
        let result: boolean[] = [false, false, false, false, false, false];
        let neighbors: [number, number][] = HexFunction.neighbors(field);
        neighbors.forEach((neighbor, neighborIndex) =>
            result[neighborIndex] = candidates.some(
                candidate => candidate[0] === neighbor[0] && candidate[1] === neighbor[1]));
        return result;
    }
}