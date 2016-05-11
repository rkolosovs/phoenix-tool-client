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
		var tileImg = new Image(); //shift every odd row half width to the left
		var xpos = x+(currentField.x * (scale * 0.866) ); //get the current field's position
		var ypos = y+(currentField.y * (scale * 1.366/2)); //only offset 3/4 of the scale in the y direction 
		if (currentField.y % 2 === 1) {xpos -= (scale * 0.866 /2);} //offset each even row half a hex to the left
        	
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
		ctx.drawImage(tileImg, xpos, ypos, (scale*0.866), scale); //draw the image
	}
}

function drawSelection(ctx, x, y, scale, selectedFields) {
	for (var i = 0; i < selectedFields.length; i++) {
		var selectedField = selectedFields[i];
		var selectX = selectedField[0];
		var selectY = selectedField[1];

		var centerX = x+(selectX*scale * 0.866);
		var centerY = y+(selectY*(scale*1.366/2));
		if (selectY % 2 === 1) {centerX -= scale* 0.866/2;}

		ctx.beginPath();
      	ctx.arc(centerX+((scale * 0.866)/2), centerY+(scale /2), scale/2, 0, 2 * Math.PI, false);
      	ctx.lineWidth = 5;
      	ctx.strokeStyle = 'green';
      	ctx.stroke();
	}
}