'use strict';


//    var url = "http://phoenixserver.h2610265.stratoserver.net"; //the address of the remote server goes here
  var url = "http://localhost:8000"; //for local debug

// help function to fetch current data from the server
function getNewDataFromServer(){
	loadMap();
}


function loadTurnNumber() {
	$.getJSON(url + "/databaseLink/getturn/", function(json){
		currentTurn = json;
		writeTurnNumber();
	});
}

function loadPendingEvents() {
//	console.log("loadPendingEvents()");
	$.getJSON(url + "/databaseLink/getevents/", function(json){
		pendingEvents = json;
		pendingEvents.forEach(function(item){
			item.status = 'undetermined';
		});
		fillEventList();
	});
}


function loadMap() {
	var timetest;
	$.getJSON(url +"/databaseLink/getlastsavedtimestamp/", function(json){// loads the time stamp from the database
		timetest = "";
		for(var i = 0; i< json.length; i++){
			timetest += json[i];
		}
		if(loginZeit === undefined || loginZeit < Date.parse(timetest)){
			loginZeit = Date.now();
			console.log("loginzeit: " + loginZeit);
			loadCSRFToken();
			loadArmies();
			loadFieldData();
			loadRiverData();
			loadBuildingData();
			loadBorderData();
			loadMultifieldArray();
		}
	});
}

function loadCSRFToken() {
	$.getJSON(url +"/databaseLink/gettoken/", function(json){// funtioniert nicht !!!
		currentCSRFToken = json;
	});
}

//loads the armies data from the server.
//Data the client is not supposed to have based on his login status is set to -1.
function loadArmies() {
	$.post({
		url: url +"/databaseLink/armydata/",
        data: {authorization: authenticationToken},
        success: function(data){
        	var armies = data;
			var armiesToLoadIn = [];
            listOfArmies = [];
            for(var i = 0; i < armies.length; i++){
            	var army = null;
                if(Math.floor(armies[i].armyId/100) == 1){
                	army = new heer(armies[i].armyId, armies[i].count, armies[i].leaders, armies[i].lkp, armies[i].skp,
                	    armies[i].mounts, armies[i].isGuard, armies[i].x, armies[i].y, armies[i].realm);
                } else if(Math.floor(armies[i].armyId/100) == 2){
                	army = new reiterHeer(armies[i].armyId, armies[i].count, armies[i].leaders, armies[i].isGuard,
                	    armies[i].x, armies[i].y, armies[i].realm);
                } else if(Math.floor(armies[i].armyId/100) == 3){
                	army = new seeHeer(armies[i].armyId, armies[i].count, armies[i].leaders, armies[i].lkp,
                	    armies[i].skp, armies[i].isGuard, armies[i].x, armies[i].y, armies[i].realm);
                }
                army.setRemainingMovePoints(armies[i].movementPoints);
                army.setRemainingHeightPoints(armies[i].heightPoints);
				if(armies[i].isLoadedIn != null){
					armiesToLoadIn.push([armies[i].isLoadedIn, armies[i].realm, armies[i].armyId]);
					army.isLoadedIn = armies[i].isLoadedIn;
				}
                listOfArmies.push(army);
            }
			// if needed, load Troops into ships
			if(armiesToLoadIn.length > 0){
				for(var i = 0; i < armiesToLoadIn.length; i++){
					for(var j = 0; j < listOfArmies.length; j++){
						if(listOfArmies[j].armyId == armiesToLoadIn[i][0] && listOfArmies[j].owner == armiesToLoadIn[i][1]){
							listOfArmies[j].loadedArmies.push(armiesToLoadIn[i][2]);
							console.log(armiesToLoadIn[i][2] + " is loaded in " + listOfArmies[j].armyId);
						}
					}
				}
			}
			// if the event loading finishes before the army loading is is needed, eventlist may be wrong otherwise
			fillEventList();
		},
		dataType: "json"
	});
}

function loadFieldData() {
	$.getJSON(url +"/databaseLink/fielddata/", function(json){// loads the fields from the database
		fields = json;
		resizeCanvas();
	});
}

function loadRiverData() {
	$.getJSON(url +"/databaseLink/getriverdata/", function(json){//load the rivers from the database
		var fluesse = json; 
		var collector = [];
		fluesse.forEach(function(element) {
			collector.push([[element.firstX, element.firstY],[element.secondX, element.secondY]]);
		}, this);
		rivers = collector; //rivers are the coordinates of two fields on either side of the river
	});
}

function loadBuildingData() {
	$.getJSON(url +"/databaseLink/buildingdata/", function(json){
		buildings = json; //load the buildings from the buildings.json file
	});
}

function loadBorderData() {
	$.getJSON(url +"/databaseLink/getborderdata/", function(json){ //load the borders from the database
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
	boatsImg.src = pathPrefix+'/boat.svg'; 

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

function loadMultifieldArray(){
	listOfMultiArmyFields = [];
	for (let i = 0; i < listOfArmies.length; i++) {
		createMultifield(listOfArmies[i]);
		}
} 