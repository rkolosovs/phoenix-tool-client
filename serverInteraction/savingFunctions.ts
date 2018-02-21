import {GameState} from "../gameState";

export namespace Saving{

    export function sendNextTurn() {
        sendEventlistInOrder(0);
        pendingEvents.forEach(event => {
            if (event.status === 'checked') {
                sendCheckEvent(event.pk, event.type);
            } else if (event.status === 'deleted') {
                sendDeleteEvent(event.pk, event.type);
            }
        });
        $.post({
            url: url + "/databaseLink/nextturn/",
            data: { authorization: authenticationToken },
            success: function (data) {
                currentTurn = data;
                Drawing.writeTurnNumber();
            },
            dataType: "json",
            statusCode: {
                401: function () {
                    alert('Authorisation failure. Please log in.');
                },
                403: function () {
                    alert('Access denied. You can only end your own turn.');
                },
                520: function () { // custom status code
                    alert('Turn Order ran out. Tell SL to fill it!');
                },
                521: function () { // custom status code
                    alert('Turn Order ran out. You should fill it!');
                }
            }
        });
    }

    export function sendEventlistInOrder(index: number) {
        console.log("The index is " + index + " out of " + preparedEvents.length + ",");
        if (index != preparedEvents.length) {
            var cPE = preparedEvents[index];
            var cPEContent = JSON.stringify(cPE.content);
            if (cPE.type === "move") {
                console.log(preparedEvents);
                $.post({
                    url: url + "/databaseLink/moveevent/",
                    data: {
                        authorization: authenticationToken,
                        content: cPEContent
                    },
                    success: function () { console.log(preparedEvents); sendEventlistInOrderRecursion(index + 1) },
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
            } else if (cPE.type === "battle") {
                $.post({
                    url: url + "/databaseLink/battleevent/",
                    data: {
                        authorization: authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrderRecursion(index + 1) },
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
            } else if (cPE.type === "merge") {
                $.post({
                    url: url + "/databaseLink/mergeevent/",
                    data: {
                        authorization: authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrderRecursion(index + 1) },
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
            } else if (cPE.type === "transfer") {
                $.post({
                    url: url + "/databaseLink/transferevent/",
                    data: {
                        authorization: authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrderRecursion(index + 1) },
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
            } else if (cPE.type === "split") {
                $.post({
                    url: url + "/databaseLink/splitevent/",
                    data: {
                        authorization: authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrderRecursion(index + 1) },
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
            } else if (cPE.type === "mount") {
                $.post({
                    url: url + "/databaseLink/mountevent/",
                    data: {
                        authorization: authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrderRecursion(index + 1) },
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
            }else if (cPE.type === "shoot") {
                $.post({
                    url: url + "/databaseLink/shootevent/",
                    data: {
                        authorization: authenticationToken,
                        content: cPEContent
                    },
                    success: function () { sendEventlistInOrderRecursion(index + 1) },
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
                console.log("Now deleting stuff!");
                pendingEvents = [];
                preparedEvents = [];
            }
        }
    }

	export function saveFields() { // saves the current fields on the server
		$(function () {
			$.ajaxSetup({
				headers: { "X-CSRFToken": currentCSRFToken } // getCookie("csrftoken")
			});
		});
		let dataToServerString = "";
		for (let i = 0; i < changedFields.length; i++) {
			if (i != changedFields.length - 1) {
				dataToServerString = dataToServerString + changedFields[i].type + ","
				dataToServerString = dataToServerString + changedFields[i].x + ","
				dataToServerString = dataToServerString + changedFields[i].y + ";"
			} else {
				dataToServerString = dataToServerString + changedFields[i].type + ","
				dataToServerString = dataToServerString + changedFields[i].x + ","
				dataToServerString = dataToServerString + changedFields[i].y
			}
		}
		$.post({
			url: url + "/databaseLink/savefielddata/",
			data: {
				authorization: authenticationToken,
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
		for (let i = 0; i < preparedEvents.length; i++) {
			let cPE = preparedEvents[i];
			let cPEContent = JSON.stringify(cPE.content);
			sendNewEvent(cPE.type, cPEContent);
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
			url: url + "/databaseLink/saveriverdata/",
			data: {
				river: dataToServerString,
				authorization: authenticationToken
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
		for (let i = 0; i < changedBuildings.length; i++) {
			switch (changedBuildings[i][1].type) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
					dataToServerString = dataToServerString + changedBuildings[i][1].type + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].realm + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].x + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].y + ","
					dataToServerString = dataToServerString + changedBuildings[i][0]
					break
				case 5:
				case 6:
				case 7:
					dataToServerString = dataToServerString + changedBuildings[i][1].type + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].realm + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].x + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].y + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].direction + ","
					dataToServerString = dataToServerString + changedBuildings[i][0]
					break
				case 8:
					dataToServerString = dataToServerString + changedBuildings[i][1].type + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].realm + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].firstX + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].firstY + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].secondX + ","
					dataToServerString = dataToServerString + changedBuildings[i][1].secondY + ","
					dataToServerString = dataToServerString + changedBuildings[i][0]
			}
			if (i != changedBuildings.length - 1) {
				//console.log("i " + i + " type " + changedBuildings[i][1].type)
				dataToServerString = dataToServerString + ";"
			} 
		}
		$.post({
			url: url + "/databaseLink/savebuildingdata/",
			data: {
				buildings: dataToServerString,
				authorization: authenticationToken
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
			url: url + "/databaseLink/savearmydata/",
			data: {
				armies: JSON.stringify(sensibleArmyList),
				authorization: authenticationToken
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
			url: url + "/databaseLink/saveborderdata/",
			data: {borders: JSON.stringify(borders),
				authorization: authenticationToken},
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
			url: url + "/databaseLink/deleteevent/",
			data: {
				authorization: authenticationToken,
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
			url: url + "/databaseLink/checkevent/",
			data: {
				authorization: authenticationToken,
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
			url: url + "/databaseLink/" + type + "event/",
			data: {
				authorization: authenticationToken,
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
			url: url + "/databaseLink/nextturn/",
			data: { authorization: authenticationToken },
			success: function (data) {
				currentTurn = data;
				Drawing.writeTurnNumber();
			},
			dataType: "json",
			statusCode: {
				401: function () {
					alert('Authorisation failure. Please log in.');
				},
				403: function () {
					alert('Access denied. You can only end your own turn.');
				},
				520: function () { // custom status code
					alert('Turn Order ran out. Tell SL to fill it!');
				},
				521: function () { // custom status code
					alert('Turn Order ran out. You should fill it!');
				}
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