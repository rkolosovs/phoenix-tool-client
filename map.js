var terrain = {
	shallows: 0, //"Wasser" in Erkenfara rules
	deepsea: 1, //"Tiefsee" in Erkenfara rules
	lowlands: 2, //"Tiefland" in Erkenfara rules
	woods: 3, //"Wald" in Erkenfara rules
	hills: 4, //"Hochland" in Erkenfara rules
	highlands: 5, //"Bergland" in Erkenfara rules
	mountains: 6, //"Gebirge" in Erkenfara rules
	desert: 7, //"Wüste" in Erkenfara rules
	swamp: 8 //"Sumpf" in Erkenfara rules
};

var fields; //declare fields variable; holds the terrain fields
var rivers; //declare rivers variable; holds the rivers
var shallowsImg = new Image(); //declare variables for all used images; TODO: organize them properly
var deepseaImg = new Image();
var lowlandsImg = new Image();
var woodsImg = new Image();
var hillsImg = new Image();
var highlandsImg = new Image();
var mountainsImg = new Image();
var desertImg = new Image();
var swampImg = new Image();
var defaultImg = new Image();
var troopsImg = new Image();
var mountsImg = new Image();

function loadMap() {
	$.getJSON("map.json", function(json){
		var map = json; //load the map from the map.json file
		fields = map.fields;
		rivers = map.rivers; //rivers are the coordinates of two fields on either side of the river
	});
}

function loadImages(tileset) { //load the images needed for visualization
	var pathPrefix = './tilesets/'+tileset; //build the path prefix common to all tile images

	shallowsImg.src = pathPrefix+'/shallows.svg';
	deepseaImg.src = pathPrefix+'/deepsea.svg';
	lowlandsImg.src = pathPrefix+'/lowlands.svg';
	woodsImg.src = pathPrefix+'/woods.svg';
	hillsImg.src = pathPrefix+'/hills.svg';
	highlandsImg.src = pathPrefix+'/highlands.svg';
	mountainsImg.src = pathPrefix+'/mountains.svg';
	desertImg.src = pathPrefix+'/desert.svg';
	swampImg.src = pathPrefix+'/swamp.svg';
	defaultImg.src = pathPrefix+'/default.svg';
	troopsImg.src = pathPrefix+'/troops.svg';
	mountsImg.src = pathPrefix+'/mounts.svg';	
}

function drawMap(ctx, x, y, scale) {
	drawFields(ctx, x, y, scale);
	drawRivers(ctx, x, y, scale);
}

function drawRivers(ctx, x, y, scale) {
	var gridWidth = 0.866*scale; //same measures as in field clicked in detection
	var halfWidth = gridWidth/2;
	var gridHeight = (1.366/2)*scale;
	var c = scale-gridHeight;

	ctx.lineWidth = (scale/8);
	ctx.strokeStyle="#0099FF";
	ctx.lineCap="round";

	for (var i = 0; i < rivers.length; i++) {
		var river = rivers[i];
		var pos = computePosition(x, y, (river[0][0]), (river[0][1]), scale);
		var points = [pos, pos];
		var rowOdd = (river[0][1])%2 !== 0;

		if((river[0][1]) === (river[1][1])) { //same row (w/e)
			if ((river[0][0]) > (river[1][0])) { //second field left (w)
				points = [[(pos[0]), (pos[1]+c)], [(pos[0]), (pos[1]+gridHeight)]];
			} else { //second field right (e)
				points = [[(pos[0]+gridWidth), (pos[1]+c)], [(pos[0]+gridWidth), (pos[1]+gridHeight)]];
			}
		} else if ((river[0][1]) > (river[1][1])) { //second field above (nw/ne)
			if ((rowOdd && (river[0][0])===(river[1][0])) || (!rowOdd && (river[0][0])<(river[1][0]))) { //second field right (ne)
				points = [[(pos[0]+halfWidth), (pos[1])], [(pos[0]+gridWidth), (pos[1]+c)]];
			} else { //second field left (nw)
				points = [[(pos[0]), (pos[1]+c)], [(pos[0]+halfWidth), (pos[1])]];
			}
		} else { //second field below (sw/se)
			if ((rowOdd && (river[0][0])===(river[1][0])) || (!rowOdd && (river[0][0])<(river[1][0]))) { //second field right (se)
				points = [[(pos[0]+halfWidth), (pos[1]+scale)], [(pos[0]+gridWidth), (pos[1]+gridHeight)]];
			} else { //second field left (sw)
				points = [[(pos[0]), (pos[1]+gridHeight)], [(pos[0]+halfWidth), (pos[1]+scale)]];
			}
		}

		ctx.beginPath();
		ctx.moveTo((points[0][0]), (points[0][1]));
		ctx.lineTo((points[1][0]), (points[1][1]));
		ctx.stroke();
	}
}

function drawFields(ctx, x, y, scale) { //draw the terrain fields
	for (var i = 0; i < fields.length; i++) {
		var currentField = fields[i]; //get the current field to draw
		var tileImg; //declare the tile image variable
		var pos = computePosition(x, y, currentField.x, currentField.y, scale); //get the fields position
        	
		switch(currentField.type){ //set the tileImg to match the field type
			case terrain.shallows: tileImg = shallowsImg;
			break;

			case terrain.deepsea: tileImg = deepseaImg;
			break;

			case terrain.lowlands: tileImg = lowlandsImg;
			break;

			case terrain.woods: tileImg = woodsImg;
			break;

			case terrain.hills: tileImg = hillsImg;
			break;

			case terrain.highlands: tileImg = highlandsImg;
			break;

			case terrain.mountains: tileImg = mountainsImg;
			break;

			case terrain.desert: tileImg = desertImg;
			break;

			case terrain.swamp: tileImg = swampImg;
			break;

			default: tileImg = defaultImg;
			break;
		}
		ctx.drawImage(tileImg, pos[0], pos[1], (scale*0.866), scale); //draw the image
	}
}

function drawSelection(ctx, x, y, scale, selectedFields) {
	ctx.lineWidth = 5;
	ctx.strokeStyle="green";
	for (var i = 0; i < selectedFields.length; i++) {
		var selectedField = selectedFields[i]; //get selected field
		var pos = computePosition(x, y, selectedField[0], selectedField[1], scale); //get fields position

		//draw a simple circle; TODO: draw propper selection
		ctx.beginPath();
      	ctx.arc(pos[0]+((scale * 0.866)/2), pos[1]+(scale /2), scale/2, 0, 2 * Math.PI, false);
      	ctx.stroke();
	}
}

function computePosition(xOrig, yOrig, xCurr, yCurr, scale) { //computes a fields position (upper left corner of inscribing rectangle)
	var xpos = xOrig + (xCurr * scale * 0.866); //get the current field's x position
	return [ (yCurr%2!==0?(xpos - (scale*0.866/2)):(xpos)), yOrig+(yCurr * scale * 1.366 / 2)]; //each odd row is offset half a hex to the left
}

function drawArmies(ctx, x, y, scale, armyCoordinates) {
	for (var i = 0; i < armyCoordinates.length; i++) {
		var armyData = armyCoordinates[i]; // get army coordinates
		pos = computePosition(x, y, armyCoordinates[i].x, armyCoordinates[i].y, scale);
		ctx.fillStyle = 'black';
		ctx.textAlign = 'center';
    	ctx.textBaseline = 'middle';
		//ctx.fillText(armyData.a.armyId, pos[0]+((scale * 0.866)/2), pos[1]+(scale /2));
		if(Math.floor(armyData.a.armyId/100) == 1)
		{		
			ctx.drawImage(troopsImg, pos[0], pos[1], (scale*0.866), scale); 
		} else if(Math.floor(armyData.a.armyId/100) == 2) {
			ctx.drawImage(mountsImg, pos[0], pos[1], (scale*0.866), scale);
		}
	}
}