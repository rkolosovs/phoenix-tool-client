import {Constants} from "../constants";
import {GUI} from "./gui";
import {Controls} from "../controls/controlVariables";
import {GameState} from "../gameState";
import {Direction} from "../map/direction";
import {BoxVisibility} from "./boxVisibilty";
import {Army} from "../armies/army";
import {HexFunction} from "../libraries/hexFunctions";
import {Field, FieldType} from "../map/field";
import {BuildingType, Building} from "../buildings/building";
import {Images} from "./images";
import {Wall} from "../buildings/wall";
import {NonDestructibleBuilding} from "../buildings/nonDestructibleBuilding";
import {FootArmy} from "../armies/footArmy";
import {RiderArmy} from "../armies/riderArmy";
import {Fleet} from "../armies/fleet";
import {Saving} from "../serverInteraction/savingFunctions";
import {Loading} from "../serverInteraction/loadingDataFunctions";

export namespace Drawing{
    export let c: number = 1;
    export let gH: number = 1;
    export let gW: number = 1;

    export let switchScale: number = 50;
    // the scale of the elements, specifically the width
    export let scale: number = 16;
    // tileset name. available tilesets: "erkenfara_altestool", "erkenfara_folienzug", "mbits_painted", "simple"
    export let tileset = "mbits_painted";

	export let listOfMultiArmyFields: Army[][] = [];
    export let months: string[] = ['Agul', 'Hawar', 'Rim', 'Naliv', 'Larn', 'Hel', 'Jawan', 'Lud'];

    export function setHexParts(scale: number) {
        c = 0.25 * scale;
        gH = 0.75 * scale;
        gW = Constants.SIN60 * scale;
    }

	// canvas resizing method
	export function resizeCanvas() {
		GUI.getCanvas().width = window.innerWidth;
		GUI.getCanvas().height = window.innerHeight;
		drawStuff();
	}

	// all the stuff to be drawn goes in this method
	export function drawStuff(): void {
		GUI.getContext().clearRect(0, 0, GUI.getCanvas().width, GUI.getCanvas().height); // clear

		// do all drawing/element selection in respect to these coordinates
        // current origin for drawing + offset from dragged mouse
		let pos: [number, number] = [Controls.origin[0] + Controls.move[0], Controls.origin[1] + Controls.move[1]];

		drawMap(pos, scale);
		drawFieldSelection(pos, scale);
		drawArmies(pos, scale);
		drawArmySelection(pos, scale, selectedArmyIndex);
		drawPossibleMoves(pos, scale, selectedArmyIndex);
		drawShootingTargets(pos, scale, selectedArmyIndex);
		writeFieldInfo();
	}

	function drawMap(pos: [number, number], scale: number): void {
		drawFields(pos, scale);
		drawRivers(pos, scale);
		drawBorders(pos, scale);
		drawBuildings(pos, scale);
	}

	function drawBorders(pos: [number, number], scale: number): void {
		let offset = (scale/13); //set offset of a border from the actual border of two hexes
        GameState.realms.forEach(realm => {
            let color: string = realm.color;
            GUI.getContext().lineWidth = (scale/14); //line thickness for borders
            GUI.getContext().strokeStyle = 'rgb('+color+')'; //set line color
            GUI.getContext().lineCap="round";
            GUI.getContext().fillStyle='rgba('+color+', 0.3)'; //set fill color

            let land: Field[] = realm.territory;
            land.forEach(hex => {
                let point = HexFunction.computePosition(pos, hex.coordinates, scale);
                let neighbours = HexFunction.getAdjacency(hex.coordinates,
                    land.map(field => field.coordinates));

                let start;
                if (neighbours[0]) { //determine start in the top corner
                    if (neighbours[1]) {start = [(point[0]+0.5*gW), point[1]];}
                    else {start = [(point[0]+0.5*gW-Constants.SIN60*offset), (point[1]+0.5*offset)];}
                } else {
                    if (neighbours[1]) {start = [(point[0]+0.5*gW+Constants.SIN60*offset), (point[1]+0.5*offset)];}
                    else {start = [(point[0]+0.5*gW), (point[1]+offset)];}
                }

                GUI.getContext().beginPath(); //begin border drawing
                GUI.getContext().moveTo(start[0], start[1]);

                if (neighbours[1]) { //go to upper right corner
                    if (neighbours[2]) {GUI.getContext().moveTo((point[0]+gW), (point[1]+c));}
                    else {GUI.getContext().moveTo((point[0]+gW-Constants.SIN60*offset), (point[1]+c-0.5*offset));}
                } else {
                    if (neighbours[2]) {GUI.getContext().lineTo((point[0]+gW), (point[1]+c+offset));}
                    else {GUI.getContext().lineTo((point[0]+gW-Constants.SIN60*offset), (point[1]+c+0.5*offset));}
                }

                if (neighbours[2]) { //go to lower right corner
                    if (neighbours[3]) {GUI.getContext().moveTo((point[0]+gW), (point[1]+gH));}
                    else {GUI.getContext().moveTo((point[0]+gW), (point[1]+gH-offset));}
                } else {
                    if (neighbours[3]) {GUI.getContext().lineTo((point[0]+gW-Constants.SIN60*offset),
                        (point[1]+gH+0.5*offset));}
                    else {GUI.getContext().lineTo((point[0]+gW-Constants.SIN60*offset), (point[1]+gH-0.5*offset));}
                }

                if (neighbours[3]) { //go to bottom corner
                    if (neighbours[4]) {GUI.getContext().moveTo((point[0]+0.5*gW), (point[1]+scale));}
                    else {GUI.getContext().moveTo(
                        (point[0]+0.5*gW+Constants.SIN60*offset),  (point[1]+scale-0.5*offset));}
                } else {
                    if (neighbours[4]) {GUI.getContext().lineTo((point[0]+0.5*gW-Constants.SIN60*offset),
                        (point[1]+scale-0.5*offset));}
                    else {GUI.getContext().lineTo((point[0]+0.5*gW), (point[1]+scale-offset));}
                }

                if (neighbours[4]) { //go to lower left corner
                    if (neighbours[5]) {GUI.getContext().moveTo(point[0], (point[1]+gH));}
                    else {GUI.getContext().moveTo((point[0]+Constants.SIN60*offset), (point[1]+gH+0.5*offset));}
                } else {
                    if (neighbours[5]) {GUI.getContext().lineTo(point[0], (point[1]+gH-offset));}
                    else {GUI.getContext().lineTo((point[0]+Constants.SIN60*offset), (point[1]+gH-0.5*offset));}
                }

                if (neighbours[5]) { //go to upper left corner
                    if (neighbours[0]) {GUI.getContext().moveTo(point[0], (point[1]+c));}
                    else {GUI.getContext().moveTo(point[0], (point[1]+c+offset));}
                } else {
                    if (neighbours[0]) {GUI.getContext().lineTo(
                        (point[0]+Constants.SIN60*offset), (point[1]+c-0.5*offset));}
                    else {GUI.getContext().lineTo((point[0]+Constants.SIN60*offset), (point[1]+c+0.5*offset));}
                }

                if (neighbours[0]) {GUI.getContext().moveTo(start[0], start[1]);} //back to top corner
                else {GUI.getContext().lineTo(start[0], start[1]);}
                GUI.getContext().stroke();


                GUI.getContext().beginPath(); //begin area filling
                GUI.getContext().moveTo(start[0], start[1]);

                if (neighbours[1]) { //go to upper right corner
                    if (neighbours[2]) {GUI.getContext().lineTo((point[0]+gW), (point[1]+c));}
                    else {GUI.getContext().lineTo((point[0]+gW-Constants.SIN60*offset), (point[1]+c-0.5*offset));}
                } else {
                    if (neighbours[2]) {GUI.getContext().lineTo((point[0]+gW), (point[1]+c+offset));}
                    else {GUI.getContext().lineTo((point[0]+gW-Constants.SIN60*offset), (point[1]+c+0.5*offset));}
                }

                if (neighbours[2]) { //go to lower right corner
                    if (neighbours[3]) {GUI.getContext().lineTo((point[0]+gW), (point[1]+gH));}
                    else {GUI.getContext().lineTo((point[0]+gW), (point[1]+gH-offset));}
                } else {
                    if (neighbours[3]) {GUI.getContext().lineTo(
                        (point[0]+gW-Constants.SIN60*offset), (point[1]+gH+0.5*offset));}
                    else {GUI.getContext().lineTo((point[0]+gW-Constants.SIN60*offset), (point[1]+gH-0.5*offset));}
                }

                if (neighbours[3]) { //go to bottom corner
                    if (neighbours[4]) {GUI.getContext().lineTo((point[0]+0.5*gW), (point[1]+scale));}
                    else {GUI.getContext().lineTo(
                        (point[0]+0.5*gW+Constants.SIN60*offset), (point[1]+scale-0.5*offset));}
                } else {
                    if (neighbours[4]) {GUI.getContext().lineTo(
                        (point[0]+0.5*gW-Constants.SIN60*offset), (point[1]+scale-0.5*offset));}
                    else {GUI.getContext().lineTo((point[0]+0.5*gW), (point[1]+scale-offset));}
                }

                if (neighbours[4]) { //go to lower left corner
                    if (neighbours[5]) {GUI.getContext().lineTo(point[0], (point[1]+gH));}
                    else {GUI.getContext().lineTo((point[0]+Constants.SIN60*offset), (point[1]+gH+0.5*offset));}
                } else {
                    if (neighbours[5]) {GUI.getContext().lineTo(point[0], (point[1]+gH-offset));}
                    else {GUI.getContext().lineTo((point[0]+Constants.SIN60*offset), (point[1]+gH-0.5*offset));}
                }

                if (neighbours[5]) { //go to upper left corner
                    if (neighbours[0]) {GUI.getContext().lineTo(point[0], (point[1]+c));}
                    else {GUI.getContext().lineTo(point[0], (point[1]+c+offset));}
                } else {
                    if (neighbours[0]) {GUI.getContext().lineTo(
                        (point[0]+Constants.SIN60*offset), (point[1]+c-0.5*offset));}
                    else {GUI.getContext().lineTo((point[0]+Constants.SIN60*offset), (point[1]+c+0.5*offset));}
                }

                if (neighbours[0]) {GUI.getContext().lineTo(start[0], start[1]);} //back to top corner
                else {GUI.getContext().lineTo(start[0], start[1]);}
                GUI.getContext().fill();
            });
        });
	}

	function drawBuildings(screenPos: [number, number], scale: number): void {
		GUI.getContext().lineWidth = (scale/8); //line style for roads
		GUI.getContext().strokeStyle="#C8AB37";
		GUI.getContext().lineCap="round";

		for (let i = 0; i < GameState.buildings.length; i++) {
			let building: Building = GameState.buildings[i];
			let buildingPos;
			if(building.type !== BuildingType.STREET){
				buildingPos = HexFunction.computePosition(screenPos, building.getPosition(), scale);
			}
			let tileImg; //declare the tile image variable
			switch(building.type){ //set the tileImg to match the building type
				case BuildingType.CASTLE: tileImg = Images.castle; break;
				case BuildingType.CITY: tileImg = Images.city; break;
				case BuildingType.FORTRESS: tileImg = Images.fortress; break;
				case BuildingType.CAPITAL: tileImg = Images.capital; break;
				case BuildingType.CAPITAL_FORT: tileImg = Images.capitalFort; break;
				case BuildingType.WALL:
				    switch((building as Wall).facing){
                        case Direction.NW: tileImg = Images.wallNW; break;
                        case Direction.NE: tileImg = Images.wallNE; break;
                        case Direction.E: tileImg = Images.wallE; break;
                        case Direction.SE: tileImg = Images.wallSE; break;
                        case Direction.SW: tileImg = Images.wallSW; break;
                        case Direction.W: tileImg = Images.wallW; break;
                        default: tileImg = Images.wallNW; break;
                    }
				    break;
				case BuildingType.HARBOR:
				    let harborDir = HexFunction.getDirectionToNeighbor((building as NonDestructibleBuilding).getPosition(),
                        (building as NonDestructibleBuilding).getSecondPosition());
				    switch(harborDir){
                        case Direction.NW: tileImg = Images.harborNW; break;
                        case Direction.NE: tileImg = Images.harborNE; break;
                        case Direction.E: tileImg = Images.harborE; break;
                        case Direction.SE: tileImg = Images.harborSE; break;
                        case Direction.SW: tileImg = Images.harborSW; break;
                        case Direction.W: tileImg = Images.harborW; break;
                        default: tileImg = Images.harborNW; break;
                    }
				    break;
				case BuildingType.BRIDGE:
                    let bridgeDir = HexFunction.getDirectionToNeighbor((building as NonDestructibleBuilding).getPosition(),
                        (building as NonDestructibleBuilding).getSecondPosition());
                    switch(bridgeDir){
                        case Direction.NW: tileImg = Images.bridgeNW; break;
                        case Direction.NE: tileImg = Images.bridgeNE; break;
                        case Direction.E: tileImg = Images.bridgeE; break;
                        case Direction.SE: tileImg = Images.bridgeSE; break;
                        case Direction.SW: tileImg = Images.bridgeSW; break;
                        case Direction.W: tileImg = Images.bridgeW; break;
                        default: tileImg = Images.bridgeNW; break;
                    }
				    break;
				default: tileImg = Images.default; break;
			}
			if (building.type <= 4) { //regular one tile buildings excluding walls
				GUI.getContext().drawImage(
				    tileImg, buildingPos[0], buildingPos[1], scale*Constants.SIN60, scale); //draw the image
			}
			else if (building.type === 5) { //walls - one tile buildings handled differently from cities
				GUI.getContext().drawImage(
				    tileImg, buildingPos[0], buildingPos[1], scale*Constants.SIN60, scale); //draw the image
			}
			else if (building.type <= 7) { //harbors and bridges - "oversized" buildings
				GUI.getContext().drawImage(tileImg, buildingPos[0]-gW, buildingPos[1]-(0.5*scale), 3*gW, 2*scale); //draw the image
			} else if (building.type === 8) { //streets - currently drawn as simple lines
				let posFirst = HexFunction.computePosition(screenPos, building.getPosition(), scale);
				let posSecond = HexFunction.computePosition(screenPos, building.getPosition(), scale);
				GUI.getContext().beginPath();
				GUI.getContext().moveTo((posFirst[0]+(0.5*gW)), (posFirst[1]+2*c));
				GUI.getContext().lineTo((posSecond[0]+(0.5*gW)), (posSecond[1]+2*c));
				GUI.getContext().stroke();
			}
		}
	}

	function drawRivers(screenPos: [number, number], scale: number): void {
		GUI.getContext().lineWidth = (scale/8);
		GUI.getContext().strokeStyle = "#0099FF";
		GUI.getContext().lineCap = "round";

		GameState.rivers.forEach(river => {
            let pos = HexFunction.computePosition(screenPos, river.leftBank, scale);
            let points = [pos, pos];
            let rowOdd = (((river.leftBank[1])%2) !== 0);

            if((river.leftBank[1]) === (river.rightBank[1])) { //same row (w/e)
                if ((river.leftBank[0]) > (river.rightBank[0])) { //second field left (w)
                    points = [[(pos[0]), (pos[1]+c)], [(pos[0]), (pos[1]+gH)]];
                } else { //second field right (e)
                    points = [[(pos[0]+gW), (pos[1]+c)], [(pos[0]+gW), (pos[1]+gH)]];
                }
            } else if ((river.leftBank[1]) > (river.rightBank[1])) { //second field above (nw/ne)
                //second field right (ne)
                if ((rowOdd && (river.leftBank[0])===(river.rightBank[0])) || (!rowOdd && (river.leftBank[0])<(river.rightBank[0]))) {
                    points = [[(pos[0]+0.5*gW), (pos[1])], [(pos[0]+gW), (pos[1]+c)]];
                } else { //second field left (nw)
                    points = [[(pos[0]), (pos[1]+c)], [(pos[0]+0.5*gW), (pos[1])]];
                }
            } else { //second field below (sw/se)
                //second field right (se)
                if ((rowOdd && (river.leftBank[0])===(river.rightBank[0])) || (!rowOdd && (river.leftBank[0])<(river.rightBank[0]))) {
                    points = [[(pos[0]+0.5*gW), (pos[1]+scale)], [(pos[0]+gW), (pos[1]+gH)]];
                } else { //second field left (sw)
                    points = [[(pos[0]), (pos[1]+gH)], [(pos[0]+0.5*gW), (pos[1]+scale)]];
                }
            }

            GUI.getContext().beginPath();
            GUI.getContext().moveTo((points[0][0]), (points[0][1]));
            GUI.getContext().lineTo((points[1][0]), (points[1][1]));
            GUI.getContext().stroke();
        });
	}

	function drawFields(screenPos: [number, number], scale: number): void { //draw the terrain fields
		let drawingMode = 'image';
		// let drawingMode = 'primitives';
		if (scale < switchScale) {drawingMode = 'primitives';}
		else {drawingMode = 'image';}
		let currentField;
		let tileImg; //declare the tile image variable
		let sortedFields: [number, number][][] = [[], [], [], [], [], [], [], [], [], []];
		GameState.fields.forEach(field => {
		    let hexPosition: [number, number] = HexFunction.computePosition(screenPos, field.coordinates, scale);
		    switch(field.type){ //set the tileImg to match the field type
                case FieldType.SHALLOWS: sortedFields[0].push(hexPosition); break;
                case FieldType.DEEPSEA: sortedFields[1].push(hexPosition); break;
                case FieldType.LOWLANDS: sortedFields[2].push(hexPosition); break;
                case FieldType.WOODS: sortedFields[3].push(hexPosition); break;
                case FieldType.HILLS: sortedFields[4].push(hexPosition); break;
                case FieldType.HIGHLANDS: sortedFields[5].push(hexPosition); break;
                case FieldType.MOUNTAINS: sortedFields[6].push(hexPosition); break;
                case FieldType.DESERT: sortedFields[7].push(hexPosition); break;
                case FieldType.SWAMP: sortedFields[8].push(hexPosition); break;
                default: sortedFields[9].push(hexPosition); break;
            }
        });

		if (drawingMode === 'image') {
			let currFields;
			for (let i = 0; i < sortedFields.length; i++) {
				currFields = sortedFields[i];
				switch(i){
					case FieldType.SHALLOWS: tileImg = Images.shallows; break;
					case FieldType.DEEPSEA: tileImg = Images.deepsea; break;
					case FieldType.LOWLANDS: tileImg = Images.lowlands; break;
					case FieldType.WOODS: tileImg = Images.woods; break;
					case FieldType.HILLS: tileImg = Images.hills; break;
					case FieldType.HIGHLANDS: tileImg = Images.highlands; break;
					case FieldType.MOUNTAINS: tileImg = Images.mountains; break;
					case FieldType.DESERT: tileImg = Images.desert; break;
					case FieldType.SWAMP: tileImg = Images.swamp; break;
					default: tileImg = Images.default; break;
				}

				for (let j = 0; j < currFields.length; j++) {
					currentField = currFields[j];
					//draw the image
					GUI.getContext().drawImage(tileImg, currentField[0], currentField[1], (scale*Constants.SIN60), scale);
				}
			}
		} else if (drawingMode === 'primitives') {
			let currFields;
			for (let i = 0; i < sortedFields.length; i++) {
				currFields = sortedFields[i];
				switch(i){
					case FieldType.SHALLOWS: GUI.getContext().fillStyle = '#7dbada'; break;
					case FieldType.DEEPSEA: GUI.getContext().fillStyle = '#35668b'; break;
					case FieldType.LOWLANDS: GUI.getContext().fillStyle = '#82d33d'; break;
					case FieldType.WOODS: GUI.getContext().fillStyle = '#266d16'; break;
					case FieldType.HILLS: GUI.getContext().fillStyle = '#c19663'; break;
					case FieldType.HIGHLANDS: GUI.getContext().fillStyle = '#854f36'; break;
					case FieldType.MOUNTAINS: GUI.getContext().fillStyle = '#d3d0d0'; break;
					case FieldType.DESERT: GUI.getContext().fillStyle = '#e3a72a'; break;
					case FieldType.SWAMP: GUI.getContext().fillStyle = '#7f40aa'; break;
					default: GUI.getContext().fillStyle = 'Black'; break;
				}

				GUI.getContext().beginPath();
				for (let j = 0; j < currFields.length; j++) {
					currentField = currFields[j];
					GUI.getContext().moveTo((currentField[0]+0.5*gW), currentField[1]);
					GUI.getContext().lineTo((currentField[0]+gW), (currentField[1]+c));
					GUI.getContext().lineTo((currentField[0]+gW), (currentField[1]+gH));
					GUI.getContext().lineTo((currentField[0]+0.5*gW), (currentField[1]+scale));
					GUI.getContext().lineTo(currentField[0], (currentField[1]+gH));
					GUI.getContext().lineTo(currentField[0], (currentField[1]+c));
					GUI.getContext().lineTo((currentField[0]+0.5*gW), currentField[1]);
				}
				GUI.getContext().fill();
			}
		}
	}

	//drawing all possible moves to neighboring fields if army was selected
	function drawPossibleMoves(screenPos: [number, number], scale: number, selectedArmyIndex: number): void {
		if(selectedArmyIndex != undefined){
			let moves = GameState.armies[selectedArmyIndex].possibleMoves;
			for (let i = 0; i < moves.length; i++) {
				GUI.getContext().lineWidth = scale/6;
				GUI.getContext().strokeStyle='#00FF00';
				let pos = HexFunction.computePosition(screenPos, moves[i].destination, scale); //get fields position
				GUI.getContext().beginPath();
				GUI.getContext().arc(pos[0]+(0.5 * scale * Constants.SIN60), pos[1]+(scale * 0.5),
                    scale/12, 0, 2 * Math.PI, false);
				GUI.getContext().stroke();
			}
		}
	}

	function drawFieldSelection(screenPos: [number, number], scale: number): void {
		GUI.getContext().lineWidth = 5;
		GUI.getContext().strokeStyle = "blue";
		for( let i = 0; i < Controls.selectedFields.length; i++){
			let pos = HexFunction.computePosition(screenPos, Controls.selectedFields[i], scale);
			GUI.getContext().beginPath();
			GUI.getContext().arc(pos[0]+(0.5 * scale * Constants.SIN60), pos[1]+(scale * 0.5),
                scale/2, 0, 2 * Math.PI, false);
			GUI.getContext().stroke();
		}
	}

	function drawArmySelection(screenPos: [number, number], scale: number, armyIndex: number): void {
		GUI.getContext().lineWidth = 5;
		GUI.getContext().strokeStyle = "green";
		if(armyIndex !== undefined){
			let pos = HexFunction.computePosition(screenPos, GameState.armies[armyIndex].getPosition(), scale);
			GUI.getContext().beginPath();
			GUI.getContext().arc(pos[0]+(0.5 * scale * Constants.SIN60), pos[1]+(scale * 0.5),
                scale/2.2, 0, 2 * Math.PI, false);
			GUI.getContext().stroke();
		}
	}

	function drawArmies(screenPos: [number, number], scale: number): void {
		//delete all multifields
		for(let k = 0; k < listOfMultiArmyFields.length; k++){
			for(let l = 0; l < listOfMultiArmyFields[k].length; l++){
				listOfMultiArmyFields[k][l].multiArmyField = false;
			}
		}
		listOfMultiArmyFields = [];

		//getting the multifield list ready
		for (let i = 0; i < GameState.armies.length; i++) {
			createMultifield(GameState.armies[i]);
		}

		for (let i = 0; i < GameState.armies.length; i++) {
			let armyData = GameState.armies[i]; // get army coordinates
			let pos = HexFunction.computePosition(screenPos, armyData.getPosition(), scale);
			GUI.getContext().fillStyle = 'black';
			GUI.getContext().textAlign = 'center';
			GUI.getContext().textBaseline = 'middle';
			//GUI.getContext().fillText(armyData.armyId, pos[0]+((scale * 0.866)/2), pos[1]+(scale /2));

			//check if its is on a multifield. if it is ignore
			if(!armyData.onMultifield){
				if(armyData instanceof FootArmy){
					GUI.getContext().drawImage(Images.troops, pos[0], pos[1], (scale*Constants.SIN60), scale);
				} else if(armyData instanceof RiderArmy) {
					GUI.getContext().drawImage(Images.mounts, pos[0], pos[1], (scale*Constants.SIN60), scale);
				} else if(armyData instanceof Fleet) {
					GUI.getContext().drawImage(Images.boats, pos[0], pos[1], (scale*Constants.SIN60), scale);
				}
			}
			if (armyData.owner.tag === login || login === "sl"){
				
				if(armyData.possibleMoves.length > 0){
					drawRemainingMovement(pos, scale);
				}
				else if(armyData instanceof FootArmy && armyData.getMovePoints() === 9){
					drawRemainingMovement(pos, scale);
				}
				else if(armyData instanceof RiderArmy && armyData.getMovePoints() === 21){
					drawRemainingMovement(pos, scale);
				}
				else if(armyData instanceof Fleet && armyData.getMovePoints() >= 42){
					drawRemainingMovement(pos, scale);
				}

				//draw if it took fire
				if(armyData.wasShotAt === true){
					drawTookFire(pos, scale);
				}
			}
			
		}

		//drawing the multifield armies
		for(let j = 0; j < listOfMultiArmyFields.length; j++){//for every field

			for(let i = 0; i < listOfMultiArmyFields[j].length; i++){//for every army on that field
			
			let armyData = listOfMultiArmyFields[j][i]; // get army coordinates
			let pos = HexFunction.computePosition(screenPos, listOfMultiArmyFields[j][i], scale);

			let circleScale = (scale*Constants.SIN60) / listOfMultiArmyFields[j].length;

			//const double Angle = (M_PI * 2.0) / n;
			//Für jedes i-te Objekt dann die Position des Mittelpunktes:
			//const double MidPosX = (cos(Angle * i) * RadiusX) + CirclePosX;
			//const double MidPosY =(sin(Angle * i) * RadiusY) + CirclePosY;
			let angle = (Math.PI * 2.0) / listOfMultiArmyFields[j].length;//Total armies on field
			let xPosArmy = (Math.cos(angle * i) * scale/4) + pos[0] + scale/4;
			let yPosArmy = (Math.sin(angle * i) * scale/4) + pos[1];

				if(armyData instanceof FootArmy){
					GUI.getContext().drawImage(Images.troops, xPosArmy, yPosArmy, circleScale, scale);
				} else if(armyData instanceof RiderArmy) {
					GUI.getContext().drawImage(Images.mounts, xPosArmy, yPosArmy, circleScale, scale);
				} else if(armyData instanceof Fleet) {
					GUI.getContext().drawImage(Images.boats, xPosArmy, yPosArmy, circleScale, scale);
				}
			}

		}
	}

	function drawRemainingMovement(screenPos: [number, number], scale: number): void {
		GUI.getContext().lineWidth = scale/8;
		GUI.getContext().strokeStyle='#00FFFF';
		GUI.getContext().beginPath();
		GUI.getContext().arc(screenPos[0]+(0.5 * scale * Constants.SIN60)-c, screenPos[1]+(scale * 0.5)-c,
            scale/16, Math.PI*1.25, Math.PI*1.75, false);
		GUI.getContext().stroke();
	}

	function drawTookFire(screenPos: [number, number], scale: number): void{
		GUI.getContext().lineWidth = scale/8;
		GUI.getContext().strokeStyle='#FF0000';
		GUI.getContext().beginPath();
		GUI.getContext().arc(screenPos[0]+(0.5 * scale * Constants.SIN60)+c, screenPos[1]+(scale * 0.5)+c,
            scale/16, Math.PI*1.25, Math.PI*1.75, false);
		GUI.getContext().stroke();
	}

	function drawShootingTargets(screenPos: [number, number], scale: number, selectedArmy: Army): void{
		if(selectedArmy != undefined && GameState.armies[selectedArmyIndex].possibleTargets.length > 0 &&
            BoxVisibility.shootingModeOn){
			let targets = GameState.armies[selectedArmyIndex].possibleTargets;
			for (let i = 0; i < targets.length; i++) {
				GUI.getContext().lineWidth = scale/10;
				GUI.getContext().strokeStyle='#FF0000';
				let pos = HexFunction.computePosition(screenPos, targets[i].coordinates, scale); //get fields position
				GUI.getContext().beginPath();
				GUI.getContext().arc(pos[0]+(0.5 * scale * Constants.SIN60), pos[1]+(scale * 0.5),
                    scale/20, 0, 2 * Math.PI, false);
				GUI.getContext().stroke();
			}
		}
	}

	function writeFieldInfo(): void{
		let minimapBox = document.getElementById('minimapBox');
		let index = 0;
		if(BoxVisibility.shootingModeOn){
			index = 1;
		}
		if(Controls.selectedFields[index] == undefined){
			minimapBox.innerHTML = '';
		}else {
			let fieldPositionInList = HexFunction.positionInList(Controls.selectedFields[index]);
			let localfieldType = '';
			switch(HexFunction.fieldType(Controls.selectedFields[index])){
				case 0: localfieldType = 'Wasser'; break;
				case 1: localfieldType = 'Tiefsee'; break;
				case 2: localfieldType = 'Tiefland'; break;
				case 3: localfieldType = 'Wald'; break;
				case 4: localfieldType = 'Hochland'; break;
				case 5: localfieldType = 'Bergland'; break;
				case 6: localfieldType = 'Gebirge'; break;
				case 7: localfieldType = 'Wüste'; break;
				case 8: localfieldType = 'Sumpf'; break;
				default: localfieldType = 'Unbekannt'; break;
			}
			let fieldOwner = GameState.realms.find(realm =>
				(realm.territory.some(field => (field.coordinates[0] === Controls.selectedFields[index][0] &&
                    field.coordinates[1] === Controls.selectedFields[index][1])))
			);
			let fieldOwnerString = (fieldOwner == undefined)?'keiner':fieldOwner.tag;
			minimapBox.innerHTML = '<p>Feld: ('+Controls.selectedFields[index][0]+', '+Controls.selectedFields[index][1]+')'+
				'</p><p>Gelände: '+localfieldType+
				'</p><p>Höhe: '+HexFunction.height(Controls.selectedFields[index])+
				'</p><p>Besitzer: '+fieldOwnerString+'</p>';
		}
	}
	
	export function writeTurnNumber(): void {
		// get the top bar element from the HTML document
		let topBar = GUI.getTopBar();
		let nextTurnBtn: HTMLButtonElement = document.getElementById('nextTurnButton') as HTMLButtonElement;
		let stepBtn: HTMLButtonElement = document.getElementById('stepButton') as HTMLButtonElement;
		let revertBtn: HTMLButtonElement = document.getElementById('revertButton') as HTMLButtonElement;
		let date: HTMLParagraphElement = document.getElementById('date_text') as HTMLParagraphElement;
		let spec: HTMLParagraphElement = document.getElementById('special_text') as HTMLParagraphElement;
		if (nextTurnBtn === null) {
			nextTurnBtn = document.createElement("BUTTON") as HTMLButtonElement;
			nextTurnBtn.id = "nextTurnButton";
			nextTurnBtn.addEventListener('click', function() {
				let message = "";
				if (GameState.currentTurn.realm == undefined) {
					message = "Do you want to end the pre-turn phase?";
				} else if (GameState.currentTurn.status === 'fi') {
					let unprocessedEvents = GameState.pendingNewEvents.some(function(event){
						return (event.getStatus() === 'available' || event.getStatus() === 'withheld' ||
							event.getStatus() === 'impossible');
					});
					if (unprocessedEvents){
						message = "Some events are unprocessed.";
					}
					message += ("Do you want to end processing the turn of " + GameState.currentTurn.realm+"?");
				} else if (login === 'sl') {
					message = "Do you want to end the turn of "+ GameState.currentTurn.realm+"?";
				} else {
					message = "Do you want to end your turn?";
				}

				if (confirm(message)){
					if(login === 'sl' && GameState.currentTurn.status === 'fi') { //SL sends DB change requests
						GameState.pendingNewEvents.forEach(function(event) {
							if(event.getStatus() === 'checked'){
								Saving.sendCheckEvent(event.getPK(), event.getType());
							} else if(event.getStatus() === 'deleted') {
								Saving.sendDeleteEvent(event.getPK(), event.getType());
							}
						}, this);
						Saving.saveBuildings();
						Saving.saveFactionsTerritories();
						Saving.saveArmies();
					} else { //Players and SL during player's turn send events
                        Saving.sendEventlistInOrder();
					}
					Saving.sendNextTurn();
				}
			});
			date = document.createElement("P") as HTMLParagraphElement;
			date.align = "right";
			date.id = "date_text";
			spec = document.createElement("P") as HTMLParagraphElement;
			spec.align = "left";
			spec.id = "special_text";
		}
		
		if (stepBtn == undefined) {
			stepBtn = document.createElement("BUTTON") as HTMLButtonElement;
			stepBtn.id = "stepButton";
			stepBtn.style.backgroundImage = "url(images/step_button.svg)";
			stepBtn.addEventListener('click', function() {
				if(login === 'sl'){
					if (confirm("Do you want to save the events handled so far without ending the turn?" +
							" Once saved the progress can't be reverted anymore.")){
						GameState.pendingNewEvents.forEach(function(event) {
							if(event.getStatus() === 'checked'){
								Saving.sendCheckEvent(event.getPK(), event.getType());
							} else if(event.getStatus() === 'deleted') {
								Saving.sendDeleteEvent(event.getPK(), event.getType());
							}
						}, this);
						GameState.pendingNewEvents = [];
						preparedEvents = [];
						Saving.saveBuildings();
						Saving.saveFactionsTerritories();
						Saving.saveArmies();
					}
				} else {
					if (confirm("Do you want to save the events issued so far without ending the turn?" +
					" Once saved the progress can only be reverted by the SL.")){
						console.log(3);
                        Saving.sendEventlistInOrder();
					}
				}
			});
		}

		if (revertBtn == undefined) {
			revertBtn = document.createElement("BUTTON") as HTMLButtonElement;
			revertBtn.id = "revertButton";
			revertBtn.style.backgroundImage = "url(images/revert_button.svg)";
			revertBtn.addEventListener('click', function() {
				if (confirm("Do you want to revert the events handled so far?")){
					GameState.pendingNewEvents = [];
					preparedEvents = [];
					Loading.loadArmies();
					Loading.loadBuildingData();
					Loading.loadBorderData();
					Loading.loadPendingEvents();
					writeTurnNumber();
					drawStuff();
				}
			});
		}
		
		if (login !== 'sl' && (GameState.currentTurn.realm == undefined || GameState.currentTurn.status === 'fi' ||
                login !== GameState.currentTurn.realm)) {
			// if not logged in as the current realm or SL
			nextTurnBtn.disabled = true;
			nextTurnBtn.style.cursor = "not-allowed";
			nextTurnBtn.style.backgroundImage = "url(images/nextturn_button_disabled.svg)";
			stepBtn.disabled = true;
			stepBtn.style.cursor = "not-allowed";
			revertBtn.disabled = true;
			revertBtn.style.cursor = "not-allowed";
		} else {
			nextTurnBtn.disabled = false;
			nextTurnBtn.style.cursor = "initial";
			nextTurnBtn.style.backgroundImage = "url(images/nextturn_button.svg)";
			stepBtn.disabled = false;
			stepBtn.style.cursor = "initial";
			revertBtn.disabled = false;
			revertBtn.style.cursor = "initial";
		}
		
		if(login === 'sl' && GameState.currentTurn.status === 'fi') {
			Loading.loadPendingEvents();
			BoxVisibility.show(GUI.getBigBox().getEventTabsButton());
		} else {
            BoxVisibility.hide(GUI.getBigBox().getEventTabsButton());
			stepBtn.disabled = true;
			stepBtn.style.cursor = "not-allowed";
			revertBtn.disabled = true;
			revertBtn.style.cursor = "not-allowed";
		}
		
		date.innerHTML =  "Monat " + months[GameState.currentTurn.turn%8] + " des Jahres "+
            Math.ceil(GameState.currentTurn.turn/8) + " (Zug " + GameState.currentTurn.turn + ", ";
		if (GameState.currentTurn.realm == undefined || GameState.currentTurn.status === 'fi') {
			// GM's turn
			date.innerHTML += "SL) ";
		} else { // a realm's turn
			date.innerHTML += GameState.currentTurn.realm + ") ";
		}
		date.setAttribute("width", "340px");
		date.setAttribute("float", "left");
		date.setAttribute("line-height", "30px");
		
		if (GameState.currentTurn.turn%8 === 1 || GameState.currentTurn.turn%8 === 5) {
			spec.innerHTML =  " Rüstmonat";
			date.setAttribute("width", "100px");
			date.setAttribute("float", "left");
			date.setAttribute("line-height", "30px");
		} else if (GameState.currentTurn.turn%8 === 4 || GameState.currentTurn.turn%8 === 0) {
			spec.innerHTML =  " Einkommensmonat";
			date.setAttribute("width", "160px");
			date.setAttribute("float", "left");
			date.setAttribute("line-height", "30px");
		}
		date.setAttribute("width", "0px");
		date.setAttribute("float", "left");
		date.setAttribute("line-height", "30px");
		
		topBar.innerHTML = '';
		topBar.appendChild(date);
		topBar.appendChild(nextTurnBtn);
		topBar.appendChild(stepBtn);
		topBar.appendChild(revertBtn);
		topBar.appendChild(spec);
	}

}