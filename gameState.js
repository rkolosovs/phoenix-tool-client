// count = spielzugnr, factions anzahl an Fraktionen 0-.., order = zugreihenfolge für den derzeitigen Spielzug, subTurns = wie weit in der zugreihenfolge sind wir schon fortgeschritten.
function gameState(count, factions, order, subTurns){
    this.turnCount = count;
    this.factionsInGame = factions;
    this.turnOrder = order;
    this.currentPlayer = order[0];
    this.subTurnNr = subTurns;
    this.startNewTurn = function(){
        var armyCount = listOfArmyCoordinates.length;
        for(var i = 0; i< armyCount; i++){
            if(listOfArmyCoordinates[i].owner == this.currentPlayer){
                if(Math.floor(listOfArmyCoordinates[i].a.armyId/100) == 1){
                    listOfArmyCoordinates[i].setRemainingMovePoints(9);
                    listOfArmyCoordinates[i].setRemainingHeightPoints(2);
                } else if(Math.floor(listOfArmyCoordinates[i].a.armyId/100) == 2){
                    listOfArmyCoordinates[i].setRemainingMovePoints(21);
                    listOfArmyCoordinates[i].setRemainingHeightPoints(2);
                } else if(Math.floor(listOfArmyCoordinates[i].a.armyId/100) == 3){
                    listOfArmyCoordinates[i].setRemainingMovePoints(42);
                    listOfArmyCoordinates[i].setRemainingHeightPoints(2);
                }
            }
        }
    }
    this.endTurn = function(){
        if(this.turnOrder.length-1 == this.subTurnNr){
            this.turnCount++;
            this.subTurnNr = 0;
        } else {
            this.subTurnNr++;
        }
        this.currentPlayer = this.turnOrder[this.subTurnNr];
    }
}