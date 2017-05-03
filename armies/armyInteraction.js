function battleHandler(participants, x, y) {
	//participating armies
	this.unsortedArmies = participants;
	this.leftSide = [];
	this.rightSide = [];
	//coordinates of the battle
	this.x = x;
	this.y = y;
	
	//UI elements to display armies of both sides
	this.leftList = document.getElementById("leftArmiesBox");
	this.unsortedList = document.getElementById("unsortedArmiesBox");
	this.rightList = document.getElementById("rightArmiesBox");
	//both boxes under the lists of troops
	this.leftTroopCount = document.getElementById("leftBattleSide");
	this.rightTroopCount = document.getElementById("rightBattleSide");
	//dice rolls
	this.leftDice = document.getElementById("leftDiceRoll");
	this.rightDice = document.getElementById("rightDiceRoll");
	
	//Troop counts TODO: expand to accomodate naval combat
	this.leftSoldiers = 0;
	this.leftOfficers = 0;
	this.leftRiders = 0;
	this.rightSoldiers = 0;
	this.rightOfficers = 0;
	this.rightRiders = 0;
	
	this.moveToLeft = function(i){
		var ctx = this;
		return function() {
			var t = ctx.unsortedArmies.splice(i,1);
			ctx.leftSide.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}
	
	this.moveToRight = function(i){
		var ctx = this;
		return function() {
			var t = ctx.unsortedArmies.splice(i,1);
			ctx.rightSide.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}
	
	this.removeFromRight = function(i){
		var ctx = this;
		return function() {
			var t = ctx.rightSide.splice(i,1);
			ctx.unsortedArmies.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}
	
	this.removeFromLeft = function(i){
		var ctx = this;
		return function() {
			var t = ctx.leftSide.splice(i,1);
			ctx.unsortedArmies.push(t[0]);
			ctx.updateTroopCounts();
			ctx.updateDisplay();
		}
	}
	
	this.updateTroopCounts = function(){
		this.leftSoldiers = 0;
		this.leftOfficers = 0;
		this.leftRiders = 0;
		this.rightSoldiers = 0;
		this.rightOfficers = 0;
		this.rightRiders = 0;
		var ctx = this;
		
		this.leftSide.forEach(function(item){
			if(item.a.armyId < 200 ) {//footman army
				ctx.leftSoldiers += item.a.count;
			} else {//rider army
				ctx.leftRiders += item.a.count;
			} //TODO:Expand to accomodate naval combat
			ctx.leftOfficers += item.a.leaders;
		});
		this.rightSide.forEach(function(item){
			if(item.a.armyId < 200 ) {//footman army
				ctx.rightSoldiers += item.a.count;
			} else {//rider army
				ctx.rightRiders += item.a.count;
			} //TODO:Expand to accomodate naval combat
			ctx.rightOfficers += item.a.leaders;
		});
	}
	
	this.updateDisplay = function(){
		this.leftList.innerHTML = "";
		this.leftSide.forEach(function(item, index){
			var listItem = document.createElement("DIV");
			this.leftList.appendChild(listItem);
			listItem.classList.add("armyListItem");

			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag()+" "+item.a.armyId;
			listItem.appendChild(div);
			
			var moveBtn = document.createElement("BUTTON");
			moveBtn.classList.add("armyListButton");
			moveBtn.classList.add("moveRightButton");
			moveBtn.onclick = this.removeFromLeft(index);
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
			moveLeftBtn.onclick = this.moveToLeft(index);
			listItem.appendChild(moveLeftBtn);

			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag()+" "+item.a.armyId;
			listItem.appendChild(div);

			var moveRightBtn = document.createElement("BUTTON");
			moveRightBtn.classList.add("armyListButton");
			moveRightBtn.classList.add("moveRightButton");
			moveRightBtn.onclick = this.moveToRight(index);
			listItem.appendChild(moveRightBtn);
		}, this);

		this.rightList.innerHTML = "";
		this.rightSide.forEach(function(item, index){
			var listItem = document.createElement("DIV");
			this.rightList.appendChild(listItem);
			listItem.classList.add("armyListItem");
			
			var moveBtn = document.createElement("BUTTON");
			moveBtn.classList.add("armyListButton");
			moveBtn.classList.add("moveLeftButton");
			moveBtn.onclick = this.removeFromRight(index);
			listItem.appendChild(moveBtn);
			
			var div = document.createElement("DIV");
			div.classList.add("center");
			div.innerHTML = item.ownerTag()+" "+item.a.armyId;
			listItem.appendChild(div);
		}, this);
		
		//TODO: Expand to accomodate naval units
		this.leftTroopCount.innerHTML = 
			"<p>Soldaten: "+this.leftSoldiers+"</p><p>Reiter: "+
			this.leftRiders+"</p><p>Heerführer: "+this.leftOfficers+"</p>";
		this.rightTroopCount.innerHTML = 
			"<p>Soldaten: "+this.rightSoldiers+"</p><p>Reiter: "+
			this.rightRiders+"</p><p>Heerführer: "+this.rightOfficers+"</p>";
		
		this.leftTroopCount.innerHTML += "<p>Würfelwurf: "+this.leftDice.value+"</p>";
		this.rightTroopCount.innerHTML += "<p>Würfelwurf: "+this.rightDice.value+"</p>";
		
		//TODO: Make a joined force for each side, generate a battle from it, check overrun, compute losses
		//display overrun (if applicable), the winner and the future losses for the winner in the troop count
	}
	
	this.resolve = function(){
		//TODO: Compute result (by calling schlacht), inflict actual damage to armies.
	}
}

// Battle, army1 ist ein vereinigtes Heer der Seite 1 (Angreifer) mountedArmy1 ein vereinigtes Reiterheer der Seite 1, army2 und mountedArmy2 analog zu Seite 2 (Verteidiger).
// Immer zu erst initialisieren()
// TODO: Gelaende und unterstuetzung
function schlacht(army1, army2, mountedArmy1, mountedArmy2, chars1, chars2, posX, posY) {
    this.a1 = army1;
    this.a2 = army2;
    this.ma1 = mountedArmy1;
    this.ma2 = mountedArmy2;
    this.c1 = chars1;
    this.c2 = chars2;
    this.x = posX;
    this.y = posY;
    this.initialisieren = function(){
        if(this.a1 == null){
            this.a1 = new heer(0,0,0,0,0,0,false);
        }
        if(this.ma1 == null){
            this.ma1 = new reiterHeer(0,0,0,false);
        }
        if(this.a2 == null){
            this.a2 = new heer(0,0,0,0,0,0,false);
        }
        if(this.ma2 == null){
            this.ma2 = new reiterHeer(0,0,0,false);
        }
    }
    this.charGp1 = function(){
       if(this.c1 == null){
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
       if(this.c2 == null){
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
    this.overrun1 = function(){return((this.a1.count + this.ma1.count*2) >= (this.a2.count + this.ma2.count*2) * 10) && !this.a2.isGuard && !this.ma2.isGuard};
    this.overrun2 = function(){return((this.a2.count + this.ma2.count*2) >= (this.a1.count + this.ma1.count*2) * 10) && !this.a2.isGuard && !this.ma2.isGuard};
    // Kampfergebnis in Form [Angreifer gewinnt?:Boolean , Verluste für Gewinner Fuß:Zahl, Verluste für Gewinner Reiter: Zahl], [null, viel, viel] falls unentschieden.
    this.result = function(diceroll1, diceroll2) {
        var power1 = this.a1.count * (1 + (this.a1.leaderGp() + this.charGp1() + diceroll1)/200) + this.ma1.count * 2 * (1 + (this.ma1.leaderGp() + this.charGp1() + diceroll1)/200);
        var power2 = this.a2.count * (1 + (this.a2.leaderGp() + this.charGp2() + diceroll2)/200) + this.ma2.count * 2 * (1 + (this.ma2.leaderGp() + this.charGp2() + diceroll2)/200);
        var countSum1 = this.a1.count + this.ma1.count * 2;
        var countSum2 = this.a2.count + this.ma2.count * 2;
        console.log(power1);
        console.log(power2);
        console.log(countSum1);
        console.log(countSum2);
        var gpSchnitt = ((power1 + power2) / (countSum1 + countSum2) -1) * 100;
        console.log(gpSchnitt);
        if(power1 > power2){
        	// Seite 1 gewinnt:
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
            console.log(verluste);
            var gpDiffHeer = ((this.a1.leaderGp() + this.charGp1() + diceroll1)/2 - gpSchnitt)/100
            var gpDiffReiter = ((this.ma1.leaderGp() + this.charGp1() + diceroll1)/2 - gpSchnitt)/100
            var verlusteHeer = this.a1.count/countSum1 * verluste;
            var verlusteReiter = this.ma1.count*2/countSum1 * verluste;
            if(gpDiffHeer >= 0){
                verlusteHeer = verlusteHeer/(1+gpDiffHeer)
            } else {
                verlusteHeer = verlusteHeer*(1-gpDiffHeer)
            }
            if(gpDiffReiter >= 0){
                verlusteReiter = verlusteReiter/(1+gpDiffReiter)
            } else {
                verlusteReiter = verlusteReiter*(1-gpDiffReiter)
            }
            // gewonnen?, anzahl Verluste Heer, Reiter
            var results = [true, verlusteHeer, verlusteReiter];
            return results;
        } else if(power2 > power1){
            // Seite 2 gewinnt:
            var factor = 0;
            if(countSum2 > countSum1){
                factor = ((countSum1 - countSum2)/10)/countSum1-0.1;
                console.log(factor);
                var verluste = countSum1 * (1 + factor);
            } else if(countSum1 > countSum2){
                factor = ((countSum1 - countSum2)/10)/countSum2+0.1;
                var verluste = countSum1 * (1 + factor);
            } else {
                var verluste = countSum1;
            }
            var gpDiffHeer = ((this.a2.leaderGp() + this.charGp2() + diceroll2)/2 - gpSchnitt)/100
            var gpDiffReiter = ((this.ma2.leaderGp() + this.charGp2() + diceroll2)/2 - gpSchnitt)/100
            var verlusteHeer = this.a2.count/countSum2 * verluste;
            var verlusteReiter = this.ma2.count*2/countSum2 * verluste;
            if(gpDiffHeer >= 0){
                verlusteHeer = verlusteHeer/(1+gpDiffHeer)
            } else {
                verlusteHeer = verlusteHeer*(1-gpDiffHeer)
            }
            if(gpDiffReiter >= 0){
                verlusteReiter = verlusteReiter/(1+gpDiffReiter)
            } else {
                verlusteReiter = verlusteReiter*(1-gpDiffReiter)
            }
            // gewonnen?, anzahl Verluste Heer, Reiter
            var results = [false, verlusteHeer, verlusteReiter];
            return results;
        } else if(power1 == power2){
            // unentschieden:
                return [null, null, null]
        }
    }
}
// TODO schiffskampf

// array der Würfelergebnisse leichte, array der Würfelergebnisse schwere, badConditions("far"/"farAndUp"/"high"/null), schießende Armee, ziel Armee, Charaktere und Zauberer auf dem Zielfeld
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
