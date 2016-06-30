function armyCoordinates(army, coordX, coordY) {
    this.a = army;
    this.x = coordX;
    this.y = coordY;
    this.remainingMovePoints = 9;
    // direction as a number, 0 = NW, 1 = NO, 2 = O, 3 = SO, 4 = SW, 5 = W
    this.move = function(direction) {
        var destination = showHex(this.x, this.y);
        var neighborCoords = destination.neighbors();
        var target = showHex(targetCoords[direction][0],targetCoords[direction][1]);
        if(this.a.lkp == 0 && this.a.skp == 0){
            switch(target.fieldType()){
                case 0:
                case 1: return "You can't walk on Water.";
                case 2:
                case 4:
                case 7:
                case 5:
                case 6:
                case 3:
                case 8: if(this.remainingMovePoints >= 4 ){
                    this.remainingMovePoints -= 4;
                    this.x = target.x;
                    this.y = target.y;
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            }
        } else {return "not yet implemented";}
    }
}

function showHex(positionX, positionY) {
    this.id = function(){
		//TODO: GroßhexKleinhex Zahl bestimmen.
	}
    this.x = positionX;
    this.y = positionY;
	// reihenfolge NW,NO,O,SO,SW,W, 0 heißt kein fluss, 1 heißt fluss
    this.fluesse = function() {
		var flussAcc = [0,0,0,0,0,0];
		var surroundings = this.neighbors();
        for (var i = 0; i < rivers.length; i++) {
			var river = rivers[i];
			if((this.x == river[1][1] && this.y == river[1][2]) || (this.x == river[2][1] && this.y == river[2][2])){
				for(var j = 0; j < surroundings.length; j++){
					if((surroundings[j][1] == river[1][1] && surroundings[j][2] == river[1][2]) || (surroundings[j][1] == river[2][1] && surroundings[j][2] == river[2][2])){
						flussAcc[j] = 1;
					}
				}
			}
    	}
		return flussAcc;
	}
	this.fieldType = function(){
		for (var i = 0; i < fields.length; i++) {
			if((fields[i].x == this.x) && (fields[i].y == this.y)){return fields[i].type;}
		}
	}
	this.neighbors = function(){
		//reihenfolge NW,NO,O,SO,SW,W
		if(this.y % 2 == 0){
			return [[this.x,this.y-1],[this.x+1,this.y-1],[this.x+1,this.y],[this.x+1,this.y+1],[this.x,this.y+1],[this.x-1,this.y]];
		} else {
			return [[this.x-1,this.y-1],[this.x,this.y-11],[this.x+1,this.y],[this.x,this.y+1],[this.x-1,this.y+1],[this.x-1,this.y]];
		}
	}
}