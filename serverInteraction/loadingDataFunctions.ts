import {Drawing} from "../gui/drawingFunctions";
import {Authentication} from "./authenticationFunctions";
import {GameState} from "../gameState";
import {MoveEvent} from "../events/moveEvent";
import {BattleEvent} from "../events/battleEvent";
import {ShootEvent} from "../events/shootEvent";
import {MergeEvent} from "../events/mergeEvent";
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
import {Wall} from "../buildings/wall";
import {ProductionBuilding} from "../buildings/productionBuilding";
import {NonDestructibleBuilding} from "../buildings/nonDestructibleBuilding";
import {Images} from "../gui/images";
import {GUI} from "../gui/gui";
import {EventStatus} from "../events/eventStatus";
import {Army} from "../armies/army";
import {Building} from "../buildings/building";

export namespace Loading{
	// help function to fetch current data from the server
    import url = Authentication.url;

    export function getNewDataFromServer(){
		loadMap();
	}


	export function loadTurnNumber() {
		$.getJSON(url + "/databaseLink/getturn/",
            (json: {'turn': number, 'realm': string, 'status': string}) => {
			GameState.currentTurn = json;
			Drawing.writeTurnNumber();
		});
	}

	export function loadPendingEvents() {
		$.getJSON(url + "/databaseLink/getevents/",
            (json: {'pk': number, 'type': string, 'content': any, 'prerequisiteEvents': number[],
                'turn': {'turnNumber': number, 'turnOrder': number, 'realm': string}}[]) => {
			let pendingEvents = json;
			GameState.loadedEvents =[];
			pendingEvents.forEach(
			    (item: {'pk': number, 'type': string, 'content': any, 'prerequisiteEvents': number[],
                     'turn': {'turnNumber': number, 'turnOrder': number, 'realm': string}},
                 index: number) => {
				let content = item.content;
				let realm: Realm|undefined;
				switch (item.type) {
                    case "move":
                        realm = GameState.realms.find(realm => (realm.tag === content.realm));
                        if(realm != undefined) {
                            GameState.loadedEvents.push(new MoveEvent(index, EventStatus.Undetermined, realm,
                                content.armyId, [content.fromX, content.fromY], [content.toX, content.toY],
                                item.prerequisiteEvents, item.pk));
                        } else{
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "battle":
                        GameState.loadedEvents.push(new BattleEvent(index, EventStatus.Undetermined,
                            content.participants, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        break;
                    case "shoot":
                        realm = GameState.realms.find(realm => (realm.tag === content.realm));
                        if(realm != undefined) {
                            GameState.loadedEvents.push(new ShootEvent(index, EventStatus.Undetermined, realm,
                                content.armyId, [content.toX, content.toY], [content.fromX, content.fromY],
                                content.LKPcount, content.SKPcount, content.target, item.prerequisiteEvents, item.pk));
                        } else{
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "split":
                        realm = GameState.realms.find(realm => (realm.tag === content.realm));
                        if(realm != undefined) {
                            GameState.loadedEvents.push(new SplitEvent(index, EventStatus.Undetermined, content.fromArmy,
                                content.newArmy, realm, content.troops, content.leaders, content.mounts, content.lkp,
                                content.skp, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        } else{
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "merge":
                        realm = GameState.realms.find(realm => (realm.tag === content.realm));
                        if(realm != undefined) {
                            GameState.loadedEvents.push(new MergeEvent(index, EventStatus.Undetermined,
                                content.fromArmy, content.toArmy, realm, [content.x, content.y],
                                item.prerequisiteEvents, item.pk));
                        } else{
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "mount":
                        realm = GameState.realms.find(realm => (realm.tag === content.realm));
                        if(realm != undefined) {
                            GameState.loadedEvents.push(new MountEvent(index, EventStatus.Undetermined, content.fromArmy,
                                content.newArmy, realm, content.troops, content.leaders, [content.x, content.y],
                                item.prerequisiteEvents, item.pk));
                        } else{
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "transfer":
                        realm = GameState.realms.find(realm => (realm.tag === content.realm));
                        if(realm != undefined) {
                            GameState.loadedEvents.push(new TransferEvent(index, EventStatus.Undetermined,
                                content.fromArmy, content.toArmy, realm, content.troops, content.leaders,
                                content.mounts, content.lkp, content.skp, [content.x, content.y],
                                item.prerequisiteEvents, item.pk));
                        } else{
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    default: window.alert("Event of unknown type " + item.type + "."); break;
                }
			});
			GUI.getBigBox().fillEventList();
		});
	}


	export function loadMap() {
		let timetest;
		$.getJSON(url +"/databaseLink/getlastsavedtimestamp/",
            (json: any) => {// loads the time stamp from the database
			timetest = "";
			for(let i = 0; i< json.length; i++){
				timetest += json[i];
			}
			if(Authentication.logintime == undefined || Authentication.logintime < Date.parse(timetest)){
				Authentication.logintime = Date.now();
				loadCSRFToken();
				loadRealmData();
				loadFieldData();
				loadArmies();
				loadRiverData();
				loadBuildingData();
				loadBorderData();
				Drawing.drawStuff();
			}
		});
	}

	export function loadCSRFToken() {
		$.getJSON(url +"/databaseLink/gettoken/",
            (json: any) => {// Doesn't wor. TODO: Make it work!
            Authentication.currentCSRFToken = json;
		});
	}

	//loads the armies data from the server.
	//Data the client is not supposed to have based on his login status is set to -1.
	export function loadArmies() {
		$.post({
			url: url +"/databaseLink/armydata/",
			data: {authorization: Authentication.authenticationToken},
			success: (data: {'realm': string, 'armyId': number, 'count': number, 'leaders': number, 'mounts': number,
                'lkp': number, 'skp': number, 'x': number, 'y': number, 'movementPoints': number,
                'heightPoints': number, 'isGuard': boolean, 'isLoadedIn': number|undefined, 'status': string}[]) => {
				GameState.armies = (data.map(army => {
					let armyOwner: Realm|undefined = GameState.realms.find(realm => realm.tag === army.realm);
					if(armyOwner != undefined) {
                        switch (Math.floor(army.armyId / 100)) {
                            case 1:
                                return new FootArmy(army.armyId, armyOwner, army.count, army.leaders, army.lkp,
                                    army.skp, army.mounts, [army.x, army.y], army.movementPoints,
                                    army.heightPoints, army.isGuard);
                            case 2:
                                return new RiderArmy(army.armyId, armyOwner, army.count, army.leaders,
                                    [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                            case 3:
                                return new Fleet(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp,
                                    [army.x, army.y], army.movementPoints, army.isGuard);
                            default:
                                return undefined;
                        }
                    } else{
                        window.alert("Realm with tag " + army.realm + " not found.");
                        return undefined;
                    }
				}).filter(army => army != undefined) as Army[]);

                // if needed, load Troops into ships
				data.forEach(army => {
				    if(army.isLoadedIn != undefined){
                        (GameState.armies.find(transport => transport.getErkenfaraID() === army.isLoadedIn &&
                            transport.owner.tag === army.realm) as Fleet).loadArmy(GameState.armies.find(
                                transported => transported.getErkenfaraID() === army.armyId &&
                                    transported.owner.tag === army.realm) as LandArmy);
                    }
                });
				// if the event loading finishes before the army loading is is needed, eventlist may be wrong otherwise
				GUI.getBigBox().fillEventList();
			},
			dataType: "json"
		});
	}

	export function loadFieldData() {
		$.getJSON(url +"/databaseLink/fielddata/",
            (json: {'type': number, 'x': number, 'y': number}[]) => {// loads the fields from the database
			GameState.fields = json.map(field =>
				new Field([field.x, field.y], field.type));
			Drawing.resizeCanvas();
			Drawing.drawStuff();
		});
	}

	export function loadRealmData() {
		$.getJSON(url + "/databaseLink/getrealms/",
            (json: {'tag': string, 'name': string, 'color': string, 'homeTurf': number,
                'active': boolean}[]) => {
			GameState.realms = json.map(realm =>
				new Realm(realm.name, realm.tag, realm.color, Number(realm.homeTurf), realm.active));
		});
	}

	export function loadRiverData() {
		$.getJSON(url +"/databaseLink/getriverdata/",
            (json: {'firstX': number, 'firstY': number, 'secondX': number, 'secondY': number}[]) => {
		    //load the rivers from the database
			GameState.rivers = json.map(river =>
				new River([river.firstX, river.firstY], [river.secondX, river.secondY]));
		});
	}

	export function loadBuildingData() {
		$.getJSON(url +"/databaseLink/buildingdata/",
            (json: {'realm': string, 'name': string, 'type': number, 'firstX': number, 'firstY': number,
                'secondX': number|undefined, 'secondY': number|undefined, 'direction': string|undefined,
                'guardCount': number|undefined, 'buildPoints': number|undefined}[]) => {
			GameState.buildings = json.map(building => {
			    let owner: Realm|undefined = GameState.realms.find(realm => realm.tag === building.realm);
			    if (owner != undefined) {
                    switch (building.type) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            // TODO Name to data from server
                            return new ProductionBuilding(building.type, "", [building.firstX, building.firstY],
                                owner, (building.buildPoints as number));
                        case 5:
                            return new Wall(building.type, [building.firstX, building.firstY], owner,
                                (building.buildPoints as number), stringToDirection((building.direction as string)),
                                (building.guardCount as number));
                        case 6:
                        case 7:
                        case 8:
                            return new NonDestructibleBuilding(building.type, [building.firstX, building.firstY],
                                [(building.secondX as number), (building.secondY as number)], owner);
                        default:
                            return undefined;
                    }
                } else{
			        window.alert("Unknown realm with tag " + building.realm + ".");
			        return undefined;
                }
			}).filter(building => building != undefined) as Building[];
		});
	}

	export function loadBorderData() {
		$.getJSON(url +"/databaseLink/getborderdata/",
            (json: {'tag': string, 'land': [number, number][]}[]) => {
		    //load the borders from the database
			json.forEach(realm => {
				let realmToFill = GameState.realms.find(candidate => candidate.tag === realm.tag);
				if(realmToFill != undefined){
					realmToFill.territory = realm.land.map(land => GameState.fields.find(field =>
						field.coordinates === land)).filter(field => field != undefined) as Field[];
				} else{
                    window.alert("Unknown realm with tag " + realm.tag + ".");
                }
			});
		});
	}

	export function loadImages(tileset: string) { //load the images needed for visualization
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