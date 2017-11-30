'use strict';

function nextTurn() {
	var message = "";
	if (currentTurn.realm === null) {
		message = "Do you want to end the pre-turn phase?";
	} else if (currentTurn.status === 'fi') {
		message = "Do you want to end processing the turn of " + currentTurn.realm+"?";
	} else if (login === 'sl') {
		message = "Do you want to end the turn of "+ currentTurn.realm+"?";
	} else {
		message = "Do you want to end your turn?";
	}

	if (confirm(message)){
		
		for (var i = 0; i < preparedEvents.length; i++) {
			var cPE = preparedEvents[i];
			var cPEContent = JSON.stringify(cPE.content);
			if (cPE.type === "move") {
				$.post({
					url: url + "/databaseLink/moveevent/",
					data: {
						authorization: authenticationToken,
						content: cPEContent
					},
					statusCode: {
						200: function() {
							console.log("success");
						},
						400: function() {
							alert('Invalid input. Moved troop does not exist.');
						},
						401: function() {
    	  					alert('Authorisation failure. Please log in.');
    					},
    					403: function() {
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
					statusCode: {
						200: function() {
							console.log("success");
						},
						400: function() {
							alert("Invalid input. Not all troops participating in a battle exist.");
						},
						401: function() {
    	  					alert('Authorisation failure. Please log in.');
    					},
    					403: function() {
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
					statusCode: {
						200: function() {
							console.log("success");
						},
						400: function() {
							alert("Invalid input. Something went wrong with the merging of troops.");
						},
						401: function() {
    	  					alert('Authorisation failure. Please log in.');
    					},
    					403: function() {
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
					statusCode: {
						200: function() {
							console.log("success");
						},
						400: function() {
							alert("Invalid input. Something went wrong with the transfer of troops.");
						},
						401: function() {
    	  					alert('Authorisation failure. Please log in.');
    					},
    					403: function() {
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
					statusCode: {
						200: function() {
							console.log("success");
						},
						400: function() {
							alert("Invalid input. Something went wrong with the splitting of armies.");
						},
						401: function() {
    	  					alert('Authorisation failure. Please log in.');
    					},
    					403: function() {
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
		}
		
		pendingEvents.forEach(function(event) {
			if(event.status === 'checked'){
				sendCheckEvent(event.pk, event.type);
			} else if(event.status === 'deleted') {
				sendDeleteEvent(event.pk, event.type);
			}
		}, this);

		$.post({
			url: url + "/databaseLink/nextturn/",
			data: {authorization: authenticationToken},
			success: function(data){
				currentTurn = data;
				writeTurnNumber();
			},
			dataType: "json",
			statusCode: {
				401: function() {
    	  			alert('Authorisation failure. Please log in.');
    			},
    			403: function() {
    	  			alert('Access denied. You can only end your own turn.');
    			},
    			520: function() { // custom status code
					alert('Turn Order ran out. Tell SL to fill it!');
    			},
    			521: function() { // custom status code
    				alert('Turn Order ran out. You should fill it!');
    			}
			}
		});
	}
}
