// TODO: before pushing check added and deleted buildings if one is already inside the other, if it is then delete it.
import { GameState } from "../gameState";
import { GUI } from "../gui/gui";
import { BoxVisibility } from "../gui/boxVisibilty";
import { Drawing } from "../gui/drawingFunctions";
import { Realm } from "../realm";
import { ProductionBuilding } from "../buildings/productionBuilding";
import { HexFunction } from "../libraries/hexFunctions";
import { River } from "../map/river";
import { ArmyGeneratorBox } from "../gui/armyGeneratorBox";
import { InfoChangeBox } from "../gui/infoChangeBox";
import { Controls } from "../controls/controlVariables";
import { Direction } from "../map/direction";
import { BuildingType } from "../buildings/building";
import { NonDestructibleBuilding } from "../buildings/nonDestructibleBuilding";
import { Wall } from "../buildings/wall";
import { FootArmy } from "../armies/footArmy";
import { Army } from "../armies/army";
import { Fleet } from "../armies/fleet";

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

	// add a castle in the selectedField
	export function addCastle(): void {
		let sf = Controls.selectedFields[0];
		let found = false;
		for (let i = 0; i < GameState.buildings.length; i++) {
			let building = GameState.buildings[i]
			if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] == sf[1]) {
				GameState.buildings[i].type = 0;
				found = true;
			}
		}
		if (found) {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(0, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);	//<----------------------------------------Realm
			// console.log({"type": 0, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(0, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			GameState.buildings.push(new ProductionBuilding(0, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500));
			//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
		}
		Drawing.resizeCanvas()
	}

	// add a city in the selectedField
	export function addCity(): void {
		let sf = Controls.selectedFields[0];
		let found = false;
		for (let i = 0; i < GameState.buildings.length; i++) {
			let building = GameState.buildings[i]
			if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
				GameState.buildings[i].type = 1;
				found = true;
			}
		}
		if (found) {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(1, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			// console.log({"type": 1, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(0, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			GameState.buildings.push(new ProductionBuilding(1, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500));
			//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
		}
		Drawing.resizeCanvas()
	}

	// add a fortress in the selectedField
	export function addFortress(): void {
		let sf = Controls.selectedFields[0];
		let found = false;
		for (let i = 0; i < GameState.buildings.length; i++) {
			let building = GameState.buildings[i]
			if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
				GameState.buildings[i].type = 2;
				found = true;
			}
		}
		if (found) {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(2, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			// console.log({"type": 2, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(2, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			GameState.buildings.push(new ProductionBuilding(2, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500));
			//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);

		}
		Drawing.resizeCanvas()
	}

	// add a capital city in the selectedField
	export function addCapital(): void {
		let sf = Controls.selectedFields[0];
		let found = false;
		for (let i = 0; i < GameState.buildings.length; i++) {
			let building = GameState.buildings[i];
			if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
				GameState.buildings[i].type = 3;
				found = true;
			}
		}
		if (found) {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(3, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			// console.log({"type": 3, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(3, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			GameState.buildings.push(new ProductionBuilding(3, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500));
			//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
		}
		Drawing.resizeCanvas();
	}

	// add a capital fortress in the selectedField
	export function addCapitalFortress(): void {
		let sf = Controls.selectedFields[0];
		let found = false;
		for (let i = 0; i < GameState.buildings.length; i++) {
			let building = GameState.buildings[i]
			if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
				GameState.buildings[i].type = 4;
				found = true;
			}
		}
		if (found) {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(4, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			// console.log({"type": 4, "x": sf[0], "y": sf[1], "realm":factionToCreateBuildingsFor});
		} else {
			Controls.changedBuildings.push(
				[true, new ProductionBuilding(4, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500)]);
			GameState.buildings.push(new ProductionBuilding(4, "", [sf[0], sf[1]], factionToCreateBuildingsFor, 500));
			//TODO correct BP
			// console.log("this is a new:");
			// console.log(changedBuildings[changedBuildings.length-1]);
		}
		Drawing.resizeCanvas()
	}

	// delete the building in the selectedField
	export function deleteBuilding(): void {
		let sf = Controls.selectedFields[0];
		for (let i = 0; i < GameState.buildings.length; i++) {
			let building = GameState.buildings[i];
			if (building.type < 5 && building.getPosition()[0] === sf[0] && building.getPosition()[1] === sf[1]) {
				Controls.changedBuildings.push([false, GameState.buildings[i]]);
				if (i === GameState.buildings.length - 1) {
					GameState.buildings.pop();
				} else {
					GameState.buildings.splice(i, 1);
				}
			}
		}
		Drawing.resizeCanvas()
	}

	// adds a street in the target direction
	export function addStreet(direction: Direction): void {
		let sf = Controls.selectedFields[0];
		let targets = HexFunction.neighbors(sf);
		let target = targets[direction];
		let found = false;
		for (let i = 0; i < GameState.buildings.length; i++) {
			if (GameState.buildings[i].type === 8) {
				let building = GameState.buildings[i] as NonDestructibleBuilding;//TODO change this to accomodate new Types probably with differentlist for streets
				if (((building.getPosition()[0] === sf[0] && building.getSecondPosition()[1] === sf[1] &&
					building.getSecondPosition()[0] === target[0] && building.getSecondPosition()[1] === target[1])) ||
					(building.type === 8 && (building.getPosition()[0] === target[0] &&
						building.getPosition()[1] === target[1] && building.getSecondPosition()[0] === sf[0] &&
						building.getSecondPosition()[1] === sf[1]))) {
					found = true;
				}
			}
		}
		if (found) {
		} else {
			let newStreet: NonDestructibleBuilding =
				new NonDestructibleBuilding(8, [sf[0], sf[1]], [target[0], target[1]], factionToCreateBuildingsFor);
			Controls.changedBuildings.push([true, newStreet]);
			GameState.buildings.push(newStreet);
			Controls.selectedFields[0] = [target[0], target[1]];
		}
		Drawing.resizeCanvas()
	}

	// removes a street in the target direction
	export function removeStreet(direction: Direction): void {
		let sf = Controls.selectedFields[0];
		let targets = HexFunction.neighbors(sf);
		let target = targets[direction];
		let found = undefined;
		for (let i = 0; i < GameState.buildings.length; i++) {
			if (GameState.buildings[i].type === 8) {
				let building = GameState.buildings[i] as NonDestructibleBuilding;//TODO change this to accomodate new Types probably with differentlist for streets
				if (building.type === 8 && ((building.getPosition()[0] === sf[0] &&
					building.getPosition()[1] === sf[1] && building.getSecondPosition()[0] === target[0] &&
					building.getSecondPosition()[1] === target[1]) ||
					(building.getPosition()[0] === target[0] && building.getPosition()[1] === target[1] &&
						building.getSecondPosition()[0] === sf[0] && building.getSecondPosition()[1] === sf[1]))) {
					found = i;
				}
			}
		}
		if (found != undefined) {
			let streetToRemove: NonDestructibleBuilding =
				new NonDestructibleBuilding(8, [sf[0], sf[1]], [target[0], target[1]], factionToCreateBuildingsFor);
			changedBuildings.push([false, streetToRemove]);
			if (found === GameState.buildings.length - 1) {
				GameState.buildings.pop();
				Controls.selectedFields[0] = [target[0], target[1]];
			} else {
				GameState.buildings.splice(found, 1);
				Controls.selectedFields[0] = [target[0], target[1]];
			}
		}
		Drawing.resizeCanvas();
	}

	// adds a river in the target direction
	export function addRiver(direction: Direction): void {
		let sf = Controls.selectedFields[0];
		let targets = HexFunction.neighbors(sf);
		let target = targets[direction];
		let found = false;
		for (let i = 0; i < GameState.rivers.length; i++) {
			let river = GameState.rivers[i];
			if ((river.rightBank[0] === sf[0] && river.rightBank[1] === sf[1] && river.leftBank[0] === target[0] &&
				river.leftBank[1] === target[1]) ||
				(river.leftBank[0] === sf[0] && river.leftBank[1] === sf[1] && river.rightBank[0] === target[0] &&
					river.rightBank[1] === target[1])) {
				found = true;
			}
		}
		if (found) {
		} else {
			GameState.rivers.push(new River([sf[0], sf[1]], [target[0], target[1]]));
		}
		Drawing.resizeCanvas();
	}

	// removes a river in the target direction
	export function removeRiver(direction: Direction): void {
		let sf = Controls.selectedFields[0];
		let targets = HexFunction.neighbors(sf);
		let target = targets[direction];
		let found = undefined;
		for (let i = 0; i < GameState.rivers.length; i++) {
			let river = GameState.rivers[i];
			if ((river.rightBank[0] == sf[0] && river.rightBank[1] == sf[1] && river.leftBank[0] == target[0] &&
				river.leftBank[1] == target[1]) ||
				(river.leftBank[0] == sf[0] && river.leftBank[1] == sf[1] && river.rightBank[0] == target[0] &&
					river.rightBank[1] == target[1])) {
				found = i;
			}
		}
		if (found != undefined) {
			if (found == GameState.rivers.length - 1) {
				GameState.rivers.pop();
			} else {
				GameState.rivers.splice(found, 1);
			}
		}
		Drawing.resizeCanvas();
	}

	//add = true means add a building, else remove it.
	export function manipulateBorderBuilding(type: BuildingType, direction: Direction, add: boolean): void {
		let sf = Controls.selectedFields[0];
		let found: number | undefined = undefined;
		let wallFound: Wall | undefined = undefined;
		for (let i = 0; i < GameState.buildings.length; i++) {
			if (GameState.buildings[i].type === 5) {
				let building = GameState.buildings[i] as Wall;
				if (building.type === type && (building.getPosition()[0] == sf[0] && building.getPosition()[1] == sf[1] && building.facing == direction)) {
					found = i;
					wallFound = GameState.buildings[i] as Wall;
				}
			}
		}
		if (add) {
			let wallToAdd: Wall = new Wall(5, [sf[0], sf[1],], factionToCreateBuildingsFor, 100, direction, 400);
			if (found !== undefined) {
				Controls.changedBuildings.push([true, wallToAdd]);
			} else {
				Controls.changedBuildings.push([true, wallToAdd]);
				GameState.buildings.push(wallToAdd);
			}
		} else {
			if (found !== undefined) {
				if (wallFound !== undefined) {
					Controls.changedBuildings.push([false, wallFound]);
				}
				if (found === GameState.buildings.length - 1) {
					GameState.buildings.pop();
				} else {
					GameState.buildings.splice(found, 1);
				}
			}
		}
		Drawing.resizeCanvas();
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
		// TODO be able to generate guard armies
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
		if (confirm('Are you sure you want to delete your currenty selected army?')) {
			GameState.armies[selectedArmyIndex] = GameState.armies[GameState.armies.length - 1];
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
			if (i != selectedArmyIndex && GameState.armies[i].owner.tag === infoChangeBox.getOwnerChangeInput().value &&
				GameState.armies[i].getErkenfaraID() === parseInt(infoChangeBox.getArmyIdChangeInput().value)) {
				window.alert("Diese Armee-Id ist in diesem Reich bereits vergeben.");
			} else {
				GameState.armies[selectedArmyIndex].isGuard = infoChangeBox.getGuardChangeInput().checked;
				for(let i = 0; i>GameState.realms.length; i++){
					// check for the realm tag, not the Name
					if(infoChangeBox.getOwnerChangeInput().value === GameState.realms[i].tag){
						GameState.armies[selectedArmyIndex].owner = GameState.realms[i];
					}
				}
				GameState.armies[selectedArmyIndex].setID(Number(infoChangeBox.getArmyIdChangeInput().value));
				GameState.armies[selectedArmyIndex].setTroopCount(Number(infoChangeBox.getCountChangeInput().value));
				GameState.armies[selectedArmyIndex].setOfficerCount(Number(infoChangeBox.getLeadersChangeInput().value));
				if (GameState.armies[selectedArmyIndex] instanceof FootArmy) {
					let armyToChange: FootArmy = GameState.armies[selectedArmyIndex] as FootArmy;
					armyToChange.setMountCount(Number(infoChangeBox.getMountsChangeInput().value));
				}
				GameState.armies[selectedArmyIndex].setLightCatapultCount(Number(infoChangeBox.getLKPChangeInput().value));
				GameState.armies[selectedArmyIndex].setHeavyCatapultCount(Number(infoChangeBox.getSKPChangeInput().value));
				GameState.armies[selectedArmyIndex].setMovePoints(
					Number(infoChangeBox.getMovePointsChangeInput().value));
				GameState.armies[selectedArmyIndex].setHeightPoints(
					Number(infoChangeBox.getHeightPointsChangeInput().value));
			}
		}
		Drawing.resizeCanvas();
	}
}