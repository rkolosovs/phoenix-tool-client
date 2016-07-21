function armyCoordinates(army, coordX, coordY, owner) {
    this.a = army;
    this.x = coordX;
    this.y = coordY;
    this.owner = owner;
    this.remainingMovePoints = 0;
    this.setRemainingMovePoints = function(points){
        this.remainingMovePoints = points;
    }
    // direction as a number, 0 = NW, 1 = NO, 2 = O, 3 = SO, 4 = SW, 5 = W
    //TODO: Alles was nicht standart Bewegung auf ein benachbartes Feld ist.
    this.move = function(direction) {
        var destination = new showHex(this.x, this.y);
        var neighborCoords = destination.neighbors();
        var target = new showHex(neighborCoords[direction][0],neighborCoords[direction][1]);
        if(Math.floor(this.a.armyId / 100) == 3){
            switch(target.fieldType()){
                case 0: 
                    if(this.a.lkp == 0 && this.a.skp == 0){
                        if(this.remainingMovePoints >= 12 ){
                            this.remainingMovePoints -= 12;
                            this.x = target.x;
                            this.y = target.y;
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.skp != 0){
                        if(this.remainingMovePoints >= 21 ){
                            this.remainingMovePoints -= 21;
                            this.x = target.x;
                            this.y = target.y;
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.lkp != 0){
                        if(this.remainingMovePoints >= 21 ){
                            this.remainingMovePoints -= 21;
                            this.x = target.x;
                            this.y = target.y;
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    }
                case 1: 
                    if(this.a.lkp == 0 && this.a.skp == 0){
                        if(this.remainingMovePoints >= 7 ){
                            this.remainingMovePoints -= 7;
                            this.x = target.x;
                            this.y = target.y;
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.skp != 0){
                        if(this.remainingMovePoints >= 10 ){
                            this.remainingMovePoints -= 10;
                            this.x = target.x;
                            this.y = target.y;
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.lkp != 0){
                        if(this.remainingMovePoints >= 8 ){
                            this.remainingMovePoints -= 8;
                            this.x = target.x;
                            this.y = target.y;
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    }
                case 2:
                case 4:
                case 7:
                case 5:
                case 6:
                case 3:
                case 8: return "You can't drive your ships up land." // can't
            }
        } else if(Math.floor(this.a.armyId / 100) == 2){
            switch(target.fieldType()){
                case 0:
                case 1: return "You can't walk on Water."; // can't
                case 2:
                case 4:
                case 7: if(this.remainingMovePoints >= 7 ){// 7
                    this.remainingMovePoints -= 7;
                    this.x = target.x;
                    this.y = target.y;
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 5: if(this.remainingMovePoints >= 21 ){// 21
                    this.remainingMovePoints -= 21;
                    this.x = target.x;
                    this.y = target.y;
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 6: return "Cavalry can not move through the mountains. "// can't
                case 3:
                case 8: if(this.remainingMovePoints >= 10 ){// 10
                    this.remainingMovePoints -= 10;
                    this.x = target.x;
                    this.y = target.y;
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            }
        } else if(Math.floor(this.a.armyId / 100) == 1){
            switch(target.fieldType()){
                case 0:
                case 1: return "You can't walk on Water.";
                case 2:
                case 4:
                case 7: if(this.remainingMovePoints >= 7 ){
                    this.remainingMovePoints -= 7;
                    this.x = target.x;
                    this.y = target.y;
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 5: if(this.a.skp != 0){
                    return "You you need streets to move heavy catapults into the highlands.";
                } if(this.remainingMovePoints >= 7 ){
                    this.remainingMovePoints -= 7;
                    this.x = target.x;
                    this.y = target.y;
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 6: if(this.a.lkp != 0 || this.a.skp != 0){
                    return "You can't move into the mountains with catapults.";
                }
                case 3:
                case 8: if(this.a.skp != 0){
                    return "You can't move into deserts or swamps with heavy catapults unless you have streets.";
                } else if(this.remainingMovePoints >= 7 ){
                    this.remainingMovePoints -= 7;
                    this.x = target.x;
                    this.y = target.y;
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            }
        }
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
			return [[this.x-1,this.y-1],[this.x,this.y-1],[this.x+1,this.y],[this.x,this.y+1],[this.x-1,this.y+1],[this.x-1,this.y]];
		}
	}
}