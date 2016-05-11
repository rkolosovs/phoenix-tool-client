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

function loadMap() {
	$.getJSON("map.json", function(json){
		field = json; //load the field variable with the json from the map file
	});
}

function drawMap(ctx, x, y, scale, tileset) {
	if (field === -1) {loadMap();}

	for (var i = 0; i < field.length; i++) {
		var currentField = field[i]; //get the current field to draw
		var tileImg = new Image();
		var pos = computePosition(x, y, currentField.x, currentField.y, scale); //get the fields position
        	
      	var imgSource = './tilesets/'+tileset; //start of the image source path
		switch(currentField.type){ //extend the field image source to match the field type
			case terrain.shallows: imgSource += '/shallows.svg';
			break;

			case terrain.deepsea: imgSource += '/deepsea.svg';
			break;

			case terrain.lowlands: imgSource += '/lowlands.svg';
			break;

			case terrain.woods: imgSource += '/woods.svg';
			break;

			case terrain.hills: imgSource += '/hills.svg';
			break;

			case terrain.highlands: imgSource += '/highlands.svg';
			break;

			case terrain.mountains: imgSource += '/mountains.svg';
			break;

			case terrain.desert: imgSource += '/desert.svg';
			break;

			case terrain.swamp: imgSource += '/swamp.svg';
			break;

			default: imgSource += '/default.svg';
			break;
		}
		tileImg.src = imgSource; //assign the source to the image object
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
	return [ (yCurr%2===1?(xpos - (scale*0.866/2)):(xpos)), yOrig+(yCurr * scale * 1.366 / 2)]; //each even row is offset half a hex to the left
}