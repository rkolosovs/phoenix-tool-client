'use strict';

// canvas resizing method
function resizeCanvas() {
   	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
   	drawStuff();
}

// all the stuff to be drawn goes in this method
function drawStuff() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // clear

	// do all drawing/element selection in respect to these coordinates
	var x = originX + moveX; // current x origin for drawing + x offset from
								// dragged mouse
	var y = originY + moveY; // current y origin for drawing + y offset from
								// dragged mouse

	drawMap(ctx, x, y, scale);
	drawSelection(ctx, x, y, scale, selectedFields);
	drawArmies(ctx, x, y, scale, listOfArmyCoordinates);
	drawPossibleMoves(ctx, x, y, scale, selectedArmy);
}

function drawMap(ctx, x, y, scale) {
	drawFields(ctx, x, y, scale);
	drawRivers(ctx, x, y, scale);
	drawBorders(ctx, x, y, scale);
	drawBuildings(ctx, x, y, scale);
}

function drawBorders(ctx, x, y, scale) {
	var offset = (scale/13); //set offset of a border from the actual border of two hexes
	for (var i = 0; i < borders.length; i++) { //for each realm with borders
		var tag = borders[i].tag;
		var land = borders[i].land;
		var color;
		for (var j = 0; j < realmColors.length; j++) { //find the color corresponding to the tag
			if(realmColors[j].tag === tag){
				color = realmColors[j].color;
				break;
			}
		}

		ctx.lineWidth = (scale/14); //line thickness for borders
		ctx.strokeStyle = 'rgb('+color[0]+', '+color[1]+', '+color[2]+')'; //set line color
		ctx.lineCap="round";
		ctx.fillStyle='rgba('+color[0]+', '+color[1]+', '+color[2]+', 0.3)'; //set fill color	
		for (var j = 0; j < land.length; j++) { //for each occupied hex
			var hex = land[j];
			var point = computePosition(x, y, hex[0], hex[1], scale);
			var neighbours = getAdjacency(hex, land);

			var start;
			if (neighbours[5]) { //determine start in the top corner
				if (neighbours[0]) {start = [(point[0]+0.5*gW), point[1]];} 
				else {start = [(point[0]+0.5*gW-SIN60*offset), (point[1]+0.5*offset)];}
			} else {
				if (neighbours[0]) {start = [(point[0]+0.5*gW+SIN60*offset), (point[1]+0.5*offset)];} 
				else {start = [(point[0]+0.5*gW), (point[1]+offset)];}
			}

			ctx.beginPath(); //begin border drawing
			ctx.moveTo(start[0], start[1]);

			if (neighbours[0]) { //go to upper right corner
				if (neighbours[1]) {ctx.moveTo((point[0]+gW), (point[1]+c));} 
				else {ctx.moveTo((point[0]+gW-SIN60*offset), (point[1]+c-0.5*offset));}
			} else {
				if (neighbours[1]) {ctx.lineTo((point[0]+gW), (point[1]+c+offset));} 
				else {ctx.lineTo((point[0]+gW-SIN60*offset), (point[1]+c+0.5*offset));}
			}

			if (neighbours[1]) { //go to lower right corner
				if (neighbours[2]) {ctx.moveTo((point[0]+gW), (point[1]+gH));} 
				else {ctx.moveTo((point[0]+gW), (point[1]+gH-offset));}
			} else {
				if (neighbours[2]) {ctx.lineTo((point[0]+gW-SIN60*offset), (point[1]+gH+0.5*offset));} 
				else {ctx.lineTo((point[0]+gW-SIN60*offset), (point[1]+gH-0.5*offset));}
			}

			if (neighbours[2]) { //go to bottom corner
				if (neighbours[3]) {ctx.moveTo((point[0]+0.5*gW), (point[1]+scale));} 
				else {ctx.moveTo((point[0]+0.5*gW+SIN60*offset), (point[1]+scale-0.5*offset));}
			} else {
				if (neighbours[3]) {ctx.lineTo((point[0]+0.5*gW-SIN60*offset), (point[1]+scale-0.5*offset));} 
				else {ctx.lineTo((point[0]+0.5*gW), (point[1]+scale-offset));}
			}

			if (neighbours[3]) { //go to lower left corner
				if (neighbours[4]) {ctx.moveTo(point[0], (point[1]+gH));} 
				else {ctx.moveTo((point[0]+SIN60*offset), (point[1]+gH+0.5*offset));}
			} else {
				if (neighbours[4]) {ctx.lineTo(point[0], (point[1]+gH-offset));} 
				else {ctx.lineTo((point[0]+SIN60*offset), (point[1]+gH-0.5*offset));}
			}

			if (neighbours[4]) { //go to upper left corner
				if (neighbours[5]) {ctx.moveTo(point[0], (point[1]+c));} 
				else {ctx.moveTo(point[0], (point[1]+c+offset));}
			} else {
				if (neighbours[5]) {ctx.lineTo((point[0]+SIN60*offset), (point[1]+c-0.5*offset));} 
				else {ctx.lineTo((point[0]+SIN60*offset), (point[1]+c+0.5*offset));}
			}

			if (neighbours[5]) {ctx.moveTo(start[0], start[1]);} //back to top corner
			else {ctx.lineTo(start[0], start[1]);}
			ctx.stroke();


			ctx.beginPath(); //begin area filling
			ctx.moveTo(start[0], start[1]);

			if (neighbours[0]) { //go to upper right corner
				if (neighbours[1]) {ctx.lineTo((point[0]+gW), (point[1]+c));} 
				else {ctx.lineTo((point[0]+gW-SIN60*offset), (point[1]+c-0.5*offset));}
			} else {
				if (neighbours[1]) {ctx.lineTo((point[0]+gW), (point[1]+c+offset));} 
				else {ctx.lineTo((point[0]+gW-SIN60*offset), (point[1]+c+0.5*offset));}
			}

			if (neighbours[1]) { //go to lower right corner
				if (neighbours[2]) {ctx.lineTo((point[0]+gW), (point[1]+gH));} 
				else {ctx.lineTo((point[0]+gW), (point[1]+gH-offset));}
			} else {
				if (neighbours[2]) {ctx.lineTo((point[0]+gW-SIN60*offset), (point[1]+gH+0.5*offset));} 
				else {ctx.lineTo((point[0]+gW-SIN60*offset), (point[1]+gH-0.5*offset));}
			}

			if (neighbours[2]) { //go to bottom corner
				if (neighbours[3]) {ctx.lineTo((point[0]+0.5*gW), (point[1]+scale));} 
				else {ctx.lineTo((point[0]+0.5*gW+SIN60*offset), (point[1]+scale-0.5*offset));}
			} else {
				if (neighbours[3]) {ctx.lineTo((point[0]+0.5*gW-SIN60*offset), (point[1]+scale-0.5*offset));} 
				else {ctx.lineTo((point[0]+0.5*gW), (point[1]+scale-offset));}
			}

			if (neighbours[3]) { //go to lower left corner
				if (neighbours[4]) {ctx.lineTo(point[0], (point[1]+gH));} 
				else {ctx.lineTo((point[0]+SIN60*offset), (point[1]+gH+0.5*offset));}
			} else {
				if (neighbours[4]) {ctx.lineTo(point[0], (point[1]+gH-offset));} 
				else {ctx.lineTo((point[0]+SIN60*offset), (point[1]+gH-0.5*offset));}
			}

			if (neighbours[4]) { //go to upper left corner
				if (neighbours[5]) {ctx.lineTo(point[0], (point[1]+c));} 
				else {ctx.lineTo(point[0], (point[1]+c+offset));}
			} else {
				if (neighbours[5]) {ctx.lineTo((point[0]+SIN60*offset), (point[1]+c-0.5*offset));} 
				else {ctx.lineTo((point[0]+SIN60*offset), (point[1]+c+0.5*offset));}
			}

			if (neighbours[5]) {ctx.lineTo(start[0], start[1]);} //back to top corner
			else {ctx.lineTo(start[0], start[1]);}
			ctx.fill();
		}
	}
}

function drawBuildings(ctx, x, y, scale) {
	ctx.lineWidth = (scale/8); //line style for roads
	ctx.strokeStyle="#C8AB37";
	ctx.lineCap="round";

	for (var i = 0; i < buildings.length; i++) {
		var building = buildings[i];
		if(building.type !== 8){
			var pos = computePosition(x, y, building.x, building.y, scale);
		}
		var tileImg; //declare the tile image variable
		switch(building.type){ //set the tileImg to match the building type
			case buildingTypes.castle: tileImg = castleImg;
			break;

			case buildingTypes.city: tileImg = cityImg;
			break;

			case buildingTypes.fortress: tileImg = fortressImg;
			break;

			case buildingTypes.capital: tileImg = capitalImg;
			break;

			case buildingTypes.capitalFort: tileImg = capitalFortImg;
			break;

			case buildingTypes.wall: if (building.direction === 'w'){tileImg = wallWImg;}
			else if (building.direction === 'e'){tileImg = wallEImg;}
			else if (building.direction === 'nw'){tileImg = wallNWImg;}
			else if (building.direction === 'sw'){tileImg = wallSWImg;}
			else if (building.direction === 'ne'){tileImg = wallNEImg;}
			else if (building.direction === 'se'){tileImg = wallSEImg;}
			break;

			case buildingTypes.harbor: if (building.direction === 'w'){tileImg = harborWImg;}
			else if (building.direction === 'e'){tileImg = harborEImg;}
			else if (building.direction === 'nw'){tileImg = harborNWImg;}
			else if (building.direction === 'sw'){tileImg = harborSWImg;}
			else if (building.direction === 'ne'){tileImg = harborNEImg;}
			else if (building.direction === 'se'){tileImg = harborSEImg;}
			break;

			case buildingTypes.bridge: if (building.direction === 'w'){tileImg = bridgeWImg;}
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
			ctx.drawImage(tileImg, pos[0], pos[1]-c, scale*SIN60, scale); //draw the image
		}
		else if (building.type === 5) { //walls - one tile buildings handled differently from cities
			ctx.drawImage(tileImg, pos[0], pos[1], scale*SIN60, scale); //draw the image
		}
		else if (building.type <= 7) { //harbors and bridges - "oversized" buildings
			ctx.drawImage(tileImg, pos[0]-gW, pos[1]-(0.5*scale), 3*gW, 2*scale); //draw the image
		} else if (building.type === 8) { //streets - currently drawn as simple lines
			var posFirst = computePosition(x, y, building.firstX, building.firstY, scale);
			var posSecond = computePosition(x, y, building.secondX, building.secondY, scale);
			ctx.beginPath();
			ctx.moveTo((posFirst[0]+(0.5*gW)), (posFirst[1]+2*c));
			ctx.lineTo((posSecond[0]+(0.5*gW)), (posSecond[1]+2*c));
			ctx.stroke();
		}
	}
}

function drawRivers(ctx, x, y, scale) {
	ctx.lineWidth = (scale/8);
	ctx.strokeStyle="#0099FF";
	ctx.lineCap="round";

	for (var i = 0; i < rivers.length; i++) {
		var river = rivers[i];
		var pos = computePosition(x, y, (river[0][0]), (river[0][1]), scale);
		var points = [pos, pos];
		var rowOdd = (((river[0][1])%2) !== 0);

		if((river[0][1]) === (river[1][1])) { //same row (w/e)
			if ((river[0][0]) > (river[1][0])) { //second field left (w)
				points = [[(pos[0]), (pos[1]+c)], [(pos[0]), (pos[1]+gH)]];
			} else { //second field right (e)
				points = [[(pos[0]+gW), (pos[1]+c)], [(pos[0]+gW), (pos[1]+gH)]];
			}
		} else if ((river[0][1]) > (river[1][1])) { //second field above (nw/ne)
			if ((rowOdd && (river[0][0])===(river[1][0])) || (!rowOdd && (river[0][0])<(river[1][0]))) { //second field right (ne)
				points = [[(pos[0]+0.5*gW), (pos[1])], [(pos[0]+gW), (pos[1]+c)]];
			} else { //second field left (nw)
				points = [[(pos[0]), (pos[1]+c)], [(pos[0]+0.5*gW), (pos[1])]];
			}
		} else { //second field below (sw/se)
			if ((rowOdd && (river[0][0])===(river[1][0])) || (!rowOdd && (river[0][0])<(river[1][0]))) { //second field right (se)
				points = [[(pos[0]+0.5*gW), (pos[1]+scale)], [(pos[0]+gW), (pos[1]+gH)]];
			} else { //second field left (sw)
				points = [[(pos[0]), (pos[1]+gH)], [(pos[0]+0.5*gW), (pos[1]+scale)]];
			}
		}

		ctx.beginPath();
		ctx.moveTo((points[0][0]), (points[0][1]));
		ctx.lineTo((points[1][0]), (points[1][1]));
		ctx.stroke();
	}
}

function drawFields(ctx, x, y, scale) { //draw the terrain fields
	var drawingMode = 'image';
	// var drawingMode = 'primitives';
	if (scale < switchScale) {drawingMode = 'primitives';}
	else {drawingMode = 'image';}
	var currentField;
	var tileImg; //declare the tile image variable
	var pos;
	var sortedFields = [[], [], [], [], [], [], [], [], [], []];
	for (var i = 0; i < fields.length; i++) { //gather and sort all fields
		currentField = fields[i]; //get the current field to draw
        	
		switch(currentField.type){ //set the tileImg to match the field type
			case terrain.shallows: sortedFields[0].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			case terrain.deepsea: sortedFields[1].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			case terrain.lowlands: sortedFields[2].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			case terrain.woods: sortedFields[3].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			case terrain.hills: sortedFields[4].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			case terrain.highlands: sortedFields[5].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			case terrain.mountains: sortedFields[6].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			case terrain.desert: sortedFields[7].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			case terrain.swamp: sortedFields[8].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;

			default: sortedFields[9].push(computePosition(x, y, currentField.x, currentField.y, scale));
			break;
		}
	}

	if (drawingMode === 'image') {
		var currFields;
		for (var i = 0; i < sortedFields.length; i++) {
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

			for (var j = 0; j < currFields.length; j++) {
				currentField = currFields[j];
				ctx.drawImage(tileImg, currentField[0], currentField[1], (scale*SIN60), scale); //draw the image
			}
		}
	} else if (drawingMode === 'primitives') {
		var currFields;
		for (var i = 0; i < sortedFields.length; i++) {
			currFields = sortedFields[i];
			switch(i){
				case 0: ctx.fillStyle = 'Aqua';
				break;
				case 1: ctx.fillStyle = 'DarkBlue';
				break;
				case 2: ctx.fillStyle = 'LawnGreen';
				break;
				case 3: ctx.fillStyle = 'ForestGreen';
				break;
				case 4: ctx.fillStyle = 'SandyBrown';
				break;
				case 5: ctx.fillStyle = 'SaddleBrown';
				break;
				case 6: ctx.fillStyle = 'LightGray';
				break;
				case 7: ctx.fillStyle = 'Khaki';
				break;
				case 8: ctx.fillStyle = 'DarkViolet';
				break;
				default: ctx.fillStyle = 'Black';
				break;
			}

			ctx.beginPath();
			for (var j = 0; j < currFields.length; j++) {
				currentField = currFields[j];
				ctx.moveTo((currentField[0]+0.5*gW), currentField[1]);
				ctx.lineTo((currentField[0]+gW), (currentField[1]+c));
				ctx.lineTo((currentField[0]+gW), (currentField[1]+gH));
				ctx.lineTo((currentField[0]+0.5*gW), (currentField[1]+scale));
				ctx.lineTo(currentField[0], (currentField[1]+gH));
				ctx.lineTo(currentField[0], (currentField[1]+c));
				ctx.lineTo((currentField[0]+0.5*gW), currentField[1]);
			}
			ctx.fill();
		}
	}
}

function drawPossibleMoves(ctx, x, y, scale, selectedArmy){//drawing all possible moves to neighboring fields if army was selected
    if(selectedArmy !== undefined){
		var moves = listOfArmyCoordinates[selectedArmy].possibleMoves;
		for (var i = 0; i < moves.length; i++) {
            ctx.lineWidth = scale/6;
	        ctx.strokeStyle='#00FF00';
            var pos = computePosition(x, y, moves[i].tar.x, moves[i].tar.y, scale); //get fields position
		    ctx.beginPath();
      	    ctx.arc(pos[0]+(0.5 * scale * SIN60), pos[1]+(scale * 0.5), scale/12, 0, 2 * Math.PI, false);
      	    ctx.stroke();
		}
	}
}


function drawSelection(ctx, x, y, scale, selectedFields) {
	ctx.lineWidth = 5;
	ctx.strokeStyle="green";
	for (var i = 0; i < selectedFields.length; i++) {
		var selectedField = selectedFields[i]; //get selected field
		var pos = computePosition(x, y, selectedField[0], selectedField[1], scale); //get fields position

		//draw a simple circle; TODO: draw propper selection (if desired)
		ctx.beginPath();
      	ctx.arc(pos[0]+(0.5 * scale * SIN60), pos[1]+(scale * 0.5), scale/2, 0, 2 * Math.PI, false);
      	ctx.stroke();
	}
}

function drawArmies(ctx, x, y, scale, armyCoordinates) {
	for (var i = 0; i < armyCoordinates.length; i++) {
		var armyData = armyCoordinates[i]; // get army coordinates
		var pos = computePosition(x, y, armyCoordinates[i].x, armyCoordinates[i].y, scale);
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
    	ctx.textBaseline = 'middle';
		//ctx.fillText(armyData.a.armyId, pos[0]+((scale * 0.866)/2), pos[1]+(scale /2));
		// armies == 1, riders == 2, boats == 3
		if(Math.floor(armyData.a.armyId/100) == 1){
			ctx.drawImage(troopsImg, pos[0], pos[1], (scale*SIN60), scale); 
		} else if(Math.floor(armyData.a.armyId/100) == 2) {
			ctx.drawImage(mountsImg, pos[0], pos[1], (scale*SIN60), scale);
		} else if(Math.floor(armyData.a.armyId/100) == 3) {
			ctx.drawImage(boatsImg, pos[0], pos[1], (scale*SIN60), scale);
		}
	}
}