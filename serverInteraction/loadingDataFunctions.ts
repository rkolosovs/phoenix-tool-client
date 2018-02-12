
namespace Loading{

	//    var url = "http://phoenixserver.h2610265.stratoserver.net"; //the address of the remote server goes here
	export var url = "http://localhost:8000"; //for local debug

	// help function to fetch current data from the server
	export function getNewDataFromServer(){
		loadMap();
	}


	export function loadTurnNumber() {
		$.getJSON(url + "/databaseLink/getturn/", function(json){
			currentTurn = json;
			Drawing.writeTurnNumber();
		});
	}

	export function loadPendingEvents() {
	//	console.log("loadPendingEvents()");
		$.getJSON(url + "/databaseLink/getevents/", function(json){
			pendingEvents = json;
			pendingEvents.forEach(function(item){
				item.status = 'undetermined';
			});
			fillEventList();
		});
	}


	export function loadMap() {
		let timetest;
		$.getJSON(url +"/databaseLink/getlastsavedtimestamp/", function(json){// loads the time stamp from the database
			timetest = "";
			for(let i = 0; i< json.length; i++){
				timetest += json[i];
			}
			if(Authentication.logintime === undefined || Authentication.logintime < Date.parse(timetest)){
				Authentication.logintime = Date.now();
				console.log("loginzeit: " + Authentication.logintime);
				loadCSRFToken();
				loadRealmData();
				loadFieldData();
				loadArmies();
				loadRiverData();
				loadBuildingData();
				loadBorderData();
			}
		});
	}

	export function loadCSRFToken() {
		$.getJSON(url +"/databaseLink/gettoken/", function(json){// funtioniert nicht !!!
			currentCSRFToken = json;
		});
	}

	//loads the armies data from the server.
	//Data the client is not supposed to have based on his login status is set to -1.
	export function loadArmies() {
		$.post({
			url: url +"/databaseLink/armydata/",
			data: {authorization: authenticationToken},
			success: function(data){
				GameState.armies = data.map(army => {
					let armyOwner: Realm = GameState.realms.find(realm => realm.tag === army.realm);
					switch(Math.floor(army.armyId / 100)){
						case 1: return new FootArmy(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp,
							[army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
						case 2: return new RiderArmy(army.armyId, armyOwner, army.count, army.leaders,
							[army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
						case 3: return new Fleet(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp,
							[army.x, army.y], army.movementPoints, army.isGuard);
						default: return undefined;
					}
				});

                // if needed, load Troops into ships
				data.forEach(army => {
				    let transporterId: number = parseInt(army.isLoadedIn);
				    if(!isNaN(transporterId)){
                        (GameState.armies.find(transport => transport.getErkenfaraID() === transporterId &&
                            transport.owner.tag === army.realm) as Fleet).loadArmy(GameState.armies.find(
                                transported => transported.getErkenfaraID() === army.armyId &&
                                    transported.owner.tag === army.realm) as LandArmy);
                    }
                });
				// if the event loading finishes before the army loading is is needed, eventlist may be wrong otherwise
				fillEventList();
			},
			dataType: "json"
		});
	}

	export function loadFieldData() {
		$.getJSON(url +"/databaseLink/fielddata/", function(json){// loads the fields from the database
			GameState.fields = json.map(field =>
				new Field([field.x, field.y], field.type));
			fields = json; //TODO: Remove once everything uses the GameState class.
			Drawing.resizeCanvas();
		});
	}

	export function loadRealmData() {
		$.getJSON(url + "/databaseLink/getrealms/", function(json){
			GameState.realms = json.map(realm =>
				new Realm(realm.name, realm.tag, realm.color, Number(realm.homeTurf), realm.active));
			realms = json; //TODO: Remove once everything uses the GameState class.
		});
	}

	export function loadRiverData() {
		$.getJSON(url +"/databaseLink/getriverdata/", function(json){//load the rivers from the database
			GameState.rivers = json.map(river =>
				new River([river.firstX, river.firstY], [river.secondX, river.secondY]));
			rivers = []; //TODO: Remove once everything uses the GameState class.
			json.forEach(function(element) {
				rivers.push([[element.firstX, element.firstY],[element.secondX, element.secondY]]);
			}, this); //rivers are the coordinates of two fields on either side of the river
		});
	}

	export function loadBuildingData() {
		$.getJSON(url +"/databaseLink/buildingdata/", function(json){
			let realms: Realm[] = GameState.realms;
			GameState.buildings = json.map(building => {
				switch(building.type){
					case 0:
					case 1:
					case 2:
					case 3:
					case 4: return new ProductionBuilding(building.type, [building.x, building.y],
						realms.find(realm => realm.tag === building.realm), -1); //TODO: BuildPoints
					case 5: return new Wall(building.type, [building.x, building.y],
						realms.find(realm => realm.tag === building.realm), -1,
						stringToDirection(building.direction), -1); //TODO: BuildPoints, Soldiers
					case 6:
					case 7: let secondPos: number[] = HexFunction.neighbors([building.x, building.y])[stringToDirection(building.direction)];
						return new NonDestructibleBuilding(building.type, [building.x, building.y],
						[secondPos[0], secondPos[1]], realms.find(realm => realm.tag === building.realm));
					case 8: return new NonDestructibleBuilding(building.type, [building.firstX, building.firstY],
						[building.secondX, building.secondY], realms.find(realm => realm.tag === building.realm));
					default: return undefined;
				}
			});
			//TODO: Remove once everything uses the GameState class.
			buildings = json; //load the buildings from the buildings.json file
		});
	}

	export function loadBorderData() {
		$.getJSON(url +"/databaseLink/getborderdata/", function(json){ //load the borders from the database
			json.forEach(realm => {
				let realmToFill = GameState.realms.find(candidate => candidate.tag === realm.tag);
				if(realmToFill != undefined){
					realmToFill.territory = realm.land.map(land => GameState.fields.find(field =>
						field.coordinates === land)).filter(field => field != undefined);
				}
			});
			//TODO: Remove once everything uses the GameState class.
			borders = json; //load the borders from the borders.json file
		});
	}

	export function loadImages(tileset) { //load the images needed for visualization
		let pathPrefix = './tilesets/'+tileset; //build the path prefix common to all tile images

		Images.shallows.src = pathPrefix+'/shallows.svg'; //terrain
        Images.deepsea.src = pathPrefix+'/deepsea.svg';
        Images.lowlands.src = pathPrefix+'/lowlands.svg';
        Images.woods.src = pathPrefix+'/woods.svg';
        Images.hills.src = pathPrefix+'/hills.svg';
        Images.highlands.src = pathPrefix+'/highlands.svg';
        Images.mountains.src = pathPrefix+'/mountains.svg';
        Images.desert.src = pathPrefix+'/desert.svg';
        Images.swamp.src = pathPrefix+'/swamp.svg';
        Images.default.src = pathPrefix+'/default.svg';

        Images.troops.src = pathPrefix+'/troops.svg'; //troops
        Images.mounts.src = pathPrefix+'/mounts.svg';
        Images.boats.src = pathPrefix+'/boat.svg';

        Images.castle.src = pathPrefix+'/castle.svg'; //buildings
        Images.city.src = pathPrefix+'/city.svg';
        Images.fortress.src = pathPrefix+'/fortress.svg';
        Images.capital.src = pathPrefix+'/capital_city.svg';
        Images.capitalFort.src = pathPrefix+'/capital_fortress.svg';
        Images.wallW.src = pathPrefix+'/wall_w.svg';
        Images.wallE.src = pathPrefix+'/wall_e.svg';
        Images.wallNW.src = pathPrefix+'/wall_nw.svg';
        Images.wallSW.src = pathPrefix+'/wall_sw.svg';
        Images.wallNE.src = pathPrefix+'/wall_ne.svg';
        Images.wallSE.src = pathPrefix+'/wall_se.svg';
        Images.harborW.src = pathPrefix+'/harbor_w.svg';
        Images.harborE.src = pathPrefix+'/harbor_e.svg';
        Images.harborNW.src = pathPrefix+'/harbor_nw.svg';
        Images.harborSW.src = pathPrefix+'/harbor_sw.svg';
        Images.harborNE.src = pathPrefix+'/harbor_ne.svg';
        Images.harborSE.src = pathPrefix+'/harbor_se.svg';
        Images.bridgeW.src = pathPrefix+'/bridge_w.svg';
        Images.bridgeE.src = pathPrefix+'/bridge_e.svg';
        Images.bridgeNW.src = pathPrefix+'/bridge_nw.svg';
        Images.bridgeSW.src = pathPrefix+'/bridge_sw.svg';
        Images.bridgeNE.src = pathPrefix+'/bridge_ne.svg';
        Images.bridgeSE.src = pathPrefix+'/bridge_se.svg';
	}
}