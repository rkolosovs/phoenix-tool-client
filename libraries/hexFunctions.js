// contains helper functions to get information about a field out of the fields array with just its coordinates.
function showHex(positionX, positionY) {
    this.id = function(){
		//TODO: GroßhexKleinhex Zahl bestimmen.
	}

	// reihenfolge NW,NO,O,SO,SW,W, 0 heißt kein fluss, 1 heißt fluss
    this.fluesse = function(x,y) {
		var flussAcc = [0,0,0,0,0,0];
		var surroundings = this.neighbors(x,y);
        for (var i = 0; i < rivers.length; i++) {
			var river = rivers[i];
			if((x == river[1][1] && y == river[1][2]) || (x == river[2][1] && y == river[2][2])){
				for(var j = 0; j < surroundings.length; j++){
					if((surroundings[j][1] == river[1][1] && surroundings[j][2] == river[1][2]) || (surroundings[j][1] == river[2][1] && surroundings[j][2] == river[2][2])){
						flussAcc[j] = 1;
					}
				}
			}
    	}
		return flussAcc;
	}
    // where in the field list is this field
    this.positionInList = function(x,y){
        for (var i = 0; i < fields.length; i++) {
			if((fields[i].x == x) && (fields[i].y == y)){return i;}
		}
    }
    // what type is this field
	this.fieldType = function(x,y){
		for (var i = 0; i < fields.length; i++) {
			if((fields[i].x == x) && (fields[i].y == y)){return fields[i].type;}
		}
	}
    // what height is this field
    this.height = function(x,y){
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
    // returns the fields neighbors in the usual order
	this.neighbors = function(x,y){
		//reihenfolge NW,NO,O,SO,SW,W
		if(y % 2 == 0){
			return [[x,y-1], [x+1,y-1], [x+1,y], [x+1,y+1], [x,y+1], [x-1,y]];
		} else {
			return [[x-1,y-1], [x,y-1], [x+1,y], [x,y+1], [x-1,y+1], [x-1,y]];
		}
    }
    //returns the distance from here to target Hex
    //to properly do this we use a 3D/Cube coordinate system as described at
    //https://www.redblobgames.com/grids/hexagons/
    this.distance = function(originX, originY, toX, toY){
        //this is the cube coordinates for the current Hex
        let thisCubeX = originX - (originY + (originY&1)) / 2;
        let thisCubeZ = originY;
        let thisCubeY = - thisCubeX - thisCubeZ;

        //this is the cube coordinates for the current Hex
        let targetCubeX = toX - (toY + (toY&1)) / 2;
        let targetCubeZ = toY;
        let targetCubeY = - targetCubeX - targetCubeZ;

        return Math.max(Math.abs(thisCubeX - targetCubeX),Math.abs(thisCubeY - targetCubeY),Math.abs(thisCubeZ - targetCubeZ));
    }

    this.neighborInRange = function(x,y,range){
        let neighbors = [];
        for(var i = x - range; i <= x + range; i++){
            for(var j = y - range; j <= y + range; j++){
                let dist = this.distance(x,y,i,j);
                if(i != x || j != y){
                    if(dist <= range){
                        neighbors.push([i,j]);
                    }
                }
            }
        }
        return neighbors;
    }
}