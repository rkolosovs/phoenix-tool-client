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

var buildingTypes = {
	castle: 0, //"Burg" in Erkenfara rules
	city: 1, //"Stadt" in Erkenfara rules
	fortress: 2, //"Festung" in Erkenfara rules
	capital: 3, //"Hauptstadt" in Erkenfara rules
	capitalFort: 4, //"Festungshauptstadt" in Erkenfara rules
	wall: 5, //"Wall" in Erkenfara rules
	harbor: 6 //"Kaianlage" in Erkenfara rules
};

var fields; //declare fields variable; holds the terrain fields
var rivers; //declare rivers variable; holds the rivers
var buildings; //declare buildings variable; holds the buildings
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
var castleImg = new Image(); //buildings
var cityImg = new Image();
var fortressImg = new Image();
var capitalImg = new Image();
var capitalFortImg = new Image();
var wallImg = new Image();
var harborImg = new Image();


function loadMap() {
	$.getJSON("map.json", function(json){
		var map = json; //load the map from the map.json file
		fields = map.fields;
		rivers = map.rivers; //rivers are the coordinates of two fields on either side of the river
	});
	//temporary building array loading
	buildings = [{type: 0, x: 6, y: 6}, {type: 1, x: 6, y: 7}, {type: 2, x: 5, y: 8}, {type: 3, x: 23, y: 7}, {type: 4, x: 13, y: 22}];
}

function loadImages(tileset) { //load the images needed for visualization
	var pathPrefix = './tilesets/'+tileset; //build the path prefix common to all tile images

	shallowsImg.src = pathPrefix+'/shallows.svg'; //terrain
	deepseaImg.src = pathPrefix+'/deepsea.svg';
	lowlandsImg.src = pathPrefix+'/lowlands.svg';
	woodsImg.src = pathPrefix+'/woods.svg';
	hillsImg.src = pathPrefix+'/hills.svg';
	highlandsImg.src = pathPrefix+'/highlands.svg';
	mountainsImg.src = pathPrefix+'/mountains.svg';
	desertImg.src = pathPrefix+'/desert.svg';
	swampImg.src = pathPrefix+'/swamp.svg';
	defaultImg.src = pathPrefix+'/default.svg';	
	castleImg.src = pathPrefix+'/castle.svg'; //buildings
	cityImg.src = pathPrefix+'/city.svg';
	fortressImg.src = pathPrefix+'/fortress.svg';
	capitalImg.src = pathPrefix+'/capital_city.svg';
	capitalFortImg.src = pathPrefix+'/capital_fortress.svg';
	wallImg.src = pathPrefix+'/wall.svg';
	harborImg.src = pathPrefix+'harbor.svg';
}

function drawMap(ctx, x, y, scale) {
	drawFields(ctx, x, y, scale);
	drawRivers(ctx, x, y, scale);
	drawBuildings(ctx, x, y, scale);
}

function drawBuildings(ctx, x, y, scale) {
	for (var i = 0; i < buildings.length; i++) {
		var building = buildings[i];
		var pos = computePosition(x, y, building.x, building.y, scale);
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

			default: tileImg = defaultImg;
			break;
		}
		if (building.type <= 4) { //regular one tile buildings
			ctx.drawImage(tileImg, pos[0], pos[1], scale*0.85, scale*0.85); //draw the image
		}
		else if (building.type <= 6) { //buildings with orientation

		}
	}
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