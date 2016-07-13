function gameState(count, factions, order, subTurns){
    this.turnCount = count;
    this.factionsInGame = factions;
    this.turnOrder = order;
    this.currentPlayer = order[0];
    this.subTurnNr = subTurns;
    this.startNewTurn = function(){
        var armyCount = listOfArmyCoordinates.length;
        for(var i = 0; i< armyCount; i++){
            if(listOfArmyCoordinates[i].owner == currentPlayer){
                if(Math.floor(listOfArmyCoordinates[i].army.armyId/100) == 1){
                    listOfArmyCoordinates[i].army.remainingMovePoints = 9;
                } else if(Math.floor(listOfArmyCoordinates[i].army.armyId/100) == 2){
                    listOfArmyCoordinates[i].army.remainingMovePoints = 21;
                }
            }
        }
    }
    this.endTurn = function(){
        if(this.turnOrder.length-1 == subTurnNr){
            this.turnCount++;
            this.subTurnNr = 0;
        } else {
            this.subTurnNr++;
        }
        this.currentPlayer = turnOrder[this.subTurnNr];
    }
}