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
    // Kampfergebnis in Form [Angreifer gewinnt?:Boolean , Verluste für Gewinner:Zahl], [null, viel] falls unentschieden.
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
                return [null, null]
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

		// the mount function of the mount box
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