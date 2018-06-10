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

import {GameState} from "../gameState";
import {Drawing} from "../gui/drawingFunctions";
import {Controls} from "../controls/controlVariables";
import {Authentication} from "./authenticationFunctions";
import {FootArmy} from "../armies/footArmy";
import {LandArmy} from "../armies/landArmy";
import {EventStatus} from "../events/eventStatus";
import {MoveEvent} from "../events/moveEvent";
import {BattleEvent} from "../events/battleEvent";
import {MergeEvent} from "../events/mergeEvent";
import {TransferEvent} from "../events/transferEvent";
import {SplitEvent} from "../events/splitEvent";
import {MountEvent} from "../events/mountEvent";
import {ShootEvent} from "../events/shootEvent";

export namespace Saving{

    export function sendEvents() {
        sendEventlistInOrder(0);
        GameState.loadedEvents.forEach(event => {
            if (event.getStatus() === EventStatus.Checked) {
                sendCheckEvent(event.getDatabasePrimaryKey() as number, event.typeAsString());
            } else if (event.getStatus() === EventStatus.Deleted) {
                sendDeleteEvent(event.getDatabasePrimaryKey() as number, event.typeAsString());
            }
        });
        sendNextTurn();
    }

    export function sendEventlistInOrder(index: number) {
        if (index !== GameState.newEvents.length) {
            let cPE = GameState.newEvents[index];
            let cPEContent = cPE.asStringifiedJSON();
            if (cPE instanceof MoveEvent) {
                $.post({
                    url: Authentication.url + "/databaseLink/moveevent/",
                    data: {
                        authorization: Authentication.authenticationToken,
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
            } else if (cPE instanceof BattleEvent) {
                $.post({
                    url: Authentication.url + "/databaseLink/battleevent/",
                    data: {
                        authorization: Authentication.authenticationToken,
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
            } else if (cPE instanceof MergeEvent) {
                $.post({
                    url: Authentication.url + "/databaseLink/mergeevent/",
                    data: {
                        authorization: Authentication.authenticationToken,
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
            } else if (cPE instanceof TransferEvent) {
                $.post({
                    url: Authentication.url + "/databaseLink/transferevent/",
                    data: {
                        authorization: Authentication.authenticationToken,
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
            } else if (cPE instanceof SplitEvent) {
                $.post({
                    url: Authentication.url + "/databaseLink/splitevent/",
                    data: {
                        authorization: Authentication.authenticationToken,
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
            } else if (cPE instanceof MountEvent) {
                $.post({
                    url: Authentication.url + "/databaseLink/mountevent/",
                    data: {
                        authorization: Authentication.authenticationToken,
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
            }else if (cPE instanceof ShootEvent) {
                $.post({
                    url: Authentication.url + "/databaseLink/shootevent/",
                    data: {
                        authorization: Authentication.authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrder(index + 1); },
                    statusCode: {
                        200: function() {
                            console.log("success");
                        },
                        400: function() {
                            alert("Invalid input. Something went wrong with the shooting of armies.");
                        },
                        401: function() {
                            alert('Authorisation failure. Please log in.');
                        },
                        403: function() {
                            alert('Access denied. You can only send shooting events involving your troops.');
                        }
                    }
                });
            }
            else {
                GameState.newEvents = [];
            }
        }
    }

	export function saveFields() { // saves the current fields on the server
		$(function () {
			$.ajaxSetup({
				headers: { "X-CSRFToken": Authentication.currentCSRFToken } // getCookie("csrftoken")
			});
		});
		let dataToServerString = JSON.stringify(Controls.changedFields.map(
		    changedField => {
		        return {'type': changedField.type, 'x': changedField.coordinates[0], 'y': changedField.coordinates[1]};
		    }));
		$.post({
			url: Authentication.url + "/databaseLink/savefielddata/",
			data: {
				authorization: Authentication.authenticationToken,
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

	// probably deprecated
	export function sendAllPreparedEvents(){
		for (let i = 0; i < GameState.newEvents.length; i++) {
			let cPE = GameState.newEvents[i];
			let cPEContent = cPE.asStringifiedJSON();
			sendNewEvent(cPE.typeAsString(), cPEContent);
		}
	}

	export function saveRivers() { // saves the current rivers on the server
		let dataToServerString = JSON.stringify(GameState.rivers.map(river => {
		    return {'firstX:': river.rightBank[0], 'firstY:': river.rightBank[1],
                'secondX:': river.leftBank[0], 'secondY:': river.leftBank[1]};
        }));
		$.post({
			url: Authentication.url + "/databaseLink/saveriverdata/",
			data: {
				river: dataToServerString,
				authorization: Authentication.authenticationToken
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

	export function saveBuildings() { // saves the current buildings on the server
		let dataToServerString = JSON.stringify(Controls.changedBuildings.map(changedBuilding => {
		    return {'added/changed': changedBuilding[0], 'building': changedBuilding[1].buildingAsJSON()};
        }));
		$.post({
			url: Authentication.url + "/databaseLink/savebuildingdata/",
			data: {
				buildings: dataToServerString,
				authorization: Authentication.authenticationToken
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

	export function saveArmies() { // saves the current armies on the server
		let sensibleArmyList = GameState.armies.map(elem => {
			return {
				armyId: elem.getErkenfaraID(),
				count: elem.getTroopCount(),
				leaders: elem.getOfficerCount(),
				lkp: elem.getLightCatapultCount(),
				skp: elem.getHeavyCatapultCount(),
				mounts: (elem instanceof FootArmy)?(elem as FootArmy).getMountCount():0,
				x: elem.getPosition()[0],
				y: elem.getPosition()[1],
				owner: elem.owner.tag,
				movementPoints: elem.getMovePoints(),
				heightPoints: elem.getHeightPoints(),
				isLoadedIn: (elem instanceof LandArmy)?(elem as LandArmy).isTransported():false
			};
		});
		$.post({
			url: Authentication.url + "/databaseLink/savearmydata/",
			data: {
				armies: JSON.stringify(sensibleArmyList),
				authorization: Authentication.authenticationToken
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

	export function saveFactionsTerritories(){ // saves the faction territories on the server
		$.post({
			url: Authentication.url + "/databaseLink/saveborderdata/",
			data: {borders: JSON.stringify(GameState.realms.map(realm =>
                    {return {'tag': realm.tag, 'land': realm.getTerritoryCoordinates()}})),
				authorization: Authentication.authenticationToken},
			statusCode: {
				200: function() {
					console.log("Successfully saved borders.");
				},
				401: function() {
					alert('Authorisation failure. Please log in.');
				},
				403: function() {
					alert('Access denied. You have to be SL to do this.');
				}
			}
		});
	}

	export function sendDeleteEvent(eventId: number, eventType: string) {
		$.post({
			url: Authentication.url + "/databaseLink/deleteevent/",
			data: {
				authorization: Authentication.authenticationToken,
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

	export function sendCheckEvent(eventId: number, eventType: string) {
		$.post({
			url: Authentication.url + "/databaseLink/checkevent/",
			data: {
				authorization: Authentication.authenticationToken,
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

	export function sendNewEvent(type: string, content: string) {
		$.post({
			url: Authentication.url + "/databaseLink/" + type + "event/",
			data: {
				authorization: Authentication.authenticationToken,
				content: content
			},
			statusCode: {
				200: function () {
					console.log("success");
				},
				400: function () {
					if (type === "move") {
						alert('Invalid input. Moved troop does not exist.');
					} else if (type === "battle") {
						alert("Invalid input. Not all troops participating in a battle exist.");
					}
				},
				401: function () {
					alert('Authorisation failure. Please log in.');
				},
				403: function () {
					if (type === "move") {
						alert('Access denied. You can only send move events for your troops.');
					} else if (type === "battle") {
						alert('Access denied. You can only send battle events involving your troops.');
					}
				}
			}
		});
	}

	export function sendNextTurn() {
        $.post({
            url: Authentication.url + "/databaseLink/nextturn/",
            data: { authorization: Authentication.authenticationToken },
            success: (data: {'turn': number, 'realm': string, 'status': string}) => {
                GameState.currentTurn = data;
                Drawing.writeTurnNumber();
            },
            dataType: "json",
            statusCode: {
                401: () => {alert('Authorisation failure. Please log in.');},
                403: () => {alert('Access denied. You can only end your own turn.');},
                520: () => {alert('Turn Order ran out. Tell SL to fill it!');}, // custom status code
                521: () => {alert('Turn Order ran out. You should fill it!'); } // custom status code
            }
        });
	}

	// TODO: If we have multiple "clean-up functions" like this, they should have their own file/folder.
    export function untagHitArmys(){
        for(let i = 0; i < GameState.armies.length; i++){
            if (GameState.armies[i].owner.tag === GameState.login || GameState.login === "sl"){
                GameState.armies[i].wasShotAt = false;
            }
        }
    }
}