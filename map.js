//constants
var SQRT3 = Math.sqrt(3); //about 1.732050808...
var SIN60 = 0.5 * SQRT3; //about 0.8660254037...

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
	{tag: "usa", color: [255, 140, 0]},
	{tag: "vvh", color: [0, 100, 0]},
	{tag: "eos", color: [128, 0, 128]}
];

//hex parts: values used to compute coordinates of a hexes corners 
//when given upper left point of inscribing rectangle
var c;
var gH;
var gW;

var gamestate; //abstract turn structure

var fields; //declare fields variable; holds the terrain fields
var rivers; //declare rivers variable; holds the rivers
var buildings; //declare buildings variable; holds the buildings
var borders; //declare borders variable; holds the borders
var loginZeit;

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


function loadMap(url) {	
	var timetest;
	$.getJSON(url +"/databaseLink/getlastsavedtimestamp/", function(json){// loads the time stamp from the database
		timetest = "";
		for(var i = 0; i< json.length; i++){
			timetest += json[i];
		}
		if(loginZeit == undefined || loginZeit < Date.parse(timetest)){
			loadArmies(url);
			console.log("da");
			loginZeit = Date.now();
			console.log("loginzeit: " + loginZeit);
			gamestate = new gameState(0, [0], [0], 0);
			$.getJSON(url +"/databaseLink/gettoken/", function(json){// funtioniert nicht !!!
				currentCSRFToken = json;
			});
			$.getJSON(url +"/databaseLink/fielddata/", function(json){// loads the fields from the database
				fields = json;
			});
			$.getJSON(url +"/databaseLink/getriverdata/", function(json){//load the rivers from the database
				var fluesse = json; 
				var collector = [];
				fluesse.forEach(function(element) {
					collector.push([[element.firstX, element.firstY],[element.secondX,element.secondY]]);
				}, this);
				rivers = collector; //rivers are the coordinates of two fields on either side of the river
			});
			$.getJSON(url +"/databaseLink/buildingdata/", function(json){
				buildings = json; //load the buildings from the buildings.json file
			});
			$.getJSON(url +"/databaseLink/getborderdata/", function(json){ //load the borders from the database
				var fromServer = json; //load the borders from the borders.json file
				var accumulator = []; // var to accumulate the differnt nations' borders
				for(var i = 0; i < fromServer.length; i++){
					if(accumulator.length == 0){ // the first is always a new country
						accumulator.push({"tag":fromServer[i].reich,"land":[[fromServer[i].x,fromServer[i].y]]});
					} else {
						var neuesReich = false; // think it's not a new country,
						for(var j = 0; j < accumulator.length; j++){ // look at all existing Countries,
							if(fromServer[i].reich == accumulator[j].tag){ // if it fits one,
								accumulator[j].land.push([fromServer[i].x,fromServer[i].y]); // add it to it's land,
							} else if (j == accumulator.length-1){ // if it doesn't,
								neuesReich = true; // it's a new country.
							}
						}
						if(neuesReich == true){ // if it is a new country
							accumulator.push({"tag":fromServer[i].reich,"land":[[fromServer[i].x,fromServer[i].y]]}); // add it as a new country
						}
					}
				}
				for(var i =0; i < accumulator.length; i++){
					switch(accumulator[i].tag){
						case 1: accumulator[i].tag = "usa"; break;
						case 3: accumulator[i].tag = "vvh"; break;
						case 4: accumulator[i].tag = "eos"; break;
					}
				}
				console.log("accu: ");
				console.log(accumulator);
				borders = accumulator;
			});
		}
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
	drawBorders(ctx, x, y, scale);
	drawBuildings(ctx, x, y, scale);
}

function drawBorders(ctx, x, y, scale) {
	var offset = (scale/13); //set offset of a border from the actual border of two hexes
	for (var i = 0; i < borders.length; i++) {
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
		for (var j = 0; j < land.length; j++) {
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

function computePosition(xOrig, yOrig, xCurr, yCurr, scale) { //computes a fields position (upper left corner of inscribing rectangle)
	var xpos = xOrig + (xCurr * scale * SIN60); //get the current field's x position
	return [ (((yCurr%2)!==0)?(xpos - (0.5*scale*SIN60)):(xpos)), yOrig+(yCurr * gH)]; //each odd row is offset half a hex to the left
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
			ctx.drawImage(troopsImg, pos[0], pos[1], (scale*SIN60), scale); 
		} else if(Math.floor(armyData.a.armyId/100) == 2) {
			ctx.drawImage(mountsImg, pos[0], pos[1], (scale*SIN60), scale);
		}
	}
}

function getAdjacency(field, land) { //returns adjacencies of the field amoung the hexes in land numbered from ne clockwise
	var result = [0, 0, 0, 0, 0, 0];
	if ((field[1]%2 === 0)) { //if the field is in an even row
		for (var i = 0; i < land.length; i++) { //check each field of real land for adjacency
			var candidate = land[i];
			if ((candidate[0] === (field[0]+1)) && (candidate[1] === (field[1]-1))) { //ne neighbour
				result[0] = 1;
			} else if ((candidate[0] === (field[0]+1)) && (candidate[1] === (field[1]))) { //e neighbour
				result[1] = 1;
			} else if ((candidate[0] === (field[0]+1)) && (candidate[1] === (field[1]+1))) { //se neighbour
				result[2] = 1;
			} else if ((candidate[0] === (field[0])) && (candidate[1] === (field[1]+1))) { //sw neighbour
				result[3] = 1;
			} else if ((candidate[0] === (field[0]-1)) && (candidate[1] === (field[1]))) { //w neighbour
				result[4] = 1;
			} else if ((candidate[0] === (field[0])) && (candidate[1] === (field[1]-1))) { //nw neighbour
				result[5] = 1;
			}
		}
	} else { //if the field is in an odd row
		for (var i = 0; i < land.length; i++) { //check each field of real land for adjacency
			var candidate = land[i];
			if ((candidate[0] === (field[0])) && (candidate[1] === (field[1]-1))) { //ne neighbour
				result[0] = 1;
			} else if ((candidate[0] === (field[0]+1)) && (candidate[1] === (field[1]))) { //e neighbour
				result[1] = 1;
			} else if ((candidate[0] === (field[0])) && (candidate[1] === (field[1]+1))) { //se neighbour
				result[2] = 1;
			} else if ((candidate[0] === (field[0]-1)) && (candidate[1] === (field[1]+1))) { //sw neighbour
				result[3] = 1;
			} else if ((candidate[0] === (field[0]-1)) && (candidate[1] === (field[1]))) { //w neighbour
				result[4] = 1;
			} else if ((candidate[0] === (field[0]-1)) && (candidate[1] === (field[1]-1))) { //nw neighbour
				result[5] = 1;
			}
		}
	}
	return result;
}

function contains(array, point) {
	var result = false;
	for (var i = 0; i < array.length; i++) {
			var sf = array[i];
			if ((sf[0] === point[0]) && (sf[1] === point[1])){
				result = true;
				break;
			}
		}
	return result;
}

function setHexParts(scale) {
	c = 0.25 * scale;
	gH = 0.75 * scale;
	gW = SIN60 * scale;
}