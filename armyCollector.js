function loadArmies() {
	$.getJSON("armies.json", function(json){
		var armies = json.armies; //load the armies from the armies.json file
        listOfArmyCoordinates = [];
        for(var i = 0; i < armies.length; i++){
            if(Math.floor(armies[i].id/100) == 1){
                var army = new heer(armies[i].id, armies[i].truppen, armies[i].heerfuehrer, armies[i].leichte, armies[i].schwere, armies[i].reittiere);
                var armyCoords = new armyCoordinates(army, armies[i].x, armies[i].y, armies[i].owner);
                listOfArmyCoordinates.push(armyCoords);
            } else if(Math.floor(armies[i].id/100) == 2){
                var army = new reiterHeer(armies[i].id, armies[i].truppen, armies[i].heerfuehrer);
                var armyCoords = new armyCoordinates(army, armies[i].x, armies[i].y, armies[i].owner);
                listOfArmyCoordinates.push(armyCoords);
            }
        }
	});
}