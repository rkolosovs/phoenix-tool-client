var listOfArmies = [];
var selectedArmyIndex = 0;

module( "Movement" , function() {
	module( "Foot" , function() {
	    test( "Lowlands -> lowlands", function(t) {
		});
	    test( "Lowlands -> lowlands on street", function(t) {
		});
	    test( "Lowlands -> lowlands in homeland", function(t) {
		});
	    test( "Lowlands -> lowlands on street in homeland", function(t) {
		});
	    test( "Lowlands -> desert", function(t) {
		});
	    test( "Lowlands -> desert on street", function(t) {
		});
	    test( "Lowlands -> desert in homeland", function(t) {
		});
	    test( "Lowlands -> desert on street in homeland", function(t) {
		});
	    test( "Lowlands -> woods", function(t) {
		});
	    test( "Lowlands -> woods on street", function(t) {
		});
	    test( "Lowlands -> woods in homeland", function(t) {
		});
	    test( "Lowlands -> woods on street in homeland", function(t) {
		});
	    test( "Lowlands -> swamp", function(t) {
		});
	    test( "Lowlands -> swamp on street", function(t) {
		});
	    test( "Lowlands -> swamp in homeland", function(t) {
		});
	    test( "Lowlands -> swamp on street in homeland", function(t) {
		});
	    test( "Lowlands -> hills", function(t) {
		});
	    test( "Lowlands -> hills on street", function(t) {
		});
	    test( "Lowlands -> hills in homeland", function(t) {
		});
	    test( "Lowlands -> hills on street in homeland", function(t) {
		});
	    test( "Lowlands -> highlands", function(t) {
		});
	    test( "Lowlands -> mountains", function(t) {
		});
	    test( "Lowlands -> shallows", function(t) {
		});
	    test( "Lowlands -> shallows with harbor", function(t) {
		});
	    test( "Lowlands -> deepsea", function(t) {
		});
	    test( "Lowlands -> deepsea with harbor", function(t) {
		});
	    test( "Desert -> lowlands", function(t) {
		});
	    test( "Desert -> lowlands on street", function(t) {
		});
	    test( "Desert -> lowlands in homeland", function(t) {
		});
	    test( "Desert -> lowlands on street in homeland", function(t) {
		});
	    test( "Desert -> desert", function(t) {
		});
	    test( "Desert -> desert on street", function(t) {
		});
	    test( "Desert -> desert in homeland", function(t) {
		});
	    test( "Desert -> desert on street in homeland", function(t) {
		});
	    test( "Desert -> woods", function(t) {
		});
	    test( "Desert -> woods on street", function(t) {
		});
	    test( "Desert -> woods in homeland", function(t) {
		});
	    test( "Desert -> woods on street in homeland", function(t) {
		});
	    test( "Desert -> swamp", function(t) {
		});
	    test( "Desert -> swamp on street", function(t) {
		});
	    test( "Desert -> swamp in homeland", function(t) {
		});
	    test( "Desert -> swamp on street in homeland", function(t) {
		});
	    test( "Desert -> hills", function(t) {
		});
	    test( "Desert -> hills on street", function(t) {
		});
	    test( "Desert -> hills in homeland", function(t) {
		});
	    test( "Desert -> hills on street in homeland", function(t) {
		});
	    test( "Desert -> highlands", function(t) {
		});
	    test( "Desert -> mountains", function(t) {
		});
	    test( "Desert -> shallows", function(t) {
		});
	    test( "Desert -> shallows with harbor", function(t) {
		});
	    test( "Desert -> deepsea", function(t) {
		});
	    test( "Desert -> deepsea with harbor", function(t) {
		});
	    test( "Woods -> lowlands", function(t) {
		});
	    test( "Woods -> lowlands on street", function(t) {
		});
	    test( "Woods -> lowlands in homeland", function(t) {
		});
	    test( "Woods -> lowlands on street in homeland", function(t) {
		});
	    test( "Woods -> desert", function(t) {
		});
	    test( "Woods -> desert on street", function(t) {
		});
	    test( "Woods -> desert in homeland", function(t) {
		});
	    test( "Woods -> desert on street in homeland", function(t) {
		});
	    test( "Woods -> woods", function(t) {
		});
	    test( "Woods -> woods on street", function(t) {
		});
	    test( "Woods -> woods in homeland", function(t) {
		});
	    test( "Woods -> woods on street in homeland", function(t) {
		});
	    test( "Woods -> swamp", function(t) {
		});
	    test( "Woods -> swamp on street", function(t) {
		});
	    test( "Woods -> swamp in homeland", function(t) {
		});
	    test( "Woods -> swamp on street in homeland", function(t) {
		});
	    test( "Woods -> hills", function(t) {
		});
	    test( "Woods -> hills on street", function(t) {
		});
	    test( "Woods -> hills in homeland", function(t) {
		});
	    test( "Woods -> hills on street in homeland", function(t) {
		});
	    test( "Woods -> highlands", function(t) {
		});
	    test( "Woods -> mountains", function(t) {
		});
	    test( "Woods -> shallows", function(t) {
		});
	    test( "Woods -> shallows with harbor", function(t) {
		});
	    test( "Woods -> deepsea", function(t) {
		});
	    test( "Woods -> deepsea with harbor", function(t) {
		});
	    test( "Swamp -> lowlands", function(t) {
		});
	    test( "Swamp -> lowlands on street", function(t) {
		});
	    test( "Swamp -> lowlands in homeland", function(t) {
		});
	    test( "Swamp -> lowlands on street in homeland", function(t) {
		});
	    test( "Swamp -> desert", function(t) {
		});
	    test( "Swamp -> desert on street", function(t) {
		});
	    test( "Swamp -> desert in homeland", function(t) {
		});
	    test( "Swamp -> desert on street in homeland", function(t) {
		});
	    test( "Swamp -> woods", function(t) {
		});
	    test( "Swamp -> woods on street", function(t) {
		});
	    test( "Swamp -> woods in homeland", function(t) {
		});
	    test( "Swamp -> woods on street in homeland", function(t) {
		});
	    test( "Swamp -> swamp", function(t) {
		});
	    test( "Swamp -> swamp on street", function(t) {
		});
	    test( "Swamp -> swamp in homeland", function(t) {
		});
	    test( "Swamp -> swamp on street in homeland", function(t) {
		});
	    test( "Swamp -> hills", function(t) {
		});
	    test( "Swamp -> hills on street", function(t) {
		});
	    test( "Swamp -> hills in homeland", function(t) {
		});
	    test( "Swamp -> hills on street in homeland", function(t) {
		});
	    test( "Swamp -> highlands", function(t) {
		});
	    test( "Swamp -> mountains", function(t) {
		});
	    test( "Swamp -> shallows", function(t) {
		});
	    test( "Swamp -> shallows with harbor", function(t) {
		});
	    test( "Swamp -> deepsea", function(t) {
		});
	    test( "Swamp -> deepsea with harbor", function(t) {
		});
	    test( "Hills -> lowlands", function(t) {
		});
	    test( "Hills -> lowlands on street", function(t) {
		});
	    test( "Hills -> lowlands in homeland", function(t) {
		});
	    test( "Hills -> lowlands on street in homeland", function(t) {
		});
	    test( "Hills -> desert", function(t) {
		});
	    test( "Hills -> desert on street", function(t) {
		});
	    test( "Hills -> desert in homeland", function(t) {
		});
	    test( "Hills -> desert on street in homeland", function(t) {
		});
	    test( "Hills -> woods", function(t) {
		});
	    test( "Hills -> woods on street", function(t) {
		});
	    test( "Hills -> woods in homeland", function(t) {
		});
	    test( "Hills -> woods on street in homeland", function(t) {
		});
	    test( "Hills -> swamp", function(t) {
		});
	    test( "Hills -> swamp on street", function(t) {
		});
	    test( "Hills -> swamp in homeland", function(t) {
		});
	    test( "Hills -> swamp on street in homeland", function(t) {
		});
	    test( "Hills -> hills", function(t) {
		});
	    test( "Hills -> hills on street", function(t) {
		});
	    test( "Hills -> hills in homeland", function(t) {
		});
	    test( "Hills -> hills on street in homeland", function(t) {
		});
	    test( "Hills -> highlands", function(t) {
		});
	    test( "Hills -> highlands on street", function(t) {
		});
	    test( "Hills -> highlands in homeland", function(t) {
		});
	    test( "Hills -> highlands on street in homeland", function(t) {
		});
	    test( "Hills -> mountains", function(t) {
		});
	    test( "Hills -> shallows", function(t) {
		});
	    test( "Hills -> deepsea", function(t) {
		});
	    test( "Highlands -> lowlands", function(t) {
		});
	    test( "Highlands -> desert", function(t) {
		});
	    test( "Highlands -> woods", function(t) {
		});
	    test( "Highlands -> swamp", function(t) {
		});
	    test( "Highlands -> hills", function(t) {
		});
	    test( "Highlands -> hills on street", function(t) {
		});
	    test( "Highlands -> hills in homeland", function(t) {
		});
	    test( "Highlands -> hills on street in homeland", function(t) {
		});
	    test( "Highlands -> highlands", function(t) {
		});
	    test( "Highlands -> highlands on street", function(t) {
		});
	    test( "Highlands -> highlands in homeland", function(t) {
		});
	    test( "Highlands -> highlands on street in homeland", function(t) {
		});
	    test( "Highlands -> mountains", function(t) {
		});
	    test( "Highlands -> mountains on street", function(t) {
		});
	    test( "Highlands -> mountains in homeland", function(t) {
		});
	    test( "Highlands -> mountains on street in homeland", function(t) {
		});
	    test( "Highlands -> shallows", function(t) {
		});
	    test( "Highlands -> deepsea", function(t) {
		});
	    test( "Mountains -> lowlands", function(t) {
		});
	    test( "Mountains -> desert", function(t) {
		});
	    test( "Mountains -> woods", function(t) {
		});
	    test( "Mountains -> swamp", function(t) {
		});
	    test( "Mountains -> hills", function(t) {
		});
	    test( "Mountains -> highlands", function(t) {
		});
	    test( "Mountains -> highlands on street", function(t) {
		});
	    test( "Mountains -> highlands in homeland", function(t) {
		});
	    test( "Mountains -> highlands on street in homeland", function(t) {
		});
	    test( "Mountains -> mountains", function(t) {
		});
	    test( "Mountains -> mountains on street", function(t) {
		});
	    test( "Mountains -> mountains in homeland", function(t) {
		});
	    test( "Mountains -> mountains on street in homeland", function(t) {
		});
	    test( "Mountains -> shallows", function(t) {
		});
	    test( "Mountains -> deepsea", function(t) {
		});
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> lowlands with harbor", function(t) {
		});
	    test( "Shallows -> lowlands in homeland", function(t) {
		});
	    test( "Shallows -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> desert with harbor", function(t) {
		});
	    test( "Shallows -> desert in homeland", function(t) {
		});
	    test( "Shallows -> desert with harbor in homeland", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> woods with harbor", function(t) {
		});
	    test( "Shallows -> woods in homeland", function(t) {
		});
	    test( "Shallows -> woods with harbor in homeland", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> swamp with harbor", function(t) {
		});
	    test( "Shallows -> swamp in homeland", function(t) {
		});
	    test( "Shallows -> swamp with harbor in homeland", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor", function(t) {
		});
	    test( "Deepsea -> lowlands in homeland", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> desert with harbor", function(t) {
		});
	    test( "Deepsea -> desert in homeland", function(t) {
		});
	    test( "Deepsea -> desert with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> woods with harbor", function(t) {
		});
	    test( "Deepsea -> woods in homeland", function(t) {
		});
	    test( "Deepsea -> woods with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> swamp with harbor", function(t) {
		});
	    test( "Deepsea -> swamp in homeland", function(t) {
		});
	    test( "Deepsea -> swamp with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	});
	module( "Light Catapults" , function() {
	    test( "Lowlands -> lowlands", function(t) {
		});
	    test( "Lowlands -> lowlands on street", function(t) {
		});
	    test( "Lowlands -> lowlands in homeland", function(t) {
		});
	    test( "Lowlands -> lowlands on street in homeland", function(t) {
		});
	    test( "Lowlands -> desert", function(t) {
		});
	    test( "Lowlands -> desert on street", function(t) {
		});
	    test( "Lowlands -> desert in homeland", function(t) {
		});
	    test( "Lowlands -> desert on street in homeland", function(t) {
		});
	    test( "Lowlands -> woods", function(t) {
		});
	    test( "Lowlands -> woods on street", function(t) {
		});
	    test( "Lowlands -> woods in homeland", function(t) {
		});
	    test( "Lowlands -> woods on street in homeland", function(t) {
		});
	    test( "Lowlands -> swamp", function(t) {
		});
	    test( "Lowlands -> swamp on street", function(t) {
		});
	    test( "Lowlands -> swamp in homeland", function(t) {
		});
	    test( "Lowlands -> swamp on street in homeland", function(t) {
		});
	    test( "Lowlands -> hills", function(t) {
		});
	    test( "Lowlands -> hills on street", function(t) {
		});
	    test( "Lowlands -> hills in homeland", function(t) {
		});
	    test( "Lowlands -> hills on street in homeland", function(t) {
		});
	    test( "Lowlands -> highlands", function(t) {
		});
	    test( "Lowlands -> mountains", function(t) {
		});
	    test( "Lowlands -> shallows", function(t) {
		});
	    test( "Lowlands -> shallows with harbor", function(t) {
		});
	    test( "Lowlands -> deepsea", function(t) {
		});
	    test( "Lowlands -> deepsea with harbor", function(t) {
		});
	    test( "Desert -> lowlands", function(t) {
		});
	    test( "Desert -> lowlands on street", function(t) {
		});
	    test( "Desert -> lowlands in homeland", function(t) {
		});
	    test( "Desert -> lowlands on street in homeland", function(t) {
		});
	    test( "Desert -> desert", function(t) {
		});
	    test( "Desert -> desert on street", function(t) {
		});
	    test( "Desert -> desert in homeland", function(t) {
		});
	    test( "Desert -> desert on street in homeland", function(t) {
		});
	    test( "Desert -> woods", function(t) {
		});
	    test( "Desert -> woods on street", function(t) {
		});
	    test( "Desert -> woods in homeland", function(t) {
		});
	    test( "Desert -> woods on street in homeland", function(t) {
		});
	    test( "Desert -> swamp", function(t) {
		});
	    test( "Desert -> swamp on street", function(t) {
		});
	    test( "Desert -> swamp in homeland", function(t) {
		});
	    test( "Desert -> swamp on street in homeland", function(t) {
		});
	    test( "Desert -> hills", function(t) {
		});
	    test( "Desert -> hills on street", function(t) {
		});
	    test( "Desert -> hills in homeland", function(t) {
		});
	    test( "Desert -> hills on street in homeland", function(t) {
		});
	    test( "Desert -> highlands", function(t) {
		});
	    test( "Desert -> mountains", function(t) {
		});
	    test( "Desert -> shallows", function(t) {
		});
	    test( "Desert -> shallows with harbor", function(t) {
		});
	    test( "Desert -> deepsea", function(t) {
		});
	    test( "Desert -> deepsea with harbor", function(t) {
		});
	    test( "Woods -> lowlands", function(t) {
		});
	    test( "Woods -> lowlands on street", function(t) {
		});
	    test( "Woods -> lowlands in homeland", function(t) {
		});
	    test( "Woods -> lowlands on street in homeland", function(t) {
		});
	    test( "Woods -> desert", function(t) {
		});
	    test( "Woods -> desert on street", function(t) {
		});
	    test( "Woods -> desert in homeland", function(t) {
		});
	    test( "Woods -> desert on street in homeland", function(t) {
		});
	    test( "Woods -> woods", function(t) {
		});
	    test( "Woods -> woods on street", function(t) {
		});
	    test( "Woods -> woods in homeland", function(t) {
		});
	    test( "Woods -> woods on street in homeland", function(t) {
		});
	    test( "Woods -> swamp", function(t) {
		});
	    test( "Woods -> swamp on street", function(t) {
		});
	    test( "Woods -> swamp in homeland", function(t) {
		});
	    test( "Woods -> swamp on street in homeland", function(t) {
		});
	    test( "Woods -> hills", function(t) {
		});
	    test( "Woods -> hills on street", function(t) {
		});
	    test( "Woods -> hills in homeland", function(t) {
		});
	    test( "Woods -> hills on street in homeland", function(t) {
		});
	    test( "Woods -> highlands", function(t) {
		});
	    test( "Woods -> mountains", function(t) {
		});
	    test( "Woods -> shallows", function(t) {
		});
	    test( "Woods -> shallows with harbor", function(t) {
		});
	    test( "Woods -> deepsea", function(t) {
		});
	    test( "Woods -> deepsea with harbor", function(t) {
		});
	    test( "Swamp -> lowlands", function(t) {
		});
	    test( "Swamp -> lowlands on street", function(t) {
		});
	    test( "Swamp -> lowlands in homeland", function(t) {
		});
	    test( "Swamp -> lowlands on street in homeland", function(t) {
		});
	    test( "Swamp -> desert", function(t) {
		});
	    test( "Swamp -> desert on street", function(t) {
		});
	    test( "Swamp -> desert in homeland", function(t) {
		});
	    test( "Swamp -> desert on street in homeland", function(t) {
		});
	    test( "Swamp -> woods", function(t) {
		});
	    test( "Swamp -> woods on street", function(t) {
		});
	    test( "Swamp -> woods in homeland", function(t) {
		});
	    test( "Swamp -> woods on street in homeland", function(t) {
		});
	    test( "Swamp -> swamp", function(t) {
		});
	    test( "Swamp -> swamp on street", function(t) {
		});
	    test( "Swamp -> swamp in homeland", function(t) {
		});
	    test( "Swamp -> swamp on street in homeland", function(t) {
		});
	    test( "Swamp -> hills", function(t) {
		});
	    test( "Swamp -> hills on street", function(t) {
		});
	    test( "Swamp -> hills in homeland", function(t) {
		});
	    test( "Swamp -> hills on street in homeland", function(t) {
		});
	    test( "Swamp -> highlands", function(t) {
		});
	    test( "Swamp -> mountains", function(t) {
		});
	    test( "Swamp -> shallows", function(t) {
		});
	    test( "Swamp -> shallows with harbor", function(t) {
		});
	    test( "Swamp -> deepsea", function(t) {
		});
	    test( "Swamp -> deepsea with harbor", function(t) {
		});
	    test( "Hills -> lowlands", function(t) {
		});
	    test( "Hills -> lowlands on street", function(t) {
		});
	    test( "Hills -> lowlands in homeland", function(t) {
		});
	    test( "Hills -> lowlands on street in homeland", function(t) {
		});
	    test( "Hills -> desert", function(t) {
		});
	    test( "Hills -> desert on street", function(t) {
		});
	    test( "Hills -> desert in homeland", function(t) {
		});
	    test( "Hills -> desert on street in homeland", function(t) {
		});
	    test( "Hills -> woods", function(t) {
		});
	    test( "Hills -> woods on street", function(t) {
		});
	    test( "Hills -> woods in homeland", function(t) {
		});
	    test( "Hills -> woods on street in homeland", function(t) {
		});
	    test( "Hills -> swamp", function(t) {
		});
	    test( "Hills -> swamp on street", function(t) {
		});
	    test( "Hills -> swamp in homeland", function(t) {
		});
	    test( "Hills -> swamp on street in homeland", function(t) {
		});
	    test( "Hills -> hills", function(t) {
		});
	    test( "Hills -> hills on street", function(t) {
		});
	    test( "Hills -> hills in homeland", function(t) {
		});
	    test( "Hills -> hills on street in homeland", function(t) {
		});
	    test( "Hills -> highlands", function(t) {
		});
	    test( "Hills -> highlands on street", function(t) {
		});
	    test( "Hills -> highlands in homeland", function(t) {
		});
	    test( "Hills -> highlands on street in homeland", function(t) {
		});
	    test( "Hills -> mountains", function(t) {
		});
	    test( "Hills -> shallows", function(t) {
		});
	    test( "Hills -> deepsea", function(t) {
		});
	    test( "Highlands -> lowlands", function(t) {
		});
	    test( "Highlands -> desert", function(t) {
		});
	    test( "Highlands -> woods", function(t) {
		});
	    test( "Highlands -> swamp", function(t) {
		});
	    test( "Highlands -> hills", function(t) {
		});
	    test( "Highlands -> hills on street", function(t) {
		});
	    test( "Highlands -> hills in homeland", function(t) {
		});
	    test( "Highlands -> hills on street in homeland", function(t) {
		});
	    test( "Highlands -> highlands", function(t) {
		});
	    test( "Highlands -> highlands on street", function(t) {
		});
	    test( "Highlands -> highlands in homeland", function(t) {
		});
	    test( "Highlands -> highlands on street in homeland", function(t) {
		});
	    test( "Highlands -> mountains", function(t) {
		});
	    test( "Highlands -> mountains on street", function(t) {
		});
	    test( "Highlands -> mountains on street in homeland", function(t) {
		});
	    test( "Highlands -> shallows", function(t) {
		});
	    test( "Highlands -> deepsea", function(t) {
		});
	    test( "Mountains -> lowlands", function(t) {
		});
	    test( "Mountains -> desert", function(t) {
		});
	    test( "Mountains -> woods", function(t) {
		});
	    test( "Mountains -> swamp", function(t) {
		});
	    test( "Mountains -> hills", function(t) {
		});
	    test( "Mountains -> highlands", function(t) {
		});
	    test( "Mountains -> highlands on street", function(t) {
		});
	    test( "Mountains -> highlands in homeland", function(t) {
		});
	    test( "Mountains -> highlands on street in homeland", function(t) {
		});
	    test( "Mountains -> mountains", function(t) {
		});
	    test( "Mountains -> mountains on street", function(t) {
		});
	    test( "Mountains -> mountains on street in homeland", function(t) {
		});
	    test( "Mountains -> shallows", function(t) {
		});
	    test( "Mountains -> deepsea", function(t) {
		});
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> lowlands with harbor", function(t) {
		});
	    test( "Shallows -> lowlands in homeland", function(t) {
		});
	    test( "Shallows -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> desert with harbor", function(t) {
		});
	    test( "Shallows -> desert in homeland", function(t) {
		});
	    test( "Shallows -> desert with harbor in homeland", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> woods with harbor", function(t) {
		});
	    test( "Shallows -> woods in homeland", function(t) {
		});
	    test( "Shallows -> woods with harbor in homeland", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> swamp with harbor", function(t) {
		});
	    test( "Shallows -> swamp in homeland", function(t) {
		});
	    test( "Shallows -> swamp with harbor in homeland", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor", function(t) {
		});
	    test( "Deepsea -> lowlands in homeland", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> desert with harbor", function(t) {
		});
	    test( "Deepsea -> desert in homeland", function(t) {
		});
	    test( "Deepsea -> desert with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> woods with harbor", function(t) {
		});
	    test( "Deepsea -> woods in homeland", function(t) {
		});
	    test( "Deepsea -> woods with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> swamp with harbor", function(t) {
		});
	    test( "Deepsea -> swamp in homeland", function(t) {
		});
	    test( "Deepsea -> swamp with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	});
	module( "Heavy Catapults" , function() {
	    test( "Lowlands -> lowlands", function(t) {
		});
	    test( "Lowlands -> lowlands on street", function(t) {
		});
	    test( "Lowlands -> lowlands in homeland", function(t) {
		});
	    test( "Lowlands -> lowlands on street in homeland", function(t) {
		});
	    test( "Lowlands -> desert", function(t) {
		});
	    test( "Lowlands -> desert on street", function(t) {
		});
	    test( "Lowlands -> desert in homeland", function(t) {
		});
	    test( "Lowlands -> desert on street in homeland", function(t) {
		});
	    test( "Lowlands -> woods", function(t) {
		});
	    test( "Lowlands -> woods on street", function(t) {
		});
	    test( "Lowlands -> woods on street in homeland", function(t) {
		});
	    test( "Lowlands -> swamp", function(t) {
		});
	    test( "Lowlands -> swamp on street", function(t) {
		});
	    test( "Lowlands -> swamp on street in homeland", function(t) {
		});
	    test( "Lowlands -> hills", function(t) {
		});
	    test( "Lowlands -> hills on street", function(t) {
		});
	    test( "Lowlands -> hills in homeland", function(t) {
		});
	    test( "Lowlands -> hills on street in homeland", function(t) {
		});
	    test( "Lowlands -> highlands", function(t) {
		});
	    test( "Lowlands -> mountains", function(t) {
		});
	    test( "Lowlands -> shallows", function(t) {
		});
	    test( "Lowlands -> shallows with harbor", function(t) {
		});
	    test( "Lowlands -> deepsea", function(t) {
		});
	    test( "Lowlands -> deepsea with harbor", function(t) {
		});
	    test( "Desert -> lowlands", function(t) {
		});
	    test( "Desert -> lowlands on street", function(t) {
		});
	    test( "Desert -> lowlands in homeland", function(t) {
		});
	    test( "Desert -> lowlands on street in homeland", function(t) {
		});
	    test( "Desert -> desert", function(t) {
		});
	    test( "Desert -> desert on street", function(t) {
		});
	    test( "Desert -> desert in homeland", function(t) {
		});
	    test( "Desert -> desert on street in homeland", function(t) {
		});
	    test( "Desert -> woods", function(t) {
		});
	    test( "Desert -> woods on street", function(t) {
		});
	    test( "Desert -> woods on street in homeland", function(t) {
		});
	    test( "Desert -> swamp", function(t) {
		});
	    test( "Desert -> swamp on street", function(t) {
		});
	    test( "Desert -> swamp on street in homeland", function(t) {
		});
	    test( "Desert -> hills", function(t) {
		});
	    test( "Desert -> hills on street", function(t) {
		});
	    test( "Desert -> hills in homeland", function(t) {
		});
	    test( "Desert -> hills on street in homeland", function(t) {
		});
	    test( "Desert -> highlands", function(t) {
		});
	    test( "Desert -> mountains", function(t) {
		});
	    test( "Desert -> shallows", function(t) {
		});
	    test( "Desert -> shallows with harbor", function(t) {
		});
	    test( "Desert -> deepsea", function(t) {
		});
	    test( "Desert -> deepsea with harbor", function(t) {
		});
	    test( "Woods -> lowlands", function(t) {
		});
	    test( "Woods -> lowlands on street", function(t) {
		});
	    test( "Woods -> lowlands in homeland", function(t) {
		});
	    test( "Woods -> lowlands on street in homeland", function(t) {
		});
	    test( "Woods -> desert", function(t) {
		});
	    test( "Woods -> desert on street", function(t) {
		});
	    test( "Woods -> desert in homeland", function(t) {
		});
	    test( "Woods -> desert on street in homeland", function(t) {
		});
	    test( "Woods -> woods", function(t) {
		});
	    test( "Woods -> woods on street", function(t) {
		});
	    test( "Woods -> woods on street in homeland", function(t) {
		});
	    test( "Woods -> swamp", function(t) {
		});
	    test( "Woods -> swamp on street", function(t) {
		});
	    test( "Woods -> swamp on street in homeland", function(t) {
		});
	    test( "Woods -> hills", function(t) {
		});
	    test( "Woods -> hills on street", function(t) {
		});
	    test( "Woods -> hills in homeland", function(t) {
		});
	    test( "Woods -> hills on street in homeland", function(t) {
		});
	    test( "Woods -> highlands", function(t) {
		});
	    test( "Woods -> mountains", function(t) {
		});
	    test( "Woods -> shallows", function(t) {
		});
	    test( "Woods -> shallows with harbor", function(t) {
		});
	    test( "Woods -> deepsea", function(t) {
		});
	    test( "Woods -> deepsea with harbor", function(t) {
		});
	    test( "Swamp -> lowlands", function(t) {
		});
	    test( "Swamp -> lowlands on street", function(t) {
		});
	    test( "Swamp -> lowlands in homeland", function(t) {
		});
	    test( "Swamp -> lowlands on street in homeland", function(t) {
		});
	    test( "Swamp -> desert", function(t) {
		});
	    test( "Swamp -> desert on street", function(t) {
		});
	    test( "Swamp -> desert in homeland", function(t) {
		});
	    test( "Swamp -> desert on street in homeland", function(t) {
		});
	    test( "Swamp -> woods", function(t) {
		});
	    test( "Swamp -> woods on street", function(t) {
		});
	    test( "Swamp -> woods on street in homeland", function(t) {
		});
	    test( "Swamp -> swamp", function(t) {
		});
	    test( "Swamp -> swamp on street", function(t) {
		});
	    test( "Swamp -> swamp on street in homeland", function(t) {
		});
	    test( "Swamp -> hills", function(t) {
		});
	    test( "Swamp -> hills on street", function(t) {
		});
	    test( "Swamp -> hills in homeland", function(t) {
		});
	    test( "Swamp -> hills on street in homeland", function(t) {
		});
	    test( "Swamp -> highlands", function(t) {
		});
	    test( "Swamp -> mountains", function(t) {
		});
	    test( "Swamp -> shallows", function(t) {
		});
	    test( "Swamp -> shallows with harbor", function(t) {
		});
	    test( "Swamp -> deepsea", function(t) {
		});
	    test( "Swamp -> deepsea with harbor", function(t) {
		});
	    test( "Hills -> lowlands", function(t) {
		});
	    test( "Hills -> lowlands on street", function(t) {
		});
	    test( "Hills -> lowlands in homeland", function(t) {
		});
	    test( "Hills -> lowlands on street in homeland", function(t) {
		});
	    test( "Hills -> desert", function(t) {
		});
	    test( "Hills -> desert on street", function(t) {
		});
	    test( "Hills -> desert in homeland", function(t) {
		});
	    test( "Hills -> desert on street in homeland", function(t) {
		});
	    test( "Hills -> woods", function(t) {
		});
	    test( "Hills -> woods on street", function(t) {
		});
	    test( "Hills -> woods on street in homeland", function(t) {
		});
	    test( "Hills -> swamp", function(t) {
		});
	    test( "Hills -> swamp on street", function(t) {
		});
	    test( "Hills -> swamp on street in homeland", function(t) {
		});
	    test( "Hills -> hills", function(t) {
		});
	    test( "Hills -> hills on street", function(t) {
		});
	    test( "Hills -> hills in homeland", function(t) {
		});
	    test( "Hills -> hills on street in homeland", function(t) {
		});
	    test( "Hills -> highlands", function(t) {
		});
	    test( "Hills -> highlands on street", function(t) {
		});
	    test( "Hills -> highlands on street in homeland", function(t) {
		});
	    test( "Hills -> mountains", function(t) {
		});
	    test( "Hills -> shallows", function(t) {
		});
	    test( "Hills -> deepsea", function(t) {
		});
	    test( "Highlands -> lowlands", function(t) {
		});
	    test( "Highlands -> desert", function(t) {
		});
	    test( "Highlands -> woods", function(t) {
		});
	    test( "Highlands -> swamp", function(t) {
		});
	    test( "Highlands -> hills", function(t) {
		});
	    test( "Highlands -> hills on street", function(t) {
		});
	    test( "Highlands -> hills in homeland", function(t) {
		});
	    test( "Highlands -> hills on street in homeland", function(t) {
		});
	    test( "Highlands -> highlands", function(t) {
		});
	    test( "Highlands -> highlands on street", function(t) {
		});
	    test( "Highlands -> highlands on street in homeland", function(t) {
		});
	    test( "Highlands -> mountains", function(t) {
		});
	    test( "Highlands -> shallows", function(t) {
		});
	    test( "Highlands -> deepsea", function(t) {
		});
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> lowlands with harbor", function(t) {
		});
	    test( "Shallows -> lowlands in homeland", function(t) {
		});
	    test( "Shallows -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> desert with harbor", function(t) {
		});
	    test( "Shallows -> desert in homeland", function(t) {
		});
	    test( "Shallows -> desert with harbor in homeland", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> woods with harbor", function(t) {
		});
	    test( "Shallows -> woods with harbor in homeland", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> swamp with harbor", function(t) {
		});
	    test( "Shallows -> swamp with harbor in homeland", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor", function(t) {
		});
	    test( "Deepsea -> lowlands in homeland", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> desert with harbor", function(t) {
		});
	    test( "Deepsea -> desert in homeland", function(t) {
		});
	    test( "Deepsea -> desert with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> woods with harbor", function(t) {
		});
	    test( "Deepsea -> woods with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> swamp with harbor", function(t) {
		});
	    test( "Deepsea -> swamp with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	});
	module( "Riders" , function() {
	    test( "Lowlands -> lowlands", function(t) {
		});
	    test( "Lowlands -> lowlands on street", function(t) {
		});
	    test( "Lowlands -> lowlands in homeland", function(t) {
		});
	    test( "Lowlands -> lowlands on street in homeland", function(t) {
		});
	    test( "Lowlands -> desert", function(t) {
		});
	    test( "Lowlands -> desert on street", function(t) {
		});
	    test( "Lowlands -> desert in homeland", function(t) {
		});
	    test( "Lowlands -> desert on street in homeland", function(t) {
		});
	    test( "Lowlands -> woods", function(t) {
		});
	    test( "Lowlands -> woods on street", function(t) {
		});
	    test( "Lowlands -> woods in homeland", function(t) {
		});
	    test( "Lowlands -> woods on street in homeland", function(t) {
		});
	    test( "Lowlands -> swamp", function(t) {
		});
	    test( "Lowlands -> swamp on street", function(t) {
		});
	    test( "Lowlands -> swamp in homeland", function(t) {
		});
	    test( "Lowlands -> swamp on street in homeland", function(t) {
		});
	    test( "Lowlands -> hills", function(t) {
		});
	    test( "Lowlands -> hills on street", function(t) {
		});
	    test( "Lowlands -> hills in homeland", function(t) {
		});
	    test( "Lowlands -> hills on street in homeland", function(t) {
		});
	    test( "Lowlands -> highlands", function(t) {
		});
	    test( "Lowlands -> mountains", function(t) {
		});
	    test( "Lowlands -> shallows", function(t) {
		});
	    test( "Lowlands -> shallows with harbor", function(t) {
		});
	    test( "Lowlands -> deepsea", function(t) {
		});
	    test( "Lowlands -> deepsea with harbor", function(t) {
		});
	    test( "Desert -> lowlands", function(t) {
		});
	    test( "Desert -> lowlands on street", function(t) {
		});
	    test( "Desert -> lowlands in homeland", function(t) {
		});
	    test( "Desert -> lowlands on street in homeland", function(t) {
		});
	    test( "Desert -> desert", function(t) {
		});
	    test( "Desert -> desert on street", function(t) {
		});
	    test( "Desert -> desert in homeland", function(t) {
		});
	    test( "Desert -> desert on street in homeland", function(t) {
		});
	    test( "Desert -> woods", function(t) {
		});
	    test( "Desert -> woods on street", function(t) {
		});
	    test( "Desert -> woods in homeland", function(t) {
		});
	    test( "Desert -> woods on street in homeland", function(t) {
		});
	    test( "Desert -> swamp", function(t) {
		});
	    test( "Desert -> swamp on street", function(t) {
		});
	    test( "Desert -> swamp in homeland", function(t) {
		});
	    test( "Desert -> swamp on street in homeland", function(t) {
		});
	    test( "Desert -> hills", function(t) {
		});
	    test( "Desert -> hills on street", function(t) {
		});
	    test( "Desert -> hills in homeland", function(t) {
		});
	    test( "Desert -> hills on street in homeland", function(t) {
		});
	    test( "Desert -> highlands", function(t) {
		});
	    test( "Desert -> mountains", function(t) {
		});
	    test( "Desert -> shallows", function(t) {
		});
	    test( "Desert -> shallows with harbor", function(t) {
		});
	    test( "Desert -> deepsea", function(t) {
		});
	    test( "Desert -> deepsea with harbor", function(t) {
		});
	    test( "Woods -> lowlands", function(t) {
		});
	    test( "Woods -> lowlands on street", function(t) {
		});
	    test( "Woods -> lowlands in homeland", function(t) {
		});
	    test( "Woods -> lowlands on street in homeland", function(t) {
		});
	    test( "Woods -> desert", function(t) {
		});
	    test( "Woods -> desert on street", function(t) {
		});
	    test( "Woods -> desert in homeland", function(t) {
		});
	    test( "Woods -> desert on street in homeland", function(t) {
		});
	    test( "Woods -> woods", function(t) {
		});
	    test( "Woods -> woods on street", function(t) {
		});
	    test( "Woods -> woods in homeland", function(t) {
		});
	    test( "Woods -> woods on street in homeland", function(t) {
		});
	    test( "Woods -> swamp", function(t) {
		});
	    test( "Woods -> swamp on street", function(t) {
		});
	    test( "Woods -> swamp in homeland", function(t) {
		});
	    test( "Woods -> swamp on street in homeland", function(t) {
		});
	    test( "Woods -> hills", function(t) {
		});
	    test( "Woods -> hills on street", function(t) {
		});
	    test( "Woods -> hills in homeland", function(t) {
		});
	    test( "Woods -> hills on street in homeland", function(t) {
		});
	    test( "Woods -> highlands", function(t) {
		});
	    test( "Woods -> mountains", function(t) {
		});
	    test( "Woods -> shallows", function(t) {
		});
	    test( "Woods -> shallows with harbor", function(t) {
		});
	    test( "Woods -> deepsea", function(t) {
		});
	    test( "Woods -> deepsea with harbor", function(t) {
		});
	    test( "Swamp -> lowlands", function(t) {
		});
	    test( "Swamp -> lowlands on street", function(t) {
		});
	    test( "Swamp -> lowlands in homeland", function(t) {
		});
	    test( "Swamp -> lowlands on street in homeland", function(t) {
		});
	    test( "Swamp -> desert", function(t) {
		});
	    test( "Swamp -> desert on street", function(t) {
		});
	    test( "Swamp -> desert in homeland", function(t) {
		});
	    test( "Swamp -> desert on street in homeland", function(t) {
		});
	    test( "Swamp -> woods", function(t) {
		});
	    test( "Swamp -> woods on street", function(t) {
		});
	    test( "Swamp -> woods in homeland", function(t) {
		});
	    test( "Swamp -> woods on street in homeland", function(t) {
		});
	    test( "Swamp -> swamp", function(t) {
		});
	    test( "Swamp -> swamp on street", function(t) {
		});
	    test( "Swamp -> swamp in homeland", function(t) {
		});
	    test( "Swamp -> swamp on street in homeland", function(t) {
		});
	    test( "Swamp -> hills", function(t) {
		});
	    test( "Swamp -> hills on street", function(t) {
		});
	    test( "Swamp -> hills in homeland", function(t) {
		});
	    test( "Swamp -> hills on street in homeland", function(t) {
		});
	    test( "Swamp -> highlands", function(t) {
		});
	    test( "Swamp -> mountains", function(t) {
		});
	    test( "Swamp -> shallows", function(t) {
		});
	    test( "Swamp -> shallows with harbor", function(t) {
		});
	    test( "Swamp -> deepsea", function(t) {
		});
	    test( "Swamp -> deepsea with harbor", function(t) {
		});
	    test( "Hills -> lowlands", function(t) {
		});
	    test( "Hills -> lowlands on street", function(t) {
		});
	    test( "Hills -> lowlands in homeland", function(t) {
		});
	    test( "Hills -> lowlands on street in homeland", function(t) {
		});
	    test( "Hills -> desert", function(t) {
		});
	    test( "Hills -> desert on street", function(t) {
		});
	    test( "Hills -> desert in homeland", function(t) {
		});
	    test( "Hills -> desert on street in homeland", function(t) {
		});
	    test( "Hills -> woods", function(t) {
		});
	    test( "Hills -> woods on street", function(t) {
		});
	    test( "Hills -> woods in homeland", function(t) {
		});
	    test( "Hills -> woods on street in homeland", function(t) {
		});
	    test( "Hills -> swamp", function(t) {
		});
	    test( "Hills -> swamp on street", function(t) {
		});
	    test( "Hills -> swamp in homeland", function(t) {
		});
	    test( "Hills -> swamp on street in homeland", function(t) {
		});
	    test( "Hills -> hills", function(t) {
		});
	    test( "Hills -> hills on street", function(t) {
		});
	    test( "Hills -> hills in homeland", function(t) {
		});
	    test( "Hills -> hills on street in homeland", function(t) {
		});
	    test( "Hills -> highlands", function(t) {
		});
	    test( "Hills -> highlands on street", function(t) {
		});
	    test( "Hills -> highlands in homeland", function(t) {
		});
	    test( "Hills -> highlands on street in homeland", function(t) {
		});
	    test( "Hills -> mountains", function(t) {
		});
	    test( "Hills -> shallows", function(t) {
		});
	    test( "Hills -> deepsea", function(t) {
		});
	    test( "Highlands -> lowlands", function(t) {
		});
	    test( "Highlands -> desert", function(t) {
		});
	    test( "Highlands -> woods", function(t) {
		});
	    test( "Highlands -> swamp", function(t) {
		});
	    test( "Highlands -> hills", function(t) {
		});
	    test( "Highlands -> hills on street", function(t) {
		});
	    test( "Highlands -> hills in homeland", function(t) {
		});
	    test( "Highlands -> hills on street in homeland", function(t) {
		});
	    test( "Highlands -> highlands", function(t) {
		});
	    test( "Highlands -> highlands on street", function(t) {
		});
	    test( "Highlands -> highlands in homeland", function(t) {
		});
	    test( "Highlands -> highlands on street in homeland", function(t) {
		});
	    test( "Highlands -> mountains", function(t) {
		});
	    test( "Highlands -> shallows", function(t) {
		});
	    test( "Highlands -> deepsea", function(t) {
		});
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> lowlands with harbor", function(t) {
		});
	    test( "Shallows -> lowlands in homeland", function(t) {
		});
	    test( "Shallows -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> desert with harbor", function(t) {
		});
	    test( "Shallows -> desert in homeland", function(t) {
		});
	    test( "Shallows -> desert with harbor in homeland", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> woods with harbor", function(t) {
		});
	    test( "Shallows -> woods in homeland", function(t) {
		});
	    test( "Shallows -> woods with harbor in homeland", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> swamp with harbor", function(t) {
		});
	    test( "Shallows -> swamp in homeland", function(t) {
		});
	    test( "Shallows -> swamp with harbor in homeland", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor", function(t) {
		});
	    test( "Deepsea -> lowlands in homeland", function(t) {
		});
	    test( "Deepsea -> lowlands with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> desert with harbor", function(t) {
		});
	    test( "Deepsea -> desert in homeland", function(t) {
		});
	    test( "Deepsea -> desert with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> woods with harbor", function(t) {
		});
	    test( "Deepsea -> woods in homeland", function(t) {
		});
	    test( "Deepsea -> woods with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> swamp with harbor", function(t) {
		});
	    test( "Deepsea -> swamp in homeland", function(t) {
		});
	    test( "Deepsea -> swamp with harbor in homeland", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	});
	module( "Fleet" , function() {
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> shallows on coast", function(t) {
		});
	    test( "Shallows -> shallows on coast (distance two)", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Shallows -> deepsea on coast", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> shallows on coast", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	    test( "Deepsea -> deepsea on coast", function(t) {
		});
	});
	module( "Light Warships" , function() {
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> shallows on coast", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Shallows -> deepsea on coast", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> shallows on coast", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	    test( "Deepsea -> deepsea on coast", function(t) {
		});
	});
	module( "Heavy Warships" , function() {
	    test( "Shallows -> lowlands", function(t) {
		});
	    test( "Shallows -> desert", function(t) {
		});
	    test( "Shallows -> woods", function(t) {
		});
	    test( "Shallows -> swamp", function(t) {
		});
	    test( "Shallows -> hills", function(t) {
		});
	    test( "Shallows -> highlands", function(t) {
		});
	    test( "Shallows -> mountains", function(t) {
		});
	    test( "Shallows -> shallows", function(t) {
		});
	    test( "Shallows -> shallows on coast", function(t) {
		});
	    test( "Shallows -> deepsea", function(t) {
		});
	    test( "Shallows -> deepsea on coast", function(t) {
		});
	    test( "Deepsea -> lowlands", function(t) {
		});
	    test( "Deepsea -> desert", function(t) {
		});
	    test( "Deepsea -> woods", function(t) {
		});
	    test( "Deepsea -> swamp", function(t) {
		});
	    test( "Deepsea -> hills", function(t) {
		});
	    test( "Deepsea -> highlands", function(t) {
		});
	    test( "Deepsea -> mountains", function(t) {
		});
	    test( "Deepsea -> shallows", function(t) {
		});
	    test( "Deepsea -> shallows on coast", function(t) {
		});
	    test( "Deepsea -> deepsea", function(t) {
		});
	    test( "Deepsea -> deepsea on coast", function(t) {
		});
	});
});