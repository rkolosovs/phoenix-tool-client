/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

import {GameState, GUI, BoxVisibility, Drawing, Realm, ProductionBuilding, 
    HexFunction, River, ArmyGeneratorBox, InfoChangeBox, Controls, Direction, 
    BuildingType, Building, NonDestructibleBuilding, Wall, FootArmy, 
    Constants} from "../types";

export namespace GodFunctions {
	import worldCreationModeOnClick = BoxVisibility.worldCreationModeOnClick;
	import changeFieldToType = BoxVisibility.changeFieldToType;
	import hide = BoxVisibility.hide;
	import show = BoxVisibility.show;
	import switchModeTo = BoxVisibility.switchModeTo;
	let changedBuildings = Controls.changedBuildings;
	let factionToCreateBuildingsFor: Realm = GameState.realms[0];

	export function setFactionToCreateBuildingsFor(faction: Realm): void {
		factionToCreateBuildingsFor = faction;
	}

	export function toggleOnClickWorldCreationMode(): void {
		if (BoxVisibility.worldCreationModeOnClick && (changeFieldToType == -1)) {
			BoxVisibility.worldCreationModeOnClick = false;
			hide(GUI.getWorldBenderBox().getCreationWarning());
		} else if (!BoxVisibility.worldCreationModeOnClick || (BoxVisibility.worldCreationModeOnClick &&
			(changeFieldToType != -1))) {
			BoxVisibility.changeFieldToType = -1;
			BoxVisibility.worldCreationModeOnClick = true;
			show(GUI.getWorldBenderBox().getCreationWarning());
		}
		Drawing.resizeCanvas()
	}

	export function changeFieldClickedTo(number: number): void {
		if (changeFieldToType != number) {
			switchModeTo("worldCreationModeOnClick");
			BoxVisibility.changeFieldToType = number;
			show(GUI.getWorldBenderBox().getCreationWarning());
		} else {
			BoxVisibility.changeFieldToType = -1;
			switchModeTo("worldCreationModeOn");
			hide(GUI.getWorldBenderBox().getCreationWarning());
		}
		Drawing.resizeCanvas()
	}

	function addProductionBuilding(type: BuildingType, position: [number, number], realm: Realm): void{
        let maxBP: number = 0;
        switch(type){
            case BuildingType.CASTLE: maxBP = Constants.CASTLE_BP; break;
            case BuildingType.CITY: maxBP = Constants.CITY_BP; break;
            case BuildingType.FORTRESS: maxBP = Constants.FORTRESS_BP; break;
            case BuildingType.CAPITAL: maxBP = Constants.CAPITAL_BP; break;
            case BuildingType.CAPITAL_FORT: maxBP = Constants.CAPITAL_FORTRESS_BP; break;
            default: break;
        }
        //make sure the right thing is contained in the changedBuildings
	    let entryInChangedBuildings: [boolean, Building]|undefined = Controls.changedBuildings.find(entry =>
            entry[1] instanceof ProductionBuilding &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1]);
	    if (entryInChangedBuildings == undefined) {
	        Controls.changedBuildings.push([true, new ProductionBuilding(type, "", position, realm, maxBP)]);
        } else if (!entryInChangedBuildings[0]) {
	        entryInChangedBuildings[0] = true;
        } else if (entryInChangedBuildings[1].type !== type){
	        entryInChangedBuildings[1].type = type;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings: Building|undefined = GameState.buildings.find(building =>
            building instanceof ProductionBuilding &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1]);
	    if (entryInActualBuildings == undefined) {
	        GameState.buildings.push(new ProductionBuilding(type, "", position, realm, maxBP));
        } else if (entryInActualBuildings.type !== type) {
	        entryInActualBuildings.type = type;
        }

        Drawing.drawStuff();
    }

	// add a castle in the selectedField
	export function addCastle(): void {
	    addProductionBuilding(BuildingType.CASTLE, Controls.selectedFields[0], factionToCreateBuildingsFor);
	}

	// add a city in the selectedField
	export function addCity(): void {
        addProductionBuilding(BuildingType.CITY, Controls.selectedFields[0], factionToCreateBuildingsFor);
	}

	// add a fortress in the selectedField
	export function addFortress(): void {
        addProductionBuilding(BuildingType.FORTRESS, Controls.selectedFields[0], factionToCreateBuildingsFor);
	}

	// add a capital city in the selectedField
	export function addCapital(): void {
        addProductionBuilding(BuildingType.CAPITAL, Controls.selectedFields[0], factionToCreateBuildingsFor);
	}

	// add a capital fortress in the selectedField
	export function addCapitalFortress(): void {
        addProductionBuilding(BuildingType.CAPITAL_FORT, Controls.selectedFields[0], factionToCreateBuildingsFor);
	}

	function deleteProductionBuildingOnField(position: [number, number]): void {
        let buildingToDelete: Building|undefined = GameState.buildings.find(building =>
            building instanceof ProductionBuilding &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1]);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings: [boolean, Building]|undefined = Controls.changedBuildings.find(entry =>
                entry[1].type === (buildingToDelete as Building).type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1]);
            if (entryInChangedBuildings == undefined) {
                Controls.changedBuildings.push([false, buildingToDelete]);
            } else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            GameState.buildings.splice(GameState.buildings.findIndex(building =>
                building === buildingToDelete), 1);
        }
        Drawing.drawStuff();
    }

	// delete the production building in the selectedField
	export function deleteSelectedProductionBuilding(): void {
        deleteProductionBuildingOnField(Controls.selectedFields[0]);
	}

	function addNonDestructibleBuilding(type: BuildingType, position: [number, number],
                                        secondPosition: [number, number], realm: Realm): void {
        //make sure the right thing is contained in the changedBuildings
        let entryInChangedBuildings: [boolean, Building]|undefined = Controls.changedBuildings.find(entry =>
            entry[1].type === type &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1] &&
            (entry[1] as NonDestructibleBuilding).getSecondPosition()[0] === secondPosition[0] &&
            (entry[1] as NonDestructibleBuilding).getSecondPosition()[1] === secondPosition[1]);
        if (entryInChangedBuildings == undefined) {
            Controls.changedBuildings.push([true, new NonDestructibleBuilding(type, position, secondPosition, realm)]);
        } else if (!entryInChangedBuildings[0]) {
            entryInChangedBuildings[0] = true;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings: Building|undefined = GameState.buildings.find(building =>
            building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            (building as NonDestructibleBuilding).getSecondPosition()[0] === secondPosition[0] &&
            (building as NonDestructibleBuilding).getSecondPosition()[1] === secondPosition[1]);
        if (entryInActualBuildings == undefined) {
            GameState.buildings.push(new NonDestructibleBuilding(type, position, secondPosition, realm));
        }
        Drawing.drawStuff();
    }

    function deleteNonDestructibleBuilding(type: BuildingType, position: [number, number],
                                           secondPosition: [number, number]): void {
        let buildingToDelete: Building|undefined = GameState.buildings.find(building =>
            building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            (building as NonDestructibleBuilding).getSecondPosition()[0] === secondPosition[0] &&
            (building as NonDestructibleBuilding).getSecondPosition()[1] === secondPosition[1]);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings: [boolean, Building]|undefined = Controls.changedBuildings.find(entry =>
                entry[1].type === (buildingToDelete as Building).type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1] &&
                (entry[1] as NonDestructibleBuilding).getSecondPosition()[0] === secondPosition[0] &&
                (entry[1] as NonDestructibleBuilding).getSecondPosition()[1] === secondPosition[1]);
            if (entryInChangedBuildings == undefined) {
                Controls.changedBuildings.push([false, buildingToDelete]);
            } else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            GameState.buildings.splice(GameState.buildings.findIndex(building =>
                building === buildingToDelete), 1);
        }
        Drawing.drawStuff();
    }

	// adds a street in the target direction
	export function addStreet(direction: Direction): void {
		let targets = HexFunction.neighbors(Controls.selectedFields[0]);
		let target = targets[direction];
		addNonDestructibleBuilding(BuildingType.STREET, Controls.selectedFields[0],
            target, factionToCreateBuildingsFor);
        Controls.selectedFields[0] = [target[0], target[1]];
        Drawing.drawStuff();
	}

	// removes a street in the target direction
	export function removeStreet(direction: Direction): void {
		let targets = HexFunction.neighbors(Controls.selectedFields[0]);
		let target = targets[direction];
        deleteNonDestructibleBuilding(BuildingType.STREET, Controls.selectedFields[0], target);
        Controls.selectedFields[0] = [target[0], target[1]];
		Drawing.resizeCanvas();
	}

	// adds a river in the target direction
	export function addRiver(direction: Direction): void {
		let targets = HexFunction.neighbors(Controls.selectedFields[0]);
		let target = targets[direction];
		if(!GameState.rivers.some(river =>
                (river.rightBank[0] === Controls.selectedFields[0][0] &&
                    river.rightBank[1] === Controls.selectedFields[0][1] &&
                    river.leftBank[0] === target[0] &&
                    river.leftBank[1] === target[1]) ||
                (river.leftBank[0] === Controls.selectedFields[0][0] &&
                    river.leftBank[1] === Controls.selectedFields[0][1] &&
                    river.rightBank[0] === target[0] &&
                    river.rightBank[1] === target[1]))) {
            GameState.rivers.push(new River(Controls.selectedFields[0], target));
        }
		Drawing.drawStuff();
	}

	// removes a river in the target direction
	export function removeRiver(direction: Direction): void {
		let sf = Controls.selectedFields[0];
		let targets = HexFunction.neighbors(sf);
		let target = targets[direction];
		let indexToDelete = GameState.rivers.findIndex(river =>
            (river.rightBank[0] === Controls.selectedFields[0][0] &&
                river.rightBank[1] === Controls.selectedFields[0][1] &&
                river.leftBank[0] === target[0] &&
                river.leftBank[1] === target[1]) ||
            (river.leftBank[0] === Controls.selectedFields[0][0] &&
                river.leftBank[1] === Controls.selectedFields[0][1] &&
                river.rightBank[0] === target[0] &&
                river.rightBank[1] === target[1]));
		if (indexToDelete != undefined) {
		    GameState.rivers.splice(indexToDelete, 1);
		}
		Drawing.drawStuff();
	}

    function addWall(type: BuildingType, position: [number, number], direction: Direction, realm: Realm): void {
        //make sure the right thing is contained in the changedBuildings
        let entryInChangedBuildings: [boolean, Building]|undefined = Controls.changedBuildings.find(entry =>
            entry[1].type === type &&
            entry[1].getPosition()[0] === position[0] &&
            entry[1].getPosition()[1] === position[1] &&
            (entry[1] as Wall).facing === direction);
        if (entryInChangedBuildings == undefined) {
            Controls.changedBuildings.push([true, new Wall(type, position, realm, Constants.WALL_BP,
                direction, Constants.WALL_MAX_GUARD)]);
        } else if (!entryInChangedBuildings[0]) {
            entryInChangedBuildings[0] = true;
        }
        //make sure the right thing is contained in the GameState.buildings
        let entryInActualBuildings: Building|undefined = GameState.buildings.find(building =>
            building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            (building as Wall).facing === direction);
        if (entryInActualBuildings == undefined) {
            GameState.buildings.push(new Wall(type, position, realm, Constants.WALL_BP,
                direction, Constants.WALL_MAX_GUARD));
        }
        Drawing.drawStuff();
    }

    function deleteWall(type: BuildingType, position: [number, number], direction: Direction): void {
        let buildingToDelete: Building|undefined = GameState.buildings.find(building =>
            building.type === type &&
            building.getPosition()[0] === position[0] &&
            building.getPosition()[1] === position[1] &&
            (building as Wall).facing === direction);
        if (buildingToDelete != undefined) {
            //make sure the right thing is in changedBuildings
            let entryInChangedBuildings: [boolean, Building]|undefined = Controls.changedBuildings.find(entry =>
                entry[1].type === (buildingToDelete as Building).type &&
                entry[1].getPosition()[0] === position[0] &&
                entry[1].getPosition()[1] === position[1] &&
                (entry[1] as Wall).facing === direction);
            if (entryInChangedBuildings == undefined) {
                Controls.changedBuildings.push([false, buildingToDelete]);
            } else if (entryInChangedBuildings[0]) {
                entryInChangedBuildings[0] = false;
            }
            //remove the building from GameState.buildings
            GameState.buildings.splice(GameState.buildings.findIndex(building =>
                building === buildingToDelete), 1);
        }
        Drawing.drawStuff();
    }

	//add = true means add a building, else remove it.
	export function manipulateBorderBuilding(type: BuildingType, direction: Direction, add: boolean): void {
        let targets = HexFunction.neighbors(Controls.selectedFields[0]);
        let target = targets[direction];
        if (add) {
            if (type === BuildingType.WALL) {
                addWall(type, Controls.selectedFields[0], direction, factionToCreateBuildingsFor);
            } else {
                addNonDestructibleBuilding(type, Controls.selectedFields[0], target, factionToCreateBuildingsFor);
            }
        } else {
            if (type === BuildingType.WALL) {
                deleteWall(type, Controls.selectedFields[0], direction);
            } else {
                deleteNonDestructibleBuilding(type, Controls.selectedFields[0], target);
            }
        }
	}

	// the function for the Gm posibility to make an army out of nothing
	export function generateArmyBtn(): boolean {
		let armyMakerBox: ArmyGeneratorBox = GUI.getArmyGeneratorBox();
		BoxVisibility.ownerBuffer = armyMakerBox.getOwnerField().value;
		BoxVisibility.armyIdBuffer = Number(armyMakerBox.getArmyNumberField().value);
		BoxVisibility.countBuffer = Number(armyMakerBox.getCountField().value);
		BoxVisibility.leaderBuffer = Number(armyMakerBox.getLeaderField().value);
		BoxVisibility.mountsBuffer = Number(armyMakerBox.getMountsField().value);
		BoxVisibility.lkpBuffer = Number(armyMakerBox.getLKPField().value);
		BoxVisibility.skpBuffer = Number(armyMakerBox.getSKPField().value);
		BoxVisibility.guardBuffer = false;
		if (BoxVisibility.armyIdBuffer < 101 || BoxVisibility.armyIdBuffer > 399) {
			window.alert("Die Armee-Id muss zwischen 101 und 399 liegen.");
			return false;
		}
		// check for any other armies with the same armyId
		for (let i = 0; i < GameState.armies.length; i++) {
			if (GameState.armies[i].getErkenfaraID() == BoxVisibility.armyIdBuffer &&
				GameState.armies[i].owner.tag === BoxVisibility.ownerBuffer) {
				window.alert("Ein Heer mit dieser Nummer existiert bereits in diesem Königreich.");
				return false;
			}
		}
		// check for catabults in a rider army, and for mounts in a rider army, or fleet
		if (Math.floor(BoxVisibility.armyIdBuffer / 100) == 2) {
			if (BoxVisibility.mountsBuffer > 0 || BoxVisibility.lkpBuffer > 0 || BoxVisibility.skpBuffer > 0) {
				window.alert("In einem Reiterheer sollten weder einzelne Reittiere, noch Katapulte sein. " +
					"Wenn das Heer ein Fußheer sein sollte gib, ihm eine Nummer zwischen 100 und 199.")
				return false;
			}
		} else if (Math.floor(BoxVisibility.armyIdBuffer / 100) == 3) {
			if (BoxVisibility.mountsBuffer > 0) {
				window.alert("In einer Flotte sollten keine Reittiere enthalten sein. Wenn das Heer ein Fußheer sein " +
					"sollte, gib ihm eine Nummer zwischen 100 und 199.")
				return false;
			}
		}
		switchModeTo("armyWithNextClick");
		return true;
	}

	// used to delete the selected army
	export function godDeleteSelectedArmy(): void {
		if (confirm('Are you sure you want to delete your currently selected army?')) {
			GameState.armies[Controls.selectedArmyIndex] = GameState.armies[GameState.armies.length - 1];
			GameState.armies.pop()
		} else {
			// Do nothing!
		}
		Drawing.resizeCanvas();
	}

	// This is used by the infoChangeBox to manipulate an armies Stats.
	export function changeArmyInfo(): void {
		for (let i = 0; i < GameState.armies.length; i++) {
			let infoChangeBox: InfoChangeBox = GUI.getInfoChangeBox();
			if (i != Controls.selectedArmyIndex && GameState.armies[i].owner.tag === infoChangeBox.getOwnerChangeInput().value &&
				GameState.armies[i].getErkenfaraID() === parseInt(infoChangeBox.getArmyIdChangeInput().value)) {
				window.alert("Diese Armee-Id ist in diesem Reich bereits vergeben.");
			} else {
				GameState.armies[Controls.selectedArmyIndex].isGuard = infoChangeBox.getGuardChangeInput().checked;
				for(let i = 0; i>GameState.realms.length; i++){
					// check for the realm tag, not the Name
					if(infoChangeBox.getOwnerChangeInput().value === GameState.realms[i].tag){
						GameState.armies[Controls.selectedArmyIndex].owner = GameState.realms[i];
					}
				}
				GameState.armies[Controls.selectedArmyIndex].setID(Number(infoChangeBox.getArmyIdChangeInput().value));
				GameState.armies[Controls.selectedArmyIndex].setTroopCount(Number(infoChangeBox.getCountChangeInput().value));
				GameState.armies[Controls.selectedArmyIndex].setOfficerCount(Number(infoChangeBox.getLeadersChangeInput().value));
				if (GameState.armies[Controls.selectedArmyIndex] instanceof FootArmy) {
					let armyToChange: FootArmy = GameState.armies[Controls.selectedArmyIndex] as FootArmy;
					armyToChange.setMountCount(Number(infoChangeBox.getMountsChangeInput().value));
				}
				GameState.armies[Controls.selectedArmyIndex].setLightCatapultCount(Number(infoChangeBox.getLKPChangeInput().value));
				GameState.armies[Controls.selectedArmyIndex].setHeavyCatapultCount(Number(infoChangeBox.getSKPChangeInput().value));
				GameState.armies[Controls.selectedArmyIndex].setMovePoints(
					Number(infoChangeBox.getMovePointsChangeInput().value));
				GameState.armies[Controls.selectedArmyIndex].setHeightPoints(
					Number(infoChangeBox.getHeightPointsChangeInput().value));
			}
		}
		Drawing.resizeCanvas();
	}
}