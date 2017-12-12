// contains helper functions to get information about a field out of the fields array with just its coordinates.

// this.id = function(){
//     //TODO: GroßhexKleinhex Zahl bestimmen.
// }

// returns the fields neighbors in the usual order
function neighbors(x,y){
    //reihenfolge NW,NO,O,SO,SW,W
    if(y % 2 == 0){
        return [[x,y-1], [x+1,y-1], [x+1,y], [x+1,y+1], [x,y+1], [x-1,y]];
    } else {
        return [[x-1,y-1], [x,y-1], [x+1,y], [x,y+1], [x-1,y+1], [x-1,y]];
    }
}

// reihenfolge NW,NO,O,SO,SW,W, 0 heißt kein fluss, 1 heißt fluss
function fluesse(x,y) {
    var flussAcc = [0,0,0,0,0,0];
    var surroundings = neighbors(x,y);
    for (var i = 0; i < rivers.length; i++) {
        var river = rivers[i];
        if((x == river[0][1] && y == river[0][2]) || (x == river[1][1] && y == river[1][2])){
            for(var j = 0; j < surroundings.length; j++){
                if((surroundings[j][1] == river[0][1] && surroundings[j][2] == river[0][2]) || (surroundings[j][1] == river[1][1] && surroundings[j][2] == river[1][2])){
                    flussAcc[j] = 1;
                }
            }
        }
    }
    return flussAcc;
}
// where in the field list is this field
function positionInList(x,y){
    for (var i = 0; i < fields.length; i++) {
        if((fields[i].x == x) && (fields[i].y == y)){return i;}
    }
}
// what type is this field
function fieldType(x,y){
    for (var i = 0; i < fields.length; i++) {
        if((fields[i].x == x) && (fields[i].y == y)){return fields[i].type;}
    }
}
// what height is this field
function height(x,y){
    switch(this.fieldType(x,y)){
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
}

//reihenfolge NW,NO,O,SO,SW,W
//returns the number value corresponting to the direction. if it has a .5 it is 
function getDirectionToNeighbor(fromX, fromY, toX, toY){
    if(distance(fromX, fromY, toX, toY) === 1){
        let possibleDir = neighbors(fromX, fromY);
        for(let i = 0; i < possibleDir.length; i++){
            if(possibleDir[i][0] == toX && possibleDir[i][1] == toY)
                return i;
        }
    } else if(distance(fromX, fromY, toX, toY) === 2){
        let targetNeighbors = neighbors(toX, toY);
        let originNeighbors = neighbors(fromX, fromY);
        let foundNeigh = false;
        let direction;
        for(let j = 0; j < targetNeighbors.length; j++){
            for(let k = 0; k < originNeighbors.length; k++){
                if(targetNeighbors[j][0] == originNeighbors[k][0] && targetNeighbors[j][1] == originNeighbors[k][1]){
                    if(foundNeigh === false){
                        foundNeigh = true;
                        direction = k;
                    }
                    else{
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
function distance(originX, originY, toX, toY){
    //this is the cube coordinates for the current Hex
    let thisCubeX = originX - (originY + (originY&1)) / 2;
    let thisCubeZ = originY;
    let thisCubeY = - thisCubeX - thisCubeZ;

    //this is the cube coordinates for the current Hex
    let targetCubeX = toX - (toY + (toY&1)) / 2;//bitwise & as an alternative to modulo that works without exceptions(negative numbers)
    let targetCubeZ = toY;
    let targetCubeY = - targetCubeX - targetCubeZ;

    return Math.max(Math.abs(thisCubeX - targetCubeX),Math.abs(thisCubeY - targetCubeY),Math.abs(thisCubeZ - targetCubeZ));
}

function neighborInRange(x,y,range){
    let neighbors = [];
    for(var i = x - range; i <= x + range; i++){
        for(var j = y - range; j <= y + range; j++){
            let dist = distance(x,y,i,j);
            if(i != x || j != y){
                if(dist <= range){
                    neighbors.push([i,j]);
                }
            }
        }
    }
    return neighbors;
}


function findCommonNeighbor(fromX, fromY, toX, toY){
    let targetNeighbors = neighbors(toX, toY);
    let originNeighbors = neighbors(fromX, fromY);
    let foundCommon = [];
    for(let j = 0; j < targetNeighbors.length; j++){
        for(let k = 0; k < originNeighbors.length; k++){
            if(targetNeighbors[j][0] == originNeighbors[k][0] && targetNeighbors[j][1] == originNeighbors[k][1]){
                foundCommon.push(targetNeighbors[j]);
            }
        }
    }
    return foundCommon;
}

// does the field has a street on it in any direction
function hasStreet(x,y) {
    return buildings.some((elem) => elem.type === 8 && ((elem.firstX === x && elem.firstY === y) ||
        (elem.secondX === x && elem.secondY === y)));
}

// in which directions does this field have walls (order as above, only walls build on this field)
function walls(x,y) {
    let result = [0,0,0,0,0,0];
    let walls = buildings.filter((elem) => (elem.type === 5 && elem.x === x && elem.y === y));
    walls.forEach((wall) => {
        switch(wall.direction){
            case "nw": result[0] = 1; break;
            case "ne": result[1] = 1; break;
            case "e": result[2] = 1; break;
            case "se": result[3] = 1; break;
            case "se": result[4] = 1; break;
            case "w": result[5] = 1; break;
        }
    });
    return result;
}
// in which directions does this field have bridges (order as above)
function bridges(x,y) {
    let result = [0,0,0,0,0,0];
    let neighbor = neighbors(x,y);
    let bridges = buildings.forEach((elem) => {
        if(elem.type === 7){//bridge type
            if(elem.x === x && elem.y === y) {//bridge on this field
                switch(elem.direction){//put into result
                    case "nw": result[0] = 1; break;
                    case "ne": result[1] = 1; break;
                    case "e": result[2] = 1; break;
                    case "se": result[3] = 1; break;
                    case "se": result[4] = 1; break;
                    case "w": result[5] = 1; break;
                }
            } else {
                neighbor.forEach((val, index) => {
                    if(val[0] === elem.x && val[1] === elem.y){//bridge on the neighboring field
                        switch(index){//pointing the right way
                            case 0: elem.direction === "se"?result[0] = 1:0; break;
                            case 1: elem.direction === "sw"?result[1] = 1:0; break;
                            case 2: elem.direction === "w"?result[2] = 1:0; break;
                            case 3: elem.direction === "nw"?result[3] = 1:0; break;
                            case 4: elem.direction === "ne"?result[4] = 1:0; break;
                            case 5: elem.direction === "e"?result[5] = 1:0; break;
                        }
                    }
                });
            }
        }
    });
    return result;
}
// does the field has a street on it in any direction
