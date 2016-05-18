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

var field = -1; //declare field variable
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


function loadMap() {
	$.getJSON("map.json", function(json){
		field = json; //load the field variable with the json from the map file
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
}

function drawMap(ctx, x, y, scale, tileset) {
	for (var i = 0; i < field.length; i++) {
		var currentField = field[i]; //get the current field to draw
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
	for (var i = 0; i < selectedFields.length; i++) {
		var selectedField = selectedFields[i]; //get selected field
		var pos = computePosition(x, y, selectedField[0], selectedField[1], scale); //get fields position

		//draw a simple circle; TODO: draw propper selection
		ctx.beginPath();
      	ctx.arc(pos[0]+((scale * 0.866)/2), pos[1]+(scale /2), scale/2, 0, 2 * Math.PI, false);
      	ctx.lineWidth = 5;
      	ctx.strokeStyle = 'green';
      	ctx.stroke();
	}
}

function computePosition(xOrig, yOrig, xCurr, yCurr, scale) { //computes a fields position
	var xpos = xOrig + (xCurr * scale * 0.866); //get the current field's x position
	return [ (yCurr%2===1?(xpos - (scale*0.866/2)):(xpos)), yOrig+(yCurr * scale * 1.366 / 2)]; //each odd row is offset half a hex to the left
}