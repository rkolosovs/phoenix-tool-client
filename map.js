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

var field = [
//central triangle
{type: this.terrain.hills,		x: 4,	y: 3},
{type: this.terrain.highlands,	x: 3,	y: 4},
{type: this.terrain.woods,		x: 4,	y: 4},
//inner ring
{type: this.terrain.lowlands,	x: 3,	y: 2},
{type: this.terrain.lowlands,	x: 4,	y: 2},
{type: this.terrain.lowlands,	x: 4,	y: 5},
{type: this.terrain.lowlands,	x: 5,	y: 5},
{type: this.terrain.lowlands,	x: 3,	y: 5},
{type: this.terrain.lowlands,	x: 2,	y: 4},
{type: this.terrain.lowlands,	x: 3,	y: 3},
{type: this.terrain.lowlands,	x: 5,	y: 3},
{type: this.terrain.lowlands,	x: 5,	y: 4},
//middle ring
{type: this.terrain.shallows,	x: 1,	y: 4},
{type: this.terrain.shallows,	x: 2,	y: 3},
{type: this.terrain.shallows,	x: 2,	y: 2},
{type: this.terrain.shallows,	x: 3,	y: 1},
{type: this.terrain.shallows,	x: 4,	y: 1},
{type: this.terrain.shallows,	x: 5,	y: 1},
{type: this.terrain.shallows,	x: 5,	y: 2},
{type: this.terrain.shallows,	x: 6,	y: 3},
{type: this.terrain.shallows,	x: 6,	y: 4},
{type: this.terrain.shallows,	x: 6,	y: 5},
{type: this.terrain.shallows,	x: 5,	y: 6},
{type: this.terrain.shallows,	x: 4,	y: 6},
{type: this.terrain.shallows,	x: 3,	y: 6},
{type: this.terrain.shallows,	x: 2,	y: 6},
{type: this.terrain.shallows,	x: 2,	y: 5},
//outer ring
{type: this.terrain.deepsea,	x: 0,	y: 4},
{type: this.terrain.deepsea,	x: 1,	y: 3},
{type: this.terrain.deepsea,	x: 1,	y: 2},
{type: this.terrain.deepsea,	x: 2,	y: 1},
{type: this.terrain.deepsea,	x: 2,	y: 0},
{type: this.terrain.deepsea,	x: 3,	y: 0},
{type: this.terrain.deepsea,	x: 4,	y: 0},
{type: this.terrain.deepsea,	x: 5,	y: 0},
{type: this.terrain.deepsea,	x: 6,	y: 1},
{type: this.terrain.deepsea,	x: 6,	y: 2},
{type: this.terrain.deepsea,	x: 7,	y: 3},
{type: this.terrain.deepsea,	x: 7,	y: 4},
{type: this.terrain.deepsea,	x: 7,	y: 5},
{type: this.terrain.deepsea,	x: 6,	y: 6},
{type: this.terrain.deepsea,	x: 6,	y: 7},
{type: this.terrain.deepsea,	x: 5,	y: 7},
{type: this.terrain.deepsea,	x: 4,	y: 7},
{type: this.terrain.deepsea,	x: 3,	y: 7},
{type: this.terrain.deepsea,	x: 2,	y: 7},
{type: this.terrain.deepsea,	x: 1,	y: 6},
{type: this.terrain.deepsea,	x: 1,	y: 5}
];

function drawMap(ctx, x, y, scale) {
	for (var i = 0; i < field.length; i++) {
		var currentField = field[i]; //get the current field to draw
		switch(currentField.type){ //set the field color to match the field type; change color here
			case terrain.shallows: ctx.fillStyle="blue";
			break;

			case terrain.deepsea: ctx.fillStyle="darkblue";
			break;

			case terrain.lowlands: ctx.fillStyle="lightgreen";
			break;

			case terrain.woods: ctx.fillStyle="darkgreen";
			break;

			case terrain.hills: ctx.fillStyle="sandybrown";
			break;

			case terrain.highlands: ctx.fillStyle="saddlebrown";
			break;

			case terrain.mountains: ctx.fillStyle="grey";
			break;

			case terrain.desert: ctx.fillStyle="yellow";
			break;

			case terrain.swamp: ctx.fillStyle="purple";
			break;
			
			default: ctx.fillStyle="black";
			break;
		}
		var xpos = x+(currentField.x * scale); //get the current field's position
		var ypos = y+(currentField.y * scale);
		if (currentField.y % 2 === 1) {xpos -= scale/2;} //shift every odd row half width to the left
		ctx.fillRect(xpos, ypos, scale, scale); //draw field; TODO: actually draw hexagons instead of squares
	}
}

