"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameState_1 = require("../gameState");
const drawingFunctions_1 = require("../gui/drawingFunctions");
const controlVariables_1 = require("../controls/controlVariables");
const direction_1 = require("../map/direction");
const hexFunctions_1 = require("../libraries/hexFunctions");
const authenticationFunctions_1 = require("./authenticationFunctions");
const footArmy_1 = require("../armies/footArmy");
const landArmy_1 = require("../armies/landArmy");
var Saving;
(function (Saving) {
    function sendEvents() {
        sendEventlistInOrder(0);
        gameState_1.GameState.pendingNewEvents.forEach(event => {
            if (event.getStatus() === 'checked') {
                sendCheckEvent(event.getPK(), event.getType());
            }
            else if (event.getStatus() === 'deleted') {
                sendDeleteEvent(event.getPK(), event.getType());
            }
        });
        sendNextTurn();
    }
    Saving.sendEvents = sendEvents;
    function sendEventlistInOrder(index) {
        console.log("The index is " + index + " out of " + gameState_1.GameState.pendingNewEvents.length + ",");
        if (index !== gameState_1.GameState.pendingNewEvents.length) {
            var cPE = gameState_1.GameState.pendingNewEvents[index];
            var cPEContent = JSON.stringify(cPE.getContent());
            if (cPE.getType() === "move") {
                console.log(gameState_1.GameState.pendingNewEvents);
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/moveevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert('Invalid input. Moved troop does not exist.');
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send move events for your troops.');
                        }
                    }
                });
            }
            else if (cPE.getType() === "battle") {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/battleevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Not all troops participating in a battle exist.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send battle events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE.getType() === "merge") {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/mergeevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with the merging of troops.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send merge events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE.getType() === "transfer") {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/transferevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with the transfer of troops.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send transfer events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE.getType() === "split") {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/splitevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with the splitting of armies.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send split events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE.getType() === "mount") {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/mountevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with mounting or unmounting.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send split events involving your troops.');
                        }
                    }
                });
            }
            else if (cPE.getType() === "shoot") {
                $.post({
                    url: authenticationFunctions_1.Authentication.url + "/databaseLink/shootevent/",
                    data: {
                        authorization: authenticationFunctions_1.Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function () {
                            console.log("success");
                        },
                        400: function () {
                            alert("Invalid input. Something went wrong with the shooting of armies.");
                        },
                        401: function () {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function () {
                            alert('Access denied. You can only send shooting events involving your troops.');
                        }
                    }
                });
            }
            else {
                gameState_1.GameState.pendingNewEvents = [];
            }
        }
    }
    Saving.sendEventlistInOrder = sendEventlistInOrder;
    function saveFields() {
        $(function () {
            $.ajaxSetup({
                headers: { "X-CSRFToken": authenticationFunctions_1.Authentication.currentCSRFToken } // getCookie("csrftoken")
            });
        });
        let dataToServerString = "";
        for (let i = 0; i < controlVariables_1.Controls.changedFields.length; i++) {
            if (i != controlVariables_1.Controls.changedFields.length - 1) {
                dataToServerString = dataToServerString + controlVariables_1.Controls.changedFields[i].type + ",";
                dataToServerString = dataToServerString + controlVariables_1.Controls.changedFields[i].coordinates[0] + ",";
                dataToServerString = dataToServerString + controlVariables_1.Controls.changedFields[i].coordinates[1] + ";";
            }
            else {
                dataToServerString = dataToServerString + controlVariables_1.Controls.changedFields[i].type + ",";
                dataToServerString = dataToServerString + controlVariables_1.Controls.changedFields[i].coordinates[0] + ",";
                dataToServerString = dataToServerString + controlVariables_1.Controls.changedFields[i].coordinates[1];
            }
        }
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/savefielddata/",
            data: {
                authorization: authenticationFunctions_1.Authentication.authenticationToken,
                map: dataToServerString
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveFields = saveFields;
    // probably deprecated
    function sendAllPreparedEvents() {
        for (let i = 0; i < gameState_1.GameState.pendingNewEvents.length; i++) {
            let cPE = gameState_1.GameState.pendingNewEvents[i];
            let cPEContent = JSON.stringify(cPE.getContent());
            sendNewEvent(cPE.getType(), cPEContent);
        }
    }
    Saving.sendAllPreparedEvents = sendAllPreparedEvents;
    function saveRivers() {
        let dataToServerString = "";
        for (let i = 0; i < gameState_1.GameState.rivers.length; i++) {
            let river = gameState_1.GameState.rivers[i];
            //TODO: check if left and rightbank are interchangeable
            dataToServerString = dataToServerString + river.leftBank[0] + ",";
            dataToServerString = dataToServerString + river.leftBank[1] + ",";
            dataToServerString = dataToServerString + river.rightBank[0] + ",";
            dataToServerString = dataToServerString + river.rightBank[1];
            if (i != gameState_1.GameState.rivers.length - 1) {
                dataToServerString = dataToServerString + ";";
            }
        }
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/saveriverdata/",
            data: {
                river: dataToServerString,
                authorization: authenticationFunctions_1.Authentication.authenticationToken
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveRivers = saveRivers;
    // TODO: This is horrible and should be changed ASAP
    function saveBuildings() {
        let dataToServerString = "";
        for (let i = 0; i < controlVariables_1.Controls.changedBuildings.length; i++) {
            switch (controlVariables_1.Controls.changedBuildings[i][1].type) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][1].type + ",";
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][1].owner.tag + ",";
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][1].getPosition()[0] + ",";
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][1].getPosition()[1] + ",";
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][0];
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][1].type + ",";
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][1].owner.tag + ",";
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][1].getPosition()[0] + ",";
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][1].getPosition()[1] + ",";
                    dataToServerString += direction_1.directionToString(hexFunctions_1.HexFunction.getDirectionToNeighbor(controlVariables_1.Controls.changedBuildings[i][1].getPosition(), controlVariables_1.Controls.changedBuildings[i][1].getSecondPosition())) + ",";
                    dataToServerString += controlVariables_1.Controls.changedBuildings[i][0];
                    break;
            }
            if (i != controlVariables_1.Controls.changedBuildings.length - 1) {
                dataToServerString = dataToServerString + ";";
            }
        }
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/savebuildingdata/",
            data: {
                buildings: dataToServerString,
                authorization: authenticationFunctions_1.Authentication.authenticationToken
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveBuildings = saveBuildings;
    function saveArmies() {
        let sensibleArmyList = gameState_1.GameState.armies.map(elem => {
            return {
                armyId: elem.getErkenfaraID(),
                count: elem.getTroopCount(),
                leaders: elem.getOfficerCount(),
                lkp: elem.getLightCatapultCount(),
                skp: elem.getHeavyCatapultCount(),
                mounts: (elem instanceof footArmy_1.FootArmy) ? elem.getMountCount() : 0,
                x: elem.getPosition()[0],
                y: elem.getPosition()[1],
                owner: elem.owner.tag,
                movementPoints: elem.getMovePoints(),
                heightPoints: elem.getHeightPoints(),
                isLoadedIn: (elem instanceof landArmy_1.LandArmy) ? elem.isTransported() : false
            };
        });
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/savearmydata/",
            data: {
                armies: JSON.stringify(sensibleArmyList),
                authorization: authenticationFunctions_1.Authentication.authenticationToken
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveArmies = saveArmies;
    function saveFactionsTerritories() {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/saveborderdata/",
            data: { borders: JSON.stringify(gameState_1.GameState.realms.map(realm => { return { 'tag': realm.tag, 'land': realm.getTerritoryCoordinates() }; })),
                authorization: authenticationFunctions_1.Authentication.authenticationToken },
            statusCode: {
                200: function () {
                    console.log("Successfully saved borders.");
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.saveFactionsTerritories = saveFactionsTerritories;
    function sendDeleteEvent(eventId, eventType) {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/deleteevent/",
            data: {
                authorization: authenticationFunctions_1.Authentication.authenticationToken,
                eventId: eventId,
                eventType: eventType
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.sendDeleteEvent = sendDeleteEvent;
    function sendCheckEvent(eventId, eventType) {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/checkevent/",
            data: {
                authorization: authenticationFunctions_1.Authentication.authenticationToken,
                eventId: eventId,
                eventType: eventType
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                403: function () {
                    alert('Access denied. You have to be SL to do this.');
                }
            }
        });
    }
    Saving.sendCheckEvent = sendCheckEvent;
    function sendNewEvent(type, content) {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/" + type + "event/",
            data: {
                authorization: authenticationFunctions_1.Authentication.authenticationToken,
                content: content
            },
            statusCode: {
                200: function () {
                    console.log("success");
                },
                400: function () {
                    if (type === "move") {
                        alert('Invalid input. Moved troop does not exist.');
                    }
                    else if (type === "battle") {
                        alert("Invalid input. Not all troops participating in a battle exist.");
                    }
                },
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    if (type === "move") {
                        alert('Access denied. You can only send move events for your troops.');
                    }
                    else if (type === "battle") {
                        alert('Access denied. You can only send battle events involving your troops.');
                    }
                }
            }
        });
    }
    Saving.sendNewEvent = sendNewEvent;
    function sendNextTurn() {
        $.post({
            url: authenticationFunctions_1.Authentication.url + "/databaseLink/nextturn/",
            data: { authorization: authenticationFunctions_1.Authentication.authenticationToken },
            success: (data) => {
                gameState_1.GameState.currentTurn = data;
                drawingFunctions_1.Drawing.writeTurnNumber();
            },
            dataType: "json",
            statusCode: {
                401: () => { alert('Authorisation failure. Please log in.'); },
                403: () => { alert('Access denied. You can only end your own turn.'); },
                520: () => { alert('Turn Order ran out. Tell SL to fill it!'); },
                521: () => { alert('Turn Order ran out. You should fill it!'); } // custom status code
            }
        });
    }
    Saving.sendNextTurn = sendNextTurn;
    // TODO: If we have multiple "clean-up functions" like this, they should have their own file/folder.
    function untagHitArmys() {
        for (let i = 0; i < gameState_1.GameState.armies.length; i++) {
            if (gameState_1.GameState.armies[i].owner.tag === login || login === "sl") {
                gameState_1.GameState.armies[i].wasShotAt = false;
            }
        }
    }
    Saving.untagHitArmys = untagHitArmys;
})(Saving = exports.Saving || (exports.Saving = {}));
