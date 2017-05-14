'use strict';

		function saveFields(){ // saves the current fields on the server
			$(function () {
    			$.ajaxSetup({
        			headers: { "X-CSRFToken": currentCSRFToken} // getCookie("csrftoken")
    			});
			});
			var dataToServerString = "";
			for(var i = 0; i < changedFields.length; i++){
				if(i != changedFields.length-1){
					dataToServerString = dataToServerString + changedFields[i].type + ","
					dataToServerString = dataToServerString + changedFields[i].x + ","
					dataToServerString = dataToServerString + changedFields[i].y + ";"
				} else {
					dataToServerString = dataToServerString + changedFields[i].type + ","
					dataToServerString = dataToServerString + changedFields[i].x + ","
					dataToServerString = dataToServerString + changedFields[i].y
				}
			}
			console.log("start");
			$.ajax({
				type: 'post',
				url: url+"/databaseLink/savefielddata/",
				data: {map: dataToServerString,
					authorization: authenticationToken},
				success: console.log("success"),
				error: console.log("error"),
			});
			console.log("end");
		}

		function saveRivers(){ // saves the current rivers on the server
			var dataToServerString = "";
			for(var i = 0; i < rivers.length; i++){
				if(i != rivers.length-1){
					dataToServerString = dataToServerString + rivers[i][0][0] + ","
					dataToServerString = dataToServerString + rivers[i][0][1] + ","
					dataToServerString = dataToServerString + rivers[i][1][0] + ","
					dataToServerString = dataToServerString + rivers[i][1][1] + ";"
				} else {
					dataToServerString = dataToServerString + rivers[i][0][0] + ","
					dataToServerString = dataToServerString + rivers[i][0][1] + ","
					dataToServerString = dataToServerString + rivers[i][1][0] + ","
					dataToServerString = dataToServerString + rivers[i][1][1]
				}
			}
			console.log("start");
			console.log(rivers);
			$.ajax({
				type:'post',
				url: url + "/databaseLink/saveriverdata/",
				data: {river: dataToServerString,
					authorization: authenticationToken},
				success: console.log("success"),
				error: console.log("error"),
			});
			console.log("end");
		}

		function saveBuildings(){ // saves the current buildings on the server
			console.log(changedBuildings);
			console.log("changed Buildings length: " + changedBuildings.length);
			var dataToServerString = "";
			for(var i = 0; i < changedBuildings.length; i++){
				if(i != changedBuildings.length-1){
					console.log("i "+ i + " type " + changedBuildings[i][1].type)
					switch(changedBuildings[i][1].type){
						case 0:
						case 1:
						case 2:
						case 3:
						case 4:
							dataToServerString = dataToServerString + changedBuildings[i][1].type + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].realm + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].x + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].y + ","
							dataToServerString = dataToServerString + changedBuildings[i][0] + ";"
							break
						case 5:
						case 6:
						case 7:
							dataToServerString = dataToServerString + changedBuildings[i][1].type + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].realm + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].x + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].y + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].direction + ","
							dataToServerString = dataToServerString + changedBuildings[i][0] + ";"
							break
						case 8:
							dataToServerString = dataToServerString + changedBuildings[i][1].type + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].realm + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].firstX + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].firstY + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].secondX + ","
							dataToServerString = dataToServerString + changedBuildings[i][1].secondY + ","
							dataToServerString = dataToServerString + changedBuildings[i][0] + ";"
					}
				} else {
					console.log("at last entry in datatoserverstring, i = " + i);
					switch(changedBuildings[i][1].type){
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
				}
			}
			console.log("data to Server String: " + dataToServerString);
			$.ajax({
				type:'post',
				url: url + "/databaseLink/savebuildingdata/",
				data: {buildings: dataToServerString,
					authorization: authenticationToken},
				success: console.log("success"),
				error: console.log("error"),
			});
			console.log("end");
		}

		function saveArmies(){ // saves the current armies on the server
			var dataToServerString = "";
			for(var i = 0; i < listOfArmyCoordinates.length; i++){
				if(i != listOfArmyCoordinates.length-1){
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.armyId + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.count + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.leaders + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.lkp + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.skp + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.mounts + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].x + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].y + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].owner + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.isLoadedIn + ";"
				} else {
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.armyId + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.count + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.leaders + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.lkp + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.skp + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.mounts + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].x + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].y + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].owner + ","
					dataToServerString = dataToServerString + listOfArmyCoordinates[i].a.isLoadedIn
				}
			}
			console.log("start");
			console.log(listOfArmyCoordinates);
			$.ajax({
				type:'post',
				url: url + "/databaseLink/savearmydata/",
				data: {armies: dataToServerString,
					authorization: authenticationToken},
				success: console.log("success"),
				error: console.log("error"),
			});
			console.log("end");
		}

		function saveFactionsTerritories(){ // saves the faction territories on the server
			var dataToServerString = "";
			for (var i = 0; i < borders.length; i++) {
				if(i != borders.length-1){
					dataToServerString = dataToServerString + borders[i].tag + ":"
					for (var j = 0; j < borders[i].land.length; j++){
						if(j != borders[i].land.length-1){
							dataToServerString = dataToServerString + borders[i].land[j][0] + "/"
							dataToServerString = dataToServerString + borders[i].land[j][1] + ","
						} else {
							dataToServerString = dataToServerString + borders[i].land[j][0] + "/"
							dataToServerString = dataToServerString + borders[i].land[j][1] + ";"
						}
					}
				} else {
					dataToServerString = dataToServerString + borders[i].tag + ":"
					for (var j = 0; j < borders[i].land.length; j++){
						if(j != borders[i].land.length-1){
							dataToServerString = dataToServerString + borders[i].land[j][0] + "/"
							dataToServerString = dataToServerString + borders[i].land[j][1] + ","
						} else {
							dataToServerString = dataToServerString + borders[i].land[j][0] + "/"
							dataToServerString = dataToServerString + borders[i].land[j][1]
						}
					}
				}
			}
			console.log("start");
			console.log(borders);
			$.ajax({
				type:'post',
				url: url + "/databaseLink/saveborderdata/",
				data: {borders: dataToServerString,
					authorization: authenticationToken},
				success: console.log("success"),
				error: console.log("error"),
			});
			console.log("end");
		}