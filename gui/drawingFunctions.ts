'use strict';
namespace Drawing{
	export let listOfMultiArmyFields = [];

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
		let x = originX + moveX; // current x origin for drawing + x offset from
									// dragged mouse
		let y = originY + moveY; // current y origin for drawing + y offset from
									// dragged mouse

		drawMap(x, y, scale);
		drawFieldSelection(x, y, scale);
		drawArmies(x, y, scale);
		drawArmySelection(x, y, scale, selectedArmyIndex);
		drawPossibleMoves(x, y, scale, selectedArmyIndex);
		drawShootingTargets(x, y, scale, selectedArmyIndex);
		writeFieldInfo();
	}

	function drawMap(x: number, y: number, scale: number): void {
		drawFields(x, y, scale);
		drawRivers(x, y, scale);
		drawBorders(x, y, scale);
		drawBuildings(x, y, scale);
	}

	function drawBorders(x: number, y: number, scale: number): void {
		let offset = (scale/13); //set offset of a border from the actual border of two hexes
		for (let i = 0; i < borders.length; i++) { //for each realm with borders
			let tag = borders[i].tag;
			let land = borders[i].land;
			let color;
			for (let j = 0; j < realms.length; j++) { //find the color corresponding to the tag
				if(realms[j].tag === tag){
					color = realms[j].color;
					break;
				}
			}

			GUI.getContext().lineWidth = (scale/14); //line thickness for borders
			GUI.getContext().strokeStyle = 'rgb('+color+')'; //set line color
			GUI.getContext().lineCap="round";
			GUI.getContext().fillStyle='rgba('+color+', 0.3)'; //set fill color
			for (let j = 0; j < land.length; j++) { //for each occupied hex
				let hex = land[j];
				let point = computePosition(x, y, hex[0], hex[1], scale);
				let neighbours = getAdjacency(hex, land);

				let start;
				if (neighbours[5]) { //determine start in the top corner
					if (neighbours[0]) {start = [(point[0]+0.5*gW), point[1]];} 
					else {start = [(point[0]+0.5*gW-SIN60*offset), (point[1]+0.5*offset)];}
				} else {
					if (neighbours[0]) {start = [(point[0]+0.5*gW+SIN60*offset), (point[1]+0.5*offset)];} 
					else {start = [(point[0]+0.5*gW), (point[1]+offset)];}
				}

				GUI.getContext().beginPath(); //begin border drawing
				GUI.getContext().moveTo(start[0], start[1]);

				if (neighbours[0]) { //go to upper right corner
					if (neighbours[1]) {GUI.getContext().moveTo((point[0]+gW), (point[1]+c));}
					else {GUI.getContext().moveTo((point[0]+gW-SIN60*offset), (point[1]+c-0.5*offset));}
				} else {
					if (neighbours[1]) {GUI.getContext().lineTo((point[0]+gW), (point[1]+c+offset));}
					else {GUI.getContext().lineTo((point[0]+gW-SIN60*offset), (point[1]+c+0.5*offset));}
				}

				if (neighbours[1]) { //go to lower right corner
					if (neighbours[2]) {GUI.getContext().moveTo((point[0]+gW), (point[1]+gH));}
					else {GUI.getContext().moveTo((point[0]+gW), (point[1]+gH-offset));}
				} else {
					if (neighbours[2]) {GUI.getContext().lineTo((point[0]+gW-SIN60*offset), (point[1]+gH+0.5*offset));}
					else {GUI.getContext().lineTo((point[0]+gW-SIN60*offset), (point[1]+gH-0.5*offset));}
				}

				if (neighbours[2]) { //go to bottom corner
					if (neighbours[3]) {GUI.getContext().moveTo((point[0]+0.5*gW), (point[1]+scale));}
					else {GUI.getContext().moveTo((point[0]+0.5*gW+SIN60*offset), (point[1]+scale-0.5*offset));}
				} else {
					if (neighbours[3]) {GUI.getContext().lineTo((point[0]+0.5*gW-SIN60*offset), (point[1]+scale-0.5*offset));}
					else {GUI.getContext().lineTo((point[0]+0.5*gW), (point[1]+scale-offset));}
				}

				if (neighbours[3]) { //go to lower left corner
					if (neighbours[4]) {GUI.getContext().moveTo(point[0], (point[1]+gH));}
					else {GUI.getContext().moveTo((point[0]+SIN60*offset), (point[1]+gH+0.5*offset));}
				} else {
					if (neighbours[4]) {GUI.getContext().lineTo(point[0], (point[1]+gH-offset));}
					else {GUI.getContext().lineTo((point[0]+SIN60*offset), (point[1]+gH-0.5*offset));}
				}

				if (neighbours[4]) { //go to upper left corner
					if (neighbours[5]) {GUI.getContext().moveTo(point[0], (point[1]+c));}
					else {GUI.getContext().moveTo(point[0], (point[1]+c+offset));}
				} else {
					if (neighbours[5]) {GUI.getContext().lineTo((point[0]+SIN60*offset), (point[1]+c-0.5*offset));}
					else {GUI.getContext().lineTo((point[0]+SIN60*offset), (point[1]+c+0.5*offset));}
				}

				if (neighbours[5]) {GUI.getContext().moveTo(start[0], start[1]);} //back to top corner
				else {GUI.getContext().lineTo(start[0], start[1]);}
				GUI.getContext().stroke();


				GUI.getContext().beginPath(); //begin area filling
				GUI.getContext().moveTo(start[0], start[1]);

				if (neighbours[0]) { //go to upper right corner
					if (neighbours[1]) {GUI.getContext().lineTo((point[0]+gW), (point[1]+c));}
					else {GUI.getContext().lineTo((point[0]+gW-SIN60*offset), (point[1]+c-0.5*offset));}
				} else {
					if (neighbours[1]) {GUI.getContext().lineTo((point[0]+gW), (point[1]+c+offset));}
					else {GUI.getContext().lineTo((point[0]+gW-SIN60*offset), (point[1]+c+0.5*offset));}
				}

				if (neighbours[1]) { //go to lower right corner
					if (neighbours[2]) {GUI.getContext().lineTo((point[0]+gW), (point[1]+gH));}
					else {GUI.getContext().lineTo((point[0]+gW), (point[1]+gH-offset));}
				} else {
					if (neighbours[2]) {GUI.getContext().lineTo((point[0]+gW-SIN60*offset), (point[1]+gH+0.5*offset));}
					else {GUI.getContext().lineTo((point[0]+gW-SIN60*offset), (point[1]+gH-0.5*offset));}
				}

				if (neighbours[2]) { //go to bottom corner
					if (neighbours[3]) {GUI.getContext().lineTo((point[0]+0.5*gW), (point[1]+scale));}
					else {GUI.getContext().lineTo((point[0]+0.5*gW+SIN60*offset), (point[1]+scale-0.5*offset));}
				} else {
					if (neighbours[3]) {GUI.getContext().lineTo((point[0]+0.5*gW-SIN60*offset), (point[1]+scale-0.5*offset));}
					else {GUI.getContext().lineTo((point[0]+0.5*gW), (point[1]+scale-offset));}
				}

				if (neighbours[3]) { //go to lower left corner
					if (neighbours[4]) {GUI.getContext().lineTo(point[0], (point[1]+gH));}
					else {GUI.getContext().lineTo((point[0]+SIN60*offset), (point[1]+gH+0.5*offset));}
				} else {
					if (neighbours[4]) {GUI.getContext().lineTo(point[0], (point[1]+gH-offset));}
					else {GUI.getContext().lineTo((point[0]+SIN60*offset), (point[1]+gH-0.5*offset));}
				}

				if (neighbours[4]) { //go to upper left corner
					if (neighbours[5]) {GUI.getContext().lineTo(point[0], (point[1]+c));}
					else {GUI.getContext().lineTo(point[0], (point[1]+c+offset));}
				} else {
					if (neighbours[5]) {GUI.getContext().lineTo((point[0]+SIN60*offset), (point[1]+c-0.5*offset));}
					else {GUI.getContext().lineTo((point[0]+SIN60*offset), (point[1]+c+0.5*offset));}
				}

				if (neighbours[5]) {GUI.getContext().lineTo(start[0], start[1]);} //back to top corner
				else {GUI.getContext().lineTo(start[0], start[1]);}
				GUI.getContext().fill();
			}
		}
	}

	function drawBuildings(x: number, y: number, scale: number): void {
		GUI.getContext().lineWidth = (scale/8); //line style for roads
		GUI.getContext().strokeStyle="#C8AB37";
		GUI.getContext().lineCap="round";

		for (let i = 0; i < buildings.length; i++) {
			let building = buildings[i];
			let pos;
			if(building.type !== 8){
				pos = computePosition(x, y, building.x, building.y, scale);
			}
			let tileImg; //declare the tile image variable
			switch(building.type){ //set the tileImg to match the building type
				case BuildingType.CASTLE: tileImg = castleImg;
				break;

				case BuildingType.CITY: tileImg = cityImg;
				break;

				case BuildingType.FORTRESS: tileImg = fortressImg;
				break;

				case BuildingType.CAPITAL: tileImg = capitalImg;
				break;

				case BuildingType.CAPITAL_FORT: tileImg = capitalFortImg;
				break;

				case BuildingType.WALL: if (building.direction === 'w'){tileImg = wallWImg;}
				else if (building.direction === 'e'){tileImg = wallEImg;}
				else if (building.direction === 'nw'){tileImg = wallNWImg;}
				else if (building.direction === 'sw'){tileImg = wallSWImg;}
				else if (building.direction === 'ne'){tileImg = wallNEImg;}
				else if (building.direction === 'se'){tileImg = wallSEImg;}
				break;

				case BuildingType.HARBOR: if (building.direction === 'w'){tileImg = harborWImg;}
				else if (building.direction === 'e'){tileImg = harborEImg;}
				else if (building.direction === 'nw'){tileImg = harborNWImg;}
				else if (building.direction === 'sw'){tileImg = harborSWImg;}
				else if (building.direction === 'ne'){tileImg = harborNEImg;}
				else if (building.direction === 'se'){tileImg = harborSEImg;}
				break;

				case BuildingType.BRIDGE: if (building.direction === 'w'){tileImg = bridgeWImg;}
				else if (building.direction === 'e'){tileImg = bridgeEImg;}
				else if (building.direction === 'nw'){tileImg = bridgeNWImg;}
				else if (building.direction === 'sw'){tileImg = bridgeSWImg;}
				else if (building.direction === 'ne'){tileImg = bridgeNEImg;}
				else if (building.direction === 'se'){tileImg = bridgeSEImg;}
				break;



				default: tileImg = defaultImg;
				break;
			}
			if (building.type <= 4) { //regular one tile buildings excluding walls
				GUI.getContext().drawImage(tileImg, pos[0], pos[1], scale*SIN60, scale); //draw the image
			}
			else if (building.type === 5) { //walls - one tile buildings handled differently from cities
				GUI.getContext().drawImage(tileImg, pos[0], pos[1], scale*SIN60, scale); //draw the image
			}
			else if (building.type <= 7) { //harbors and bridges - "oversized" buildings
				GUI.getContext().drawImage(tileImg, pos[0]-gW, pos[1]-(0.5*scale), 3*gW, 2*scale); //draw the image
			} else if (building.type === 8) { //streets - currently drawn as simple lines
				var posFirst = computePosition(x, y, building.firstX, building.firstY, scale);
				var posSecond = computePosition(x, y, building.secondX, building.secondY, scale);
				GUI.getContext().beginPath();
				GUI.getContext().moveTo((posFirst[0]+(0.5*gW)), (posFirst[1]+2*c));
				GUI.getContext().lineTo((posSecond[0]+(0.5*gW)), (posSecond[1]+2*c));
				GUI.getContext().stroke();
			}
		}
	}

	function drawRivers(x: number, y: number, scale: number): void {
		GUI.getContext().lineWidth = (scale/8);
		GUI.getContext().strokeStyle="#0099FF";
		GUI.getContext().lineCap="round";

		for (let i = 0; i < rivers.length; i++) {
			let river = rivers[i];
			let pos = computePosition(x, y, (river[0][0]), (river[0][1]), scale);
			let points = [pos, pos];
			let rowOdd = (((river[0][1])%2) !== 0);

			if((river[0][1]) === (river[1][1])) { //same row (w/e)
				if ((river[0][0]) > (river[1][0])) { //second field left (w)
					points = [[(pos[0]), (pos[1]+c)], [(pos[0]), (pos[1]+gH)]];
				} else { //second field right (e)
					points = [[(pos[0]+gW), (pos[1]+c)], [(pos[0]+gW), (pos[1]+gH)]];
				}
			} else if ((river[0][1]) > (river[1][1])) { //second field above (nw/ne)
					//second field right (ne)
				if ((rowOdd && (river[0][0])===(river[1][0])) || (!rowOdd && (river[0][0])<(river[1][0]))) { 
					points = [[(pos[0]+0.5*gW), (pos[1])], [(pos[0]+gW), (pos[1]+c)]];
				} else { //second field left (nw)
					points = [[(pos[0]), (pos[1]+c)], [(pos[0]+0.5*gW), (pos[1])]];
				}
			} else { //second field below (sw/se)
					 //second field right (se)
				if ((rowOdd && (river[0][0])===(river[1][0])) || (!rowOdd && (river[0][0])<(river[1][0]))) {
					points = [[(pos[0]+0.5*gW), (pos[1]+scale)], [(pos[0]+gW), (pos[1]+gH)]];
				} else { //second field left (sw)
					points = [[(pos[0]), (pos[1]+gH)], [(pos[0]+0.5*gW), (pos[1]+scale)]];
				}
			}

			GUI.getContext().beginPath();
			GUI.getContext().moveTo((points[0][0]), (points[0][1]));
			GUI.getContext().lineTo((points[1][0]), (points[1][1]));
			GUI.getContext().stroke();
		}
	}

	function drawFields(x: number, y: number, scale: number): void { //draw the terrain fields
		let drawingMode = 'image';
		// let drawingMode = 'primitives';
		if (scale < switchScale) {drawingMode = 'primitives';}
		else {drawingMode = 'image';}
		let currentField;
		let tileImg; //declare the tile image variable
		let pos;
		let sortedFields = [[], [], [], [], [], [], [], [], [], []];
		for (let i = 0; i < fields.length; i++) { //gather and sort all fields
			currentField = fields[i]; //get the current field to draw
				
			switch(currentField.type){ //set the tileImg to match the field type
				case FieldType.SHALLOWS: sortedFields[0].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				case FieldType.DEEPSEA: sortedFields[1].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				case FieldType.LOWLANDS: sortedFields[2].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				case FieldType.WOODS: sortedFields[3].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				case FieldType.HILLS: sortedFields[4].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				case FieldType.HIGHLANDS: sortedFields[5].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				case FieldType.MOUNTAINS: sortedFields[6].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				case FieldType.DESERT: sortedFields[7].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				case FieldType.SWAMP: sortedFields[8].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;

				default: sortedFields[9].push(computePosition(x, y, currentField.x, currentField.y, scale));
				break;
			}
		}

		if (drawingMode === 'image') {
			let currFields;
			for (let i = 0; i < sortedFields.length; i++) {
				currFields = sortedFields[i];
				switch(i){
					case 0: tileImg = shallowsImg;
					break;
					case 1: tileImg = deepseaImg;
					break;
					case 2: tileImg = lowlandsImg;
					break;
					case 3: tileImg = woodsImg;
					break;
					case 4: tileImg = hillsImg;
					break;
					case 5: tileImg = highlandsImg;
					break;
					case 6: tileImg = mountainsImg;
					break;
					case 7: tileImg = desertImg;
					break;
					case 8: tileImg = swampImg;
					break;
					default: tileImg = defaultImg;
					break;
				}

				for (let j = 0; j < currFields.length; j++) {
					currentField = currFields[j];
					//draw the image
					GUI.getContext().drawImage(tileImg, currentField[0], currentField[1], (scale*SIN60), scale); 
				}
			}
		} else if (drawingMode === 'primitives') {
			let currFields;
			for (let i = 0; i < sortedFields.length; i++) {
				currFields = sortedFields[i];
				switch(i){
					case 0: GUI.getContext().fillStyle = 'Aqua';
					break;
					case 1: GUI.getContext().fillStyle = 'DarkBlue';
					break;
					case 2: GUI.getContext().fillStyle = 'LawnGreen';
					break;
					case 3: GUI.getContext().fillStyle = 'ForestGreen';
					break;
					case 4: GUI.getContext().fillStyle = 'SandyBrown';
					break;
					case 5: GUI.getContext().fillStyle = 'SaddleBrown';
					break;
					case 6: GUI.getContext().fillStyle = 'LightGray';
					break;
					case 7: GUI.getContext().fillStyle = 'Khaki';
					break;
					case 8: GUI.getContext().fillStyle = 'DarkViolet';
					break;
					default: GUI.getContext().fillStyle = 'Black';
					break;
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
	function drawPossibleMoves(x: number, y: number, scale: number, selectedArmyIndex: number): void {
		if(selectedArmyIndex != undefined){
			let moves = listOfArmies[selectedArmyIndex].possibleMoves;
			for (let i = 0; i < moves.length; i++) {
				GUI.getContext().lineWidth = scale/6;
				GUI.getContext().strokeStyle='#00FF00';
				let pos = computePosition(x, y, moves[i].x, moves[i].y, scale); //get fields position
				GUI.getContext().beginPath();
				GUI.getContext().arc(pos[0]+(0.5 * scale * SIN60), pos[1]+(scale * 0.5), scale/12, 0, 2 * Math.PI, false);
				GUI.getContext().stroke();
			}
		}
	}

	function drawFieldSelection(x: number, y: number, scale: number): void {
		GUI.getContext().lineWidth = 5;
		GUI.getContext().strokeStyle = "blue";
		for( let i = 0; i < selectedFields.length; i++){
			let pos = computePosition(x, y, selectedFields[i][0], selectedFields[i][1], scale);
			GUI.getContext().beginPath();
			GUI.getContext().arc(pos[0]+(0.5 * scale * SIN60), pos[1]+(scale * 0.5), scale/2, 0, 2 * Math.PI, false);
			GUI.getContext().stroke();
		}
	}

	function drawArmySelection(x: number, y: number, scale: number, armyIndex: number): void {
		GUI.getContext().lineWidth = 5;
		GUI.getContext().strokeStyle = "green";
		if(armyIndex !== undefined){
			let pos = computePosition(x, y, listOfArmies[armyIndex].x, listOfArmies[armyIndex].y, scale);
			GUI.getContext().beginPath();
			GUI.getContext().arc(pos[0]+(0.5 * scale * SIN60), pos[1]+(scale * 0.5), scale/2.2, 0, 2 * Math.PI, false);
			GUI.getContext().stroke();
		}
	}

	function drawArmies(x: number, y: number, scale: number): void {
		let armies = listOfArmies;

		//delete all multifields
		for(let k = 0; k < listOfMultiArmyFields.length; k++){
			for(let l = 0; l < listOfMultiArmyFields[k].length; l++){
				listOfMultiArmyFields[k][l].multiArmyField = false;
			}
		}
		listOfMultiArmyFields = [];

		//getting the multifield list ready
		for (let i = 0; i < listOfArmies.length; i++) {
			createMultifield(listOfArmies[i]);
		}

		for (let i = 0; i < armies.length; i++) {
			let armyData = armies[i]; // get army coordinates
			let pos = computePosition(x, y, armies[i].x, armies[i].y, scale);
			GUI.getContext().fillStyle = 'black';
			GUI.getContext().textAlign = 'center';
			GUI.getContext().textBaseline = 'middle';
			//GUI.getContext().fillText(armyData.armyId, pos[0]+((scale * 0.866)/2), pos[1]+(scale /2));

			//check if its is on a multifield. if it is ignore
			if(!armyData.multiArmyField){
				// armies == 1, riders == 2, boats == 3
				if(Math.floor(armyData.armyId/100) == 1){
					GUI.getContext().drawImage(troopsImg, pos[0], pos[1], (scale*SIN60), scale);
				} else if(Math.floor(armyData.armyId/100) == 2) {
					GUI.getContext().drawImage(mountsImg, pos[0], pos[1], (scale*SIN60), scale);
				} else if(Math.floor(armyData.armyId/100) == 3) {
					GUI.getContext().drawImage(boatsImg, pos[0], pos[1], (scale*SIN60), scale);
				}
			}
			if (armies[i].ownerTag() === login || login === "sl"){
				
				if(armies[i].possibleMoves.length > 0){
					drawRemainingMovement(pos[0], pos[1], scale);
				}
				else if(Math.floor(armyData.armyId/100) == 1 && armies[i].remainingMovePoints == 9){
					drawRemainingMovement(pos[0], pos[1], scale);
				}
				else if(Math.floor(armyData.armyId/100) == 2 && armies[i].remainingMovePoints == 21){
					drawRemainingMovement(pos[0], pos[1], scale);
				}
				else if(Math.floor(armyData.armyId/100) == 3 && armies[i].remainingMovePoints >= 42){
					drawRemainingMovement(pos[0], pos[1], scale);
				}

				//draw if it took fire
				if(armyData.wasShotAt === true){
					drawTookFire(pos[0], pos[1], scale);
				}
			}
			
		}

		//drawing the multifield armies
		for(let j = 0; j < listOfMultiArmyFields.length; j++){//for every field

			for(let i = 0; i < listOfMultiArmyFields[j].length; i++){//for every army on that field
			
			let armyData = listOfMultiArmyFields[j][i]; // get army coordinates
			let pos = computePosition(x, y, listOfMultiArmyFields[j][i].x, listOfMultiArmyFields[j][i].y, scale);

			let circleScale = (scale*SIN60) / listOfMultiArmyFields[j].length;

			//const double Angle = (M_PI * 2.0) / n;
			//Für jedes i-te Objekt dann die Position des Mittelpunktes:
			//const double MidPosX = (cos(Angle * i) * RadiusX) + CirclePosX;
			//const double MidPosY =(sin(Angle * i) * RadiusY) + CirclePosY;
			let angle = (Math.PI * 2.0) / listOfMultiArmyFields[j].length;//Total armies on field
			let xPosArmy = (Math.cos(angle * i) * scale/4) + pos[0] + scale/4;
			let yPosArmy = (Math.sin(angle * i) * scale/4) + pos[1];

			// armies == 1, riders == 2, boats == 3
				if(Math.floor(armyData.armyId/100) == 1){
					GUI.getContext().drawImage(troopsImg, xPosArmy, yPosArmy, circleScale, scale);
				} else if(Math.floor(armyData.armyId/100) == 2) {
					GUI.getContext().drawImage(mountsImg, xPosArmy, yPosArmy, circleScale, scale);
				} else if(Math.floor(armyData.armyId/100) == 3) {
					GUI.getContext().drawImage(boatsImg, xPosArmy, yPosArmy, circleScale, scale);
				}
			}

		}
	}

	function drawRemainingMovement(x: number,y: number, scale: number): void {
		GUI.getContext().lineWidth = scale/8;
		GUI.getContext().strokeStyle='#00FFFF';
		GUI.getContext().beginPath();
		GUI.getContext().arc(x+(0.5 * scale * SIN60)-c, y+(scale * 0.5)-c, scale/16, Math.PI*1.25, Math.PI*1.75, false);
		GUI.getContext().stroke();
	}

	function drawTookFire(x: number,y: number, scale: number): void{
		GUI.getContext().lineWidth = scale/8;
		GUI.getContext().strokeStyle='#FF0000';
		GUI.getContext().beginPath();
		GUI.getContext().arc(x+(0.5 * scale * SIN60)+c, y+(scale * 0.5)+c, scale/16, Math.PI*1.25, Math.PI*1.75, false);
		GUI.getContext().stroke();
	}

	function drawShootingTargets(x: number, y: number, scale: number, selectedArmy): void{
		if(selectedArmy !== undefined && listOfArmies[selectedArmyIndex].targetList !== undefined && shootingModeOn === true){
			let targets = listOfArmies[selectedArmyIndex].targetList;
			for (let i = 0; i < targets.length; i++) {
				GUI.getContext().lineWidth = scale/10;
				GUI.getContext().strokeStyle='#FF0000';
				let pos = computePosition(x, y, targets[i][0], targets[i][1], scale); //get fields position
				GUI.getContext().beginPath();
				GUI.getContext().arc(pos[0]+(0.5 * scale * SIN60), pos[1]+(scale * 0.5), scale/20, 0, 2 * Math.PI, false);
				GUI.getContext().stroke();
			}
		}
	}

	function writeFieldInfo(): void{
		let minimapBox = document.getElementById('minimapBox');
		let index = 0;
		if(shootingModeOn){
			index = 1;
		}
		if(selectedFields[index] === undefined){
			minimapBox.innerHTML = '';
		}else {
			let fieldPositionInList = HexFunction.positionInList(selectedFields[index][0], selectedFields[index][1]);
			let localfieldType = '';
			switch(HexFunction.fieldType(selectedFields[index][0], selectedFields[index][1])){
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
			let fieldOwner = borders.find((value) =>
				(value.land.some((field) => (field[0] === selectedFields[index][0] && field[1] === selectedFields[index][1])))
			);
			let fieldOwnerString = (fieldOwner === undefined)?'keiner':fieldOwner.tag;
			minimapBox.innerHTML = '<p>Feld: ('+selectedFields[index][0]+', '+selectedFields[index][1]+')'+
				'</p><p>Gelände: '+localfieldType+
				'</p><p>Höhe: '+HexFunction.height(selectedFields[index][0], selectedFields[index][1])+
				'</p><p>Besitzer: '+fieldOwnerString+'</p>';
		}
	}
	
	export function writeTurnNumber(): void {
		// get the top bar element from the HTML document
		let topBar = document.getElementById('topBar');
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
				if (currentTurn.realm === null) {
					message = "Do you want to end the pre-turn phase?";
				} else if (currentTurn.status === 'fi') {
					let unprocessedEvents = pendingEvents.some(function(event){
						return (event.status === 'available' || event.status === 'withheld' ||
							event.status === 'impossible');
					});
					if (unprocessedEvents){
						message = "Some events are unprocessed.";
					}
					message += ("Do you want to end processing the turn of " + currentTurn.realm+"?");
				} else if (login === 'sl') {
					message = "Do you want to end the turn of "+ currentTurn.realm+"?";
				} else {
					message = "Do you want to end your turn?";
				}

				if (confirm(message)){
					if(login === 'sl' && currentTurn.status === 'fi') { //SL sends DB change requests
						pendingEvents.forEach(function(event) {
							if(event.status === 'checked'){
								Saving.sendCheckEvent(event.pk, event.type);
							} else if(event.status === 'deleted') {
								Saving.sendDeleteEvent(event.pk, event.type);
							}
						}, this);
						Saving.saveBuildings();
						Saving.saveFactionsTerritories();
						Saving.saveArmies();
					} else { //Players and SL during player's turn send events
						console.log(2);
						sendEventlistInOrder();
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
		
		if (stepBtn === null) {
			stepBtn = document.createElement("BUTTON") as HTMLButtonElement;
			stepBtn.id = "stepButton";
			stepBtn.style.backgroundImage = "url(images/step_button.svg)";
			stepBtn.addEventListener('click', function() {
				if(login === 'sl'){
					if (confirm("Do you want to save the events handled so far without ending the turn?" +
							" Once saved the progress can't be reverted anymore.")){
						pendingEvents.forEach(function(event) {
							if(event.status === 'checked'){
								Saving.sendCheckEvent(event.pk, event.type);
							} else if(event.status === 'deleted') {
								Saving.sendDeleteEvent(event.pk, event.type);
							}
						}, this);
						pendingEvents = [];
						preparedEvents = [];
						Saving.saveBuildings();
						Saving.saveFactionsTerritories();
						Saving.saveArmies();
					}
				} else {
					if (confirm("Do you want to save the events issued so far without ending the turn?" +
					" Once saved the progress can only be reverted by the SL.")){
						console.log(3);
						sendEventlistInOrder();
					}
				}
			});
		}

		if (revertBtn === null) {
			revertBtn = document.createElement("BUTTON") as HTMLButtonElement;
			revertBtn.id = "revertButton";
			revertBtn.style.backgroundImage = "url(images/revert_button.svg)";
			revertBtn.addEventListener('click', function() {
				if (confirm("Do you want to revert the events handled so far?")){
					pendingEvents = [];
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
		
		if (login !== 'sl' && (currentTurn.realm === null || currentTurn.status === 'fi' || login !== currentTurn.realm)) { 
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
		
		if(login === 'sl' && currentTurn.status === 'fi') {
			Loading.loadPendingEvents();
			show(document.getElementById("eventTabsButton"));
		} else {
			hide(document.getElementById("eventTabsButton"));
			stepBtn.disabled = true;
			stepBtn.style.cursor = "not-allowed";
			revertBtn.disabled = true;
			revertBtn.style.cursor = "not-allowed";
		}
		
		date.innerHTML =  "Monat " + months[currentTurn.turn%8] + " des Jahres "+ Math.ceil(currentTurn.turn/8) + " (Zug " + currentTurn.turn + ", ";
		if (currentTurn.realm === null || currentTurn.status === 'fi') { 
			// GM's turn
			date.innerHTML += "SL) ";
		} else { // a realm's turn
			date.innerHTML += currentTurn.realm + ") ";
		}
		date.setAttribute("width", "340px");
		date.setAttribute("float", "left");
		date.setAttribute("line-height", "30px");
		
		if (currentTurn.turn%8 === 1 || currentTurn.turn%8 === 5) {
			spec.innerHTML =  " Rüstmonat";
			date.setAttribute("width", "100px");
			date.setAttribute("float", "left");
			date.setAttribute("line-height", "30px");
		} else if (currentTurn.turn%8 === 4 || currentTurn.turn%8 === 0) {
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