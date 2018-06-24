"use strict";
/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
var Loading;
(function (Loading) {
    // help function to fetch current data from the server
    var url = types_1.Authentication.url;
    function getNewDataFromServer() {
        loadMap();
    }
    Loading.getNewDataFromServer = getNewDataFromServer;
    function loadTurnNumber() {
        $.getJSON(url + "/databaseLink/getturn/", (json) => {
            types_1.GameState.currentTurn = json;
            types_1.Drawing.writeTurnNumber();
        });
    }
    Loading.loadTurnNumber = loadTurnNumber;
    function loadPendingEvents() {
        $.getJSON(url + "/databaseLink/getevents/", (json) => {
            let pendingEvents = json;
            types_1.GameState.loadedEvents = [];
            pendingEvents.forEach((item, index) => {
                let content = item.content;
                let realm;
                switch (item.type) {
                    case "move":
                        realm = types_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            types_1.GameState.loadedEvents.push(new types_1.MoveEvent(index, 5 /* Undetermined */, realm, content.armyId, [content.fromX, content.fromY], [content.toX, content.toY], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "battle":
                        types_1.GameState.loadedEvents.push(new types_1.BattleEvent(index, 5 /* Undetermined */, content.participants, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        break;
                    case "shoot":
                        realm = types_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            types_1.GameState.loadedEvents.push(new types_1.ShootEvent(index, 5 /* Undetermined */, realm, content.armyId, [content.toX, content.toY], [content.fromX, content.fromY], content.LKPcount, content.SKPcount, content.target, item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "split":
                        realm = types_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            types_1.GameState.loadedEvents.push(new types_1.SplitEvent(index, 5 /* Undetermined */, content.fromArmy, content.newArmy, realm, content.troops, content.leaders, content.mounts, content.lkp, content.skp, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "merge":
                        realm = types_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            types_1.GameState.loadedEvents.push(new types_1.MergeEvent(index, 5 /* Undetermined */, content.fromArmy, content.toArmy, realm, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "mount":
                        realm = types_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            types_1.GameState.loadedEvents.push(new types_1.MountEvent(index, 5 /* Undetermined */, content.fromArmy, content.newArmy, realm, content.troops, content.leaders, [content.x, content.y], item.prerequisiteEvents, item.pk));
                        }
                        else {
                            window.alert("Realm with tag " + content.realm + " not found.");
                        }
                        break;
                    case "transfer":
                        realm = types_1.GameState.realms.find(realm => (realm.tag === content.realm));
                        if (realm != undefined) {
                            types_1.GameState.loadedEvents.push(new types_1.TransferEvent(index, 5 /* Undetermined */, content.fromArmy, content.toArmy, realm, content.troops, content.leaders, content.mounts, content.lkp, content.skp, [content.x, content.y], item.prerequisiteEvents, item.pk));
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
            types_1.GUI.getBigBox().fillEventList();
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
            if (types_1.Authentication.logintime == undefined || types_1.Authentication.logintime < Date.parse(timetest)) {
                types_1.Authentication.logintime = Date.now();
                loadCSRFToken();
                loadRealmData();
                loadFieldData();
                loadArmies();
                loadRiverData();
                loadBuildingData();
                loadBorderData();
                types_1.Drawing.drawStuff();
            }
        });
    }
    Loading.loadMap = loadMap;
    function loadCSRFToken() {
        $.getJSON(url + "/databaseLink/gettoken/", (json) => {
            types_1.Authentication.currentCSRFToken = json;
        });
    }
    Loading.loadCSRFToken = loadCSRFToken;
    //loads the armies data from the server.
    //Data the client is not supposed to have based on his login status is set to -1.
    function loadArmies() {
        $.post({
            url: url + "/databaseLink/armydata/",
            data: { authorization: types_1.Authentication.authenticationToken },
            success: (data) => {
                types_1.GameState.armies = data.map(army => {
                    let armyOwner = types_1.GameState.realms.find(realm => realm.tag === army.realm);
                    if (armyOwner != undefined) {
                        switch (Math.floor(army.armyId / 100)) {
                            case 1:
                                return new types_1.FootArmy(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp, army.mounts, [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                            case 2:
                                return new types_1.RiderArmy(army.armyId, armyOwner, army.count, army.leaders, [army.x, army.y], army.movementPoints, army.heightPoints, army.isGuard);
                            case 3:
                                return new types_1.Fleet(army.armyId, armyOwner, army.count, army.leaders, army.lkp, army.skp, [army.x, army.y], army.movementPoints, army.isGuard);
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
                        types_1.GameState.armies.find(transport => transport.getErkenfaraID() === army.isLoadedIn &&
                            transport.owner.tag === army.realm).loadArmy(types_1.GameState.armies.find(transported => transported.getErkenfaraID() === army.armyId &&
                            transported.owner.tag === army.realm));
                    }
                });
                // if the event loading finishes before the army loading is is needed, eventlist may be wrong otherwise
                types_1.GUI.getBigBox().fillEventList();
            },
            dataType: "json"
        });
    }
    Loading.loadArmies = loadArmies;
    function loadFieldData() {
        $.getJSON(url + "/databaseLink/fielddata/", (json) => {
            types_1.GameState.fields = json.map(field => new types_1.Field([field.x, field.y], field.type));
            types_1.Drawing.resizeCanvas();
            types_1.Drawing.drawStuff();
        });
    }
    Loading.loadFieldData = loadFieldData;
    function loadRealmData() {
        $.getJSON(url + "/databaseLink/getrealms/", (json) => {
            types_1.GameState.realms = json.map(realm => new types_1.Realm(realm.name, realm.tag, realm.color, Number(realm.homeTurf), realm.active));
        });
    }
    Loading.loadRealmData = loadRealmData;
    function loadRiverData() {
        $.getJSON(url + "/databaseLink/getriverdata/", (json) => {
            //load the rivers from the database
            types_1.GameState.rivers = json.map(river => new types_1.River([river.firstX, river.firstY], [river.secondX, river.secondY]));
        });
    }
    Loading.loadRiverData = loadRiverData;
    function loadBuildingData() {
        $.getJSON(url + "/databaseLink/buildingdata/", (json) => {
            types_1.GameState.buildings = json.map(building => {
                let owner = types_1.GameState.realms.find(realm => realm.tag === building.realm);
                if (owner != undefined) {
                    switch (building.type) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                            return new types_1.ProductionBuilding(building.type, building.name, [building.firstX, building.firstY], owner, building.buildPoints);
                        case 5:
                            return new types_1.Wall(building.type, [building.firstX, building.firstY], owner, building.buildPoints, types_1.stringToDirection(building.direction), building.guardCount);
                        case 6:
                        case 7:
                        case 8:
                            return new types_1.NonDestructibleBuilding(building.type, [building.firstX, building.firstY], [building.secondX, building.secondY], owner);
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
                let realmToFill = types_1.GameState.realms.find(candidate => candidate.tag === realm.tag);
                if (realmToFill != undefined) {
                    realmToFill.territory = realm.land.map(land => types_1.GameState.fields.find(field => field.coordinates === land)).filter(field => field != undefined);
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
        types_1.Images.shallows.src = pathPrefix + '/shallows.svg'; //terrain
        types_1.Images.deepsea.src = pathPrefix + '/deepsea.svg';
        types_1.Images.lowlands.src = pathPrefix + '/lowlands.svg';
        types_1.Images.woods.src = pathPrefix + '/woods.svg';
        types_1.Images.hills.src = pathPrefix + '/hills.svg';
        types_1.Images.highlands.src = pathPrefix + '/highlands.svg';
        types_1.Images.mountains.src = pathPrefix + '/mountains.svg';
        types_1.Images.desert.src = pathPrefix + '/desert.svg';
        types_1.Images.swamp.src = pathPrefix + '/swamp.svg';
        types_1.Images.default.src = pathPrefix + '/default.svg';
        types_1.Images.troops.src = pathPrefix + '/troops.svg'; //troops
        types_1.Images.mounts.src = pathPrefix + '/mounts.svg';
        types_1.Images.boats.src = pathPrefix + '/boat.svg';
        types_1.Images.castle.src = pathPrefix + '/castle.svg'; //buildings
        types_1.Images.city.src = pathPrefix + '/city.svg';
        types_1.Images.fortress.src = pathPrefix + '/fortress.svg';
        types_1.Images.capital.src = pathPrefix + '/capital_city.svg';
        types_1.Images.capitalFort.src = pathPrefix + '/capital_fortress.svg';
        types_1.Images.wallW.src = pathPrefix + '/wall_w.svg';
        types_1.Images.wallE.src = pathPrefix + '/wall_e.svg';
        types_1.Images.wallNW.src = pathPrefix + '/wall_nw.svg';
        types_1.Images.wallSW.src = pathPrefix + '/wall_sw.svg';
        types_1.Images.wallNE.src = pathPrefix + '/wall_ne.svg';
        types_1.Images.wallSE.src = pathPrefix + '/wall_se.svg';
        types_1.Images.harborW.src = pathPrefix + '/harbor_w.svg';
        types_1.Images.harborE.src = pathPrefix + '/harbor_e.svg';
        types_1.Images.harborNW.src = pathPrefix + '/harbor_nw.svg';
        types_1.Images.harborSW.src = pathPrefix + '/harbor_sw.svg';
        types_1.Images.harborNE.src = pathPrefix + '/harbor_ne.svg';
        types_1.Images.harborSE.src = pathPrefix + '/harbor_se.svg';
        types_1.Images.bridgeW.src = pathPrefix + '/bridge_w.svg';
        types_1.Images.bridgeE.src = pathPrefix + '/bridge_e.svg';
        types_1.Images.bridgeNW.src = pathPrefix + '/bridge_nw.svg';
        types_1.Images.bridgeSW.src = pathPrefix + '/bridge_sw.svg';
        types_1.Images.bridgeNE.src = pathPrefix + '/bridge_ne.svg';
        types_1.Images.bridgeSE.src = pathPrefix + '/bridge_se.svg';
    }
    Loading.loadImages = loadImages;
})(Loading = exports.Loading || (exports.Loading = {}));
//# sourceMappingURL=loadingDataFunctions.js.map