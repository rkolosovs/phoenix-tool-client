function heer(id, truppen, heerfuehrer, leichte, schwere, reittiere) {
    this.armyId = id;
    this.count = truppen;
    this.mounts = reittiere;
    this.leaders = heerfuehrer;
    this.skp = schwere;
    this.lkp = leichte;
    //berechnet die GP aus Heerführern
    this.leaderGp = function(){
        if(this.leaders < 101){
            return this.leaders;
        } else if(this.leaders < 201){
            return (100 + (this.leaders-100) / 2 );
        } else {
            return 200;
        }
    }
    //berechnet die verbrauchten Raumpunkte
    this.raumpunkte = function(){
        return (this.count + this.mounts + this.skp*2000 + this.lkp*1000 + this.leaders * 100);
    }
    // entfernt Soldaten aus der Armee
    this.removeSoldiers = function(amount){
        if(this.count >= amount){
            this.count -= Math.floor(amount);
        } else {this.count = 0;}
    }
    // fügt Soldaten zu der Armee hinzu
    this.addSoldiers = function(amount){
        this.count += amount;
    }
    // entfernt Heerführer aus der Armee
    this.removeLeaders = function(amount){
        if(this.leaders >= amount){
            this.leaders -= Math.floor(amount);
        } else {this.leaders = 0;}
    }
    // fügt Heerführer zu der Armee hinzu
    this.addLeaders = function(amount){
        this.leaders += amount;
    }
    // entfernt leichte Katapulte aus der Armee
    this.removeLkp = function(amount){
        if(this.lkp >= amount){
            this.lkp -= Math.floor(amount);
        } else {this.lkp = 0;}
    }
    // entfernt schwere Katapulte aus der Armee
    this.removeSkp = function(amount){
        if(this.skp >= amount){
            this.skp -= Math.floor(amount);
        } else {this.skp = 0;}
    }
    // fügt leichte Katapulte zu der Armee hinzu
    this.addLkp = function(amount){
        this.lkp += amount;
    }
    // fügt schwere Katapulte zu der armee hinzu
    this.addSkp = function(amount){
        this.skp += amount;
    }
    // entfernt Reittiere aus der Armee
    this.removeMounts = function(amount){
        if(this.mounts >= amount){
            this.mounts -= Math.floor(amount);
        } else {this.mounts = 0;}
    }
    // fügt Reittiere zu der Armee hinzu
    this.addMounts = function(amount){
        this.mounts += amount;
    }
    // enfernt Truppen, Heerführer und Katapulte entsprechend dem Kampfergebnis
    this.decimate = function(amount){
        var factor = amount/ this.count;
        this.removeSoldiers(amount);
        this.removeLeaders(this.leaders*factor);
        this.removeMounts(this.mounts*factor);
        this.removeSkp(this.skp*factor);
        this.removeLkp(this.lkp*factor);
    }
    // zeigt an, ob ein Heer eroberungsfähig ist
    this.canConquer = function(){
        if(this.count >= 1000 && this.leaders >= 1){
            return true;
        } else {
            return false;
        }
    }
    // addierte Baupunkte der Armee
    this.sumBP = function(){return this.count*0.1 + this.mounts*0.1 + this.lkp * 200 + this.skp * 400;}
    // entfernt Truppen nach Beschuß
    this.takeFire = function(damageBP){
        var saveBp = this.sumBP();
        this.removeLeaders(this.leaders * (damageBP / saveBp));
        this.removeSoldiers(damageBP * (this.count*0.1 / saveBp) * 10);
        this.removeMounts(damageBP * (this.mounts*0.1 / saveBp) * 10);
        this.removeLkp(damageBP * (this.lkp*200 / saveBp) / 200);
        this.removeSkp(damageBP * (this.skp*400 / saveBp) / 400);
    }
    //array der Würfelergebnisse, badConditions("far"/"high"/null)
    //return BPschaden
    this.fireLkp = function(dicerolls, badConditions){
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if(badConditions == null){
             for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5;
                    break;
                    case 8: damageBP += 10;
                    break;
                    case 7: damageBP += 40;
                    break;
                    case 6: damageBP += 70;
                    break;
                    case 5: damageBP += 100;
                    break;
                    case 4: damageBP += 125;
                    break;
                    case 3: damageBP += 150;
                    break;
                    case 2: damageBP += 175;
                    break;
                    case 1: damageBP += 200;
                    break;
                    case 0: damageBP += 225;
                    break;
                }
            }
        }
        return damageBP;
    }
    //array der Würfelergebnisse, badConditions("far"/"farAndUp"/"high"/null)
    //return BPschaden
    this.fireSkp = function(dicerolls, badConditions){
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if(badConditions == null){
             for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 30;
                    break;
                    case 8: damageBP += 60;
                    break;
                    case 7: damageBP += 90;
                    break;
                    case 6: damageBP += 120;
                    break;
                    case 5: damageBP += 150;
                    break;
                    case 4: damageBP += 180;
                    break;
                    case 3: damageBP += 210;
                    break;
                    case 2: damageBP += 240;
                    break;
                    case 1: damageBP += 270;
                    break;
                    case 0: damageBP += 300;
                    break;
                }
            }
        } else if(badConditions == "high"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 5;
                    break;
                    case 7: damageBP += 10;
                    break;
                    case 6: damageBP += 30;
                    break;
                    case 5: damageBP += 40;
                    break;
                    case 4: damageBP += 50;
                    break;
                    case 3: damageBP += 65;
                    break;
                    case 2: damageBP += 80;
                    break;
                    case 1: damageBP += 100;
                    break;
                    case 0: damageBP += 120;
                    break;
                }
            }
        } else if(badConditions == "farAndUp"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5;
                    break;
                    case 8: damageBP += 10;
                    break;
                    case 7: damageBP += 30;
                    break;
                    case 6: damageBP += 40;
                    break;
                    case 5: damageBP += 50;
                    break;
                    case 4: damageBP += 65;
                    break;
                    case 3: damageBP += 80;
                    break;
                    case 2: damageBP += 100;
                    break;
                    case 1: damageBP += 120;
                    break;
                    case 0: damageBP += 150;
                    break;
                }
            } 
        } else if(badConditions == "far"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 5;
                    break;
                    case 7: damageBP += 10;
                    break;
                    case 6: damageBP += 30;
                    break;
                    case 5: damageBP += 50;
                    break;
                    case 4: damageBP += 70;
                    break;
                    case 3: damageBP += 90;
                    break;
                    case 2: damageBP += 110;
                    break;
                    case 1: damageBP += 130;
                    break;
                    case 0: damageBP += 150;
                    break;
                }
            }
        }
        return damageBP;
    }
}// ende von Heer ------------------------------------------------------------------------------------------------------

//Reiterheere müssen nach dem Kampf nur halb so stark dezimiert werden wie Fußheere.
function reiterHeer(id, truppen, heerfuehrer) {
    this.armyId = id;
    this.count = truppen;
    this.mounts = 0;
    this.leaders = heerfuehrer;
    this.skp = 0;
    this.lkp = 0;
    this.leaderGp = function(){
        if(this.leaders < 101){
            return this.leaders;
        } else if(this.leaders < 201){
            return (100 + (this.leaders-100) / 2 );
        } else {
            return 200;
        }
    }
    // Reiter zählen Doppelt so viel wie Soldaten
    this.raumpunkte = function() {
         return (this.count * 2 + this.leaders * 100);
    };
    // entfernt Soldaten aus der Armee
    this.removeSoldiers = function(amount){
        if(this.count >= amount){
            this.count -= Math.floor(amount);
        } else {this.count = 0;}
    }
    // fügt Soldaten zu der Armee hinzu
    this.addSoldiers = function(amount){
        this.count += amount;
    }
    // entfernt Heerführer aus der Armee
    this.removeLeaders = function(amount){
        if(this.leaders >= amount){
            this.leaders -= Math.floor(amount);
        } else {this.leaders = 0;}
    }
    // fügt Heerführer zu der Armee hinzu
    this.addLeaders = function(amount){
        this.leaders += amount;
    }
    // Reiter zählen Doppelt so viel wie Soldaten
    this.decimate = function(amount){
        var factor = (amount/2) / this.count;
        this.removeSoldiers(amount/2);
        this.removeLeaders(this.leaders*factor);
    }
    // Reiter zählen Doppelt so viel wie Soldaten
    this.canConquer = function(){
        if(this.count >= 500 && this.leaders >= 1){
            return true;
        } else {
            return false;
        }
    }
    this.sumBP = function(){return this.count*0.2;}
    // entfernt Truppen nach Beschuß
    this.takeFire = function(damageBP){
        this.removeLeaders(this.leaders * (damageBP / this.sumBP()));
        this.removeSoldiers(damageBP * 5);
    }
    //reiter haben keite Karapulte
    this.fireLkp = function(dicerolls, badConditions){return 0;}
    this.fireSkp = function(dicerolls, badConditions){return 0;}
} // ende von reiterHeer ------------------------------------------------------------------------------------------------------

function seeHeer(id, truppen, heerfuehrer, leichte, schwere) {
    var sh = new heer(id, truppen, heerfuehrer, leichte, schwere, 0)
    this.armyId = id;
    this.count = truppen;
    this.mounts = 0;
    this.leaders = heerfuehrer;
    this.skp = leichte;
    this.lkp = schwere;
    this.leaderGp = function(){
        if(this.leaders < 101){
            return this.leaders;
        } else if(this.leaders < 201){
            return (100 + (this.leaders-100) / 2 );
        } else {
            return 200;
        }
    }
    // Schiffe zählen 100x so viel wie Soldaten
    this.raumpunkte = function() {
         return (this.count * 100 + this.leaders * 100);
    };
        // entfernt Soldaten aus der Armee
    this.removeSoldiers = function(amount){
        if(this.count >= amount){
            this.count -= Math.floor(amount);
        } else {this.count = 0;}
    }
    // fügt Soldaten zu der Armee hinzu
    this.addSoldiers = function(amount){
        this.count += amount;
    }
    // entfernt Heerführer aus der Armee
    this.removeLeaders = function(amount){
        if(this.leaders >= amount){
            this.leaders -= Math.floor(amount);
        } else {this.leaders = 0;}
    }
    // fügt Heerführer zu der Armee hinzu
    this.addLeaders = function(amount){
        this.leaders += amount;
    }
    // entfernt leichte Katapulte aus der Armee
    this.removeLkp = function(amount){
        if(this.lkp >= amount){
            this.lkp -= Math.floor(amount);
        } else {this.lkp = 0;}
    }
    // entfernt schwere Katapulte aus der Armee
    this.removeSkp = function(amount){
        if(this.skp >= amount){
            this.skp -= Math.floor(amount);
        } else {this.skp = 0;}
    }
    // fügt leichte Katapulte zu der Armee hinzu
    this.addLkp = function(amount){
        this.lkp += amount;
    }
    // fügt schwere Katapulte zu der armee hinzu
    this.addSkp = function(amount){
        this.skp += amount;
    }
    this.decimate = function(amount){
        var factor = amount / this.count;
        this.removeSoldiers(amount);
        this.removeLeaders(this.leaders*factor);
        this.removeSkp(this.skp*factor);
        this.removeLkp(this.lkp*factor);
    }
    // Schiffe zählen 100x so viel wie Soldaten
    this.canConquer = function(){
        if(this.count >= 10 && this.leaders >= 1){
            return true;
        } else {
            return false;
        }
    }
    this.sumBP = function(){return this.count * 10 + this.lkp * 200 + this.skp * 400;}
    // entfernt Truppen nach Beschuß
    this.takeFire = function(damageBP){
        var saveBp = this.sumBP();
        this.removeLeaders(this.leaders * (damageBP / saveBp));
        this.removeSoldiers(damageBP * (this.count*10 / saveBp) / 10);
        this.removeLkp(damageBP * (this.lkp*200 / saveBp) / 200);
        this.removeSkp(damageBP * (this.skp*400 / saveBp) / 400);
    }
    
    //array der Würfelergebnisse, badConditions("far"/"high"/null)
    //return BPschaden
    this.fireLkp = function(dicerolls, badConditions){
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if(badConditions == null){
             for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 5;
                    break;
                    case 7: damageBP += 10;
                    break;
                    case 6: damageBP += 25;
                    break;
                    case 5: damageBP += 50;
                    break;
                    case 4: damageBP += 75;
                    break;
                    case 3: damageBP += 100;
                    break;
                    case 2: damageBP += 125;
                    break;
                    case 1: damageBP += 150;
                    break;
                    case 0: damageBP += 175;
                    break;
                }
            }
        }
        return damageBP;
    }

    //array der Würfelergebnisse, badConditions("far"/"farAndUp"/"high"/null)
    //return BPschaden
    this.fireSkp = function(dicerolls, badConditions){
        var rollLen = dicerolls.length;
        var damageBP = 0;
        if(badConditions == null){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 5;
                    break;
                    case 8: damageBP += 10;
                    break;
                    case 7: damageBP += 40;
                    break;
                    case 6: damageBP += 70;
                    break;
                    case 5: damageBP += 100;
                    break;
                    case 4: damageBP += 130;
                    break;
                    case 3: damageBP += 160;
                    break;
                    case 2: damageBP += 190;
                    break;
                    case 1: damageBP += 220;
                    break;
                    case 0: damageBP += 250;
                    break;
                }
            }
        } else if(badConditions == "high"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 0;
                    break;
                    case 7: damageBP += 5;
                    break;
                    case 6: damageBP += 10;
                    break;
                    case 5: damageBP += 30;
                    break;
                    case 4: damageBP += 40;
                    break;
                    case 3: damageBP += 50;
                    break;
                    case 2: damageBP += 65;
                    break;
                    case 1: damageBP += 80;
                    break;
                    case 0: damageBP += 100;
                    break;
                }
            }
        } else if(badConditions == "farAndUp"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 5;
                    break;
                    case 7: damageBP += 10;
                    break;
                    case 6: damageBP += 30;
                    break;
                    case 5: damageBP += 40;
                    break;
                    case 4: damageBP += 50;
                    break;
                    case 3: damageBP += 65;
                    break;
                    case 2: damageBP += 80;
                    break;
                    case 1: damageBP += 100;
                    break;
                    case 0: damageBP += 120;
                    break;
                }
            }
        } else if(badConditions == "far"){
            for (var i = 0; i < rollLen; i++){
                switch(dicerolls[i]){
                    case 9: damageBP += 0;
                    break;
                    case 8: damageBP += 0;
                    break;
                    case 7: damageBP += 0;
                    break;
                    case 6: damageBP += 5;
                    break;
                    case 5: damageBP += 10;
                    break;
                    case 4: damageBP += 20;
                    break;
                    case 3: damageBP += 40;
                    break;
                    case 2: damageBP += 60;
                    break;
                    case 1: damageBP += 80;
                    break;
                    case 0: damageBP += 100;
                    break;
                }
            }
        }
        return damageBP;
    }
}