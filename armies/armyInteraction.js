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
	
	//Troop counts TODO: expand to accomodate naval combat
	this.attackSoldiers = 0;
	this.attackOfficers = 0;
	this.attackRiders = 0;
	
	this.attackShips = 0;
	this.attackLightWarships = 0;
	this.attackHeavyWarships = 0;
	
	this.defenseSoldiers = 0;
	this.defenseOfficers = 0;
	this.defenseRiders = 0;
	
	this.defenseShips = 0;
	this.defenseLightWarships = 0;
	this.defenseHeavyWarships = 0;
	
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

		this.attackShips = 0;
		this.attackLightWarships = 0;
		this.attackHeavyWarships = 0;
		
		this.defenseSoldiers = 0;
		this.defenseOfficers = 0;
		this.defenseRiders = 0;

		this.defenseShips = 0;
		this.defenseLightWarships = 0;
		this.defenseHeavyWarships = 0;
		var ctx = this;
		
		this.attackSide.forEach(function(item){
			if(item.a.armyId < 200 ) {//footman army
				ctx.attackSoldiers += item.a.count;
			} else if(item.a.armyId < 300) {//rider army
				ctx.attackRiders += item.a.count;
			} else if(item.a.armyId < 400) {//navy
				ctx.attackShips += item.a.count;
				ctx.attackLightWarships += item.a.lkp;
				ctx.attackHeavyWarships += item.a.skp;
			}
			ctx.attackOfficers += item.a.leaders;
		});
		this.defenseSide.forEach(function(item){
			if(item.a.armyId < 200 ) {//footman army
				ctx.defenseSoldiers += item.a.count;
			} else if(item.a.armyId < 300) {//rider army
				ctx.defenseRiders += item.a.count;
			} else if(item.a.armyId < 400) {//navy
				ctx.defenseShips += item.a.count;
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
		
		if(this.attackShips + this.attackLightWarships + this.attackHeavyWarships > 0 || 
				this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships > 0){
			//naval combat
			this.attackTroopCount.innerHTML = 
				"<p>Shiffe: "+this.attackShips+"</p><p>Leichte Kreigsschiffe: "+
				this.attackLightWarships+"</p><p>Schwere Kriegsschiffe: "+
				this.attackHeavyWarships+"</p><p>Heerführer: "+this.attackOfficers+"</p>";
			this.defenseTroopCount.innerHTML = 
				"<p>Shiffe: "+this.defenseShips+"</p><p>Leichte Kreigsschiffe: "+
				this.defenseLightWarships+"</p><p>Schwere Kriegsschiffe: "+
				this.defenseHeavyWarships+"</p><p>Heerführer: "+this.defenseOfficers+"</p>";
		} else { //land combat
			this.attackTroopCount.innerHTML = 
				"<p>Soldaten: "+this.attackSoldiers+"</p><p>Reiter: "+
				this.attackRiders+"</p><p>Heerführer: "+this.attackOfficers+"</p>";
			this.defenseTroopCount.innerHTML = 
				"<p>Soldaten: "+this.defenseSoldiers+"</p><p>Reiter: "+
				this.defenseRiders+"</p><p>Heerführer: "+this.defenseOfficers+"</p>";
		}
		
		this.attackTroopCount.innerHTML += "<p>Würfelwurf: "+this.attackDice.value+"</p>";
		this.defenseTroopCount.innerHTML += "<p>Würfelwurf: "+this.defenseDice.value+"</p>";
		
		//Instant result preview (remove if not desired)
		var battle = new schlacht(this.attackSide, this.defenseSide, null, null, this.x, this.y);
		battle.init();
		var result = battle.result([this.attackDice.value, this.defenseDice.value]);
		if(result.victor === 'attacker'){
			if(battle.overrun1()) {
				this.defenseTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
			} else {
				this.defenseTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
				this.attackTroopCount.innerHTML = 
					"<div>Soldaten: "+this.attackSoldiers+"<p class=\"red\">-"+
					Math.round(result.footLosses)+"</p></div><div>Reiter: "+this.attackRiders+"<p class=\"red\">-"+
					Math.round(result.cavLosses)+"</p></div><div>Heerführer: "+this.attackOfficers+"<p class=\"red\">-"+
					Math.round(((result.footLosses+result.cavLosses)/(this.attackSoldiers+this.attackRiders))*this.attackOfficers)+"</p></div>";
			}
		} else if (result.victor === 'defender') {
			if(battle.overrun2()) {
				this.attackTroopCount.innerHTML += "<p class=\"red\">Überrant!</p>";
			} else {
				this.attackTroopCount.innerHTML += "<p class=\"red\">Besiegt!</p>";
				this.defenseTroopCount.innerHTML = 
					"<div>Soldaten: "+this.defenseSoldiers+"<p class=\"red\">-"+
					Math.round(result.footLosses)+"</p></div><div>Reiter: "+this.defenseRiders+"<p class=\"red\">-"+
					Math.round(result.cavLosses)+"</p></div><div>Heerführer: "+this.defenseOfficers+"<p class=\"red\">-"+
					Math.round(((result.footLosses+result.cavLosses)/(this.defenseSoldiers+this.defenseRiders))*this.defenseOfficers)+"</p></div>";
			}
		}
	}
	
	this.resolve = function(){
		var battle = new schlacht(this.attackSide, this.defenseSide, null, null, this.x, this.y);
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
					if(army.armyId < 200 && army.armyId > 0){
						army.decimate((army.count/this.attackSoldiers)*result.footLosses);
					} else if(army.armyId < 300 && army.armyId > 200){
						army.decimate((army.count/this.attackRiders)*result.cavLosses);
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
					if(army.armyId < 200 && army.armyId > 0){
						army.decimate((army.count/this.defenseSoldiers)*result.footLosses);
					} else if(army.armyId < 300 && army.armyId > 200){
						army.decimate((army.count/this.defenseRiders)*result.cavLosses);
					}
				},this);
			} else {
				//TODO: Revisit once the schlacht.result(dice1, dice2) returns proper values for a tie
			}
		}
	}
}

// Battle, armiesAttack: Array der angreifenden Armeen, armiesDefend: Array der Verteidigenden Armeen 
// Immer zu erst init()
// TODO: Gelaende und unterstuetzung, Flotten
// TODO: Bessere variabelnamen!
// attackingarmies[], defendingarmies[]
function schlacht(armiesAttack, armiesDefend, chars1, chars2, posX, posY) {
    this.a1 = new heer(0,0,0,0,0,0,false);	// Fußheer Angreifer
    this.a2 = new heer(0,0,0,0,0,0,false);	// Fußheer Angreifer TODO: Verteidiger?
    this.ma1 = new reiterHeer(0,0,0,false);	// Reiterheer Angreifer
    this.ma2 = new reiterHeer(0,0,0,false);	// Reiterheer Angreifer TODO: Verteidiger?
	this.fa1 = new seeHeer(0,0,0,0,0,false); // Flotte Angreifer NOCH NICHT UNTERSTÜTZT
	this.fa2 = new seeHeer(0,0,0,0,0,false); // Flotte Verteidiger NOCH NICHT UNTERSTÜTZT
    this.g1 = new heer(0,0,0,0,0,0,true);	// Garde Angreifer
    this.g2 = new heer(0,0,0,0,0,0,true);	// Garde Angreifer TODO: Verteidiger?
    this.mg1 = new reiterHeer(0,0,0,true);	// ReiterGarde Angreifer
    this.mg2 = new reiterHeer(0,0,0,true);	// ReiterGarde Angreifer TODO: Verteidiger?
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
		console.log("init");
		console.log("this.a1.count = " + this.a1.count);
		console.log("this.ma1.count = " + this.ma1.count);
		console.log("this.a2.count = " + this.a2.count);
		console.log("this.ma2.count = " + this.ma2.count);
		console.log("this.g2.count = " + this.g2.count);
		console.log("this.mg2.count = " + this.mg2.count);
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
		console.log("overrun1");
		console.log("this.a1.count = " + this.a1.count);
		console.log("this.ma1.count = " + this.ma1.count);
		console.log("this.a2.count = " + this.a2.count);
		console.log("this.ma2.count = " + this.ma2.count);
		console.log("this.g2.count = " + this.g2.count);
		console.log("this.mg2.count = " + this.mg2.count);
    	return (this.a1.count + this.ma1.count*2) > 0 && (this.a1.count + this.ma1.count*2) >= ((this.a2.count + this.ma2.count*2)*10) && 
    		(this.g2.count === 0) && (this.mg2.count === 0);
    }
    
    this.overrun2 = function() {
		console.log("overrun2");
		console.log("this.a1.count = " + this.a1.count);
		console.log("this.ma1.count = " + this.ma1.count);
		console.log("this.a2.count = " + this.a2.count);
		console.log("this.ma2.count = " + this.ma2.count);
		console.log("this.g2.count = " + this.g2.count);
		console.log("this.mg2.count = " + this.mg2.count);
    	return (this.a2.count + this.ma2.count*2) > 0 && (this.a2.count + this.ma2.count*2) >= ((this.a1.count + this.ma1.count*2)*10) && 
    		(this.g1.count === 0) && (this.mg1.count === 0);
    }
    // Kampfergebnis in Form {victor: <'attacker', 'defender', 'tie'>, footLosses: <int>, cavLosses: <int>], 
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
        var power1 = this.a1.count * (1 + (this.a1.leaderGp() + 140 * troopAdvantage + this.charGp1() + dicerolls[0])/200) + this.ma1.count * 2 * (1 + (this.ma1.leaderGp() + 140 * riderAdvantage + this.charGp1() + dicerolls[0])/200);
        var power2 = this.a2.count * (1 + (this.a2.leaderGp() + 140 * troopAdvantage + this.charGp2() + dicerolls[1])/200) + this.ma2.count * 2 * (1 + (this.ma2.leaderGp() + 140 * riderAdvantage + this.charGp2() + dicerolls[1])/200);
        var countSum1 = this.a1.count + this.ma1.count * 2 + this.g1.count + this.mg1.count * 2;
        var countSum2 = this.a2.count + this.ma2.count * 2 + this.g2.count + this.mg2.count * 2;
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
            var gpDiffHeer = ((this.a1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100
            var gpDiffReiter = ((this.ma1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100
            var gpDiffGardeHeer = ((this.g1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100
            var gpDiffGardeReiter = ((this.mg1.leaderGp() + this.charGp1() + dicerolls[0])/2 - gpSchnitt)/100
            var verlusteHeer = this.a1.count/countSum1 * verluste;
            var verlusteReiter = this.ma1.count*2/countSum1 * verluste;
            var verlusteGardeHeer = this.g1.count/countSum1 * verluste;
            var verlusteGardeReiter = this.mg1.count*2/countSum1 * verluste;
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
            // gewonnen?, anzahl Verluste Heer, Reiter, gardeHeer, gardeReiter
            var results = {victor: 'attacker', footLosses: verlusteHeer, cavLosses: verlusteReiter, gFootLosses: verlusteGardeHeer, gCavLosses: verlusteGardeReiter};
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
            var gpDiffGardeHeer = ((this.g2.leaderGp() + this.charGp2() + dicerolls[1])/2 - gpSchnitt)/100
            var gpDiffGardeReiter = ((this.mg2.leaderGp() + this.charGp2() + dicerolls[1])/2 - gpSchnitt)/100
            var verlusteHeer = this.a2.count/countSum2 * verluste;
            var verlusteReiter = this.ma2.count*2/countSum2 * verluste;
            var verlusteGardeHeer = this.g2.count/countSum2 * verluste;
            var verlusteGardeReiter = this.mg2.count*2/countSum2 * verluste;
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
            // gewonnen?, anzahl Verluste Heer, Reiter, gardeHeer, gardeReiter
            var results = {victor: 'defender', footLosses: verlusteHeer, cavLosses: verlusteReiter, gFootLosses: verlusteGardeHeer, gCavLosses: verlusteGardeReiter};
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

// the mount function of the mount box
//TODO: If the army has moved, set the new mounted army's move points to the apropriate, non-max value.
function mount(){
	var toMount = document.getElementById("mountInput").value;
	var leadersToMount = document.getElementById("mountLeaderInput").value;
	// genug Truppen vorhanden?
	if(toMount > listOfArmyCoordinates[selectedArmy].a.count){
		window.alert("Du hast zu wenige Truppen zum aufsitzen")
		return false;
	// genug Reittiere vorhanden?
	} else if(toMount > listOfArmyCoordinates[selectedArmy].a.mounts){
				window.alert("Du hast zu wenige Reittiere zum aufsitzen")
				return false;
			// Sitzen alle auf?
			} else if((toMount == listOfArmyCoordinates[selectedArmy].a.count)){
				// neues Reiterheer mit generierter Id an selben Koordinaten
				var newArmy = new reiterHeer(generateArmyId(2,listOfArmyCoordinates[selectedArmy].owner), toMount, listOfArmyCoordinates[selectedArmy].a.leaders, listOfArmyCoordinates[selectedArmy].a.isGuard);
				// Nachricht, falls Katapulte vorhanden waren.
				if(listOfArmyCoordinates[selectedArmy].a.skp > 0 || listOfArmyCoordinates[selectedArmy].a.lkp > 0){
					window.alert("Da kein Fußheer mehr Bestehen bleibt, wurden die Katapulte zerstört.")
				}
				// in listOfArmyCoordinates einfügen und alte Armee löschen, ist dann automatisch selectedArmy
				var newArmyCoordinates = new armyCoordinates(newArmy,listOfArmyCoordinates[selectedArmy].x,listOfArmyCoordinates[selectedArmy].y ,listOfArmyCoordinates[selectedArmy].owner);
				listOfArmyCoordinates.push(newArmyCoordinates);
				deleteSelectedArmy();
				cancelMountUnMount();
				updateInfoBox();
			// genug Heerführer?
			} else if(leadersToMount >= listOfArmyCoordinates[selectedArmy].a.leaders){
				window.alert("Du hast zu wenige Heerführer zum aufsitzen")
			} else if(listOfArmyCoordinates[selectedArmy].a.isGuard){
				window.alert("Die Garde muss zusammen bleiben");
			} else {
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
		cancelMountUnMount();
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
		deleteSelectedArmy();
		cancelMountUnMount();
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
		cancelMountUnMount();
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

// deletes the currently selected army und puts the last army in listOfArmyCoordinates in its place
function deleteSelectedArmy(){
	listOfArmyCoordinates[selectedArmy] = listOfArmyCoordinates[listOfArmyCoordinates.length-1]
	listOfArmyCoordinates.pop();
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