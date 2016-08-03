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
	harbor: 6, //"Kaianlage" in Erkenfara rules
	bridge: 7, //"Brücke" in Erkenfara rules
	street: 8 //"Straße" in Erkenfara rules
};

var realmColors = [
	{tag: "usa", color: "#FF8C00"},
	{tag: "vvh", color: "#006400"}
];

var gamestate; //abstract turn structure

var fields; //declare fields variable; holds the terrain fields
var rivers; //declare rivers variable; holds the rivers
var buildings; //declare buildings variable; holds the buildings
var borders; //declare borders variable; holds the borders

//declare variables for all used images
var shallowsImg = new Image(); //tiles
var deepseaImg = new Image();
var lowlandsImg = new Image();
var woodsImg = new Image();
var hillsImg = new Image();
var highlandsImg = new Image();
var mountainsImg = new Image();
var desertImg = new Image();
var swampImg = new Image();
var defaultImg = new Image();

var troopsImg = new Image(); //troops
var mountsImg = new Image();

var castleImg = new Image(); //buildings
var cityImg = new Image();
var fortressImg = new Image();
var capitalImg = new Image();
var capitalFortImg = new Image();
var wallWImg = new Image();
var wallEImg = new Image();
var wallNWImg = new Image();
var wallSWImg = new Image();
var wallNEImg = new Image();
var wallSEImg = new Image();
var harborWImg = new Image();
var harborEImg = new Image();
var harborSWImg = new Image();
var harborNWImg = new Image();
var harborSEImg = new Image();
var harborNEImg = new Image();
var bridgeWImg = new Image();
var bridgeEImg = new Image();
var bridgeSWImg = new Image();
var bridgeNWImg = new Image();
var bridgeSEImg = new Image();
var bridgeNEImg = new Image();


function loadMap() {
	gamestate = new gameState(0, [0], [0], 0);
	$.getJSON("map.json", function(json){
		var map = json; //load the map from the map.json file
		fields = map.fields;
		rivers = map.rivers; //rivers are the coordinates of two fields on either side of the river
	});
	$.getJSON("buildings.json", function(json){
		buildings = json; //load the buildings from the buildings.json file
	});
	$.getJSON("borders.json", function(json){
		borders = json; //load the borders from the borders.json file
	});
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

	troopsImg.src = pathPrefix+'/troops.svg'; //troops
	mountsImg.src = pathPrefix+'/mounts.svg';	

	castleImg.src = pathPrefix+'/castle.svg'; //buildings
	cityImg.src = pathPrefix+'/city.svg';
	fortressImg.src = pathPrefix+'/fortress.svg';
	capitalImg.src = pathPrefix+'/capital_city.svg';
	capitalFortImg.src = pathPrefix+'/capital_fortress.svg';
	wallWImg.src = pathPrefix+'/wall_w.svg';
	wallEImg.src = pathPrefix+'/wall_e.svg';
	wallNWImg.src = pathPrefix+'/wall_nw.svg';
	wallSWImg.src = pathPrefix+'/wall_sw.svg';
	wallNEImg.src = pathPrefix+'/wall_ne.svg';
	wallSEImg.src = pathPrefix+'/wall_se.svg';
	harborWImg.src = pathPrefix+'/harbor_w.svg';
	harborEImg.src = pathPrefix+'/harbor_e.svg';
	harborNWImg.src = pathPrefix+'/harbor_nw.svg';
	harborSWImg.src = pathPrefix+'/harbor_sw.svg';
	harborNEImg.src = pathPrefix+'/harbor_ne.svg';
	harborSEImg.src = pathPrefix+'/harbor_se.svg';
	bridgeWImg.src = pathPrefix+'/bridge_w.svg';
	bridgeEImg.src = pathPrefix+'/bridge_e.svg';
	bridgeNWImg.src = pathPrefix+'/bridge_nw.svg';
	bridgeSWImg.src = pathPrefix+'/bridge_sw.svg';
	bridgeNEImg.src = pathPrefix+'/bridge_ne.svg';
	bridgeSEImg.src = pathPrefix+'/bridge_se.svg';
}

function drawMap(ctx, x, y, scale) {
	drawFields(ctx, x, y, scale);
	drawRivers(ctx, x, y, scale);
	drawBuildings(ctx, x, y, scale);
	drawBorders(ctx, x, y, scale);
}

function drawBorders(ctx, x, y, scale) {
	for (var i = 0; i < borders.length; i++) {
		var tag = borders[i].tag;
		var land = borders[i].land;
		var color;
		for (var i = 0; i < realmColors.length; i++) { //find the color corresponding to the tag
			if(realmColors[i].tag === tag){
				color = realmColors[i].color;
				break;
			}
		}
		//TODO: determine if the hex is a border hex or a inland hex
		//TODO: color all hexes in the realms color
		//TODO: draw a border line along the border hexes
	}
}

function drawBuildings(ctx, x, y, scale) {
	var gridHeight = (1.377/2)*scale;
	var c = scale-gridHeight;
	var gridWidth = 0.866 * scale;

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
			ctx.drawImage(tileImg, pos[0], pos[1]-c, scale*0.866, scale); //draw the image
		}
		else if (building.type === 5) { //walls - one tile buildings handled differently from cities
			ctx.drawImage(tileImg, pos[0], pos[1], scale*0.866, scale); //draw the image
		}
		else if (building.type <= 7) { //harbors and bridges - "oversized" buildings
			ctx.drawImage(tileImg, pos[0]-gridWidth, pos[1]-(0.5*scale), 3*gridWidth, 2*scale); //draw the image
		} else if (building.type === 8) { //streets - currently drawn as simple lines
			var posFirst = computePosition(x, y, building.first[0], building.first[1], scale);
			var posSecond = computePosition(x, y, building.second[0], building.second[1], scale);
			ctx.beginPath();
			ctx.moveTo((posFirst[0]+(0.5*gridWidth)), (posFirst[1]+c+(0.25*scale)));
			ctx.lineTo((posSecond[0]+(0.5*gridWidth)), (posSecond[1]+c+(0.25*scale)));
			ctx.stroke();
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