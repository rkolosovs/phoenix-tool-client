function heer(id, truppen, heerfuehrer, leichte, schwere, reittiere, istGarde, coordX, coordY, owner) {
    this.armyId = id;
    this.count = truppen;
    this.leaders = heerfuehrer;
    this.lkp = leichte; //also light warships
    this.skp = schwere; //also heavy warships
    this.mounts = reittiere;
    this.isGuard = istGarde;
    this.x = coordX;
    this.y = coordY;
    this.oldX = coordX; //save the old position when moving the unit
    this.oldY = coordY; //use it to determine what terrain this unit moved from etc.
    this.owner = owner;
    this.isLoadedIn = null;
    this.wasShotAt = false;
    this.startingMovepoints = 9;

    this.possibleMoves = [];
    this.targetList = [];
    this.multiArmyField = false;
    this.LKPShotThisTurn = 0;
    this.SKPShotThisTurn = 0;

    this.ownerTag = function(){
        return this.owner;
        // return realms[this.owner - 1].tag;
    }

    this.isAlive = function(){
    	return (this.raumpunkte() >= 100 && this.leaders >= 1);
    	//TODO once characters are a thing, 0 officer armies with a character on the field should also be alive
    }

    // returns the index of the army in GameState.armies
    this.indexInListOfArmies = function(){
        var index = -1;
        for(var i = 0; i < GameState.armies.length; i++){
            if(GameState.armies[i].owner === this.owner && GameState.armies[i].armyId === this.armyId){
                index = i;
            }
        }
        return index;
    }

    this.remainingMovePoints = 9;
    this.setRemainingMovePoints = function(points){
        this.remainingMovePoints = points;
    }

    this.remainingHeightPoints = 2;
    this.setRemainingHeightPoints = function(points){
        this.remainingHeightPoints = points;
    }

    // setze eine neue Id für das Heer
    this.setId = function(newId){
        this.armyId = newId;
    }
    //sollte 1 für heer, 2 für reiterheer, 3 für seeHeer
    this.armyType = function(){
        return(Math.floor(this.armyId/100));
    }
    //berechnet die GP aus Heerführern. Includes bonus GP for being guard
    this.leaderGp = function(){
        var gp = 0;

        if(this.leaders < 101) {
            gp += this.leaders;
        } else if(this.leaders < 201) {
            gp += (100 + (this.leaders-100) / 2 );
        } else {
            gp += 200;
        }

        if(this.isGuard){
            gp += 300;
        }

        return gp;
    }
    //berechnet die verbrauchten Raumpunkte
    this.raumpunkte = function(){
        if(this.isGuard){
            // Garde zählt 3 fach
            return (this.count * 3 + this.mounts + this.skp*2000 + this.lkp*1000 + this.leaders * 100);
        }
        return (this.count + this.mounts + this.skp*2000 + this.lkp*1000 + this.leaders * 100);
    }
    //berechnet die verbrauchten Raumpunkte
    this.raumpunkteOhneHf = function(){
        if(this.isGuard){
            // Garde zählt 3 fach
            return (this.count * 3 + this.mounts + this.skp*2000 + this.lkp*1000);
        }
        return (this.count + this.mounts + this.skp*2000 + this.lkp*1000);
    }
    // entfernt Soldaten aus der Armee
    this.removeSoldiers = function(amount){
        if(this.count >= amount){
            this.count -= Math.round(amount);
        } else {this.count = 0;}
    }
    // fügt Soldaten zu der Armee hinzu
    this.addSoldiers = function(amount){
        this.count += amount;
    }
    // entfernt Heerführer aus der Armee
    this.removeLeaders = function(amount){
        if(this.leaders >= amount){
            this.leaders -= Math.round(amount);
        } else {this.leaders = 0;}
    }
    // fügt Heerführer zu der Armee hinzu
    this.addLeaders = function(amount){
        this.leaders += amount;
    }
    // entfernt leichte Katapulte aus der Armee
    this.removeLkp = function(amount){
        if(this.lkp >= amount){
            this.lkp -= Math.round(amount);
        } else {this.lkp = 0;}
    }
    // entfernt schwere Katapulte aus der Armee
    this.removeSkp = function(amount){
        if(this.skp >= amount){
            this.skp -= Math.round(amount);
        } else {this.skp = 0;}
    }
    // fügt leichte Katapulte zu der Armee hinzu
    this.addLkp = function(amount){
        this.lkp += amount;
    }
    // fügt schwere Katapulte zu der armee hinzu
    this.addSkp = function(amount){
        this.skp += amount;
    }
    // entfernt Reittiere aus der Armee
    this.removeMounts = function(amount){
        if(this.mounts >= amount){
            this.mounts -= Math.round(amount);
        } else {this.mounts = 0;}
    }
    // fügt Reittiere zu der Armee hinzu
    this.addMounts = function(amount){
        this.mounts += amount;
    }
    // remove an amount of basic soldiers an equal proportion of officers, transported mounts and catapults
    this.decimate = function(amount){
//        console.log("troops lost: ");
//        console.log(amount);
        var factor = amount/ this.count;
        this.removeSoldiers(amount);
        this.removeLeaders(this.leaders*factor);
        this.removeMounts(this.mounts*factor);
        this.removeSkp(this.skp*factor);
        this.removeLkp(this.lkp*factor);
    }
    // remove an amount of basic soldiers, mounts, catapults and officers to reduce the army's rp by rpDamage
    this.takeRPDamage = function(rpDamage){
        this.decimate(Math.ceil(rpDamage/(1+
            100*(this.leaders/this.count)+
            this.mounts/this.count+
            1000*(this.lkp/this.count)+
            2000*(this.skp/this.count))));
    }
    // zeigt an, ob ein Heer eroberungsfähig ist
    this.canConquer = function(){
        if(this.count >= 1000 && this.leaders >= 1){
            return true;
        } else {
            return false;
        }
    }
    // addierte Baupunkte der Armee
    this.sumBP = function(){return this.count*0.1 + this.mounts*0.1 + this.lkp * 200 + this.skp * 400;}
    // entfernt Truppen nach Beschuß
    this.takeFire = function(damageBP){
        var saveBp = this.sumBP();
        this.removeLeaders(this.leaders * (damageBP / saveBp));
        this.removeSoldiers(damageBP * (this.count*0.1 / saveBp) * 10);
        this.removeMounts(damageBP * (this.mounts*0.1 / saveBp) * 10);
        this.removeLkp(damageBP * (this.lkp*200 / saveBp) / 200);
        this.removeSkp(damageBP * (this.skp*400 / saveBp) / 400);
        this.wasShotAt = true;
    }
    //array der Würfelergebnisse, badConditions("far"/"high"/null)
    //return BPschaden
    this.fireLkp = function(dicerolls, badConditions){
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if(badConditions == 'lkp'){
             for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5;
                    break;
                    case 8: damageBP += 10;
                    break;
                    case 7: damageBP += 40;
                    break;
                    case 6: damageBP += 70;
                    break;
                    case 5: damageBP += 100;
                    break;
                    case 4: damageBP += 125;
                    break;
                    case 3: damageBP += 150;
                    break;
                    case 2: damageBP += 175;
                    break;
                    case 1: damageBP += 200;
                    break;
                    case 0: damageBP += 225;
                    break;
                }
            }
        }
        return damageBP;
    }
    //array der Würfelergebnisse, badConditions("far"/"farAndUp"/"high"/null)
    //return BPschaden
    this.fireSkp = function(dicerolls, badConditions){
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if(badConditions == 'short'){
             for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 30;
                    break;
                    case 8: damageBP += 60;
                    break;
                    case 7: damageBP += 90;
                    break;
                    case 6: damageBP += 120;
                    break;
                    case 5: damageBP += 150;
                    break;
                    case 4: damageBP += 180;
                    break;
                    case 3: damageBP += 210;
                    break;
                    case 2: damageBP += 240;
                    break;
                    case 1: damageBP += 270;
                    break;
                    case 0: damageBP += 300;
                    break;
                }
            }
        } else if(badConditions == "high"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 5;
                    break;
                    case 7: damageBP += 10;
                    break;
                    case 6: damageBP += 30;
                    break;
                    case 5: damageBP += 40;
                    break;
                    case 4: damageBP += 50;
                    break;
                    case 3: damageBP += 65;
                    break;
                    case 2: damageBP += 80;
                    break;
                    case 1: damageBP += 100;
                    break;
                    case 0: damageBP += 120;
                    break;
                }
            }
        } else if(badConditions == "farAndUp"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5;
                    break;
                    case 8: damageBP += 10;
                    break;
                    case 7: damageBP += 30;
                    break;
                    case 6: damageBP += 40;
                    break;
                    case 5: damageBP += 50;
                    break;
                    case 4: damageBP += 65;
                    break;
                    case 3: damageBP += 80;
                    break;
                    case 2: damageBP += 100;
                    break;
                    case 1: damageBP += 120;
                    break;
                    case 0: damageBP += 150;
                    break;
                }
            } 
        } else if(badConditions == "far"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 5;
                    break;
                    case 7: damageBP += 10;
                    break;
                    case 6: damageBP += 30;
                    break;
                    case 5: damageBP += 50;
                    break;
                    case 4: damageBP += 70;
                    break;
                    case 3: damageBP += 90;
                    break;
                    case 2: damageBP += 110;
                    break;
                    case 1: damageBP += 130;
                    break;
                    case 0: damageBP += 150;
                    break;
                }
            }
        }
        return damageBP;
    }
}// ende von Heer ------------------------------------------------------------------------------------------------------

//Reiterheere müssen nach dem Kampf nur halb so stark dezimiert werden wie Fußheere.
function reiterHeer(id, truppen, heerfuehrer, istGarde, coordX, coordY, owner) {
    this.armyId = id;
    this.count = truppen;
    this.mounts = 0;
    this.leaders = heerfuehrer;
    this.skp = 0;
    this.lkp = 0;
    this.isGuard = istGarde;
    this.x = coordX;
    this.y = coordY;
    this.oldX = coordX; //save the old position when moving the unit
    this.oldY = coordY; //use it to determine what terrain this unit moved from etc.
    this.owner = owner;
    this.isLoadedIn = null;
    this.wasShotAt = false;
    this.startingMovepoints = 21;

    this.possibleMoves = [];
    this.multiArmyField = false;

    this.ownerTag = function(){
        return this.owner;
        // return realms[this.owner - 1].tag;
    }

    this.isAlive = function(){
    	return (this.raumpunkte() >= 100 && this.leaders >= 1);
    	//TODO once characters are a thing, 0 officer armies with a character on the field should also be alive
    }

    this.remainingMovePoints = 21;
    this.setRemainingMovePoints = function(points){
        this.remainingMovePoints = points;
    }

    this.remainingHeightPoints = 2;
    this.setRemainingHeightPoints = function(points){
        this.remainingHeightPoints = points;
    }

    // returns the index of the army in GameState.armies
    this.indexInListOfArmies = function(){
        var index = -1;
        for(var i = 0; i < GameState.armies.length; i++){
            if(GameState.armies[i].owner === this.owner && GameState.armies[i].armyId === this.armyId){
                index = i;
            }
        }
        return index;
    }
    this.leaderGp = function(){
        var gp = 0;

        if(this.leaders < 101) {
            gp = this.leaders;
        } else if(this.leaders < 201) {
            gp = (100 + (this.leaders-100) / 2 );
        } else {
            gp = 200;
        }

        if(this.isGuard){
            gp += 300;
        }

        return gp;
    }
    //sollte 1 für heer, 2 für reiterheer, 3 für seeHeer
    this.armyType = function(){
        return(Math.floor(this.armyId / 100));
    }
    // Reiter zählen Doppelt so viel wie Soldaten
    this.raumpunkte = function() {
        if(this.isGuard){
            // Garde zählt 3 fach
            return (this.count * 2 * 3 + this.leaders * 100);
        }
        return (this.count * 2 + this.leaders * 100);
    };
    //berechnet die verbrauchten Raumpunkte
    this.raumpunkteOhneHf = function(){
        if(this.isGuard){
            // Garde zählt 3 fach
            return (this.count * 3);
        }
        return (this.count * 2);
    }
    // entfernt Soldaten aus der Armee
    this.removeSoldiers = function(amount){
        if(this.count >= amount){
            this.count -= Math.round(amount);
        } else {this.count = 0;}
    }
    // fügt Soldaten zu der Armee hinzu
    this.addSoldiers = function(amount){
        this.count += amount;
    }
    // entfernt Heerführer aus der Armee
    this.removeLeaders = function(amount){
        if(this.leaders >= amount){
            this.leaders -= Math.round(amount);
        } else {this.leaders = 0;}
    }
    // fügt Heerführer zu der Armee hinzu
    this.addLeaders = function(amount){
        this.leaders += amount;
    }
    // remove an amount of basic soldiers an equal proportion of officers
    this.decimate = function(amount){
        var factor = (amount) / this.count;
        this.removeSoldiers(amount);
        this.removeLeaders(this.leaders*factor);
    }
    // remove an amount of basic soldiers and officers to reduce the army's rp by rpDamage
    this.takeRPDamage = function(rpDamage){
        this.decimate(Math.ceil(rpDamage/(2+100*(this.leaders/this.count))));
    }
    // Reiter zählen Doppelt so viel wie Soldaten
    this.canConquer = function(){
        if(this.count >= 500 && this.leaders >= 1){
            return true;
        } else {
            return false;
        }
    }
    this.sumBP = function(){return this.count*0.2;}
    // entfernt Truppen nach Beschuß
    this.takeFire = function(damageBP){
        this.removeLeaders(this.leaders * (damageBP / this.sumBP()));
        this.removeSoldiers(damageBP * 5);
    }
    //reiter haben keite Katapulte
    this.fireLkp = function(dicerolls, badConditions){return 0;}
    this.fireSkp = function(dicerolls, badConditions){return 0;}
} // ende von reiterHeer ------------------------------------------------------------------------------------------------------

function seeHeer(id, truppen, heerfuehrer, leichte, schwere, istGarde, coordX, coordY, owner) {
    this.armyId = id;
    this.count = truppen;
    this.mounts = 0;
    this.leaders = heerfuehrer;
    this.lkp = leichte;
    this.skp = schwere;
    this.isGuard = istGarde;
    this.startingMovepoints = 42;
    this.x = coordX;
    this.y = coordY;
    this.oldX = coordX; //save the old position when moving the unit
    this.oldY = coordY; //use it to determine what terrain this unit moved from etc.
    this.owner = owner;
    this.isLoadedIn = null; // for easier Data Saving 
    this.loadedArmies = [];
    this.wasShotAt = false;
    this.possibleMoves = [];
    this.targetList = [];
    this.multiArmyField = false;
    this.LKPShotThisTurn = 0;
    this.SKPShotThisTurn = 0;

    this.ownerTag = function(){
        return this.owner;
        // return realms[this.owner - 1].tag;
    }

    this.isAlive = function(){
    	return (this.raumpunkte() >= 100 && this.leaders >= 1);
    	//TODO once characters are a thing, 0 officer armies with a character on the field should also be alive
    }

    this.remainingMovePoints = 42;
    this.setRemainingMovePoints = function(points){
        this.remainingMovePoints = points;
    }

    this.remainingHeightPoints = 2;
    this.setRemainingHeightPoints = function(points){
        this.remainingHeightPoints = points;
    }

    //sollte 1 für heer, 2 für reiterheer, 3 für seeHeer
    this.armyType = function(){
        return(Math.floor(this.armyId / 100));
    }
    // berechnet maximale transportkapazität
    this.maxCapacity = function() {
        return this.count*100;
    }
    // berechnet von armeen belegten platz
    this.spaceLoaded = function(){
//        console.log(this.loadedArmies);
        if(this.loadedArmies === undefined || this.loadedArmies === []){
            return 0;
        }
        var loaded = 0;
        for(var i = 0; i < this.loadedArmies.length; i++){
            for(var j = 0; j < GameState.armies.length; j++){
                if((GameState.armies[j].owner === this.owner) && GameState.armies[j].armyId === this.loadedArmies[i]){
                    loaded += GameState.armies[j].raumpunkte();
                }
            }
        }
//        console.log("loaded armies RP sum is: " + loaded);
        return loaded;
    }
    // berechnet gerade freien platz
    this.currentCapacity = function(){
        var spaceLoaded = this.spaceLoaded();
        var maxCapacity = this.maxCapacity();
//        console.log("current Capacity is: " + (maxCapacity - spaceLoaded));
        return(maxCapacity - spaceLoaded);
    }
    //lädt armee ein
    this.loadArmy = function(index){
//        console.log("loadArmy");
        if(GameState.armies[index].raumpunkte() <= this.currentCapacity()){
            this.loadedArmies.push(GameState.armies[index].armyId);
            GameState.armies[index].isLoadedIn = true;
//            console.log("Army " + GameState.armies[index].armyId +  " successfully loaded.");
            this.currentCapacity();
            return "ok";
        } else {
            return "This army is too big for this fleet.";
        }
    }
    // returns the index of the army in GameState.armies
    this.indexInListOfArmies = function(){
        var index = -1;
        for(var i = 0; i < GameState.armies.length; i++){
            if(GameState.armies[i].owner === this.owner && GameState.armies[i].armyId === this.armyId){
                index = i;
            }
        }
        return index;
    }
    // prüft pb die selektierte armee eingeladen werden kann
    this.selectedIsLoadable = function(){
        return this.isLoadable(selectedArmyIndex);
    }
    //prüft ob die armee an Stelle index in der GameState.armies eingeladen werden kann
    this.isLoadable = function(index){
//        console.log(index);
        if(GameState.armies[index].raumpunkte() <= this.currentCapacity()){
//            console.log("Army " + GameState.armies[index].armyId +  " is loadable.");
            this.currentCapacity();
            return "ok";
        } else {
            return "This army is too big for this fleet.";
        }
    }
    // Schiffe zählen 100x so viel wie Soldaten
    this.raumpunkte = function() {
        if(this.isGuard){
            return (this.count * 100 * 3 + this.leaders * 100 + this.lkp * 1000 + this.skp * 2000);
        }
        return (this.count * 100 + this.leaders * 100 + this.lkp * 1000 + this.skp * 2000);
    };
    //berechnet die verbrauchten Raumpunkte
    this.raumpunkteOhneHf = function(){
        if(this.isGuard){
            // Garde zählt 3 fach
            return (this.count * 100 * 3 + this.skp*2000 + this.lkp*1000);
        }
        return (this.count *100 + this.skp*2000 + this.lkp*1000);
    }
    // berechnet gutpunkte durch heerführer
    this.leaderGp = function(){
        var gp = 0;

        if(this.leaders < 101) {
            gp = this.leaders;
        } else if(this.leaders < 201) {
            gp = (100 + (this.leaders-100) / 2 );
        } else {
            gp = 200;
        }

        if(this.isGuard){
            gp += 300;
        }

        return gp;
    }
    // entfernt Soldaten aus der Armee
    this.removeSoldiers = function(amount){
        if(this.count >= amount){
            this.count -= Math.floor(amount);
        } else {this.count = 0;}
    }
    // fügt Soldaten zu der Armee hinzu
    this.addSoldiers = function(amount){
        this.count += amount;
    }
    // entfernt Heerführer aus der Armee
    this.removeLeaders = function(amount){
        if(this.leaders >= amount){
            this.leaders -= Math.floor(amount);
        } else {this.leaders = 0;}
    }
    // fügt Heerführer zu der Armee hinzu
    this.addLeaders = function(amount){
        this.leaders += amount;
    }
    // entfernt leichte Katapulte aus der Armee
    this.removeLkp = function(amount){
        if(this.lkp >= amount){
            this.lkp -= Math.floor(amount);
        } else {this.lkp = 0;}
    }
    // entfernt schwere Katapulte aus der Armee
    this.removeSkp = function(amount){
        if(this.skp >= amount){
            this.skp -= Math.floor(amount);
        } else {this.skp = 0;}
    }
    // fügt leichte Katapulte zu der Armee hinzu
    this.addLkp = function(amount){
        this.lkp += amount;
    }
    // fügt schwere Katapulte zu der armee hinzu
    this.addSkp = function(amount){
        this.skp += amount;
    }
    // teilt genommenen schaden auf
    this.decimate = function(amount){
        var factor = amount / this.count;
        this.removeSoldiers(amount);
        this.removeLeaders(this.leaders*factor);
        this.removeSkp(this.skp*factor);
        this.removeLkp(this.lkp*factor);
        this.killTransportedTroops();
    }

    this.killTransportedTroops = function() {
        if(this.loadedArmies !== undefined && this.loadedArmies.length > 0){
            let loadedArmiesList = GameState.armies.filter((army) =>
                army.owner === this.owner && this.loadedArmies.some((loadedArmy) => loadedArmy === army.armyId)
            );
            let overload = this.spaceLoaded() - this.maxCapacity();
            if(overload > 0){
                loadedArmiesList.forEach((loadedArmy) =>
                    loadedArmy.takeRPDamage(Math.ceil(overload * (loadedArmy.raumpunkte()/this.spaceLoaded())))
                );
            }
        }
    }

    // Schiffe zählen 100x so viel wie Soldaten
    this.canConquer = function(){
        if(this.count >= 10 && this.leaders >= 1){
            return true;
        } else {
            return false;
        }
    }
    // wieviele Baupunkte hat die flotte
    this.sumBP = function(){return this.count * 10 + this.lkp * 200 + this.skp * 400;}
    // entfernt Truppen nach Beschuß
    this.takeFire = function(damageBP){
        var saveBp = this.sumBP();
        this.removeLeaders(this.leaders * (damageBP / saveBp));
        this.removeSoldiers(damageBP * (this.count*10 / saveBp) / 10);
        this.removeLkp(damageBP * (this.lkp*200 / saveBp) / 200);
        this.removeSkp(damageBP * (this.skp*400 / saveBp) / 400);
        this.killTransportedTroops();
    }
    
    //array der Würfelergebnisse, badConditions("far"/"high"/null)
    //return BPschaden
    this.fireLkp = function(dicerolls, badConditions){
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if(badConditions == 'lkp'){
             for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 5;
                    break;
                    case 7: damageBP += 10;
                    break;
                    case 6: damageBP += 25;
                    break;
                    case 5: damageBP += 50;
                    break;
                    case 4: damageBP += 75;
                    break;
                    case 3: damageBP += 100;
                    break;
                    case 2: damageBP += 125;
                    break;
                    case 1: damageBP += 150;
                    break;
                    case 0: damageBP += 175;
                    break;
                }
            }
        }
        return damageBP;
    }

    //array der Würfelergebnisse, badConditions("far"/"farAndUp"/"high"/null)
    //return BPschaden
    this.fireSkp = function(dicerolls, badConditions){
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if(badConditions == 'short'){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5;
                    break;
                    case 8: damageBP += 10;
                    break;
                    case 7: damageBP += 40;
                    break;
                    case 6: damageBP += 70;
                    break;
                    case 5: damageBP += 100;
                    break;
                    case 4: damageBP += 130;
                    break;
                    case 3: damageBP += 160;
                    break;
                    case 2: damageBP += 190;
                    break;
                    case 1: damageBP += 220;
                    break;
                    case 0: damageBP += 250;
                    break;
                }
            }
        } else if(badConditions == "high"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 0;
                    break;
                    case 7: damageBP += 5;
                    break;
                    case 6: damageBP += 10;
                    break;
                    case 5: damageBP += 30;
                    break;
                    case 4: damageBP += 40;
                    break;
                    case 3: damageBP += 50;
                    break;
                    case 2: damageBP += 65;
                    break;
                    case 1: damageBP += 80;
                    break;
                    case 0: damageBP += 100;
                    break;
                }
            }
        } else if(badConditions == "farAndUp"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 5;
                    break;
                    case 7: damageBP += 10;
                    break;
                    case 6: damageBP += 30;
                    break;
                    case 5: damageBP += 40;
                    break;
                    case 4: damageBP += 50;
                    break;
                    case 3: damageBP += 65;
                    break;
                    case 2: damageBP += 80;
                    break;
                    case 1: damageBP += 100;
                    break;
                    case 0: damageBP += 120;
                    break;
                }
            }
        } else if(badConditions == "far"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 0;
                    break;
                    case 7: damageBP += 0;
                    break;
                    case 6: damageBP += 5;
                    break;
                    case 5: damageBP += 10;
                    break;
                    case 4: damageBP += 20;
                    break;
                    case 3: damageBP += 40;
                    break;
                    case 2: damageBP += 60;
                    break;
                    case 1: damageBP += 80;
                    break;
                    case 0: damageBP += 100;
                    break;
                }
            }
        }
        return damageBP;
    }
}