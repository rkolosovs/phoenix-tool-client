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