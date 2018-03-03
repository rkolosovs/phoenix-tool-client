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
const hexFunctions_1 = require("../libraries/hexFunctions");
const wall_1 = require("../buildings/wall");
const productionBuilding_1 = require("../buildings/productionBuilding");
const nonDestructibleBuilding_1 = require("../buildings/nonDestructibleBuilding");
const images_1 = require("../gui/images");
var Loading;
(function (Loading) {
    // help function to fetch current data from the server
    var url = authenticationFunctions_1.Authentication.url;
    function getNewDataFromServer() {
        loadMap();
    }
    Loading.getNewDataFromServer = getNewDataFromServer;
    function loadTurnNumber() {
        $.getJSON(url + "/databaseLink/getturn/", function (json) {
            gameState_1.GameState.currentTurn = json;
            drawingFunctions_1.Drawing.writeTurnNumber();
        });
    }
    Loading.loadTurnNumber = loadTurnNumber;
    function loadPendingEvents() {
        //	console.log("loadPendingEvents()");
        $.getJSON(url + "/databaseLink/getevents/", function (json) {
            let pendingEvents = json;
            gameState_1.GameState.pendingNewEvents = [];
            pendingEvents.forEach(function (item, index) {
                let content = pendingEvents[index].content;
                switch (item.type) {
                    case "move":
                        gameState_1.GameState.pendingNewEvents.push(new moveEvent_1.MoveEvent(index, "undetermined", gameState_1.GameState.realms.find(realm => (realm === content.realm)), content.armyId, content.fromX, content.fromY, content.toX, content.toY, item.pk));
                        break;
                    case "battle":
                        gameState_1.GameState.pendingNewEvents.push(new battleEvent_1.BattleEvent(index, "undetermined", content.participants, gameState_1.GameState.realms.find(realm => (realm === content.realm)), content.x, content.y, item.pk));
                        break;
                    case "shoot":
                        gameState_1.GameState.pendingNewEvents.push(new shootEvent_1.ShootEvent(index, "undetermined", gameState_1.GameState.realms.find(realm => (realm === content.realm)), content.armyId, content.toX, content.toY, content.fromX, content.fromY, content.LKPcount, content.SKPcount, content.target, item.pk));
                        break;
                    case "split":
                        gameState_1.GameState.pendingNewEvents.push(new splitEvent_1.SplitEvent(index, "undetermined", content.fromArmy, content.newArmy, gameState_1.GameState.realms.find(realm => (realm === content.realm)), content.troops, content.leaders, content.mounts, content.lkp, content.skp, content.x, content.y, item.pk));
                        break;
                    case "merge":
                        gameState_1.GameState.pendingNewEvents.push(new mergeEvent_1.MergeEvent(index, "undetermined", content.fromArmy, content.toArmy, gameState_1.GameState.realms.find(realm => (realm === content.realm)), content.x, content.y, item.pk));
                        break;
                    case "mount":
                        gameState_1.GameState.pendingNewEvents.push(new mountEvent_1.MountEvent(index, "undetermined", content.fromArmy, content.newArmy, gameState_1.GameState.realms.find(realm => (realm === content.realm)), content.troops, content.leaders, content.x, content.y, item.pk));
                        break;
                    case "transfer":
                        gameState_1.GameState.pendingNewEvents.push(new transferEvent_1.TransferEvent(index, "undetermined", content.fromArmy, content.toArmy, gameState_1.GameState.realms.find(realm => (realm === content.realm)), content.troops, content.leaders, content.mounts, content.lkp, content.skp, content.x, content.y, item.pk));
                        break;
                }
            });
            fillEventList();
        });
    }
    Loading.loadPendingEvents = loadPendingEvents;
    function loadMap() {
        let timetest;
        $.getJSON(url + "/databaseLink/getlastsavedtimestamp/", function (json) {
            timetest = "";
            for (let i = 0; i < json.length; i++) {
                timetest += json[i];
            }
            if (authenticationFunctions_1.Authentication.logintime === undefined || authenticationFunctions_1.Authentication.logintime < Date.parse(timetest)) {
                authenticationFunctions_1.Authentication.logintime = Date.now();
                console.log("loginzeit: " + authenticationFunctions_1.Authentication.logintime);
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
    Loading.loadMap = loadMap;
    function loadCSRFToken() {
        $.getJSON(url + "/databaseLink/gettoken/", function (json) {
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
            success: function (data) {
                gameState_1.GameState.armies = data.map(army => {
                    let armyOwner = gameState_1.GameState.realms.find(realm => realm.tag === army.realm);
                    switch (Math.floor(army.armyId / 100)) {
                        case 1: return new footArmy_1.FootArmy(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp, [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                        case 2: return new riderArmy_1.RiderArmy(army.armyId, armyOwner, army.count, army.leaders, [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                        case 3: return new fleet_1.Fleet(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp, [army.x, army.y], army.movementPoints, army.isGuard);
                        default: return undefined;
                    }
                });
                // if needed, load Troops into ships
                data.forEach(army => {
                    let transporterId = parseInt(army.isLoadedIn);
                    if (!isNaN(transporterId)) {
                        gameState_1.GameState.armies.find(transport => transport.getErkenfaraID() === transporterId &&
                            transport.owner.tag === army.realm).loadArmy(gameState_1.GameState.armies.find(transported => transported.getErkenfaraID() === army.armyId &&
                            transported.owner.tag === army.realm));
                    }
                });
                // if the event loading finishes before the army loading is is needed, eventlist may be wrong otherwise
                fillEventList();
            },
            dataType: "json"
        });
    }
    Loading.loadArmies = loadArmies;
    function loadFieldData() {
        $.getJSON(url + "/databaseLink/fielddata/", function (json) {
            gameState_1.GameState.fields = json.map(field => new field_1.Field([field.x, field.y], field.type));
            fields = json; //TODO: Remove once everything uses the GameState class.
            drawingFunctions_1.Drawing.resizeCanvas();
        });
    }
    Loading.loadFieldData = loadFieldData;
    function loadRealmData() {
        $.getJSON(url + "/databaseLink/getrealms/", function (json) {
            gameState_1.GameState.realms = json.map(realm => new realm_1.Realm(realm.name, realm.tag, realm.color, Number(realm.homeTurf), realm.active));
            realms = json; //TODO: Remove once everything uses the GameState class.
        });
    }
    Loading.loadRealmData = loadRealmData;
    function loadRiverData() {
        $.getJSON(url + "/databaseLink/getriverdata/", function (json) {
            gameState_1.GameState.rivers = json.map(river => new river_1.River([river.firstX, river.firstY], [river.secondX, river.secondY]));
            rivers = []; //TODO: Remove once everything uses the GameState class.
            json.forEach(function (element) {
                rivers.push([[element.firstX, element.firstY], [element.secondX, element.secondY]]);
            }, this); //rivers are the coordinates of two fields on either side of the river
        });
    }
    Loading.loadRiverData = loadRiverData;
    function loadBuildingData() {
        $.getJSON(url + "/databaseLink/buildingdata/", function (json) {
            let realms = gameState_1.GameState.realms;
            gameState_1.GameState.buildings = json.map(building => {
                switch (building.type) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4: return new productionBuilding_1.ProductionBuilding(building.type, [building.x, building.y], realms.find(realm => realm.tag === building.realm), -1); //TODO: BuildPoints
                    case 5: return new wall_1.Wall(building.type, [building.x, building.y], realms.find(realm => realm.tag === building.realm), -1, direction_1.stringToDirection(building.direction), -1); //TODO: BuildPoints, Soldiers
                    case 6:
                    case 7:
                        let secondPos = hexFunctions_1.HexFunction.neighbors([building.x, building.y])[direction_1.stringToDirection(building.direction)];
                        return new nonDestructibleBuilding_1.NonDestructibleBuilding(building.type, [building.x, building.y], [secondPos[0], secondPos[1]], realms.find(realm => realm.tag === building.realm));
                    case 8: return new nonDestructibleBuilding_1.NonDestructibleBuilding(building.type, [building.firstX, building.firstY], [building.secondX, building.secondY], realms.find(realm => realm.tag === building.realm));
                    default: return undefined;
                }
            });
            //TODO: Remove once everything uses the GameState class.
            buildings = json; //load the buildings from the buildings.json file
        });
    }
    Loading.loadBuildingData = loadBuildingData;
    function loadBorderData() {
        $.getJSON(url + "/databaseLink/getborderdata/", function (json) {
            json.forEach(realm => {
                let realmToFill = gameState_1.GameState.realms.find(candidate => candidate.tag === realm.tag);
                if (realmToFill != undefined) {
                    realmToFill.territory = realm.land.map(land => gameState_1.GameState.fields.find(field => field.coordinates === land)).filter(field => field != undefined);
                }
            });
            //TODO: Remove once everything uses the GameState class.
            borders = json; //load the borders from the borders.json file
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
