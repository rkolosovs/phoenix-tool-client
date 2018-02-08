"use strict";
class PhoenixEvent {
    constructor(id, type, status) {
        this.id = id;
        this.type = type;
        this.status = status;
    }
    commonEventListItem(eli, id) {
        let deleteButton = document.createElement("BUTTON");
        deleteButton.id = "delBtn" + id;
        deleteButton.classList.add("eventListButton");
        deleteButton.classList.add("eventListDeleteButton");
        deleteButton.addEventListener("click", (e) => this.deleteEvent());
        let checkButton = document.createElement("BUTTON");
        checkButton.id = "checkBtn" + id;
        checkButton.classList.add("eventListButton");
        checkButton.classList.add("eventListCheckButton");
        checkButton.addEventListener("click", (e) => this.checkEvent());
        eli.appendChild(deleteButton);
        eli.appendChild(checkButton);
        if (this.status === 'checked') {
            eli.classList.add("checkedELI");
            deleteButton.disabled = true;
            checkButton.disabled = true;
        }
        else if (this.status === 'deleted') {
            eli.classList.add("deletedELI");
            deleteButton.disabled = true;
            checkButton.disabled = true;
        }
        else if (this.status === 'impossible') {
            eli.classList.add("impossibleELI");
            checkButton.disabled = true;
        }
        else if (this.status === 'withheld') {
            eli.classList.add("withheldELI");
            checkButton.disabled = true;
        }
        else if (this.status === 'available') {
            eli.classList.add("availableELI");
        }
        return eli;
    }
    deleteEvent() {
        let eli = document.getElementById("eli" + this.id);
        let event = pendingEvents[this.id];
        event.status = 'deleted';
        fillEventList();
    }
    //begin of helper methods for event status determining
    stillSplitEventsInFaction(realm) {
        for (let i = 0; i < pendingEvents.length; i++) {
            let event = pendingEvents[i];
            if ((event.status === 'withheld' || event.status === 'available' || event.status === 'undetermined') && event.type === 'split') {
                return true;
            }
        }
        return false;
    }
    noPendingLoadEvents(realm, armyId, fromX, fromY) {
        if (Math.floor(armyId / 100) != 3) {
            return true;
        }
        else {
            for (let i = 0; i < pendingEvents.length; i++) {
                let event = pendingEvents[i];
                if ((event.status === 'withheld' || event.status === 'available') && event.type === 'move' && Math.floor(event.content.armyId / 100) !== 3 &&
                    ((event.content.fromX === fromX && event.content.fromY === fromY) ||
                        (event.content.toX === fromX && event.content.toY === fromY))) {
                    return false;
                }
            }
            return true;
        }
    }
    noPendingMountEvents(realm, armyId, fromX, fromY) {
        if (Math.floor(armyId / 100) != 3) {
            for (let i = 0; i < pendingEvents.length; i++) {
                let event = pendingEvents[i];
                if ((event.status === 'withheld' || event.status === 'available' || event.status === 'undetermined') && event.type === 'mount' && Math.floor(event.content.fromArmy) === armyId &&
                    (event.content.x === fromX && event.content.y === fromY)) {
                    return false;
                }
            }
            return true;
        }
        else {
            return true;
        }
    }
    eachArmyExists(armies) {
        //	console.log("eachArmyExits("+armies+")");
        return (armies.length > 0) && (armies.map(function (army) {
            return armyExists(army.realm, army.armyId);
        }).reduce(function (total, current) {
            return total && current;
        }, true));
    }
    findArmyPlaceInList(armyId, owner) {
        for (let i = 0; i < listOfArmies.length; i++) {
            if (listOfArmies[i].armyId === armyId && listOfArmies[i].owner === owner) {
                return i;
            }
        }
        return -1;
    }
    eachArmyExistsAndIsLocated(armies, x, y) {
        //	console.log("eachArmyExistsAndIsLocated("+armies+", "+x+", "+y+")");
        return (armies.length > 0) && (armies.map(function (army) {
            return armyExistsAndIsLocated(army.realm, army.armyId, x, y);
        }, this).reduce(function (total, current) {
            return total && current;
        }, true));
    }
    possibleMoveOfEachArmyTo(armies, x, y) {
        //	console.log("possibleMoveOfEachArmyTo("+armies+", "+x+", "+y+")");
        return (armies.length > 0) && (armies.map(function (army) {
            return armyExistsAndIsLocated(army.realm, army.armyId, x, y) ||
                possibleMoveOfArmyTo(army.realm, army.armyId, x, y);
        }, this).reduce(function (total, current) {
            return total && current;
        }, true));
    }
    armyExists(realm, id) {
        //	console.log("armyExists("+realm+", "+id+")");
        return listOfArmies.some(function (val) {
            return (val.ownerTag() === realm) && (val.armyId === id);
        }, this);
    }
    armyExistsAndIsLocated(realm, id, x, y) {
        //	console.log("armyExistsAndIsLocated("+realm+", "+id+", "+x+", "+y+")");
        return listOfArmies.some(function (val) {
            return (val.ownerTag() === realm) &&
                (val.armyId === id) &&
                (val.x === x) && (val.y === y);
        }, this);
    }
    possibleMoveOfArmyTo(realm, id, x, y) {
        //	console.log("possibleMoveOfArmyTo("+realm+", "+id+", "+x+", "+y+")");
        return pendingEvents.some(function (pEv) {
            return (pEv.type === 'move') && (pEv.content.realm === realm) &&
                (pEv.content.armyId === id) && (pEv.status !== 'deleted' || pEv.status !== 'checked') &&
                (pEv.content.toX === x) && (pEv.content.toY === y) &&
                (canMove(realm, id, pEv.content.fromX, pEv.content.fromY, x, y));
        }, this);
    }
    unprocessedBattleAtContainingArmy(realm, id, x, y) {
        //	console.log("unprocessedBattleAtContainingArmy("+realm+", "+id+", "+x+", "+y+")");
        return pendingEvents.some(function (pEv) {
            return (pEv.type === 'battle') &&
                (pEv.status !== 'deleted') &&
                (pEv.status !== 'checked') &&
                (pEv.content.x === x) &&
                (pEv.content.y === y) &&
                (pEv.content.participants.some(function (part) {
                    return (part.armyId === id) && (part.realm === realm);
                }, this));
        }, this);
    }
    canMove(realm, id, fromX, fromY, toX, toY) {
        let foundArmy = listOfArmies.find(function (army) {
            return (army.armyId === id) && (army.ownerTag() === realm);
        }, this);
        if (foundArmy != undefined && foundArmy.x === fromX && foundArmy.y === fromY) {
            let adjacency = getAdjacency([fromX, fromY], [[toX, toY]]);
            if (adjacency.reduce((total, current) => (total || current), false)) {
                foundArmy.possibleMoves = [];
                let direction = (adjacency.findIndex((dir) => dir === 1) + 1) % 6;
                moveToList(foundArmy, direction);
                return foundArmy.possibleMoves.length > 0;
            }
            return false;
            //		let origin = new showHex(fromX, fromY);
            //        let destination = new showHex(toX, toY);
            //		let streetPresent = buildings.some(function(building){
            //			return (building.type === 8) &&
            //				(((building.firstX == fromX && building.firstY == fromY) && (building.secondX == toX && building.secondY == toY)) ||
            //					((building.secondX == toX && building.secondY == toY) && (building.firstX == fromX && building.firstY == fromY)));
            //		});
            //		let heightDifference = Math.abs((origin.height() - destination.height()));
            //		//TODO: This is missing harbors
            //		let enoughHeightPoints =  (foundArmy.remainingHeightPoints >= 1) &&
            //			((heightDifference <= 2 && streetPresent) || (heightDifference <= 1));
            //		//TODO: This is missing basically everything. Now the movement points are set serverside and no longer to high so this should work or not be here.
            //		let enoughMovePoints = (foundArmy.remainingMovePoints >= 7);
            //		return enoughHeightPoints && enoughMovePoints;
        }
        else {
            return false;
        }
    }
}
