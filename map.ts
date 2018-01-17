'use strict';
// import $ = require("jquery");

//hex parts: values used to compute coordinates of a hexes corners 
//when given upper left point of inscribing rectangle
var c;
var gH;
var gW;

var currentCSRFToken;
var currentTurn; //status \in {st, fi}
var months = ['Agul', 'Hawar', 'Rim', 'Naliv', 'Larn', 'Hel', 'Jawan', 'Lud'];
var preparedEvents = [];

var fields; //declare fields variable; holds the terrain fields
var rivers; //declare rivers variable; holds the rivers
var buildings; //declare buildings variable; holds the buildings
var borders; //declare borders variable; holds the borders
var realms; //declare realms variable; holds the names, colors and home turf
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
var boatsImg = new Image();

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


function computePosition(xOrig, yOrig, xCurr, yCurr, scale) { //computes a fields position (upper left corner of inscribing rectangle)
	let xpos = xOrig + (xCurr * scale * SIN60); //get the current field's x position
	return [ (((yCurr%2)!==0)?(xpos - (0.5*scale*SIN60)):(xpos)), yOrig+(yCurr * gH)]; //each odd row is offset half a hex to the left
}

function getAdjacency(field, land) { //returns adjacencies of the field amoung the hexes in land numbered from ne clockwise
	let result = [0, 0, 0, 0, 0, 0];
	if ((field[1]%2 === 0)) { //if the field is in an even row
		for (let i = 0; i < land.length; i++) { //check each field of real land for adjacency
			let candidate = land[i];
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
		for (let i = 0; i < land.length; i++) { //check each field of real land for adjacency
			let candidate = land[i];
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
	let result = false;
	for (let i = 0; i < array.length; i++) {
			let sf = array[i];
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
