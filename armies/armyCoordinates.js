function armyCoordinates(army, coordX, coordY, owner) {
    this.a = army;
    this.x = coordX;
    this.y = coordY;
    this.owner = owner;
    // returns the tag of the owner, not full operational
    // TODO do it right
    this.ownerTag = function(){
        switch(this.owner){
            case 1: return "usa";
            case 3: return "vvh";
            case 4: return "eos";
        }
    }
    this.remainingMovePoints = 300;
    this.setRemainingMovePoints = function(points){
        this.remainingMovePoints = points;
    }
    this.remainingHeightPoints = 30;
    this.setRemainingHeightPoints = function(points){
        this.remainingHeightPoints = points;
    }
    // direction as a number, 0 = NW, 1 = NO, 2 = O, 3 = SO, 4 = SW, 5 = W
    //TODO: Alles was nicht standart Bewegung auf ein benachbartes Feld ist.
    // done streets, height change
    this.conquer = function(direction){
        console.log("check1");
        var found = false;
        for(var i = 0; i<borders.length; i++){
            if (borders[i].tag == this.ownerTag()){
                for(var j = 0; j<borders[i].land.length; j++){
                    if(borders[i].land[j][0]==this.x && borders[i].land[j][1]==this.y){
                        found = true;
                        console.log(found);
                        console.log("checkTrue");
                    }
                }
            } else{
                for(var j = 0; j<borders[i].land.length; j++){
                    if(borders[i].land[j][0]==this.x && borders[i].land[j][1]==this.y){
                        borders[i].land.splice(j,1);
                        console.log("checkRemoved");
                        console.log(borders[i].land);
                    }
                }
            }
        }
        if (found == false){
            for(var i = 0; i<borders.length; i++){
                if (borders[i].tag == this.ownerTag()){
                    borders[i].land.push([this.x,this.y])
                    console.log("check2");
                }
            }
        }
    }
    this.move = function(direction) {
        var destination = new showHex(this.x, this.y);
        var neighborCoords = destination.neighbors();
        var target = new showHex(neighborCoords[direction][0],neighborCoords[direction][1]);
        var changeInHeight = false;
        var thereIsAStreet = false;
        // check if there is a steet on the route
        for(var i = 0; i < buildings.length; i++){
            var building = buildings[i];
            if(building.type == 8){
                if(((building.firstX == this.x && building.firstY == this.y) && (building.secondX == target.x && building.secondY == target.y)) || 
                ((building.secondX == this.x && building.secondY == this.y) && (building.firstX == target.x && building.firstY == target.y))){
                    thereIsAStreet = true;
                    break;
                }
            }
        }
        // check if there is a change in height on the route
        if(destination.height() != target.height()){
            if((destination.height() - target.height()) >= 2 || target.height() - destination.height() >= 2){
                return "The height difference is too big."
            } else if((this.remainingHeightPoints < 2 && !thereIsAStreet)||this.remainingHeightPoints < 1){
                return "No height points left."
            } else {
                changeInHeight = true;
            }
        }
        // ship movement
        if(Math.floor(this.a.armyId / 100) == 3){
            switch(target.fieldType()){
                case 0: 
                    if(this.a.lkp == 0 && this.a.skp == 0){
                        if(this.remainingMovePoints >= 12 ){
                            this.remainingMovePoints -= 12;
                            this.x = target.x;
                            this.y = target.y;
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                            }
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.skp > 0){
                        if(this.remainingMovePoints >= 21 ){
                            this.remainingMovePoints -= 21;
                            this.x = target.x;
                            this.y = target.y;
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                            }
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.lkp > 0){
                        if(this.remainingMovePoints >= 21 ){
                            this.remainingMovePoints -= 21;
                            this.x = target.x;
                            this.y = target.y;
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                            }
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
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                            }
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.skp > 0){
                        if(this.remainingMovePoints >= 10 ){
                            this.remainingMovePoints -= 10;
                            this.x = target.x;
                            this.y = target.y;
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                            }
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.lkp > 0){
                        if(this.remainingMovePoints >= 8 ){
                            this.remainingMovePoints -= 8;
                            this.x = target.x;
                            this.y = target.y;
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                            }
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
        // horse movement
        } else if(Math.floor(this.a.armyId / 100) == 2){
            switch(target.fieldType()){
                case 0:
                case 1: return "You can't walk on Water."; // can't
                case 2:
                case 4:
                case 7: if(thereIsAStreet){
                    if(this.remainingMovePoints >= 4 ){// 4
                        this.remainingMovePoints -= 4;
                        this.x = target.x;
                        this.y = target.y;
                        if(changeInHeight){
                            this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                        }
                        this.conquer(direction);
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.remainingMovePoints >= 7 ){// 7
                    this.remainingMovePoints -= 7;
                    this.x = target.x;
                    this.y = target.y;
                    if(changeInHeight){
                        this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                    }
                    this.conquer(direction);
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 5: if(thereIsAStreet){
                    if(this.remainingMovePoints >= 7 ){// 7
                        this.remainingMovePoints -= 7;
                        this.x = target.x;
                        this.y = target.y;
                        if(changeInHeight){
                            this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                        }
                        this.conquer(direction);
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.remainingMovePoints >= 21 ){// 21
                    this.remainingMovePoints -= 21;
                    this.x = target.x;
                    this.y = target.y;
                    if(changeInHeight){
                        this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                    }
                    this.conquer(direction);
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 6: return "Cavalry can not move through the mountains. "// can't
                case 3:
                case 8: if(thereIsAStreet){
                    if(this.remainingMovePoints >= 5 ){// 5
                        this.remainingMovePoints -= 5;
                        this.x = target.x;
                        this.y = target.y;
                        if(changeInHeight){
                            this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                        }
                        this.conquer(direction);
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.remainingMovePoints >= 10 ){// 10
                    this.remainingMovePoints -= 10;
                    this.x = target.x;
                    this.y = target.y;
                    if(changeInHeight){
                        this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                    }
                    this.conquer(direction);
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            }
        // normal troop movement
        } else if(Math.floor(this.a.armyId / 100) == 1){
            switch(target.fieldType()){
                case 0:
                case 1: return "You can't walk on Water.";
                case 2:
                case 4:
                case 7: if(thereIsAStreet){
                    if(this.remainingMovePoints >= 4){
                    this.remainingMovePoints -= 4;
                    this.x = target.x;
                    this.y = target.y;
                    if(changeInHeight){
                        this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                    }
                    this.conquer(direction);
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                } else if(this.remainingMovePoints >= 7){
                    this.remainingMovePoints -= 7;
                    this.x = target.x;
                    this.y = target.y;
                    if(changeInHeight){
                        this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                    }
                    this.conquer(direction);
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 5: if(thereIsAStreet){
                        if(this.a.skp > 0){
                            if(this.remainingMovePoints >= 7){
                                this.remainingMovePoints -= 7;
                                this.x = target.x;
                                this.y = target.y;
                                if(changeInHeight){
                                    this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                                }
                                this.conquer(direction);
                                return "ok";
                            } else {
                                return "You don't have enough movement Points.";
                            }
                        } if(this.remainingMovePoints >= 4){
                            this.remainingMovePoints -= 4;
                            this.x = target.x;
                            this.y = target.y;
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                            }
                            this.conquer(direction);
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.skp > 0){
                    return "You you need streets to move heavy catapults into the highlands.";
                } if(this.remainingMovePoints >= 7){
                    this.remainingMovePoints -= 7;
                    this.x = target.x;
                    this.y = target.y;
                    if(changeInHeight){
                        this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                    }
                    this.conquer(direction);
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 6: if(thereIsAStreet){
                    if(this.a.skp > 0){
                        return "You can't move into the mountains with heavy catapults.";
                    } else if(this.a.lkp > 0){
                        if(this.remainingMovePoints >= 7 ){
                            this.remainingMovePoints -= 7;
                            this.x = target.x;
                            this.y = target.y;
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                            }
                            this.conquer(direction);
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.remainingMovePoints >= 4 ){
                        this.remainingMovePoints -= 4;
                        this.x = target.x;
                        this.y = target.y;
                        if(changeInHeight){
                            this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                        }
                        this.conquer(direction);
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.a.lkp > 0 || this.a.skp > 0){
                    return "You can't move into the mountains with catapults.";
                }
                case 3:
                case 8: if(thereIsAStreet){
                    if(this.a.skp > 0){
                        if(this.remainingMovePoints >= 7 ){
                            this.remainingMovePoints -= 7;
                            this.x = target.x;
                            this.y = target.y;
                            if(changeInHeight){
                                this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                            }
                            this.conquer(direction);
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.remainingMovePoints >= 4 ){
                        this.remainingMovePoints -= 4;
                        this.x = target.x;
                        this.y = target.y;
                        if(changeInHeight){
                            this.setRemainingHeightPoints(this.remainingHeightPoints - 1);
                        }
                        this.conquer(direction);
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.a.skp > 0){
                    console.log(this.a.skp);
                    return "You can't move into deserts or swamps with heavy catapults unless you have streets.";
                } else if(this.remainingMovePoints >= 7 ){
                    this.remainingMovePoints -= 7;
                    this.x = target.x;
                    this.y = target.y;
                    if(changeInHeight){
                        this.setRemainingHeightPoints(this.remainingHeightPoints - 2);
                    }
                    this.conquer(direction);
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            }
        }
    }
}

// contains helper functions to get information about a field out of the fields array with just its coordinates.
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
    // where in the field list is this field
    this.positionInList = function(){
        for (var i = 0; i < fields.length; i++) {
			if((fields[i].x == this.x) && (fields[i].y == this.y)){return i;}
		}
    }
    // what type is this field
	this.fieldType = function(){
		for (var i = 0; i < fields.length; i++) {
			if((fields[i].x == this.x) && (fields[i].y == this.y)){return fields[i].type;}
		}
	}
    // what height is this field
    this.height = function(){
        switch(this.fieldType()){
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
	this.neighbors = function(){
		//reihenfolge NW,NO,O,SO,SW,W
		if(this.y % 2 == 0){
			return [[this.x,this.y-1],[this.x+1,this.y-1],[this.x+1,this.y],[this.x+1,this.y+1],[this.x,this.y+1],[this.x-1,this.y]];
		} else {
			return [[this.x-1,this.y-1],[this.x,this.y-1],[this.x+1,this.y],[this.x,this.y+1],[this.x-1,this.y+1],[this.x-1,this.y]];
		}
	}
}