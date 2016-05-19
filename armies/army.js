function army(id, truppen, typ, heerführer, charaktere) {
    this.armyId = id;
    this.count = truppen;
    this.type = typ;
    this.leaders = heerführer;
    this.chars = charaktere;
    //berechnet die GP aus Heerführern
    this.leaderGp = function () {
        if(this.leaders<101){
            return this.leaders;
        } else if (this.leaders<201){
            return (100 + (this.leaders-100) / 2 );
        } else {
            return 200;
        }
    }
    //berechnet die GP aus Charakteren, Zauberer sind Charaktere
    this.charGp = function () {
        gpSum = 0;
        var i = 0;
        while (i <= this.chars.length){
            gpSum += this.chars[i].gutpunkte;
        }
        return gpSum;
    }
    //berechnet die verbrauchten Raumpunkte
    this.raumpunkte = function () {
        if (this.type == "K"){
            return (this.count + this.leaders * 100 + this.charGp * 50);
        } else if (this.type == "R" || "RA") {
            return (this.count*2 + this.leaders * 100 + this.charGp * 50);
        } else if (this.type == "LKP") {
            return (this.count*1000 + this.leaders * 100 + this.charGp * 50);
        } else if (this.type == "SKP") {
            return (this.count*2000 + this.leaders * 100 + this.charGp * 50);
        }
    }
}
