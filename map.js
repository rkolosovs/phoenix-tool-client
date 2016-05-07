// (function () {
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

var mapJSON = '['+
	'{"type":1, "x":0, "y":4},'+
	'{"type":1, "x":1, "y":3},'+
	'{"type":1, "x":1, "y":2},'+
	'{"type":1, "x":2, "y":1},'+
	'{"type":1, "x":2, "y":0},'+
	'{"type":1, "x":3, "y":0},'+
	'{"type":1, "x":4, "y":0},'+
	'{"type":1, "x":5, "y":0},'+
	'{"type":1, "x":6, "y":1},'+
	'{"type":1, "x":6, "y":2},'+
	'{"type":1, "x":7, "y":3},'+
	'{"type":1, "x":7, "y":4},'+
	'{"type":1, "x":7, "y":5},'+
	'{"type":1, "x":6, "y":6},'+
	'{"type":1, "x":6, "y":7},'+
	'{"type":1, "x":5, "y":7},'+
	'{"type":1, "x":4, "y":7},'+
	'{"type":1, "x":3, "y":7},'+
	'{"type":1, "x":2, "y":7},'+
	'{"type":1, "x":1, "y":6},'+
	'{"type":1, "x":1, "y":5}]';
var field = JSON.parse(mapJSON);
// [
// //central triangle
// {type: this.terrain.hills,		x: 4,	y: 3},
// {type: this.terrain.highlands,	x: 3,	y: 4},
// {type: this.terrain.woods,		x: 4,	y: 4},
// //inner ring
// {type: this.terrain.lowlands,	x: 3,	y: 2},
// {type: this.terrain.lowlands,	x: 4,	y: 2},
// {type: this.terrain.lowlands,	x: 4,	y: 5},
// {type: this.terrain.lowlands,	x: 5,	y: 5},
// {type: this.terrain.lowlands,	x: 3,	y: 5},
// {type: this.terrain.lowlands,	x: 2,	y: 4},
// {type: this.terrain.lowlands,	x: 3,	y: 3},
// {type: this.terrain.lowlands,	x: 5,	y: 3},
// {type: this.terrain.lowlands,	x: 5,	y: 4},
// //middle ring
// {type: this.terrain.shallows,	x: 1,	y: 4},
// {type: this.terrain.shallows,	x: 2,	y: 3},
// {type: this.terrain.shallows,	x: 2,	y: 2},
// {type: this.terrain.shallows,	x: 3,	y: 1},
// {type: this.terrain.shallows,	x: 4,	y: 1},
// {type: this.terrain.shallows,	x: 5,	y: 1},
// {type: this.terrain.shallows,	x: 5,	y: 2},
// {type: this.terrain.shallows,	x: 6,	y: 3},
// {type: this.terrain.shallows,	x: 6,	y: 4},
// {type: this.terrain.shallows,	x: 6,	y: 5},
// {type: this.terrain.shallows,	x: 5,	y: 6},
// {type: this.terrain.shallows,	x: 4,	y: 6},
// {type: this.terrain.shallows,	x: 3,	y: 6},
// {type: this.terrain.shallows,	x: 2,	y: 6},
// {type: this.terrain.shallows,	x: 2,	y: 5},
// //outer ring
// {type: this.terrain.deepsea,	x: 0,	y: 4},
// {type: this.terrain.deepsea,	x: 1,	y: 3},
// {type: this.terrain.deepsea,	x: 1,	y: 2},
// {type: this.terrain.deepsea,	x: 2,	y: 1},
// {type: this.terrain.deepsea,	x: 2,	y: 0},
// {type: this.terrain.deepsea,	x: 3,	y: 0},
// {type: this.terrain.deepsea,	x: 4,	y: 0},
// {type: this.terrain.deepsea,	x: 5,	y: 0},
// {type: this.terrain.deepsea,	x: 6,	y: 1},
// {type: this.terrain.deepsea,	x: 6,	y: 2},
// {type: this.terrain.deepsea,	x: 7,	y: 3},
// {type: this.terrain.deepsea,	x: 7,	y: 4},
// {type: this.terrain.deepsea,	x: 7,	y: 5},
// {type: this.terrain.deepsea,	x: 6,	y: 6},
// {type: this.terrain.deepsea,	x: 6,	y: 7},
// {type: this.terrain.deepsea,	x: 5,	y: 7},
// {type: this.terrain.deepsea,	x: 4,	y: 7},
// {type: this.terrain.deepsea,	x: 3,	y: 7},
// {type: this.terrain.deepsea,	x: 2,	y: 7},
// {type: this.terrain.deepsea,	x: 1,	y: 6},
// {type: this.terrain.deepsea,	x: 1,	y: 5}
// ];

function drawMap(ctx, x, y, scale, tileset) {
	for (var i = 0; i < field.length; i++) {
		var currentField = field[i]; //get the current field to draw
		var tileImg = new Image(); //shift every odd row half width to the left
		var xpos = x+(currentField.x * scale); //get the current field's position
		var ypos = y+(currentField.y * (scale * 0.75)); //only offset 3/4 of the scale in the y direction 
		if (currentField.y % 2 === 1) {xpos -= scale/2;} //offset each even row half a hex to the left
        	
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
		ctx.drawImage(tileImg, xpos, ypos, scale, scale); //draw the image
	}
}
// })();
