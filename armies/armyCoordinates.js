function armyCoordinates(army, coordX, coordY, owner) {
    this.a = army;
    this.x = coordX;
    this.y = coordY;
    this.owner = owner;
    this.possibleMoves = [];
    this.targetList = [];
    // returns the tag of the owner, not full operational
    // TODO do it right
    this.ownerTag = function(){
        switch(this.owner){
            case 1: return "usa";
            case 3: return "vvh";
            case 2: return "eos";
        }
    }
    // nur zu Testzwecken 300
    //TODO: make it the proper value once testing is done
    this.remainingMovePoints = 300;
    this.setRemainingMovePoints = function(points){
        this.remainingMovePoints = points;
    }
    // nur zu Testzwecken 30
    //TODO: make it the proper value once testing is done
    this.remainingHeightPoints = 30;
    this.setRemainingHeightPoints = function(points){
        this.remainingHeightPoints = points;
    }
    // direction as a number, 0 = NW, 1 = NO, 2 = O, 3 = SO, 4 = SW, 5 = W
    //TODO: Alles was nicht standard Bewegung auf ein benachbartes Feld ist.
    // done streets, height change
    this.conquer = function(direction){
        var found = false;
        //für i = 0 bis borders länge
        for(var i = 0; i<borders.length; i++){
            // sind das die Länder des Besitzers?
            if (borders[i].tag == this.ownerTag()){
                // ist das Zielland enthalten?
                for(var j = 0; j<borders[i].land.length; j++){
                    if(borders[i].land[j][0]==this.x && borders[i].land[j][1]==this.y){
                        // wenn ja, found = true
                        found = true;
                    }
                }
            // nicht die Länder des Besitzers
            } else {
                // ist das Zielland enthalten?
                for(var j = 0; j<borders[i].land.length; j++){
                    if(borders[i].land[j][0]==this.x && borders[i].land[j][1]==this.y){
                        // wenn ja nimm es raus.
                        borders[i].land.splice(j,1);
                    }
                }
            }
            //console.log(borders[i]);
        }
        // war nicht bereits Land des Besitzers.
        if (found == false){
            for(var i = 0; i<borders.length; i++){
                if (borders[i].tag == this.ownerTag()){
                    // tu es zu den Ländern des Besitzers.
                    borders[i].land.push([this.x,this.y]);
                }
            }
        }
    }


//tries to move a Unit in a direction and if possible saves the possible move
    this.moveToList = function(direction) {
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
                            //this.moveHelper(changeInHeight, direction, 12,2,false, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 12, height: 2,landunit: false,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.skp > 0){
                        if(this.remainingMovePoints >= 21 ){
                            //this.moveHelper(changeInHeight, direction, 21,2,false, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: false,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.lkp > 0){
                        if(this.remainingMovePoints >= 21 ){
                            //this.moveHelper(changeInHeight, direction, 21,2,false, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: false,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    }
                case 1: 
                    if(this.a.lkp == 0 && this.a.skp == 0){
                        if(this.remainingMovePoints >= 7 ){
                            //this.moveHelper(changeInHeight, direction, 7,2,false, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: false,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.skp > 0){
                        if(this.remainingMovePoints >= 10 ){
                            //this.moveHelper(changeInHeight, direction, 10,2,false, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2,landunit: false,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.lkp > 0){
                        if(this.remainingMovePoints >= 8 ){
                            //this.moveHelper(changeInHeight, direction, 8,2,false, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 8, height: 2,landunit: false,tar: target});
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
                        //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                        this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.remainingMovePoints >= 7 ){// 7
                    //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                    this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 5: if(thereIsAStreet){
                    if(this.remainingMovePoints >= 7 ){// 7
                        //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                        this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.remainingMovePoints >= 21 ){// 21
                    //this.moveHelper(changeInHeight, direction, 21,2,true, target);
                    this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 21, height: 2,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 6: return "Cavalry can not move through the mountains. "// can't
                case 3:
                case 8: if(thereIsAStreet){
                    if(this.remainingMovePoints >= 5 ){// 5
                        //this.moveHelper(changeInHeight, direction, 5,1,true, target);
                        this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 5, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.remainingMovePoints >= 10 ){// 10
                    //this.moveHelper(changeInHeight, direction, 10,2,true, target);
                    this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 10, height: 2,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            }
        // normal troop movement
        } else if(Math.floor(this.a.armyId / 100) == 1){
            switch(target.fieldType()){
                case 0:
                case 1:
                // target field is sea, or deepsea
                // to see if there is the exact hightchange(not too high or on the sea switching boats)
                if(changeInHeight == true){
                    // is there an allied fleet on the target field?
                    var fleetsOnDest = [];
                    for(var i = 0; i<listOfArmyCoordinates.length; i++){
                        if((listOfArmyCoordinates[i].owner == this.owner) && (listOfArmyCoordinates[i].x == target.x) && (listOfArmyCoordinates[i].y == target.y) && 
                        (Math.floor(listOfArmyCoordinates[i].a.armyId / 100) == 3)){
                            if (listOfArmyCoordinates[i].a.isLoadable() == "ok"){
                                this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 2,landunit: true ,tar: target, load: true});
                            }
                            fleetsOnDest.push(i);
                            console.log("fleets +1");
                        }
                    }
                    // there is none
                    if(fleetsOnDest.length == 0){
                        return "You can't walk on Water.";
                    // there is at least one
                    } else {
                        return "ok";
                    }
                }
                case 2:
                case 4:
                case 7: 
                if(thereIsAStreet){  // target field is a lowland, hill or desert
                    if(this.remainingMovePoints >= 4){
                        //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                        this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                
                        
                } else if(this.remainingMovePoints >= 7){
                    console.log(this.a.isLoadedIn);
                    if(this.a.isLoadedIn != null){  // falls armee von flotte transportiert wird
                        this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target, unload: true});
                    }
                    else {
                    this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target, unload: false});
                    }
                    this.a.isLoadedIn = null;
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 5: if(thereIsAStreet){  // target field is a highland
                        if(this.a.skp > 0){
                            if(this.remainingMovePoints >= 7){
                                //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                                this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,tar: target});
                                return "ok";
                            } else {
                                return "You don't have enough movement Points.";
                            }
                        } if(this.remainingMovePoints >= 4){
                            //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.a.skp > 0){
                    return "You you need streets to move heavy catapults into the highlands.";
                } if(this.remainingMovePoints >= 7){
                    //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                    this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2,landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
                case 6: if(thereIsAStreet){  // target field is a mountain
                    if(this.a.skp > 0){
                        return "You can't move into the mountains with heavy catapults.";
                    } else if(this.a.lkp > 0){
                        if(this.remainingMovePoints >= 7 ){
                            //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.remainingMovePoints >= 4 ){
                        //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                        this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.a.lkp > 0 || this.a.skp > 0){
                    return "You can't move into the mountains with catapults.";
                }
                case 3:
                case 8: if(thereIsAStreet){ // target field is a wood, or swamp
                    if(this.a.skp > 0){
                        if(this.remainingMovePoints >= 7 ){
                            //this.moveHelper(changeInHeight, direction, 7,1,true, target);
                            this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 1,landunit: true ,tar: target});
                            return "ok";
                        } else {
                            return "You don't have enough movement Points.";
                        }
                    } else if(this.remainingMovePoints >= 4 ){
                        //this.moveHelper(changeInHeight, direction, 4,1,true, target);
                        this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 4, height: 1,landunit: true ,tar: target});
                        return "ok";
                    } else {
                        return "You don't have enough movement Points.";
                    }
                } else if(this.a.skp > 0){
                    return "You can't move into woods or swamps with heavy catapults unless you have streets.";
                } else if(this.remainingMovePoints >= 7 ){
                    //this.moveHelper(changeInHeight, direction, 7,2,true, target);
                    this.possibleMoves.push({changHeight: changeInHeight, dir: direction, movepoints: 7, height: 2, landunit: true ,tar: target});
                    return "ok";
                } else {
                    return "You don't have enough movement Points.";
                }
            }
        }
    }

    //when unit is clicked generates a list of neighbors that can be moved to
    this.clickedMoves = function(){

        if(this.ownerTag() === login || login === "sl"){
            this.possibleMoves = [];
            //goes through all neighbors to see if the army can move there
            for(var i =0; i < 6; i++)
            {
                this.moveToList(i);
            }
        }

    }

    //to actually move units with the new method
    this.move = function(direction){//TODO needs new names
        for(var i =0; i < this.possibleMoves.length; i++){
            if(this.possibleMoves[i].dir == direction){
                var tempmove = this.possibleMoves[i];
                //in case it is moving on land
                if(tempmove.load == undefined){
                    this.remainingMovePoints -= tempmove.movepoints;
                    this.x = tempmove.tar.x;
                    this.y = tempmove.tar.y;

                    //for ship movement
                    if(Math.floor(this.a.armyId / 100) == 3){
                    // moves troops that are loaded in the fleet
                        if(this.a.loadedArmies != undefined && this.a.loadedArmies != []){
                            for(var i = 0; i < this.a.loadedArmies.length; i++){
                                for(var j = 0; j < listOfArmyCoordinates.length; j++){
                                    console.log(this.a.loadedArmies[i]);
                                    if(listOfArmyCoordinates[j].owner == this.owner && listOfArmyCoordinates[j].a.armyId == this.a.loadedArmies[i]){
                                        listOfArmyCoordinates[j].x = tempmove.tar.x;
                                        listOfArmyCoordinates[j].y = tempmove.tar.y;
                                    }
                                }
                            }
                        }
                    }

                    //for moving off a ship
                    if(tempmove.unload != undefined && tempmove.unload == true){
                        console.log("Armee war in " + this.a.isLoadedIn + " geladen.");
                        for(var i = 0; i < listOfArmyCoordinates.length; i++){
                            if((listOfArmyCoordinates[i].owner == this.owner) && listOfArmyCoordinates[i].a.armyId == this.a.isLoadedIn){
                                var placeInList = -1;
                                for(var j = 0; j < listOfArmyCoordinates[i].a.loadedArmies.length; j++){
                                    if(listOfArmyCoordinates[i].a.loadedArmies[j] == this.a.armyId){
                                        placeInList = j;
                                    }
                                }
                                if(placeInList == (listOfArmyCoordinates[i].a.loadedArmies.length-1)){
                                    listOfArmyCoordinates[i].a.loadedArmies.pop();
                                } else {
                                    listOfArmyCoordinates[i].a.loadedArmies[j] = listOfArmyCoordinates[i].a.loadedArmies[listOfArmyCoordinates[i].a.loadedArmies.length-1];
                                    listOfArmyCoordinates[i].a.loadedArmies.pop();
                                }
                            }
                        }
                    }

                    if(tempmove.changHeight == true){
                        this.setRemainingHeightPoints(this.remainingHeightPoints - tempmove.height);
                    }
                    if(tempmove.landunit == true && this.a.canConquer())
                    {
                        this.conquer(direction);
                    }
                    this.clickedMoves();
                    return "ok"
                }
                //in case of loading onto a ship
                else if(tempmove.load == true){
                    var fleetsOnDest = [];
                    for(var i = 0; i<listOfArmyCoordinates.length; i++){
                        if((listOfArmyCoordinates[i].owner == this.owner) && (listOfArmyCoordinates[i].x == tempmove.tar.x) && (listOfArmyCoordinates[i].y == tempmove.tar.y) && 
                        (Math.floor(listOfArmyCoordinates[i].a.armyId / 100) == 3)){
                            fleetsOnDest.push(i);
                            console.log("fleets +1");
                        }
                    }
                    // there is none
                    if(fleetsOnDest.length == 0){
                        return "You can't walk on Water.";
                    // there is exactly one
                    } else if(fleetsOnDest.length == 1){
                        var loadString = listOfArmyCoordinates[fleetsOnDest[0]].a.loadArmy();
                        if(loadString == "ok"){
                            this.a.isLoadedIn = listOfArmyCoordinates[fleetsOnDest[0]].a.armyId;
                            console.log("army in now loaded in " + this.a.isLoadedIn);
                            this.x = tempmove.tar.x;
                            this.y = tempmove.tar.y;
                            return "ok";
                        } else {
                            return(loadString);
                        }
                    // TODO: more than one
                    } else if(fleetsOnDest.length > 1){
                        var fleetstring = "";
                        for(var i = 0; i < fleetsOnDest.length; i++){
                            fleetstring = fleetstring + listOfArmyCoordinates[fleetsOnDest[i]].a.armyId + " ";
                        }
                        var chosenFleet = prompt("Mögliche Flotten sind: " + fleetstring);
                        if(chosenFleet != null){
                            var findFleet = -1;
                            for(var i = 0; i < listOfArmyCoordinates.length; i++){
                                if(listOfArmyCoordinates[i].a.armyId == chosenFleet && listOfArmyCoordinates[i].owner == this.owner){
                                    findFleet = i;
                                }
                            }
                            console.log("chosenFleet: ") 
                            console.log(chosenFleet);
                            console.log("findFleet: ") 
                            console.log(findFleet);
                            console.log("fleetsOnDest: ") 
                            console.log(fleetsOnDest);
                            var found = false;
                            for(var i = 0; i < fleetsOnDest.length; i++){
                                if(fleetsOnDest[i] == findFleet){
                                    found = true
                                }
                            }
                            if(found){
                                var loadString = listOfArmyCoordinates[findFleet].a.loadArmy();
                                if(loadString == "ok"){
                                    this.a.isLoadedIn = listOfArmyCoordinates[findFleet].a.armyId;
                                    console.log("army in now loaded in " + this.a.isLoadedIn);
                                    this.x = tempmove.tar.x;
                                    this.y = tempmove.tar.y;
                                    return "ok";
                                } else {
                                    return(loadString);
                                }
                            } else {
                                window.alert("Bitte wähle eine der angegebenen Flotten aus.");
                            }
                        }
                    }
                }
            }
        }
		//to see and return the error why you cant move
        this.clickedMoves();
        return this.moveToList(direction)
    }

    //to find all fields in a two tile proximity
    this.findToFire = function(){
        var origin = new showHex(this.x, this.y);

        //get all neighboring tiles
        this.targetList = origin.neighbors();
        var templist = origin.neighbors();

        //adding the range
        for(var i = 0; i < this.targetList.length; i++){
            this.targetList[i].push(1);
        }


        if(this.a.skp >0){//in a 2 tile range

            for(var i = 0; i < templist.length; i++){
                var tempneigh = new showHex(templist[i][0], templist[i][1]);
                var tempneighList = tempneigh.neighbors();

                for(var j = 0; j < tempneighList.length; j++){
                    var found = false;
                    for(var k = 0; k < this.targetList.length; k++){
                        if((tempneighList[j][0] == this.targetList[k][0] && tempneighList[j][1] == this.targetList[k][1]) || (tempneighList[j][0] == this.x && tempneighList[j][1] == this.y)){
                            found = true;
                        }
                        
                    }
                    if(found  == false)
                        //tempneighList[j].push(2);//the 2 is the range
                        this.targetList.push([tempneighList[j][0], tempneighList[j][1], 2]);
                }
            }
        }

        templist = this.targetList.slice();
        //to find out the conditions and maybe kick out if not shootable
        for(var i = templist.length -1; i >= 0; i--){
            var target = new showHex(templist[i][0], templist[i][1]);
            if(this.a.skp > 0){//skp shooting
                if(templist[i][2] == 1){
                    if(target.height() - origin.height() <= 2){

                    }
                    else{
                        this.targetList.splice(i,1);
                    }
                }
                else if(templist[i][2] == 2){
                    //also if neighbor with range 1 has height diff of 2(in case a high mountain is not allowed)
                    if(target.height() - origin.height() <= 1){

                    }
                    else{
                        this.targetList.splice(i,1);
                    }
                }
            }
            else{//for lkp shooting
                if(target.height() - origin.height() <= 1){

                }
                else{
                    this.targetList.splice(i,1);
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