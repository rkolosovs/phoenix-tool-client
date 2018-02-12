class MoveEvent extends PhoenixEvent{
    
    constructor(protected id: number, protected type: string, protected status: string, protected realm: Realm, 
        protected armyId: number, protected fromX: number, protected fromY: number,protected toX: number, 
        protected toY: number){

        super(id, type, status);
    }

    checkEvent(){
        let army;
        for (let i = 0; i < GameState.armies.length; i++) {
            army = GameState.armies[i];
            if (army.ownerTag() === this.realm && this.armyId === army.armyId) {
                break;
            }
        }
        let adjacency = getAdjacency([army.x, army.y], [[this.toX, this.toY]]);//TODO use the new movement
        if (adjacency[0] === true) {
            army.moveToList(1);
            army.move(1);//move to ne
        } else if (adjacency[1] === true) {
            army.moveToList(2);
            army.move(2);//move to e
        } else if (adjacency[2] === true) {
            army.moveToList(3);
            army.move(3);//move to se
        } else if (adjacency[3] === true) {
            army.moveToList(4);
            army.move(4);//move to sw
        } else if (adjacency[4] === true) {
            army.moveToList(5);
            army.move(5);//move to w
        } else if (adjacency[5] === true) {
            army.moveToList(0);
            army.move(0);//move to nw
        }
        if (!this.unprocessedBattleAtContainingArmy(army.ownerTag(), army.armyId, army.x, army.y)) {
            army.conquer();
        }
        this.status = 'checked';
        fillEventList();
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        if (this.armyExistsAndIsLocated(this.realm, this.armyId, this.fromX, this.fromY) &&
        !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId, this.fromX, this.fromY) &&
        this.canMove(this.realm, this.armyId, this.fromX, this.fromY, this.toX, this.toY) &&
        this.noPendingLoadEvents(this.realm, this.armyId, this.fromX, this.fromY) &&
        this.noPendingMountEvents(this.realm, this.armyId, this.fromX, this.fromY)) {
        this.status = 'available';
    } else if ((this.stillSplitEventsInFaction(this.realm) || this.armyExistsAndIsLocated(this.realm, this.armyId, this.fromX, this.fromY)) &&
        !this.unprocessedBattleAtContainingArmy(this.realm, this.armyId, this.fromX, this.fromY) &&
        this.canMove(this.realm, this.armyId, this.fromX, this.fromY, this.toX, this.toY) &&
        (!this.noPendingLoadEvents(this.realm, this.armyId, this.fromX, this.fromY) ||
            !this.noPendingMountEvents(this.realm, this.armyId, this.fromX, this.fromY))) {
        this.status = 'withheld';
    } else if (this.stillSplitEventsInFaction(this.realm) || (this.armyExists(this.realm, this.armyId) &&
        this.possibleMoveOfArmyTo(this.realm, this.armyId, this.fromX, this.fromY))) {
        this.status = 'withheld';
    } else {
        this.status = 'impossible';
    }
    }
    
    makeEventListItem(): HTMLElement{
    let eli = document.createElement("DIV");
    eli.classList.add("eventListItem");
    eli.id = "eli" + this.id;
    
    eli.innerHTML = "<div>Move " + this.realm + " army " + this.armyId + " from (" + this.fromX + ", " + this.fromY + 
    ") to (" + this.toX + ", " + this.toY + ")</div>";

    return this.commonEventListItem(eli, this.id);
    }
}