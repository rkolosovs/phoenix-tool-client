function battleHandler(participants, x, y) {
	//participating armies
	this.unsortedArmies = participants;
	this.attackSide = [];
	this.defenseSide = [];
	//coordinates of the battle
	this.x = x;
	this.y = y;
	
	//UI elements to display armies of both sides
	this.attackList = document.getElementById("attackArmiesBox");
	this.unsortedList = document.getElementById("unsortedArmiesBox");
	this.defenseList = document.getElementById("defenseArmiesBox");
	//both boxes under the lists of troops
	this.attackTroopCount = document.getElementById("attackBattleSide");
	this.defenseTroopCount = document.getElementById("defenseBattleSide");
	//dice rolls
	this.attackDice = document.getElementById("attackDiceRoll");
	this.defenseDice = document.getElementById("defenseDiceRoll");
	
	this.attackSoldiers = 0;
	this.attackOfficers = 0;
	this.attackRiders = 0;
	this.attackGuardSoldiers = 0;
	this.attackGuardRiders = 0;
	
	this.attackShips = 0;
	this.attackLightWarships = 0;
	this.attackHeavyWarships = 0;
	this.attackGuardShips = 0;
	
	this.defenseSoldiers = 0;
	this.defenseOfficers = 0;
	this.defenseRiders = 0;
	this.defenseGuardSoldiers = 0;
	this.defenseGuardRiders = 0;
	
	this.defenseShips = 0;
	this.defenseLightWarships = 0;
	this.defenseHeavyWarships = 0;
	this.defenseGuardShips = 0;
	
	this.moveToAttack = function(i){
		var ctx = this;
		return function() {
			var t = ctx.unsortedArmies.splice(i,1);
			ctx.attackSide.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}
	
	this.moveToDefense = function(i){
		var ctx = this;
		return function() {
			var t = ctx.unsortedArmies.splice(i,1);
			ctx.defenseSide.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}
	
	this.removeFromDefense = function(i){
		var ctx = this;
		return function() {
			var t = ctx.defenseSide.splice(i,1);
			ctx.unsortedArmies.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}
	
	this.removeFromAttack = function(i){
		var ctx = this;
		return function() {
			var t = ctx.attackSide.splice(i,1);
			ctx.unsortedArmies.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}
	
	this.updateTroopCounts = function(){
		this.attackSoldiers = 0;
		this.attackOfficers = 0;
		this.attackRiders = 0;
		this.attackGuardSoldiers = 0;
		this.attackGuardRiders = 0;

		this.attackShips = 0;
		this.attackLightWarships = 0;
		this.attackHeavyWarships = 0;
		this.attackGuardShips = 0;
		
		this.defenseSoldiers = 0;
		this.defenseOfficers = 0;
		this.defenseRiders = 0;
		this.defenseGuardSoldiers = 0;
		this.defenseGuardRiders = 0;

		this.defenseShips = 0;
		this.defenseLightWarships = 0;
		this.defenseHeavyWarships = 0;
		this.defenseGuardShips = 0;
		var ctx = this;
		
		this.attackSide.forEach(function(item){
			if(item.a.armyId < 200 ) {//footman army
				if(item.a.isGuard){
					ctx.attackGuardSoldiers += item.a.count;
				} else {
					ctx.attackSoldiers += item.a.count;
				}
			} else if(item.a.armyId < 300) {//rider army
				if(item.a.isGuard){
					ctx.attackGuardRiders += item.a.count;
				} else {
					ctx.attackRiders += item.a.count;
				}
			} else if(item.a.armyId < 400) {//navy
				if(item.a.isGuard){
					ctx.attackGuardShips += item.a.count;
				} else {
					ctx.attackShips += item.a.count;
				}
				ctx.attackLightWarships += item.a.lkp;
				ctx.attackHeavyWarships += item.a.skp;
			}
			ctx.attackOfficers += item.a.leaders;
		});
		this.defenseSide.forEach(function(item){
			if(item.a.armyId < 200 ) {//footman army
				if(item.a.isGuard){
					ctx.defenseGuardSoldiers += item.a.count;
				} else {
					ctx.defenseSoldiers += item.a.count;
				}
			} else if(item.a.armyId < 300) {//rider army
				if(item.a.isGuard){
					ctx.defenseGuardRiders += item.a.count;
				} else {
					ctx.defenseRiders += item.a.count;
				}
			} else if(item.a.armyId < 400) {//navy
				if(item.a.isGuard){
					ctx.defenseGuardShips += item.a.count;
				} else {
					ctx.defenseShips += item.a.count;
				}
				ctx.defenseLightWarships += item.a.lkp;
				ctx.defenseHeavyWarships += item.a.skp;
			}
			ctx.defenseOfficers += item.a.leaders;
		});
	}
	
	this.updateDisplay = function(){
		this.attackList.innerHTML = "";
		this.attackSide.forEach(function(item, index){
			var listItem = document.createElement("DIV");
			this.attackList.appendChild(listItem);
			listItem.classList.add("armyListItem");

			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag()+" "+item.a.armyId;
			listItem.appendChild(div);
			
			var moveBtn = document.createElement("BUTTON");
			moveBtn.classList.add("armyListButton");
			moveBtn.classList.add("moveRightButton");
			moveBtn.onclick = this.removeFromAttack(index);
			listItem.appendChild(moveBtn);
		}, this);

		this.unsortedList.innerHTML = "";
		this.unsortedArmies.forEach(function(item, index){
			var listItem = document.createElement("DIV");
			this.unsortedList.appendChild(listItem);
			listItem.classList.add("armyListItem");
			
			var moveLeftBtn = document.createElement("BUTTON");
			moveLeftBtn.classList.add("armyListButton");
			moveLeftBtn.classList.add("moveLeftButton");
			moveLeftBtn.onclick = this.moveToAttack(index);
			listItem.appendChild(moveLeftBtn);

			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag()+" "+item.a.armyId;
			listItem.appendChild(div);

			var moveRightBtn = document.createElement("BUTTON");
			moveRightBtn.classList.add("armyListButton");
			moveRightBtn.classList.add("moveRightButton");
			moveRightBtn.onclick = this.moveToDefense(index);
			listItem.appendChild(moveRightBtn);
		}, this);

		this.defenseList.innerHTML = "";
		this.defenseSide.forEach(function(item, index){
			var listItem = document.createElement("DIV");
			this.defenseList.appendChild(listItem);
			listItem.classList.add("armyListItem");
			
			var moveBtn = document.createElement("BUTTON");
			moveBtn.classList.add("armyListButton");
			moveBtn.classList.add("moveLeftButton");
			moveBtn.onclick = this.removeFromDefense(index);
			listItem.appendChild(moveBtn);
			
			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag()+" "+item.a.armyId;
			listItem.appendChild(div);
		}, this);

		this.attackTroopCount.innerHTML = "";
		this.defenseTroopCount.innerHTML = "";
		if(this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 || 
				this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0){
			//naval combat
			if (this.attackShips > 0) {this.attackTroopCount.innerHTML += "<p>Shiffe: "+this.attackShips+"</p>";}
			if (this.attackGuardShips > 0) {this.attackTroopCount.innerHTML += "<p>Gardeschiffe: "+this.attackGuardShips+"</p>";}
			if (this.attackLightWarships > 0) {this.attackTroopCount.innerHTML += "<p>Leichte Kreigsschiffe: "+this.attackLightWarships+"</p>";}
			if (this.attackHeavyWarships > 0) {this.attackTroopCount.innerHTML += "<p>Schwere Kriegsschiffe: "+this.attackHeavyWarships+"</p>";}
			
			if (this.defenseShips > 0) {this.defenseTroopCount.innerHTML += "<p>Shiffe: "+this.defenseShips+"</p>";}
			if (this.defenseGuardShips > 0) {this.defenseTroopCount.innerHTML += "<p>Gardeschiffe: "+this.defenseGuardShips+"</p>";}
			if (this.defenseLightWarships > 0) {this.defenseTroopCount.innerHTML += "<p>Leichte Kreigsschiffe: "+this.defenseLightWarships+"</p>";}
			if (this.defenseHeavyWarships > 0) {this.defenseTroopCount.innerHTML += "<p>Schwere Kriegsschiffe: "+this.defenseHeavyWarships+"</p>";}
		} else { 
			//land combat
			if (this.attackSoldiers > 0) {this.attackTroopCount.innerHTML += "<p>Soldaten: "+this.attackSoldiers+"</p>";}
			if (this.attackRiders > 0) {this.attackTroopCount.innerHTML += "<p>Reiter: "+this.attackRiders+"</p>";}
			if (this.attackGuardSoldiers > 0) {this.attackTroopCount.innerHTML += "<p>Gardesoldaten: "+this.attackGuardSoldiers+"</p>";}
			if (this.attackGuardRiders > 0) {this.attackTroopCount.innerHTML += "<p>Gardereiter: "+this.attackGuardRiders+"</p>";}
				
			if (this.defenseSoldiers > 0) {this.defenseTroopCount.innerHTML += "<p>Soldaten: "+this.defenseSoldiers+"</p>";}
			if (this.defenseRiders > 0) {this.defenseTroopCount.innerHTML += "<p>Reiter: "+this.defenseRiders+"</p>";}
			if (this.defenseGuardSoldiers > 0) {this.defenseTroopCount.innerHTML += "<p>Gardesoldaten: "+this.defenseGuardSoldiers+"</p>";}
			if (this.defenseGuardRiders > 0) {this.defenseTroopCount.innerHTML += "<p>Gardereiter: "+this.defenseGuardRiders+"</p>";}
		}
		if (this.attackOfficers > 0) {this.attackTroopCount.innerHTML += "<p>Heerführer: "+this.attackOfficers+"</p>";}
		if (this.defenseOfficers > 0) {this.defenseTroopCount.innerHTML += "<p>Heerführer: "+this.defenseOfficers+"</p>";}
		
		this.attackTroopCount.innerHTML += "<p>Würfelwurf: "+this.attackDice.value+"</p>";
		this.defenseTroopCount.innerHTML += "<p>Würfelwurf: "+this.defenseDice.value+"</p>";
		
		//Instant result preview (remove if not desired)
		var battle = new schlacht(this.attackSide.map(function(val){return val.a;}), this.defenseSide.map(function(val){return val.a;}), null, null, this.x, this.y);
		battle.init();
		var result = battle.result([this.attackDice.value, this.defenseDice.value]);

		var footLosses = Math.round(result.footLosses);
		var cavLosses = Math.round(result.cavLosses);
		var fleetLosses = Math.round(result.fleetLosses); 
		var guardFootLosses = Math.round(result.gFootLosses);
		var guardCavLosses = Math.round(result.gCavLosses);
		var guardFleetLosses =  Math.round(result.gFleetLosses);
		if(result.victor === 'attacker'){
			if(battle.overrun1()) {
				this.defenseTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
			} else {
				this.defenseTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
				this.attackTroopCount.innerHTML = "";
				if(this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 || 
						this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0){
					//naval battle
					var lossProportion = ((result.fleetLosses+result.gFleetLosses)/(this.attackShips+this.attackGuardShips));
					var officerLosses = Math.round(lossProportion*this.attackOfficers);
					var lightWarshipLosses = Math.round(lossProportion*this.attackLightWarships);
					var heavyWarshipLosses = Math.round(lossProportion*this.attackHeavyWarships);
					if (this.attackShips > 0) {this.attackTroopCount.innerHTML += "<div>Schiffe: "+
						this.attackShips+"<div class=\"red inline\"> -"+ fleetLosses+"</div></div>";}
					if (this.attackGuardShips > 0) {this.attackTroopCount.innerHTML += "<div>Gardeschiffe: "+
						this.attackGuardShips+"<div class=\"red inline\"> -"+ guardFleetLosses+"</div></div>";}
					if (this.attackLightWarships > 0) {this.attackTroopCount.innerHTML += "<div>Leichte Kriegsschiffe: "+
						this.attackLightWarships+"<div class=\"red inline\"> -"+ lightWarshipLosses+"</div></div>";}
					if (this.attackHeavyWarships > 0) {this.attackTroopCount.innerHTML += "<div>Schwere Kriegsschiffe: "+
						this.attackHeavyWarships+"<div class=\"red inline\"> -"+ heavyWarshipLosses+"</div></div>";}
					if (this.attackOfficers > 0) {this.attackTroopCount.innerHTML += "<div>Heerführer: "+
						this.attackOfficers+"<div class=\"red inline\"> -"+ officerLosses+"</div></div>";}
				} else {
					//land battle
					var officerLosses = Math.round(((result.footLosses+result.cavLosses+result.gFootLosses+result.gCavLosses)/
							(this.attackSoldiers+this.attackRiders+this.attackGuardSoldiers+this.attackGuardRiders))*this.attackOfficers);
					if (this.attackSoldiers > 0) {this.attackTroopCount.innerHTML += "<div>Soldaten: "+
						this.attackSoldiers+"<div class=\"red inline\"> -"+footLosses+"</div></div>";}
					if (this.attackRiders > 0) {this.attackTroopCount.innerHTML += "<div>Reiter: "+
						this.attackRiders+"<div class=\"red inline\"> -"+ cavLosses+"</div></div>";}
					if (this.attackGuardSoldiers > 0) {this.attackTroopCount.innerHTML += "<div>Gardesoldaten: "+
						this.attackGuardSoldiers+"<div class=\"red inline\"> -"+guardFootLosses+"</div></div>";}
					if (this.attackGuardRiders > 0) {this.attackTroopCount.innerHTML += "<div>Gardereiter: "+
						this.attackGuardRiders+"<div class=\"red inline\"> -"+guardCavLosses+"</div></div>";}
					if (this.attackOfficers > 0) {this.attackTroopCount.innerHTML += "<div>Heerführer: "+
						this.attackOfficers+"<div class=\"red inline\"> -"+ officerLosses+"</div></div>";}
				}
			}
		} else if (result.victor === 'defender') {
			if(battle.overrun2()) {
				this.attackTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
			} else {
				this.attackTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
				this.defenseTroopCount.innerHTML = "";
				if(this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 || 
						this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0){
					//naval battle
					var lossProportion = ((result.fleetLosses+result.gFleetLosses)/(this.defenseShips+this.defenseGuardShips));
					var officerLosses = Math.round(lossProportion*this.defenseOfficers);
					var lightWarshipLosses = Math.round(lossProportion*this.defenseLightWarships);
					var heavyWarshipLosses = Math.round(lossProportion*this.defenseHeavyWarships);
					if (this.defenseShips > 0) {this.defenseTroopCount.innerHTML += "<div>Schiffe: "+
						this.defenseShips+"<div class=\"red inline\"> -"+ fleetLosses+"</div></div>";}
					if (this.defenseGuardShips > 0) {this.defenseTroopCount.innerHTML += "<div>Gardeschiffe: "+
						this.defenseGuardShips+"<div class=\"red inline\"> -"+ guardFleetLosses+"</div></div>";}
					if (this.defenseLightWarships > 0) {this.defenseTroopCount.innerHTML += "<div>Leichte Kriegsschiffe: "+
						this.defenseLightWarships+"<div class=\"red inline\"> -"+ lightWarshipLosses+"</div></div>";}
					if (this.defenseHeavyWarships > 0) {this.defenseTroopCount.innerHTML += "<div>Schwere Kriegsschiffe: "+
						this.defenseHeavyWarships+"<div class=\"red inline\"> -"+ heavyWarshipLosses+"</div></div>";}
					if (this.defenseOfficers > 0) {this.defenseTroopCount.innerHTML += "<div>Heerführer: "+
						this.defenseOfficers+"<div class=\"red inline\"> -"+ officerLosses+"</div></div>";}
				} else {
					//land battle
					var officerLosses = Math.round(((result.footLosses+result.cavLosses+result.gFootLosses+result.gCavLosses)/
							(this.defenseSoldiers+this.defenseRiders+this.defenseGuardSoldiers+this.defenseGuardRiders))*this.defenseOfficers);
					if (this.defenseSoldiers > 0) {this.defenseTroopCount.innerHTML += "<div>Soldaten: "+
						this.defenseSoldiers+"<div class=\"red inline\"> -"+footLosses+"</div></div>";}
					if (this.defenseRiders > 0) {this.defenseTroopCount.innerHTML += "<div>Reiter: "+
						this.defenseRiders+"<div class=\"red inline\"> -"+ cavLosses+"</div></div>";}
					if (this.defenseGuardSoldiers > 0) {this.defenseTroopCount.innerHTML += "<div>Gardesoldaten: "+
						this.defenseGuardSoldiers+"<div class=\"red inline\"> -"+guardFootLosses+"</div></div>";}
					if (this.defenseGuardRiders > 0) {this.defenseTroopCount.innerHTML += "<div>Gardereiter: "+
						this.defenseGuardRiders+"<div class=\"red inline\"> -"+guardCavLosses+"</div></div>";}
					if (this.defenseOfficers > 0) {this.defenseTroopCount.innerHTML += "<div>Heerführer: "+
						this.defenseOfficers+"<div class=\"red inline\"> -"+ officerLosses+"</div></div>";}
				}
			}
		}
	}
	
	this.resolve = function(){
		var battle = new schlacht(this.attackSide.map(function(val){return val.a;}), this.defenseSide.map(function(val){return val.a;}), null, null, this.x, this.y);
		battle.init();
		if(battle.overrun1()) {
			this.attackSide.forEach(function(item){
				item.remainingMovePoints -= 7;
			});
			this.defenseSide.forEach(function(item){
				var army = item.a;
				army.count = 0;
				army.leaders = 0;
				army.lkp = 0;
				army.skp = 0;
				army.mounts = 0;
			});
		} else if(battle.overrun2()) {
			this.defenseSide.forEach(function(item){
				item.remainingMovePoints -= 7;
			});
			this.attackSide.forEach(function(item){
				var army = item.a;
				army.count = 0;
				army.leaders = 0;
				army.lkp = 0;
				army.skp = 0;
				army.mounts = 0;
			});
		} else {
			var result = battle.result([this.attackDice.value, this.defenseDice.value]);
			if(result.victor === 'attacker'){
				//wipe the looser out
				this.defenseSide.forEach(function(item){
					var army = item.a;
					army.count = 0;
					army.leaders = 0;
					army.lkp = 0;
					army.skp = 0;
					army.mounts = 0;
				});
				//null move points of the victor and inflict losses
				this.attackSide.forEach(function(item){
					var army = item.a;
					item.remainingMovePoints = 0;
					if(army.armyId < 200 && army.armyId > 0){ //TODO
						army.decimate((army.count/this.attackSoldiers)*result.footLosses);
					} else if(army.armyId < 300 && army.armyId > 200){
						army.decimate((army.count/this.attackRiders)*result.cavLosses);
					} else if(army.armyId < 400 && army.armyId > 300){
						army.decimate((army.count/this.attackShips)*result.fleetLosses);
					}
				}, this);
			} else if(result.victor === 'defender'){
				//wipe the looser out
				this.attackSide.forEach(function(item){
					var army = item.a;
					army.count = 0;
					army.leaders = 0;
					army.lkp = 0;
					army.skp = 0;
					army.mounts = 0;
				});
				//null move points of the victor and inflict losses
				this.defenseSide.forEach(function(item){
					var army = item.a;
					item.remainingMovePoints = 0;
					if(army.armyId < 200 && army.armyId > 0){ //TODO
						army.decimate((army.count/this.defenseSoldiers)*result.footLosses);
					} else if(army.armyId < 300 && army.armyId > 200){
						army.decimate((army.count/this.defenseRiders)*result.cavLosses);
					} else if(army.armyId < 400 && army.armyId > 300){
						army.decimate((army.count/this.defenseShips)*result.fleetLosses);
					}
				},this);
			} else {
				//TODO: Revisit once the schlacht.result(dice1, dice2) returns proper values for a tie
			}
		}
		checkArmiesForLiveliness();
	}
}

// Battle, armiesAttack: Array der angreifenden Armeen, armiesDefend: Array der Verteidigenden Armeen 
// Immer zu erst init()
// TODO: Gelaende und unterstuetzung, Flotten
// TODO: Kommentare aktualisieren!
// TODO: Bessere variabelnamen!!!
// attackingarmies[], defendingarmies[]
function schlacht(armiesAttack, armiesDefend, chars1, chars2, posX, posY) {
    this.a1 = new heer(0,0,0,0,0,0,false);	// Fußheer Angreifer
    this.a2 = new heer(0,0,0,0,0,0,false);	// Fußheer Verteidiger
    this.ma1 = new reiterHeer(0,0,0,false);	// Reiterheer Angreifer
    this.ma2 = new reiterHeer(0,0,0,false);	// Reiterheer Verteidiger
	this.fa1 = new seeHeer(0,0,0,0,0,false); // Flotte Angreifer NOCH NICHT UNTERSTÜTZT
	this.fa2 = new seeHeer(0,0,0,0,0,false); // Flotte Verteidiger NOCH NICHT UNTERSTÜTZT
    this.g1 = new heer(0,0,0,0,0,0,true);	// Garde Angreifer
    this.g2 = new heer(0,0,0,0,0,0,true);	// Garde Verteidiger
    this.mg1 = new reiterHeer(0,0,0,true);	// ReiterGarde Angreifer
    this.mg2 = new reiterHeer(0,0,0,true);	// ReiterGarde Verteidiger
	this.fg1 = new seeHeer(0,0,0,0,0,true); // Gardeflotte Angreifer NOCH NICHT UNTERSTÜTZT
	this.fg2 = new seeHeer(0,0,0,0,0,true); // Gardeflotte Verteidiger NOCH NICHT UNTERSTÜTZT
	this.armiesAttack = armiesAttack;
	this.armiesDefend = armiesDefend;
    this.c1 = chars1;
    this.c2 = chars2;
    this.x = posX;
    this.y = posY;
	this.init = function(){
		if(this.armiesAttack.length > 0){
			for(var i=0; i < this.armiesAttack.length; i++){
				if(!this.armiesAttack[i].isGuard){
					if(Math.floor(this.armiesAttack[i].armyId/100) === 1){
						this.a1.addSoldiers(this.armiesAttack[i].count);
						this.a1.addLeaders(this.armiesAttack[i].leaders);
						this.a1.addLkp(this.armiesAttack[i].lkp);
						this.a1.addSkp(this.armiesAttack[i].skp);
					} else if(Math.floor(this.armiesAttack[i].armyId/100) === 2){
						this.ma1.addSoldiers(this.armiesAttack[i].count);
						this.ma1.addLeaders(this.armiesAttack[i].leaders);
					} else if(Math.floor(this.armiesAttack[i].armyId/100) === 3){
						this.fa1.addSoldiers(this.armiesAttack[i].count);
						this.fa1.addLeaders(this.armiesAttack[i].leaders);
						this.fa1.addLkp(this.armiesAttack[i].lkp);
						this.fa1.addSkp(this.armiesAttack[i].skp);
					}
				} else if(this.armiesAttack[i].isGuard){
					if(Math.floor(this.armiesAttack[i].armyId/100) === 1){
						this.g1.addSoldiers(this.armiesAttack[i].count);
						this.g1.addLeaders(this.armiesAttack[i].leaders);
						this.g1.addLkp(this.armiesAttack[i].lkp);
						this.g1.addSkp(this.armiesAttack[i].skp);
					} else if(Math.floor(this.armiesAttack[i].armyId/100) === 2){
						this.mg1.addSoldiers(this.armiesAttack[i].count);
						this.mg1.addLeaders(this.armiesAttack[i].leaders);
					} else if(Math.floor(this.armiesAttack[i].armyId/100) === 3){
						this.fg1.addSoldiers(this.armiesAttack[i].count);
						this.fg1.addLeaders(this.armiesAttack[i].leaders);
						this.fg1.addLkp(this.armiesAttack[i].lkp);
						this.fg1.addSkp(this.armiesAttack[i].skp);
					}
				}
			}
		}
		if(this.armiesDefend.length > 0){
			for(var i=0; i < this.armiesDefend.length; i++){
				if(!this.armiesDefend[i].isGuard){
					if(Math.floor(this.armiesDefend[i].armyId/100) === 1){
						this.a2.addSoldiers(this.armiesDefend[i].count);
						this.a2.addLeaders(this.armiesDefend[i].leaders);
						this.a2.addLkp(this.armiesDefend[i].lkp);
						this.a2.addSkp(this.armiesDefend[i].skp);
					} else if(Math.floor(this.armiesDefend[i].armyId/100) === 2){
						this.ma2.addSoldiers(this.armiesDefend[i].count);
						this.ma2.addLeaders(this.armiesDefend[i].leaders);
					} else if(Math.floor(this.armiesDefend[i].armyId/100) === 3){
						this.fa2.addSoldiers(this.armiesDefend[i].count);
						this.fa2.addLeaders(this.armiesDefend[i].leaders);
						this.fa2.addLkp(this.armiesDefend[i].lkp);
						this.fa2.addSkp(this.armiesDefend[i].skp);
					}
				} else if(this.armiesDefend[i].isGuard){
					if(Math.floor(this.armiesDefend[i].armyId/100) === 1){
						this.g2.addSoldiers(this.armiesDefend[i].count);
						this.g2.addLeaders(this.armiesDefend[i].leaders);
						this.g2.addLkp(this.armiesDefend[i].lkp);
						this.g2.addSkp(this.armiesDefend[i].skp);
					} else if(Math.floor(this.armiesDefend[i].armyId/100) === 2){
						this.mg2.addSoldiers(this.armiesDefend[i].count);
						this.mg2.addLeaders(this.armiesDefend[i].leaders);
					} else if(Math.floor(this.armiesDefend[i].armyId/100) === 3){
						this.fg2.addSoldiers(this.armiesDefend[i].count);
						this.fg2.addLeaders(this.armiesDefend[i].leaders);
						this.fg2.addLkp(this.armiesDefend[i].lkp);
						this.fg2.addSkp(this.armiesDefend[i].skp);
					}
				}
			}
		}
	}

	this.fieldType = function(){
		var battleField = new showHex(this.x,this.y);
		return battleField.fieldType();
	}

    this.charGp1 = function(){
       if(this.c1 === null){
           return 0;
       } else {
           var cLen = c1.length;
           var sum = 0;
           for (var i = 0; i<cLen; i++){
               sum += c1[i].gp;
           }
           return sum;
       }
    }
    
    this.charGp2 = function(){
       if(this.c2 === null){
           return 0;
       } else {
           var cLen = c2.length;
           var sum = 0;
           for (var i = 0; i<cLen; i++){
               sum += c2[i].gp;
           }
           return sum;
       }
    }
    
    // 10:1 ?
    this.overrun1 = function() {
    	return ((this.a1.count + this.ma1.count*2 + this.g1.count + this.mg1.count*2) > 0 && 
		(this.a1.count + this.ma1.count*2 + this.g1.count + this.mg1.count*2) >= ((this.a2.count + this.ma2.count*2)*10) && 
		(this.g2.count === 0) && (this.mg2.count === 0)) || 
		((this.fa1.count*100 + this.fg1.count*100) > 0 && 
		(this.fa1.count*100 + this.fg1.count*100) >= (10 * this.fa2.count*100) &&
		this.fg2.count === 0);
    }
    
    this.overrun2 = function() {
    	return (this.a2.count + this.ma2.count*2 + this.g2.count + this.mg2.count*2) > 0 && 
		(this.a2.count + this.ma2.count*2 + this.g2.count + this.mg2.count*2) >= ((this.a1.count + this.ma1.count*2)*10) && 
    	(this.g1.count === 0) && (this.mg1.count === 0) || 
		((this.fa2.count*100 + this.fg2.count*100) > 0 && 
		(this.fa2.count*100 + this.fg2.count*100) >= (10 * this.fa1.count*100) &&
		this.fg1.count === 0);
    }

    // Kampfergebnis in Form {victor: <'attacker', 'defender', 'tie'>, footLosses: <int>, cavLosses: <int>}, 
    // {victor: 'tie', footLosses: <viel>, cavLosses: <viel>} falls unentschieden.
    this.result = function(dicerolls) {
		if(this.overrun1()){
			console.log("Attacker Overrun");
			console.log("----------------------------------------------------------");
			return({victor: 'attacker', footLosses: 0, cavLosses: 0, gFootLosses: 0, gCavLosses: 0});
		} else if(this.overrun2()){
			console.log("Defender Overrun");
			console.log("----------------------------------------------------------");
			return({victor: 'defender', footLosses: 0, cavLosses: 0, gFootLosses: 0, gCavLosses: 0});
		}
		var troopAdvantage = 0;
		var riderAdvantage = 0;
		var battleFieldType = this.fieldType();
		switch (battleFieldType){
			case 2:
			case 4:
			case 7: riderAdvantage = 1; break;
			case 3:
			case 5:
			case 6:
			case 8: troopAdvantage = 1; break;
		}
        var power1 = this.a1.count * (1 + (this.a1.leaderGp() + 140 * troopAdvantage + this.charGp1() + dicerolls[0])/200) +
		 this.g1.count * (1 + (this.g1.leaderGp() + 140 * troopAdvantage + this.charGp1() + dicerolls[0])/200) +
		 this.ma1.count * 2 * (1 + (this.ma1.leaderGp() + 140 * riderAdvantage + this.charGp1() + dicerolls[0])/200) +
		 this.mg1.count * 2 * (1 + (this.mg1.leaderGp() + 140 * riderAdvantage + this.charGp1() + dicerolls[0])/200) +
		 this.fa1.count * 100 * (1 + (this.fa1.leaderGp() + this.charGp1() + dicerolls[0])/200) +
		 this.fg1.count * 100 * (1 + (this.fg1.leaderGp() + this.charGp1() + dicerolls[0])/200);
        var power2 = this.a2.count * (1 + (this.a2.leaderGp() + 140 * troopAdvantage + this.charGp2() + dicerolls[1])/200) +
		 this.g2.count * (1 + (this.g2.leaderGp() + 140 * troopAdvantage + this.charGp1() + dicerolls[0])/200) +
		 this.mg2.count * 2 * (1 + (this.mg2.leaderGp() + 140 * riderAdvantage + this.charGp1() + dicerolls[0])/200) +
		 this.ma2.count * 2 * (1 + (this.ma2.leaderGp() + 140 * riderAdvantage + this.charGp2() + dicerolls[1])/200) +
		 this.fa2.count * 100 * (1 + (this.fa2.leaderGp() + this.charGp1() + dicerolls[0])/200) +
		 this.fg2.count * 100 * (1 + (this.fg2.leaderGp() + this.charGp1() + dicerolls[0])/200);
        var countSum1 = this.a1.count + this.ma1.count * 2 + this.fa1.count * 100 + this.g1.count + this.mg1.count * 2 + this.fg1.count * 100;
        var countSum2 = this.a2.count + this.ma2.count * 2 + this.fa2.count * 100 + this.g2.count + this.mg2.count * 2 + this.fg2.count * 100;
        console.log("power Angreifer = " + power1);
        console.log("power Verteidiger = " + power2);
        console.log("anzahl Angreifer = " + countSum1);
        console.log("anzahl Verteidiger = " + countSum2);
        var gpSchnitt = ((power1 + power2) / (countSum1 + countSum2) -1) * 100;
        console.log(gpSchnitt);
        if(power1 > power2){
			console.log("Angreifer gewinnt:");
        	// Angreifer gewinnt:
            var factor = 0;
            if(countSum1 > countSum2){
                factor = ((countSum2 - countSum1)/10)/countSum2-0.1;
                var verluste = countSum2 * (1 + factor);
            } else if(countSum2 > countSum1){
                factor = ((countSum2 - countSum1)/10)/countSum1+0.1;
                var verluste = countSum2 * (1 + factor);
            } else {
                var verluste = countSum2;
            }
			console.log("Faktor: " + factor);
            console.log("Verluste: " + verluste);
            var gpDiffHeer = ((this.a1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100;
            var gpDiffReiter = ((this.ma1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100;
            var gpDiffFlotte = ((this.fa1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100;
            var gpDiffGardeHeer = ((this.g1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100;
            var gpDiffGardeReiter = ((this.mg1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100;
            var gpDiffGardeFlotte = ((this.fg1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100;
            var verlusteHeer = this.a1.count/countSum1 * verluste;
            var verlusteReiter = this.ma1.count*2/countSum1 * verluste;
            var verlusteFlotte = this.fa1.count*100/countSum1 * verluste;
            var verlusteGardeHeer = this.g1.count/countSum1 * verluste;
            var verlusteGardeReiter = this.mg1.count*2/countSum1 * verluste;
            var verlusteGardeFlotte = this.fg1.count*100/countSum1 * verluste;
            if(gpDiffHeer >= 0){
                verlusteHeer = verlusteHeer/(1+gpDiffHeer);
            } else {
                verlusteHeer = verlusteHeer*(1-gpDiffHeer);
            }
            if(gpDiffReiter >= 0){
                verlusteReiter = verlusteReiter/(1+gpDiffReiter);
            } else {
                verlusteReiter = verlusteReiter*(1-gpDiffReiter);
            }
            if(gpDiffFlotte >= 0){
                verlusteFlotte = verlusteFlotte/(1+gpDiffFlotte);
            } else {
                verlusteFlotte = verlusteFlotte*(1-gpDiffFlotte);
            }
            if(gpDiffGardeHeer >= 0){
                verlusteGardeHeer = verlusteGardeHeer/(1+gpDiffGardeHeer)
            } else {
                verlusteGardeHeer = verlusteGardeHeer*(1-gpDiffGardeHeer)
            }
            if(gpDiffGardeReiter >= 0){
                verlusteGardeReiter = verlusteGardeReiter/(1+gpDiffGardeReiter)
            } else {
                verlusteGardeReiter = verlusteGardeReiter*(1-gpDiffGardeReiter)
            }
            if(gpDiffGardeFlotte >= 0){
                verlusteGardeFlotte = verlusteGardeFlotte/(1+gpDiffGardeFlotte)
            } else {
                verlusteGardeFlotte = verlusteGardeFlotte*(1-gpDiffGardeFlotte)
            }
            // gewonnen?, anzahl Verluste Heer, Reiter, gardeHeer, gardeReiter
            var results = {victor: 'attacker', footLosses: verlusteHeer, cavLosses: verlusteReiter, fleetLosses: verlusteFlotte, 
			gFootLosses: verlusteGardeHeer, gCavLosses: verlusteGardeReiter, gFleetLosses: verlusteGardeFlotte};
			console.log("----------------------------------------------------------");
            return results;
        } else if(power2 > power1){
            console.log("Verteidiger gewinnt:");
            // Verteidiger gewinnt:
            var factor = 0;
            if(countSum2 > countSum1){
                factor = ((countSum1 - countSum2)/10)/countSum1-0.1;
                var verluste = countSum1 * (1 + factor);
            } else if(countSum1 > countSum2){
                factor = ((countSum1 - countSum2)/10)/countSum2+0.1;
                var verluste = countSum1 * (1 + factor);
            } else {
                var verluste = countSum1;
            }
			console.log("Faktor: " + factor);
            console.log("Verluste: " + verluste);
            var gpDiffHeer = ((this.a2.leaderGp() + this.charGp2() + dicerolls[1])/2 - gpSchnitt)/100
            var gpDiffReiter = ((this.ma2.leaderGp() + this.charGp2() + dicerolls[1])/2 - gpSchnitt)/100
            var gpDiffFlotte = ((this.fa2.leaderGp() + this.charGp2() + dicerolls[1])/2 - gpSchnitt)/100
            var gpDiffGardeHeer = ((this.g2.leaderGp() + this.charGp2() + dicerolls[1])/2 - gpSchnitt)/100
            var gpDiffGardeReiter = ((this.mg2.leaderGp() + this.charGp2() + dicerolls[1])/2 - gpSchnitt)/100
            var gpDiffGardeFlotte = ((this.fg2.leaderGp() + this.charGp2() + dicerolls[1])/2 - gpSchnitt)/100
            var verlusteHeer = this.a2.count/countSum2 * verluste;
            var verlusteReiter = this.ma2.count*2/countSum2 * verluste;
            var verlusteFlotte = this.fa2.count*100/countSum2 * verluste;
            var verlusteGardeHeer = this.g2.count/countSum2 * verluste;
            var verlusteGardeReiter = this.mg2.count*2/countSum2 * verluste;
            var verlusteGardeFlotte = this.fg2.count*100/countSum2 * verluste;
            if(gpDiffHeer >= 0){
                verlusteHeer = verlusteHeer/(1+gpDiffHeer);
            } else {
                verlusteHeer = verlusteHeer*(1-gpDiffHeer);
            }
            if(gpDiffReiter >= 0){
                verlusteReiter = verlusteReiter/(1+gpDiffReiter);
            } else {
                verlusteReiter = verlusteReiter*(1-gpDiffReiter);
            }
            if(gpDiffFlotte >= 0){
                verlusteFlotte = verlusteFlotte/(1+gpDiffFlotte);
            } else {
                verlusteFlotte = verlusteFlotte*(1-gpDiffFlotte);
            }
            if(gpDiffGardeHeer >= 0){
                verlusteGardeHeer = verlusteGardeHeer/(1+gpDiffGardeHeer)
            } else {
                verlusteGardeHeer = verlusteGardeHeer*(1-gpDiffGardeHeer)
            }
            if(gpDiffGardeReiter >= 0){
                verlusteGardeReiter = verlusteGardeReiter/(1+gpDiffGardeReiter)
            } else {
                verlusteGardeReiter = verlusteGardeReiter*(1-gpDiffGardeReiter)
            }
            if(gpDiffGardeFlotte >= 0){
                verlusteGardeFlotte = verlusteGardeFlotte/(1+gpDiffGardeFlotte)
            } else {
                verlusteGardeFlotte = verlusteGardeFlotte*(1-gpDiffGardeFlotte)
            }
            // gewonnen?, anzahl Verluste Heer, Reiter, gardeHeer, gardeReiter
            var results = {victor: 'defender', footLosses: verlusteHeer, cavLosses: verlusteReiter, fleetLosses: verlusteFlotte, 
			gFootLosses: verlusteGardeHeer, gCavLosses: verlusteGardeReiter, gFleetLosses: verlusteGardeFlotte};
			console.log("----------------------------------------------------------");
            return results;
        } else if(power1 === power2){
            // unentschieden:
			console.log("----------------------------------------------------------");
			//TODO: The losses seem to be missing. This is not {'tie', <lot>, <lot>}.
            return {victor: 'tie', footLosses: null, cavLosses: null};
        }
    }
}
// TODO schiffskampf

// array der Würfelergebnisse leichte, array der Würfelergebnisse schwere, badConditions("far"/"farAndUp"/"high"/null), 
// schießende Armee, ziel Armee, Charaktere und Zauberer auf dem Zielfeld
// TODO rüstorte vermindern Schaden
function fernkampf(dicerollsL, dicerollsS, badConditions, shooter, target, chars) {
    var charGpSum = 0;      
    if(chars != null){
        var cLen = chars.length;
        for (var i = 0; i<cLen; i++){
            charGpSum += chars[i].gp;
        }
    }
    target.takeFire((shooter.fireLkp(dicerollsL, badConditions) + shooter.fireSkp(dicerollsS, badConditions))/(1+(target.leaderGp()+charGpSum)/100));
}

// the splitArmy funtion of the split box
// TODO: If the army has moved, set the new split army's move points to the appropriate, non-max value.
function splitSelectedArmy(){
	if(login == 'guest')
	{
		window.alert("Zuschauer haben keine Rechte.");
		return false;
	}
	var toSplit = 0;
	var leadersToSplit = 0;
	var mountsToSplit = 0;
	var lkpToSplit = 0;
	var skpToSplit = 0;
	// depending on army type different fields are needed
	if(listOfArmyCoordinates[selectedArmy].a.armyType() == 1)
	{
		toSplit = parseInt(document.getElementById("splitInput").value);
		leadersToSplit = parseInt(document.getElementById("splitLeadersInput").value);
		mountsToSplit = parseInt(document.getElementById("splitMountsInput").value);
		lkpToSplit = parseInt(document.getElementById("splitLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitSkpInput").value);
		if(toSplit > (listOfArmyCoordinates[selectedArmy].a.count-100))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if(toSplit < 100)
		{
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden.")
			return false;
		}
		if(mountsToSplit > listOfArmyCoordinates[selectedArmy].a.mounts)
		{
			window.alert("So viele Reittiere hast du nicht.")
			return false;
		}
		if(lkpToSplit > listOfArmyCoordinates[selectedArmy].a.lkp)
		{
			window.alert("So viele leichte Katapulte hast du nicht.")
			return false;
		}
		if(skpToSplit > listOfArmyCoordinates[selectedArmy].a.skp)
		{
			window.alert("So viele schwere Katapulte hast du nicht.")
			return false;
		}
	}
	else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 2)
	{
		toSplit = parseInt(document.getElementById("splitMountedInput").value);
		leadersToSplit = parseInt(document.getElementById("splitMountedLeadersInput").value);
		if(toSplit > (listOfArmyCoordinates[selectedArmy].a.count-50))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if(toSplit < 50)
		{
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (50 Reiter)")
			return false;
		}
	}
	else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 3)
	{
		toSplit = parseInt(document.getElementById("splitFleetInput").value);
		leadersToSplit = parseInt(document.getElementById("splitFleetLeadersInput").value);
		lkpToSplit = parseInt(document.getElementById("splitFleetLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitFleetSkpInput").value);
		if(toSplit > (listOfArmyCoordinates[selectedArmy].a.count-1))
		{
			window.alert("Es müssen mindestens 100 Heeresstärke beim Ursprungsheer verbleiben.")
			return false;
		}
		if(toSplit*100 > (listOfArmyCoordinates[selectedArmy].a.currentCapacity()))
		{
			window.alert("Du kannst keine beladenen Schiffe abspalten.")
			return false;
		}
		if(toSplit < 1)
		{
			window.alert("Es müssen mindestens 100 Heeresstärke abgespalten werden. (1 Schiff)")
			return false;
		}
		if(lkpToSplit > listOfArmyCoordinates[selectedArmy].a.lkp)
		{
			window.alert("So viele leichte Kriegsschiffe hast du nicht.")
			return false;
		}
		if(skpToSplit > listOfArmyCoordinates[selectedArmy].a.skp)
		{
			window.alert("So viele schwere Kriegsschiffe hast du nicht.")
			return false;
		}
	}
	if(leadersToSplit > (listOfArmyCoordinates[selectedArmy].a.leaders-1))
	{
		window.alert("Es muss mindestens 1 Heerführer beim Ursprungsheer verbleiben.")
		return false;
	}
	if(leadersToSplit < 1)
	{
		window.alert("Es muss mindestens 1 Heerführer abgespalten werden.")
		return false;
	}
	if(listOfArmyCoordinates[selectedArmy].a.armyType() == 1)
	{
		var newArmyId = generateArmyId(1,listOfArmyCoordinates[selectedArmy].owner);
		var newArmy = new heer(newArmyId, toSplit, leadersToSplit, lkpToSplit, skpToSplit, mountsToSplit, false);
		var newArmyCoordinates = new armyCoordinates(newArmy, listOfArmyCoordinates[selectedArmy].x, listOfArmyCoordinates[selectedArmy].y, listOfArmyCoordinates[selectedArmy].owner);
		listOfArmyCoordinates.push(newArmyCoordinates);
		listOfArmyCoordinates[selectedArmy].a.removeSoldiers(toSplit);
		listOfArmyCoordinates[selectedArmy].a.removeLeaders(leadersToSplit);
		listOfArmyCoordinates[selectedArmy].a.removeLkp(lkpToSplit);
		listOfArmyCoordinates[selectedArmy].a.removeSkp(skpToSplit);
		listOfArmyCoordinates[selectedArmy].a.removeMounts(mountsToSplit);
		if(login != 'sl')
		{
			preparedEvents.push({
				type: "split", content: {
					fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
					realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: lkpToSplit,
					skp: skpToSplit,
					mounts: mountsToSplit,
					x: listOfArmyCoordinates[selectedArmy].x,
					y: listOfArmyCoordinates[selectedArmy].y,
					newArmysId: newArmyId
				}
			});
		}
		
	}
	if(listOfArmyCoordinates[selectedArmy].a.armyType() == 2)
	{
		var newArmy = new reiterHeer(generateArmyId(2,listOfArmyCoordinates[selectedArmy].owner), toSplit, leadersToSplit, false);
		var newArmyCoordinates = new armyCoordinates(newArmy, listOfArmyCoordinates[selectedArmy].x, listOfArmyCoordinates[selectedArmy].y, listOfArmyCoordinates[selectedArmy].owner);
		listOfArmyCoordinates.push(newArmyCoordinates);
		listOfArmyCoordinates[selectedArmy].a.removeSoldiers(toSplit);
		listOfArmyCoordinates[selectedArmy].a.removeLeaders(leadersToSplit);
		if(login != 'sl')
		{
			preparedEvents.push({
				type: "split", content: {
					fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
					realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: 0,
					skp: 0,
					mounts: 0,
					x: listOfArmyCoordinates[selectedArmy].x,
					y: listOfArmyCoordinates[selectedArmy].y,
					newArmysId: newArmyId
				}
			});
		}
	}
	if(listOfArmyCoordinates[selectedArmy].a.armyType() == 3)
	{
		var newArmy = new seeHeer(generateArmyId(3,listOfArmyCoordinates[selectedArmy].owner), toSplit, leadersToSplit, lkpToSplit, skpToSplit, false);
		var newArmyCoordinates = new armyCoordinates(newArmy, listOfArmyCoordinates[selectedArmy].x, listOfArmyCoordinates[selectedArmy].y, listOfArmyCoordinates[selectedArmy].owner);
		listOfArmyCoordinates.push(newArmyCoordinates);
		listOfArmyCoordinates[selectedArmy].a.removeSoldiers(toSplit);
		listOfArmyCoordinates[selectedArmy].a.removeLeaders(leadersToSplit);
		listOfArmyCoordinates[selectedArmy].a.removeLkp(lkpToSplit);
		listOfArmyCoordinates[selectedArmy].a.removeSkp(skpToSplit);
		if(login != 'sl')
		{
			preparedEvents.push({
				type: "split", content: {
					fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
					realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
					troops: toSplit,
					leaders: leadersToSplit,
					lkp: lkpToSplit,
					skp: skpToSplit,
					mounts: 0,
					x: listOfArmyCoordinates[selectedArmy].x,
					y: listOfArmyCoordinates[selectedArmy].y,
					newArmysId: newArmyId
				}
			});
		}
	}
	restoreInfoBox();
	updateInfoBox();
}

// the mount function of the mount box
//TODO: If the army has moved, set the new mounted army's move points to the apropriate, non-max value.
function mount(){
	var toMount = document.getElementById("mountInput").value;
	var leadersToMount = document.getElementById("mountLeaderInput").value;
	// genug Truppen vorhanden?
	if(toMount > listOfArmyCoordinates[selectedArmy].a.count)
	{
		window.alert("Du hast zu wenige Truppen zum aufsitzen")
		return false;
	// genug Reittiere vorhanden?

	} 
	else if(toMount > listOfArmyCoordinates[selectedArmy].a.mounts)
	{
		window.alert("Du hast zu wenige Reittiere zum aufsitzen")
		return false;
		// Sitzen alle auf?
	} 
	else if((toMount == listOfArmyCoordinates[selectedArmy].a.count))
	{
		// neues Reiterheer mit generierter Id an selben Koordinaten
		var newArmy = new reiterHeer(generateArmyId(2,listOfArmyCoordinates[selectedArmy].owner), toMount, listOfArmyCoordinates[selectedArmy].a.leaders, listOfArmyCoordinates[selectedArmy].a.isGuard);
		// Nachricht, falls Katapulte vorhanden waren.
		if(listOfArmyCoordinates[selectedArmy].a.skp > 0 || listOfArmyCoordinates[selectedArmy].a.lkp > 0){
			window.alert("Da kein Fußheer mehr Bestehen bleibt, wurden die Katapulte zerstört.")
		}
		// in listOfArmyCoordinates einfügen und alte Armee löschen, ist dann automatisch selectedArmy
		var newArmyCoordinates = new armyCoordinates(newArmy,listOfArmyCoordinates[selectedArmy].x,listOfArmyCoordinates[selectedArmy].y ,listOfArmyCoordinates[selectedArmy].owner);
		listOfArmyCoordinates.push(newArmyCoordinates);
		if(listOfArmyCoordinates[selectedArmy].multiArmyField === true){
			addToMultifield(listOfArmyCoordinates[selectedArmy], newArmyCoordinates);
			deleteFromMultifield(listOfArmyCoordinates[selectedArmy]);
		}
		deleteSelectedArmy();
		restoreInfoBox();
		updateInfoBox();
		// genug Heerführer?
	} 
	else if(leadersToMount >= listOfArmyCoordinates[selectedArmy].a.leaders)
	{
		window.alert("Du hast zu wenige Heerführer zum aufsitzen")
	} 
	else if(listOfArmyCoordinates[selectedArmy].a.isGuard)
	{
		window.alert("Die Garde muss zusammen bleiben");
	} 
	else 
	{
		// neues Reiterheer mit generierter Id an selben Koordinaten
		var newArmy = new reiterHeer(generateArmyId(2,listOfArmyCoordinates[selectedArmy].owner), toMount, leadersToMount, false);
		// zahlen im alten Heer anpassen
		listOfArmyCoordinates[selectedArmy].a.removeSoldiers(toMount);
		listOfArmyCoordinates[selectedArmy].a.removeLeaders(leadersToMount);
		listOfArmyCoordinates[selectedArmy].a.removeMounts(toMount);
		// in listOfArmyCoordinates einfügen
		var newArmyCoordinates = new armyCoordinates(newArmy,listOfArmyCoordinates[selectedArmy].x,listOfArmyCoordinates[selectedArmy].y ,listOfArmyCoordinates[selectedArmy].owner);
		listOfArmyCoordinates.push(newArmyCoordinates);
		// selectedArmy zeigt auf neues Heer
		selectedArmy = listOfArmyCoordinates.length-1;
		restoreInfoBox();
		updateInfoBox();
	}
}

// the unMount function of the unMount box
//TODO: If the mounted army has moved, set the new foot army's move points to the apropriate, non-max value.
function unMount(){
	var toUnMount = document.getElementById("unMountInput").value
	var leadersToUnMount = document.getElementById("unMountLeaderInput").value;
	console.log(toUnMount);
	if(toUnMount > listOfArmyCoordinates[selectedArmy].a.count){
		window.alert("So viele Truppen hast du nicht zum absitzen")
		return false;
	// genug Truppen vorhanden?
	} else if((toUnMount == listOfArmyCoordinates[selectedArmy].a.count)){
		// neues Heer mit generierter Id an selben Koordinaten
		var newArmy = new heer(generateArmyId(1,listOfArmyCoordinates[selectedArmy].owner), toUnMount, listOfArmyCoordinates[selectedArmy].a.leaders, 0, 0, toUnMount, listOfArmyCoordinates[selectedArmy].a.isGuard);
		// in listOfArmyCoordinates einfügen und alte Armee löschen, ist dann automatisch selectedArmy
		var newArmyCoordinates = new armyCoordinates(newArmy, listOfArmyCoordinates[selectedArmy].x, listOfArmyCoordinates[selectedArmy].y, listOfArmyCoordinates[selectedArmy].owner);
		listOfArmyCoordinates.push(newArmyCoordinates);
		if(listOfArmyCoordinates[selectedArmy].multiArmyField === true){
			addToMultifield(listOfArmyCoordinates[selectedArmy], newArmyCoordinates);
			deleteFromMultifield(listOfArmyCoordinates[selectedArmy]);
		}
		deleteSelectedArmy();
		restoreInfoBox();
		updateInfoBox();
	// genug Heerführer?
	} else if(leadersToUnMount >= listOfArmyCoordinates[selectedArmy].a.leaders){
		window.alert("Du hast zu wenige Heerführer zum absitzen");
	} else if(listOfArmyCoordinates[selectedArmy].a.isGuard){
		window.alert("Die Garde muss zusammen bleiben");
	} else {
		// neues Heer mit generierter Id an selben Koordinaten
		var newArmy = new heer(generateArmyId(1,listOfArmyCoordinates[selectedArmy].owner), toUnMount, leadersToUnMount, 0, 0, toUnMount, false);
		// zahlen im alten Riterheer anpassen
		listOfArmyCoordinates[selectedArmy].a.removeSoldiers(toUnMount);
		listOfArmyCoordinates[selectedArmy].a.removeLeaders(leadersToUnMount);
		// in listOfArmyCoordinates einfügen
		var newArmyCoordinates = new armyCoordinates(newArmy, listOfArmyCoordinates[selectedArmy].x, listOfArmyCoordinates[selectedArmy].y, listOfArmyCoordinates[selectedArmy].owner);
		listOfArmyCoordinates.push(newArmyCoordinates);
		// selectedArmy zeigt auf neues Heer
		selectedArmy = listOfArmyCoordinates.length-1;
		restoreInfoBox();
		updateInfoBox();
	}
}

function allMount(){
	// stellt ein, dass alle aufsitzen
	document.getElementById("mountInput").value = listOfArmyCoordinates[selectedArmy].a.count;
	// sitzt auf
	mount();
}

function allUnMount(){
	// stellt ein, dass alle aufsitzen
	document.getElementById("unMountInput").value = listOfArmyCoordinates[selectedArmy].a.count;
	// sitzt auf
	unMount();
}

// move troops or leaders from selectedArmy to the army at position mergeId in listOfArmyCoordinates
function transferTroopsFromSelectedArmy(mergeId){
	var toSplit = 0;
	var leadersToSplit = 0;
	var mountsToSplit = 0;
	var lkpToSplit = 0;
	var skpToSplit = 0;
	// depending on army type different fields are needed
	if(listOfArmyCoordinates[selectedArmy].a.armyType() == 1)
	{
		toSplit = parseInt(document.getElementById("splitInput").value);
		leadersToSplit = parseInt(document.getElementById("splitLeadersInput").value);
		mountsToSplit = parseInt(document.getElementById("splitMountsInput").value);
		lkpToSplit = parseInt(document.getElementById("splitLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitSkpInput").value);
		if(toSplit >= 0 && leadersToSplit >= 0 && mountsToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0)
		{
			listOfArmyCoordinates[selectedArmy].a.count -= toSplit;
			listOfArmyCoordinates[mergeId].a.count += toSplit;
			listOfArmyCoordinates[selectedArmy].a.leaders -= leadersToSplit;
			listOfArmyCoordinates[mergeId].a.leaders += leadersToSplit;
			listOfArmyCoordinates[selectedArmy].a.mounts -= mountsToSplit;
			listOfArmyCoordinates[mergeId].a.mounts += mountsToSplit;
			listOfArmyCoordinates[selectedArmy].a.lkp -= lkpToSplit;
			listOfArmyCoordinates[mergeId].a.lkp += lkpToSplit;
			listOfArmyCoordinates[selectedArmy].a.skp -= skpToSplit;
			listOfArmyCoordinates[mergeId].a.skp += skpToSplit;
			if(login != 'sl')
			{
				preparedEvents.push({
					type: "transfer", content: {
						fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
						toArmyId: listOfArmyCoordinates[mergeId].a.armyId,
						realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
						troops: toSplit,
						leaders: leadersToSplit,
						lkp: lkpToSplit,
						skp: skpToSplit,
						mounts: mountsToSplit
					}
				});
			}
		} else
		{
			window.alert("Es müssen positive Werte abgespalten werden");
			return false;
		}
	}
	else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 2)
	{
		toSplit = parseInt(document.getElementById("splitMountedInput").value);
		leadersToSplit = parseInt(document.getElementById("splitMountedLeadersInput").value);
		if(toSplit >= 0 && leadersToSplit >= 0)
		{
			listOfArmyCoordinates[selectedArmy].a.count -= toSplit;
			listOfArmyCoordinates[mergeId].a.count += toSplit;
			listOfArmyCoordinates[selectedArmy].a.leaders -= leadersToSplit;
			listOfArmyCoordinates[mergeId].a.leaders += leadersToSplit;
			listOfArmyCoordinates[selectedArmy].a.lkp -= lkpToSplit;
			listOfArmyCoordinates[mergeId].a.lkp += lkpToSplit;
			listOfArmyCoordinates[selectedArmy].a.skp -= skpToSplit;
			listOfArmyCoordinates[mergeId].a.skp += skpToSplit;
			if(login != 'sl')
			{
				preparedEvents.push({
					type: "transfer", content: {
						fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
						toArmyId: listOfArmyCoordinates[mergeId].a.armyId,
						realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
						troops: toSplit,
						leaders: leadersToSplit,
						lkp: 0,
						skp: 0,
						mounts: 0
					}
				});
			}
		} else
		{
			window.alert("Es müssen positive Werte abgespalten werden");
			return false;
		}
	}
	else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 3)
	{
		toSplit = parseInt(document.getElementById("splitFleetInput").value);
		leadersToSplit = parseInt(document.getElementById("splitFleetLeadersInput").value);
		lkpToSplit = parseInt(document.getElementById("splitFleetLkpInput").value);
		skpToSplit = parseInt(document.getElementById("splitFleetSkpInput").value);
		if(toSplit >= 0 && leadersToSplit >= 0 && lkpToSplit >= 0 && skpToSplit >= 0)
		{
			listOfArmyCoordinates[selectedArmy].a.count -= toSplit;
			listOfArmyCoordinates[mergeId].a.count += toSplit;
			listOfArmyCoordinates[selectedArmy].a.leaders -= leadersToSplit;
			listOfArmyCoordinates[mergeId].a.leaders += leadersToSplit;
			listOfArmyCoordinates[selectedArmy].a.lkp -= lkpToSplit;
			listOfArmyCoordinates[mergeId].a.lkp += lkpToSplit;
			listOfArmyCoordinates[selectedArmy].a.skp -= skpToSplit;
			listOfArmyCoordinates[mergeId].a.skp += skpToSplit;
			if(login != 'sl')
			{
				preparedEvents.push({
					type: "transfer", content: {
						fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
						toArmyId: listOfArmyCoordinates[mergeId].a.armyId,
						realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
						troops: toSplit,
						leaders: leadersToSplit,
						lkp: lkpToSplit,
						skp: skpToSplit,
						mounts: 0
					}
				});
			}
		} else
		{
			window.alert("Es müssen positive Werte abgespalten werden");
			return false;
		}
	}
	updateInfoBox();
	restoreInfoBox();
}

// merges selectedArmy with the army at position mergeId in listOfArmyCoordinates
function mergeSelectedArmy(mergeId){
	// depending on army type different fields are needed
	if(listOfArmyCoordinates[selectedArmy].a.armyType() == 1)
	{
		listOfArmyCoordinates[mergeId].a.count += listOfArmyCoordinates[selectedArmy].a.count;
		listOfArmyCoordinates[mergeId].a.leaders += listOfArmyCoordinates[selectedArmy].a.leaders;
		listOfArmyCoordinates[mergeId].a.mounts += listOfArmyCoordinates[selectedArmy].a.mounts;
		listOfArmyCoordinates[mergeId].a.lkp += listOfArmyCoordinates[selectedArmy].a.lkp;
		listOfArmyCoordinates[mergeId].a.skp += listOfArmyCoordinates[selectedArmy].a.skp;
		if(login != 'sl')
		{
			preparedEvents.push({
				type: "merge", content: {
					fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
					toArmyId: listOfArmyCoordinates[mergeId].a.armyId,
					realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
					troops: listOfArmyCoordinates[selectedArmy].a.count,
					leaders: listOfArmyCoordinates[selectedArmy].a.leaders,
					lkp: listOfArmyCoordinates[selectedArmy].a.lkp,
					skp: listOfArmyCoordinates[selectedArmy].a.skp,
					mounts: listOfArmyCoordinates[selectedArmy].a.mounts
				}
			});
		}
		deleteSelectedArmy();
	}
	else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 2)
	{
		listOfArmyCoordinates[mergeId].a.count += listOfArmyCoordinates[selectedArmy].a.count;
		listOfArmyCoordinates[mergeId].a.leaders += listOfArmyCoordinates[selectedArmy].a.leaders;
		if(login != 'sl')
		{
			preparedEvents.push({
				type: "merge", content: {
					fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
					toArmyId: listOfArmyCoordinates[mergeId].a.armyId,
					realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
					troops: listOfArmyCoordinates[selectedArmy].a.count,
					leaders: listOfArmyCoordinates[selectedArmy].a.leaders,
					lkp: 0,
					skp: 0,
					mounts: 0
				}
			});
		}
		deleteSelectedArmy();
	}
	else if(listOfArmyCoordinates[selectedArmy].a.armyType() == 3)
	{
		listOfArmyCoordinates[mergeId].a.count += listOfArmyCoordinates[selectedArmy].a.count;
		listOfArmyCoordinates[mergeId].a.leaders += listOfArmyCoordinates[selectedArmy].a.leaders;
		listOfArmyCoordinates[mergeId].a.lkp += listOfArmyCoordinates[selectedArmy].a.lkp;
		listOfArmyCoordinates[mergeId].a.skp += listOfArmyCoordinates[selectedArmy].a.skp;
		listOfArmyCoordinates[mergeId].a.loadedArmies = listOfArmyCoordinates[mergeId].a.loadedArmies.concat(listOfArmyCoordinates[selectedArmy].a.loadedArmies);

		console.log("the loaded armies in the new fleet are:");
		console.log(listOfArmyCoordinates[mergeId].a.loadedArmies);
		if (listOfArmyCoordinates[selectedArmy].a.loadedArmies.length > 0)
		{
			console.log("id = " + listOfArmyCoordinates[selectedArmy].a.loadedArmies[i]);
			for(var j = 0; j < listOfArmyCoordinates[selectedArmy].a.loadedArmies.length; j++)
			{
				for(var i = 0; i < listOfArmyCoordinates.length; i++)
				{
					if(listOfArmyCoordinates[selectedArmy].a.loadedArmies[j] == listOfArmyCoordinates[i].a.armyId && 
						listOfArmyCoordinates[mergeId].owner == listOfArmyCoordinates[i].owner)
					{
						console.log(listOfArmyCoordinates[i].a.armyId + " was loaded in " + listOfArmyCoordinates[i].a.isLoadedIn + ",");
						listOfArmyCoordinates[i].a.isLoadedIn = listOfArmyCoordinates[mergeId].a.armyId;
						console.log("but is now loaded in " + listOfArmyCoordinates[i].a.isLoadedIn + ".");
					}
				}
			}
		}
		for(var j = 0; j < listOfArmyCoordinates[mergeId].a.loadedArmies.length; j++)	
		{
			for(var i = 0; i < listOfArmyCoordinates.length; i++)
			{
				if(listOfArmyCoordinates[mergeId].a.loadedArmies[j] == listOfArmyCoordinates[i].a.armyId && 
					listOfArmyCoordinates[mergeId].owner == listOfArmyCoordinates[i].owner)
				{
					console.log(listOfArmyCoordinates[i].a.armyId + " is loaded in " + listOfArmyCoordinates[i].a.isLoadedIn + ".");
				}
			}
		}
		if(login != 'sl')
		{
			preparedEvents.push({
				type: "merge", content: {
					fromArmyId: listOfArmyCoordinates[selectedArmy].a.armyId, 
					toArmyId: listOfArmyCoordinates[mergeId].a.armyId,
					realm: listOfArmyCoordinates[selectedArmy].ownerTag(), 
					troops: listOfArmyCoordinates[selectedArmy].a.count,
					leaders: listOfArmyCoordinates[selectedArmy].a.leaders,
					lkp: 0,
					skp: 0,
					mounts: 0
				}
			});
		}
		deleteSelectedArmy();
	}
	if(mergeId = listOfArmyCoordinates.length)
	{
		mergeId -= 1;
	}
	selectedArmy = mergeId;
	updateInfoBox();
	restoreInfoBox();
}

// deletes the currently selected army und puts the last army in listOfArmyCoordinates in its place
function deleteSelectedArmy(){
	deleteArmy(selectedArmy);
}

function deleteArmy(index){
	listOfArmyCoordinates[index] = listOfArmyCoordinates[listOfArmyCoordinates.length-1];
	listOfArmyCoordinates.pop();
	if(selectedArmy == listOfArmyCoordinates.length)
	{
		selectedArmy = undefined;
	}
}

// returns the next armyId not yet assigned for the caller
function generateArmyId(type, owner){
	if (type == 1){
		var j = 101;
		while(j<200){
			var found = false;
			for (var i = 0; i < listOfArmyCoordinates.length; i++){
				if(listOfArmyCoordinates[i].a.armyId == j && listOfArmyCoordinates[i].owner == owner){
					j++;
					found = true;
				}
			}
			if(found == false){
				return j;
			}
		}
		window.alert("Du hast die maximale Anzahl an Fußheeren erreicht.")
		return false;
	} else if (type == 2){
		var j = 201;
		while(j<300){
			var found = false;
			for (var i = 0; i < listOfArmyCoordinates.length; i++){
				if(listOfArmyCoordinates[i].a.armyId == j && listOfArmyCoordinates[i].owner == owner){
					j++;
					found = true;
				}
			}
			if(found == false){
				return j;
			}
		}
		window.alert("Du hast die maximale Anzahl an Reiterheeren erreicht.")
		return false;
	} else if (type == 3){
		var j = 301;
		while(j<400){
			var found = false;
			for (var i = 0; i < listOfArmyCoordinates.length; i++){
				if(listOfArmyCoordinates[i].a.armyId == j && listOfArmyCoordinates[i].owner == owner){
					j++;
					found = true;
				}
			}
			if(found == false){
				return j;
			}
		}
		window.alert("Du hast die maximale Anzahl an Flotten erreicht.")
		return false;
	} else {
		return false;
	}
}

function checkArmiesForLiveliness(){//TODO fix
	for (var i = listOfArmyCoordinates.length -1; i >= 0; i--){
		if (!listOfArmyCoordinates[i].a.isAlive){
			deleteArmy(i);
		}
	}
}