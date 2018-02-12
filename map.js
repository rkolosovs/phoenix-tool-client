"use strict";
//hex parts: values used to compute coordinates of a hexes corners
//when given upper left point of inscribing rectangle
var c;
var gH;
var gW;
var currentCSRFToken;
var currentTurn; //status \in {st, fi}
var months = ['Agul', 'Hawar', 'Rim', 'Naliv', 'Larn', 'Hel', 'Jawan', 'Lud'];
var preparedEvents = [];
// var fields; //declare fields variable; holds the terrain fields
// var rivers; //declare rivers variable; holds the rivers
// var buildings; //declare buildings variable; holds the buildings
// var borders; //declare borders variable; holds the borders
// var realms; //declare realms variable; holds the names, colors and home turf
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
//computes a fields position (upper left corner of inscribing rectangle)
function computePosition(orig, curr, scale) {
    //get the current field's x position
    let xpos = orig[0] + (curr[0] * scale * SIN60);
    //each odd row is offset half a hex to the left
    return [(((curr[1] % 2) !== 0) ? (xpos - (0.5 * scale * SIN60)) : (xpos)), orig[1] + (curr[1] * gH)];
}
//for all directions in the usual order (nw, ne, e, se, sw, w)
//returns true if candidates contains the neighbor of field in the respective direction
function getAdjacency(field, candidates) {
    let result = [false, false, false, false, false, false];
    let neighbors = HexFunction.neighbors(field);
    neighbors.forEach((neighbor, neighborIndex) => result[neighborIndex] = candidates.some(candidate => candidate[0] === neighbor[0] && candidate[1] === neighbor[1]));
    return result;
}
// function contains(array, point) {
// 	let result = false;
// 	for (let i = 0; i < array.length; i++) {
// 			let sf = array[i];
// 			if ((sf[0] === point[0]) && (sf[1] === point[1])){
// 				result = true;
// 				break;
// 			}
// 		}
// 	return result;
// }
function setHexParts(scale) {
    c = 0.25 * scale;
    gH = 0.75 * scale;
    gW = SIN60 * scale;
}
