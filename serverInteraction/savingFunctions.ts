import {GameState} from "../gameState";
import {Drawing} from "../gui/drawingFunctions";
import {Controls} from "../controls/controlVariables";

export namespace Saving{

    export function sendEvents() {
        sendEventlistInOrder(0);
        GameState.pendingNewEvents.forEach(event => {
            if (event.getStatus() === 'checked') {
                sendCheckEvent(event.getPK(), event.getType());
            } else if (event.getStatus() === 'deleted') {
                sendDeleteEvent(event.getPK(), event.getType());
            }
        });
        sendNextTurn();
    }

    export function sendEventlistInOrder(index: number) {
        console.log("The index is " + index + " out of " + GameState.pendingNewEvents.length + ",");
        if (index !== GameState.pendingNewEvents.length) {
            var cPE = GameState.pendingNewEvents[index];
            var cPEContent = JSON.stringify(cPE.content);
            if (cPE.getType() === "move") {
                console.log(GameState.pendingNewEvents);
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
            } else if (cPE.getType() === "battle") {
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
            } else if (cPE.getType() === "merge") {
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
            } else if (cPE.getType() === "transfer") {
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
            } else if (cPE.getType() === "split") {
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
            } else if (cPE.getType() === "mount") {
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
            }else if (cPE.getType() === "shoot") {
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
                GameState.pendingNewEvents = [];
            }
        }
    }

	export function saveFields() { // saves the current fields on the server
		$(function () {
			$.ajaxSetup({
				headers: { "X-CSRFToken": Authentication.currentCSRFToken } // getCookie("csrftoken")
			});
		});
		let dataToServerString = "";
		for (let i = 0; i < Controls.changedFields.length; i++) {
			if (i != Controls.changedFields.length - 1) {
				dataToServerString = dataToServerString + Controls.changedFields[i].type + ","
				dataToServerString = dataToServerString + Controls.changedFields[i].x + ","
				dataToServerString = dataToServerString + Controls.changedFields[i].y + ";"
			} else {
				dataToServerString = dataToServerString + Controls.changedFields[i].type + ","
				dataToServerString = dataToServerString + Controls.changedFields[i].x + ","
				dataToServerString = dataToServerString + Controls.changedFields[i].y
			}
		}
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
		for (let i = 0; i < GameState.pendingNewEvents.length; i++) {
			let cPE = GameState.pendingNewEvents[i];
			let cPEContent = JSON.stringify(cPE.content);
			sendNewEvent(cPE.getType(), cPEContent);
		}
	}

	export function saveRivers() { // saves the current rivers on the server
		let dataToServerString = "";
		for (let i = 0; i < GameState.rivers.length; i++) {
			let river = GameState.rivers[i];

			//TODO: check if left and rightbank are interchangeable
			dataToServerString = dataToServerString + river.leftBank[0] + ","
			dataToServerString = dataToServerString + river.leftBank[1] + ","
			dataToServerString = dataToServerString + river.rightBank[0] + ","
			dataToServerString = dataToServerString + river.rightBank[1]

			if (i != GameState.rivers.length - 1) {
				dataToServerString = dataToServerString + ";"
			}
		}
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
		let dataToServerString = "";
		for (let i = 0; i < Controls.changedBuildings.length; i++) {
			switch (Controls.changedBuildings[i][1].type) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].type + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].realm + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].x + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].y + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][0]
					break
				case 5:
				case 6:
				case 7:
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].type + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].realm + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].x + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].y + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].direction + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][0]
					break
				case 8:
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].type + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].realm + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].firstX + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].firstY + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].secondX + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][1].secondY + ","
					dataToServerString = dataToServerString + Controls.changedBuildings[i][0]
			}
			if (i != Controls.changedBuildings.length - 1) {
				//console.log("i " + i + " type " + changedBuildings[i][1].type)
				dataToServerString = dataToServerString + ";"
			} 
		}
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
		let sensibleArmyList = listOfArmies.map(function(elem){
			return {
				armyId: elem.armyId,
				count: elem.count,
				leaders: elem.leaders,
				lkp: elem.lkp,
				skp: elem.skp,
				mounts: elem.mounts,
				x: elem.x,
				y: elem.y,
				owner: elem.owner,
				movementPoints: elem.remainingMovePoints,
				heightPoints: elem.remainingHeightPoints,
				isLoadedIn: elem.isLoadedIn
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
			data: {borders: JSON.stringify(borders),
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
            if (GameState.armies[i].owner.tag === login || login === "sl"){
                GameState.armies[i].wasShotAt = false;
            }
        }
    }
}