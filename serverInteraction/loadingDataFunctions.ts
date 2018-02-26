import {Drawing} from "../gui/drawingFunctions";
import {Authentication} from "./authenticationFunctions";
import {GameState} from "../gameState";
import {MoveEvent} from "../events/moveEvent";
import {BattleEvent} from "../events/battleEvent";
import {ShootEvent} from "../events/shootEvent";
import {MergeEvent} from "../events/mergEvent";
import {MountEvent} from "../events/mountEvent";
import {TransferEvent} from "../events/transferEvent";
import {SplitEvent} from "../events/splitEvent";
import {Realm} from "../realm";
import {RiderArmy} from "../armies/riderArmy";
import {River} from "../map/river";
import {Field} from "../map/field";
import {LandArmy} from "../armies/landArmy";
import {FootArmy} from "../armies/footArmy";
import {Fleet} from "../armies/fleet";
import {stringToDirection} from "../map/direction";
import {HexFunction} from "../libraries/hexFunctions";
import {Wall} from "../buildings/wall";
import {ProductionBuilding} from "../buildings/productionBuilding";
import {NonDestructibleBuilding} from "../buildings/nonDestructibleBuilding";
import {Images} from "../gui/images";

export namespace Loading{
	// help function to fetch current data from the server
    import url = Authentication.url;

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
			let pendingEvents = json;
			GameState.pendingNewEvents =[];
			pendingEvents.forEach(function(item, index){
				let content = pendingEvents[index].content;

				switch(item.type){
					case "move":
						GameState.pendingNewEvents.push(new MoveEvent(index, "undetermined",
							GameState.realms.find(realm => (realm === content.realm)), content.armyId, content.fromX,
							content.fromY, content.toX, content.toY, item.pk));
							break;
					case "battle":
						GameState.pendingNewEvents.push(new BattleEvent(index, "undetermined", content.participants,
							GameState.realms.find(realm => (realm === content.realm)), content.x, content.y, item.pk));
						break;
					case "shoot":
						GameState.pendingNewEvents.push(new ShootEvent(index, "undetermined",
							GameState.realms.find(realm => (realm === content.realm)), content.armyId, content.toX,
							content.toY, content.fromX, content.fromY, content.LKPcount, content.SKPcount, content.target, item.pk));
						break;
					case "split":
						GameState.pendingNewEvents.push(new SplitEvent(index, "undetermined", content.fromArmy, content.newArmy,
							GameState.realms.find(realm => (realm === content.realm)), content.troops, content.leaders,
							content.mounts, content.lkp, content.skp, content.x, content.y, item.pk));
						break;
					case "merge":
						GameState.pendingNewEvents.push(new MergeEvent(index, "undetermined", content.fromArmy, content.toArmy,
							GameState.realms.find(realm => (realm === content.realm)), content.x, content.y, item.pk));
						break;
					case "mount":
						GameState.pendingNewEvents.push(new MountEvent(index, "undetermined", content.fromArmy, content.newArmy,
							GameState.realms.find(realm => (realm === content.realm)), content.troops, content.leaders,
							content.x, content.y, item.pk));
						break;
					case "transfer":
						GameState.pendingNewEvents.push(new TransferEvent(index, "undetermined", content.fromArmy, content.toArmy,
							GameState.realms.find(realm => (realm === content.realm)), content.troops, content.leaders,
							content.mounts, content.lkp, content.skp, content.x, content.y, item.pk));
						break;
				}
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
            Authentication.currentCSRFToken = json;
		});
	}

	//loads the armies data from the server.
	//Data the client is not supposed to have based on his login status is set to -1.
	export function loadArmies() {
		$.post({
			url: url +"/databaseLink/armydata/",
			data: {authorization: Authentication.authenticationToken},
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