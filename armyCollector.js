function loadArmies(url) {
    $.post({
			url: url +"/databaseLink/armydata/",
            data: {authorization: authenticationToken},
            success: function(data){
				var armies = data; //load the armies from the armies.json file
                listOfArmyCoordinates = [];
                for(var i = 0; i < armies.length; i++){
                    if(Math.floor(armies[i].armyId/100) == 1){
                        var army = new heer(armies[i].armyId, armies[i].count, armies[i].leaders, armies[i].lkp, armies[i].skp, armies[i].mounts);
                        var armyCoords = new armyCoordinates(army, armies[i].x, armies[i].y, armies[i].reich);
                        listOfArmyCoordinates.push(armyCoords);
                    } else if(Math.floor(armies[i].armyId/100) == 2){
                        var army = new reiterHeer(armies[i].armyId, armies[i].count, armies[i].leaders);
                        var armyCoords = new armyCoordinates(army, armies[i].x, armies[i].y, armies[i].reich);
                        listOfArmyCoordinates.push(armyCoords);
                    }
                }
			},
			dataType: "json",
            //headers: {
            //    "Authorization" :"Token " + authenticationToken,
            //}
		});
}