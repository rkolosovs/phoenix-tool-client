'use strict';


 //	var url = "http://phoenixserver.h2610265.stratoserver.net"; //the address of the remote server goes here
	var url = "http://localhost:8000"; //for local debug

// help function to fetch current data from the server
function getNewDataFromServer(){
	loadMap(url);
	loadTurnNumber(url);
}


function loadTurnNumber() {
	$.getJSON(url + "/databaseLink/getturn/", function(json){
		currentTurn = json;
		writeTurnNumber();
	});
}

function loadPendingEvents() {
	$.getJSON(url + "/databaseLink/getevents/", function(json){
		pendingEvents = json;
		pendingEvents.forEach(function(item){
			item.status = 'withheld';
		});
		fillEventList();
	});
}

// loads the armies data from the server.
// Data the client is not supposed to have based on his login status is set to -1.
function loadArmies(url) {
    $.post({
			url: url +"/databaseLink/armydata/",
            data: {authorization: authenticationToken},
            success: function(data){
				var armies = data; //load the armies from the armies.json file
				var armiesToLoadIn = [];
                listOfArmyCoordinates = [];
                for(var i = 0; i < armies.length; i++){
                    if(Math.floor(armies[i].armyId/100) == 1){
                        var army = new heer(armies[i].armyId, armies[i].count, armies[i].leaders, armies[i].lkp, armies[i].skp, armies[i].mounts, armies[i].isGuard);
                        var armyCoords = new armyCoordinates(army, armies[i].x, armies[i].y, armies[i].realm);
                        armyCoords.setRemainingMovePoints(9);
                        armyCoords.setRemainingHeightPoints(2);
						if(armies[i].isLoadedIn != null){
							armiesToLoadIn.push([armies[i].isLoadedIn, armies[i].realm, armies[i].armyId]);
							armyCoords.a.isLoadedIn = armies[i].isLoadedIn;
						}
                        listOfArmyCoordinates.push(armyCoords);
                    } else if(Math.floor(armies[i].armyId/100) == 2){
                        var army = new reiterHeer(armies[i].armyId, armies[i].count, armies[i].leaders, armies[i].isGuard);
                        var armyCoords = new armyCoordinates(army, armies[i].x, armies[i].y, armies[i].realm);
                        armyCoords.setRemainingMovePoints(21);
                        armyCoords.setRemainingHeightPoints(2);
						if(armies[i].isLoadedIn != null){
							armiesToLoadIn.push([armies[i].isLoadedIn, armies[i].realm, armies[i].armyId]);
							armyCoords.a.isLoadedIn = armies[i].isLoadedIn;
						}
                        listOfArmyCoordinates.push(armyCoords);
                    } if(Math.floor(armies[i].armyId/100) == 3){
                        var army = new seeHeer(armies[i].armyId, armies[i].count, armies[i].leaders, armies[i].lkp, armies[i].skp, armies[i].isGuard);
                        var armyCoords = new armyCoordinates(army, armies[i].x, armies[i].y, armies[i].realm);
//                        armyCoords.setRemainingMovePoints(42); [whatevershipsmayneed]
                        listOfArmyCoordinates.push(armyCoords);
                    }
                }
				// if needed, load Troops into ships
				if(armiesToLoadIn.length > 0){
					for(var i = 0; i < armiesToLoadIn.length; i++){
						for(var j = 0; j < listOfArmyCoordinates.length; j++){
							if(listOfArmyCoordinates[j].a.armyId == armiesToLoadIn[i][0] && listOfArmyCoordinates[j].owner == armiesToLoadIn[i][1]){
								listOfArmyCoordinates[j].a.loadedArmies.push(armiesToLoadIn[i][2]);
								console.log(armiesToLoadIn[i][2] + " is loaded in " + listOfArmyCoordinates[j].a.armyId);
							}
						}
					}
				}
			},
			dataType: "json",
            //headers: {
            //    "Authorization" :"Token " + authenticationToken,
            //}
		});
}

function loadMap(url) {
	var timetest;
	$.getJSON(url +"/databaseLink/getlastsavedtimestamp/", function(json){// loads the time stamp from the database
		timetest = "";
		for(var i = 0; i< json.length; i++){
			timetest += json[i];
		}
		if(loginZeit == undefined || loginZeit < Date.parse(timetest)){
			loadArmies(url);
			loginZeit = Date.now();
			console.log("loginzeit: " + loginZeit);
			$.getJSON(url +"/databaseLink/gettoken/", function(json){// funtioniert nicht !!!
				currentCSRFToken = json;
			});
			$.getJSON(url +"/databaseLink/fielddata/", function(json){// loads the fields from the database
				fields = json;
				resizeCanvas();
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
				borders = json; //load the borders from the borders.json file
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