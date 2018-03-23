"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawingFunctions_1 = require("../gui/drawingFunctions");
const authenticationFunctions_1 = require("./authenticationFunctions");
const gameState_1 = require("../gameState");
const moveEvent_1 = require("../events/moveEvent");
const battleEvent_1 = require("../events/battleEvent");
const shootEvent_1 = require("../events/shootEvent");
const mergeEvent_1 = require("../events/mergeEvent");
const mountEvent_1 = require("../events/mountEvent");
const transferEvent_1 = require("../events/transferEvent");
const splitEvent_1 = require("../events/splitEvent");
const realm_1 = require("../realm");
const riderArmy_1 = require("../armies/riderArmy");
const river_1 = require("../map/river");
const field_1 = require("../map/field");
const footArmy_1 = require("../armies/footArmy");
const fleet_1 = require("../armies/fleet");
const direction_1 = require("../map/direction");
const wall_1 = require("../buildings/wall");
const productionBuilding_1 = require("../buildings/productionBuilding");
const nonDestructibleBuilding_1 = require("../buildings/nonDestructibleBuilding");
const images_1 = require("../gui/images");
const gui_1 = require("../gui/gui");
var Loading;
(function (Loading) {
    // help function to fetch current data from the server
    var url = authenticationFunctions_1.Authentication.url;
    function getNewDataFromServer() {
        loadMap();
    }
    Loading.getNewDataFromServer = getNewDataFromServer;
    function loadTurnNumber() {
        $.getJSON(url + "/databaseLink/getturn/", (json) => {
            gameState_1.GameState.currentTurn = json;
            drawingFunctions_1.Drawing.writeTurnNumber();
        });
    }
    Loading.loadTurnNumber = loadTurnNumber;
    function loadPendingEvents() {
        $.getJSON(url + "/databaseLink/getevents/", (json) => {
            let pendingEvents = json;
            gameState_1.GameState.loadedEvents = [];
            pendingEvents.forEach((item, index) => {
                let content = item.content;
                let realm;
                switch (item.type) {
                    case "move":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new moveEvent_1.MoveEvent(index, 5 /* Undetermined */, realm, content.armyId, [content.fromX, content.fromY], [content.toX, content.toY], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "battle":
                        gameState_1.GameState.loadedEvents.push(new battleEvent_1.BattleEvent(index, 5 /* Undetermined */, content.participants, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        break;
                    case "shoot":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new shootEvent_1.ShootEvent(index, 5 /* Undetermined */, realm, content.armyId, [content.toX, content.toY], [content.fromX, content.fromY], content.LKPcount, content.SKPcount, content.target, item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "split":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new splitEvent_1.SplitEvent(index, 5 /* Undetermined */, content.fromArmy, content.newArmy, realm, content.troops, content.leaders, content.mounts, content.lkp, content.skp, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "merge":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new mergeEvent_1.MergeEvent(index, 5 /* Undetermined */, content.fromArmy, content.toArmy, realm, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "mount":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new mountEvent_1.MountEvent(index, 5 /* Undetermined */, content.fromArmy, content.newArmy, realm, content.troops, content.leaders, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "transfer":
                        realm = gameState_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            gameState_1.GameState.loadedEvents.push(new transferEvent_1.TransferEvent(index, 5 /* Undetermined */, content.fromArmy, content.toArmy, realm, content.troops, content.leaders, content.mounts, content.lkp, content.skp, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    default:
                        window.alert("Event of unknown type " + item.type + ".");
                        break;
                }
            });
            gui_1.GUI.getBigBox().fillEventList();
        });
    }
    Loading.loadPendingEvents = loadPendingEvents;
    function loadMap() {
        let timetest;
        $.getJSON(url + "/databaseLink/getlastsavedtimestamp/", (json) => {
            timetest = "";
            for (let i = 0; i < json.length; i++) {
                timetest += json[i];
            }
            if (authenticationFunctions_1.Authentication.logintime == undefined || authenticationFunctions_1.Authentication.logintime < Date.parse(timetest)) {
                authenticationFunctions_1.Authentication.logintime = Date.now();
                loadCSRFToken();
                loadRealmData();
                loadFieldData();
                loadArmies();
                loadRiverData();
                loadBuildingData();
                loadBorderData();
                drawingFunctions_1.Drawing.drawStuff();
            }
        });
    }
    Loading.loadMap = loadMap;
    function loadCSRFToken() {
        $.getJSON(url + "/databaseLink/gettoken/", (json) => {
            authenticationFunctions_1.Authentication.currentCSRFToken = json;
        });
    }
    Loading.loadCSRFToken = loadCSRFToken;
    //loads the armies data from the server.
    //Data the client is not supposed to have based on his login status is set to -1.
    function loadArmies() {
        $.post({
            url: url + "/databaseLink/armydata/",
            data: { authorization: authenticationFunctions_1.Authentication.authenticationToken },
            success: (data) => {
                gameState_1.GameState.armies = data.map(army => {
                    let armyOwner = gameState_1.GameState.realms.find(realm => realm.tag === army.realm);
                    if (armyOwner != undefined) {
                        switch (Math.floor(army.armyId / 100)) {
                            case 1:
                                return new footArmy_1.FootArmy(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp, army.mounts, [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                            case 2:
                                return new riderArmy_1.RiderArmy(army.armyId, armyOwner, army.count, army.leaders, [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                            case 3:
                                return new fleet_1.Fleet(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp, [army.x, army.y], army.movementPoints, army.isGuard);
                            default:
                                return undefined;
                        }
                    }
                    else {
                        window.alert("Realm with tag " + army.realm + " not found.");
                        return undefined;
                    }
                }).filter(army => army != undefined);
                // if needed, load Troops into ships
                data.forEach(army => {
                    if (army.isLoadedIn != undefined) {
                        gameState_1.GameState.armies.find(transport => transport.getErkenfaraID() === army.isLoadedIn &&
                            transport.owner.tag === army.realm).loadArmy(gameState_1.GameState.armies.find(transported => transported.getErkenfaraID() === army.armyId &&
                            transported.owner.tag === army.realm));
                    }
                });
                // if the event loading finishes before the army loading is is needed, eventlist may be wrong otherwise
                gui_1.GUI.getBigBox().fillEventList();
            },
            dataType: "json"
        });
    }
    Loading.loadArmies = loadArmies;
    function loadFieldData() {
        $.getJSON(url + "/databaseLink/fielddata/", (json) => {
            gameState_1.GameState.fields = json.map(field => new field_1.Field([field.x, field.y], field.type));
            drawingFunctions_1.Drawing.resizeCanvas();
            drawingFunctions_1.Drawing.drawStuff();
        });
    }
    Loading.loadFieldData = loadFieldData;
    function loadRealmData() {
        $.getJSON(url + "/databaseLink/getrealms/", (json) => {
            gameState_1.GameState.realms = json.map(realm => new realm_1.Realm(realm.name, realm.tag, realm.color, Number(realm.homeTurf), realm.active));
        });
    }
    Loading.loadRealmData = loadRealmData;
    function loadRiverData() {
        $.getJSON(url + "/databaseLink/getriverdata/", (json) => {
            //load the rivers from the database
            gameState_1.GameState.rivers = json.map(river => new river_1.River([river.firstX, river.firstY], [river.secondX, river.secondY]));
        });
    }
    Loading.loadRiverData = loadRiverData;
    function loadBuildingData() {
        $.getJSON(url + "/databaseLink/buildingdata/", (json) => {
            gameState_1.GameState.buildings = json.map(building => {
                let owner = gameState_1.GameState.realms.find(realm => realm.tag === building.realm);
                if (owner != undefined) {
                    switch (building.type) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            return new productionBuilding_1.ProductionBuilding(building.type, building.name, [building.firstX, building.firstY], owner, building.buildPoints);
                        case 5:
                            return new wall_1.Wall(building.type, [building.firstX, building.firstY], owner, building.buildPoints, direction_1.stringToDirection(building.direction), building.guardCount);
                        case 6:
                        case 7:
                        case 8:
                            return new nonDestructibleBuilding_1.NonDestructibleBuilding(building.type, [building.firstX, building.firstY], [building.secondX, building.secondY], owner);
                        default:
                            return undefined;
                    }
                }
                else {
                    window.alert("Unknown realm with tag " + building.realm + ".");
                    return undefined;
                }
            }).filter(building => building != undefined);
        });
    }
    Loading.loadBuildingData = loadBuildingData;
    function loadBorderData() {
        $.getJSON(url + "/databaseLink/getborderdata/", (json) => {
            //load the borders from the database
            json.forEach(realm => {
                let realmToFill = gameState_1.GameState.realms.find(candidate => candidate.tag === realm.tag);
                if (realmToFill != undefined) {
                    realmToFill.territory = realm.land.map(land => gameState_1.GameState.fields.find(field => field.coordinates === land)).filter(field => field != undefined);
                }
                else {
                    window.alert("Unknown realm with tag " + realm.tag + ".");
                }
            });
        });
    }
    Loading.loadBorderData = loadBorderData;
    function loadImages(tileset) {
        let pathPrefix = './tilesets/' + tileset; //build the path prefix common to all tile images
        images_1.Images.shallows.src = pathPrefix + '/shallows.svg'; //terrain
        images_1.Images.deepsea.src = pathPrefix + '/deepsea.svg';
        images_1.Images.lowlands.src = pathPrefix + '/lowlands.svg';
        images_1.Images.woods.src = pathPrefix + '/woods.svg';
        images_1.Images.hills.src = pathPrefix + '/hills.svg';
        images_1.Images.highlands.src = pathPrefix + '/highlands.svg';
        images_1.Images.mountains.src = pathPrefix + '/mountains.svg';
        images_1.Images.desert.src = pathPrefix + '/desert.svg';
        images_1.Images.swamp.src = pathPrefix + '/swamp.svg';
        images_1.Images.default.src = pathPrefix + '/default.svg';
        images_1.Images.troops.src = pathPrefix + '/troops.svg'; //troops
        images_1.Images.mounts.src = pathPrefix + '/mounts.svg';
        images_1.Images.boats.src = pathPrefix + '/boat.svg';
        images_1.Images.castle.src = pathPrefix + '/castle.svg'; //buildings
        images_1.Images.city.src = pathPrefix + '/city.svg';
        images_1.Images.fortress.src = pathPrefix + '/fortress.svg';
        images_1.Images.capital.src = pathPrefix + '/capital_city.svg';
        images_1.Images.capitalFort.src = pathPrefix + '/capital_fortress.svg';
        images_1.Images.wallW.src = pathPrefix + '/wall_w.svg';
        images_1.Images.wallE.src = pathPrefix + '/wall_e.svg';
        images_1.Images.wallNW.src = pathPrefix + '/wall_nw.svg';
        images_1.Images.wallSW.src = pathPrefix + '/wall_sw.svg';
        images_1.Images.wallNE.src = pathPrefix + '/wall_ne.svg';
        images_1.Images.wallSE.src = pathPrefix + '/wall_se.svg';
        images_1.Images.harborW.src = pathPrefix + '/harbor_w.svg';
        images_1.Images.harborE.src = pathPrefix + '/harbor_e.svg';
        images_1.Images.harborNW.src = pathPrefix + '/harbor_nw.svg';
        images_1.Images.harborSW.src = pathPrefix + '/harbor_sw.svg';
        images_1.Images.harborNE.src = pathPrefix + '/harbor_ne.svg';
        images_1.Images.harborSE.src = pathPrefix + '/harbor_se.svg';
        images_1.Images.bridgeW.src = pathPrefix + '/bridge_w.svg';
        images_1.Images.bridgeE.src = pathPrefix + '/bridge_e.svg';
        images_1.Images.bridgeNW.src = pathPrefix + '/bridge_nw.svg';
        images_1.Images.bridgeSW.src = pathPrefix + '/bridge_sw.svg';
        images_1.Images.bridgeNE.src = pathPrefix + '/bridge_ne.svg';
        images_1.Images.bridgeSE.src = pathPrefix + '/bridge_se.svg';
    }
    Loading.loadImages = loadImages;
})(Loading = exports.Loading || (exports.Loading = {}));
