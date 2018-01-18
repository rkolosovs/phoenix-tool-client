class BattleBox {
    private self: HTMLDivElement;
    private closeBattleButton: HTMLButtonElement;
    private attackersTitleText: HTMLDivElement;
    private defendersTitleText: HTMLDivElement;
    private attackArmiesBox: HTMLDivElement;
    private unsortedArmiesBox: HTMLDivElement;
    private defenseArmiesBox: HTMLDivElement;
    private attackBattleSide: HTMLDivElement;
    private attackDiceRoll: HTMLSelectElement;
    private defenseDiceRoll: HTMLSelectElement;
    private defenseBattleSide: HTMLDivElement;
    private battleButton: HTMLButtonElement;

    private battleHandler: BattleHandler;

    private attackSoldiers = 0;
    private attackOfficers = 0;
    private attackRiders = 0;
    private attackGuardSoldiers = 0;
    private attackGuardRiders = 0;

    private attackShips = 0;
    private attackLightWarships = 0;
    private attackHeavyWarships = 0;
    private attackGuardShips = 0;

    private defenseSoldiers = 0;
    private defenseOfficers = 0;
    private defenseRiders = 0;
    private defenseGuardSoldiers = 0;
    private defenseGuardRiders = 0;

    private defenseShips = 0;
    private defenseLightWarships = 0;
    private defenseHeavyWarships = 0;
    private defenseGuardShips = 0;

    newBattle(participants: Army[], location: [number, number]): void{
        this.battleHandler = new BattleHandler(participants, location);
        this.updateTroopCounts();
        this.updateDisplay();
    }

    moveToAttack(i: number): (() => void) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.unsortedArmies.splice(i, 1);
            ctx.battleHandler.attackerArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        }
    }

    moveToDefense(i: number): (() => void) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.unsortedArmies.splice(i, 1);
            ctx.battleHandler.defenderArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        }
    }

    removeFromDefense(i: number): (() => void) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.defenderArmies.splice(i, 1);
            ctx.battleHandler.unsortedArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        }
    }

    removeFromAttack(i: number): (() => void) {
        let ctx = this;
        return function () {
            let t = ctx.battleHandler.attackerArmies.splice(i, 1);
            ctx.battleHandler.unsortedArmies.push(t[0]);
            ctx.updateTroopCounts();
            ctx.updateDisplay();
        }
    }

    updateTroopCounts(): void {
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
        let ctx = this;

        this.battleHandler.attackerArmies.forEach(function (item) {
            if (item instanceof FootArmy) {//footman army
                if (item.isGuard) {
                    ctx.attackGuardSoldiers += item.getTroopCount();
                } else {
                    ctx.attackSoldiers += item.getTroopCount();
                }
            } else if (item instanceof RiderArmy) {//rider army
                if (item.isGuard) {
                    ctx.attackGuardRiders += item.getTroopCount();
                } else {
                    ctx.attackRiders += item.getTroopCount();
                }
            } else if (item instanceof Fleet) {//navy
                if (item.isGuard) {
                    ctx.attackGuardShips += item.getTroopCount();
                } else {
                    ctx.attackShips += item.getTroopCount();
                }
                ctx.attackLightWarships += item.getLightCatapultCount();
                ctx.attackHeavyWarships += item.getHeavyCatapultCount();
            }
            ctx.attackOfficers += (item as Army).getOfficerCount();
        });
        this.battleHandler.defenderArmies.forEach(function (item) {
            if (item instanceof FootArmy) {//footman army
                if (item.isGuard) {
                    ctx.defenseGuardSoldiers += item.getTroopCount();
                } else {
                    ctx.defenseSoldiers += item.getTroopCount();
                }
            } else if (item instanceof RiderArmy) {//rider army
                if (item.isGuard) {
                    ctx.defenseGuardRiders += item.getTroopCount();
                } else {
                    ctx.defenseRiders += item.getTroopCount();
                }
            } else if (item instanceof Fleet) {//navy
                if (item.isGuard) {
                    ctx.defenseGuardShips += item.getTroopCount();
                } else {
                    ctx.defenseShips += item.getTroopCount();
                }
                ctx.defenseLightWarships += item.getLightCatapultCount();
                ctx.defenseHeavyWarships += item.getHeavyCatapultCount();
            }
            ctx.defenseOfficers += (item as Army).getOfficerCount();
        });
    }

    updateDisplay(): void {
        //enable / disable the battle button
        if (this.battleHandler.attackerArmies.length === 0 || this.battleHandler.defenderArmies.length === 0) {
            this.getBattleButton().disabled = true;
            this.getBattleButton().style.cursor = "not-allowed";
        } else {
            this.getBattleButton().disabled = false;
            this.getBattleButton().style.cursor = "initial";
        }

        this.updateArmyLists();

        this.updateTroopSummaries();

        this.updateResultPreview();
    }

    private updateArmyLists(): void {
        //fill the sortable lists of armies
        this.getAttackArmiesBox().innerHTML = "";
        this.battleHandler.attackerArmies.forEach(function (item, index) {
            let listItem = document.createElement("DIV");
            this.getAttackArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");

            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.ownerTag() + " " + item.armyId;
            listItem.appendChild(div);

            let moveBtn = document.createElement("BUTTON");
            moveBtn.classList.add("armyListButton");
            moveBtn.classList.add("moveRightButton");
            moveBtn.onclick = this.removeFromAttack(index);
            listItem.appendChild(moveBtn);
        }, this);

        this.getUnsortedArmiesBox().innerHTML = "";
        this.battleHandler.unsortedArmies.forEach(function (item, index) {
            let listItem = document.createElement("DIV");
            this.getUnsortedArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");

            let moveLeftBtn = document.createElement("BUTTON");
            moveLeftBtn.classList.add("armyListButton");
            moveLeftBtn.classList.add("moveLeftButton");
            moveLeftBtn.onclick = this.moveToAttack(index);
            listItem.appendChild(moveLeftBtn);

            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.ownerTag() + " " + item.armyId;
            listItem.appendChild(div);

            let moveRightBtn = document.createElement("BUTTON");
            moveRightBtn.classList.add("armyListButton");
            moveRightBtn.classList.add("moveRightButton");
            moveRightBtn.onclick = this.moveToDefense(index);
            listItem.appendChild(moveRightBtn);
        }, this);

        this.getDefenseArmiesBox().innerHTML = "";
        this.battleHandler.defenderArmies.forEach(function (item, index) {
            let listItem = document.createElement("DIV");
            this.getDefenseArmiesBox().appendChild(listItem);
            listItem.classList.add("armyListItem");

            let moveBtn = document.createElement("BUTTON");
            moveBtn.classList.add("armyListButton");
            moveBtn.classList.add("moveLeftButton");
            moveBtn.onclick = this.removeFromDefense(index);
            listItem.appendChild(moveBtn);

            let div = document.createElement("DIV");
            div.classList.add("center");
            div.innerHTML = item.ownerTag() + " " + item.armyId;
            listItem.appendChild(div);
        }, this);
    }

    private updateTroopSummaries(): void {
        //write the troop count summaries
        this.getAttackBattleSide().innerHTML = "";
        this.getDefenseBattleSide().innerHTML = "";
        if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
            this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
            //naval combat
            if (this.attackShips > 0) { this.getAttackBattleSide().innerHTML += "<p>Shiffe: " + this.attackShips + "</p>"; }
            if (this.attackGuardShips > 0) { this.getAttackBattleSide().innerHTML += "<p>Gardeschiffe: " + this.attackGuardShips + "</p>"; }

            if (this.defenseShips > 0) { this.getDefenseBattleSide().innerHTML += "<p>Shiffe: " + this.defenseShips + "</p>"; }
            if (this.defenseGuardShips > 0) { this.getDefenseBattleSide().innerHTML += "<p>Gardeschiffe: " + this.defenseGuardShips + "</p>"; }
            if (this.defenseLightWarships > 0) { this.getDefenseBattleSide().innerHTML += "<p>Leichte Kreigsschiffe: " + this.defenseLightWarships + "</p>"; }
            if (this.defenseHeavyWarships > 0) { this.getDefenseBattleSide().innerHTML += "<p>Schwere Kriegsschiffe: " + this.defenseHeavyWarships + "</p>"; }
        } else {
            //land combat
            if (this.attackSoldiers > 0) { this.getAttackBattleSide().innerHTML += "<p>Soldaten: " + this.attackSoldiers + "</p>"; }
            if (this.attackRiders > 0) { this.getAttackBattleSide().innerHTML += "<p>Reiter: " + this.attackRiders + "</p>"; }
            if (this.attackGuardSoldiers > 0) { this.getAttackBattleSide().innerHTML += "<p>Gardesoldaten: " + this.attackGuardSoldiers + "</p>"; }
            if (this.attackGuardRiders > 0) { this.getAttackBattleSide().innerHTML += "<p>Gardereiter: " + this.attackGuardRiders + "</p>"; }

            if (this.defenseSoldiers > 0) { this.getDefenseBattleSide().innerHTML += "<p>Soldaten: " + this.defenseSoldiers + "</p>"; }
            if (this.defenseRiders > 0) { this.getDefenseBattleSide().innerHTML += "<p>Reiter: " + this.defenseRiders + "</p>"; }
            if (this.defenseGuardSoldiers > 0) { this.getDefenseBattleSide().innerHTML += "<p>Gardesoldaten: " + this.defenseGuardSoldiers + "</p>"; }
            if (this.defenseGuardRiders > 0) { this.getDefenseBattleSide().innerHTML += "<p>Gardereiter: " + this.defenseGuardRiders + "</p>"; }
        }
        if (this.attackOfficers > 0) { this.getAttackBattleSide().innerHTML += "<p>Heerführer: " + this.attackOfficers + "</p>"; }
        if (this.defenseOfficers > 0) { this.getDefenseBattleSide().innerHTML += "<p>Heerführer: " + this.defenseOfficers + "</p>"; }

        this.getAttackBattleSide().innerHTML += "<p>Würfelwurf: " + this.getAttackDiceRoll().value + "</p>";
        this.getDefenseBattleSide().innerHTML += "<p>Würfelwurf: " + this.getDefenseDiceRoll().value + "</p>";
    }

    private updateResultPreview(): void {
        //Instant result preview (remove if not desired)
        let battleResult: BattleResult = this.battleHandler.calculateResult(this.battleHandler.attackerArmies.map((val) => (val)),
            this.battleHandler.defenderArmies.map((val) => (val)), [], [], this.battleHandler.location,
            parseInt(this.getAttackDiceRoll().value), parseInt(this.getDefenseDiceRoll().value));

        let attackFootLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index].armyType() === 1 && !this.battleHandler.attackerArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let attackCavLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index].armyType() === 2 && !this.battleHandler.attackerArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let attackFleetLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index].armyType() === 3 && !this.battleHandler.attackerArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let attackGuardFootLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index].armyType() === 1 && this.battleHandler.attackerArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let attackGuardCavLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index].armyType() === 2 && this.battleHandler.attackerArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let attackGuardFleetLosses = battleResult.attackerLosses.reduce((total, current, index) => {
            if (this.battleHandler.attackerArmies[index].armyType() === 3 && this.battleHandler.attackerArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);

        let defenseFootLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index].armyType() === 1 && !this.battleHandler.defenderArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let defenseCavLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index].armyType() === 2 && !this.battleHandler.defenderArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let defenseFleetLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index].armyType() === 3 && !this.battleHandler.defenderArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let defenseGuardFootLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index].armyType() === 1 && this.battleHandler.defenderArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let defenseGuardCavLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index].armyType() === 2 && this.battleHandler.defenderArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);
        let defenseGuardFleetLosses = battleResult.defenderLosses.reduce((total, current, index) => {
            if (this.battleHandler.defenderArmies[index].armyType() === 3 && this.battleHandler.defenderArmies[index].isGuard)
            { return total + Math.round(current); }
            else { return total; }
        }, 0);

        if (battleResult.result === Result.ATTACKER_OVERRUN || battleResult.result === Result.ATTACKER_VICTORY) {
            if (battleResult.result === Result.ATTACKER_OVERRUN) {
                this.getDefenseBattleSide().innerHTML += "<p class=\"red\">Überrant!</p>";
            } else {
                this.getDefenseBattleSide().innerHTML += "<p class=\"red\">Besiegt!</p>";
                this.getAttackBattleSide().innerHTML = "";
                if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
                    this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
                    //naval battle
                    let lossProportion = ((attackFleetLosses + attackGuardFleetLosses) / (this.attackShips + this.attackGuardShips));
                    let officerLosses = Math.round(lossProportion * this.attackOfficers);
                    if (this.attackShips > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Schiffe: " +
                            this.attackShips + "<div class=\"red inline\"> -" + attackFleetLosses + "</div></div>";
                    }
                    if (this.attackGuardShips > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardeschiffe: " +
                            this.attackGuardShips + "<div class=\"red inline\"> -" + attackGuardFleetLosses + "</div></div>";
                    }
                    if (this.attackOfficers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Heerführer: " +
                            this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                } else {
                    //land battle
                    let officerLosses = Math.round(((attackFootLosses + attackCavLosses + attackGuardFootLosses + attackGuardCavLosses) /
                        (this.attackSoldiers + this.attackRiders + this.attackGuardSoldiers + this.attackGuardRiders)) * this.attackOfficers);
                    if (this.attackSoldiers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Soldaten: " +
                            this.attackSoldiers + "<div class=\"red inline\"> -" + attackFootLosses + "</div></div>";
                    }
                    if (this.attackRiders > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Reiter: " +
                            this.attackRiders + "<div class=\"red inline\"> -" + attackCavLosses + "</div></div>";
                    }
                    if (this.attackGuardSoldiers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardesoldaten: " +
                            this.attackGuardSoldiers + "<div class=\"red inline\"> -" + attackGuardFootLosses + "</div></div>";
                    }
                    if (this.attackGuardRiders > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Gardereiter: " +
                            this.attackGuardRiders + "<div class=\"red inline\"> -" + attackGuardCavLosses + "</div></div>";
                    }
                    if (this.attackOfficers > 0) {
                        this.getAttackBattleSide().innerHTML += "<div>Heerführer: " +
                            this.attackOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
            }
        } else if (battleResult.result === Result.DEFENDER_OVERRUN || battleResult.result === Result.DEFENDER_VICTORY) {
            if (battleResult.result === Result.DEFENDER_OVERRUN) {
                this.getAttackBattleSide().innerHTML += "<p class=\"red\">Überrant!</p>";
            } else {
                this.getAttackBattleSide().innerHTML += "<p class=\"red\">Besiegt!</p>";
                this.getDefenseBattleSide().innerHTML = "";
                if (this.attackShips + this.attackLightWarships + this.attackHeavyWarships + this.attackGuardShips > 0 ||
                    this.defenseShips + this.defenseLightWarships + this.defenseHeavyWarships + this.defenseGuardShips > 0) {
                    //naval battle
                    let lossProportion = ((defenseFleetLosses + defenseGuardFleetLosses) / (this.defenseShips + this.defenseGuardShips));
                    let officerLosses = Math.round(lossProportion * this.defenseOfficers);
                    let lightWarshipLosses = Math.round(lossProportion * this.defenseLightWarships);
                    let heavyWarshipLosses = Math.round(lossProportion * this.defenseHeavyWarships);
                    if (this.defenseShips > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Schiffe: " +
                            this.defenseShips + "<div class=\"red inline\"> -" + defenseFleetLosses + "</div></div>";
                    }
                    if (this.defenseGuardShips > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardeschiffe: " +
                            this.defenseGuardShips + "<div class=\"red inline\"> -" + defenseGuardFleetLosses + "</div></div>";
                    }
                    if (this.defenseLightWarships > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Leichte Kriegsschiffe: " +
                            this.defenseLightWarships + "<div class=\"red inline\"> -" + lightWarshipLosses + "</div></div>";
                    }
                    if (this.defenseHeavyWarships > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Schwere Kriegsschiffe: " +
                            this.defenseHeavyWarships + "<div class=\"red inline\"> -" + heavyWarshipLosses + "</div></div>";
                    }
                    if (this.defenseOfficers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Heerführer: " +
                            this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                } else {
                    //land battle
                    let officerLosses = Math.round(((defenseFootLosses + defenseCavLosses + defenseGuardFootLosses + defenseGuardCavLosses) /
                        (this.defenseSoldiers + this.defenseRiders + this.defenseGuardSoldiers + this.defenseGuardRiders)) * this.defenseOfficers);
                    if (this.defenseSoldiers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Soldaten: " +
                            this.defenseSoldiers + "<div class=\"red inline\"> -" + defenseFootLosses + "</div></div>";
                    }
                    if (this.defenseRiders > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Reiter: " +
                            this.defenseRiders + "<div class=\"red inline\"> -" + defenseCavLosses + "</div></div>";
                    }
                    if (this.defenseGuardSoldiers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardesoldaten: " +
                            this.defenseGuardSoldiers + "<div class=\"red inline\"> -" + defenseGuardFootLosses + "</div></div>";
                    }
                    if (this.defenseGuardRiders > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Gardereiter: " +
                            this.defenseGuardRiders + "<div class=\"red inline\"> -" + defenseGuardCavLosses + "</div></div>";
                    }
                    if (this.defenseOfficers > 0) {
                        this.getDefenseBattleSide().innerHTML += "<div>Heerführer: " +
                            this.defenseOfficers + "<div class=\"red inline\"> -" + officerLosses + "</div></div>";
                    }
                }
            }
        }
    }

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("battleBox") as HTMLDivElement;
        }
        return this.self;
    }

    getCloseBattleButton(): HTMLButtonElement{
        if(this.closeBattleButton == undefined){
            this.closeBattleButton = document.getElementById("closeBattleButton") as HTMLButtonElement;
        }
        return this.closeBattleButton;
    }

    getAttackersTitleText(): HTMLDivElement{
        if(this.attackersTitleText == undefined){
            this.attackersTitleText = document.getElementById("attackersTitleText") as HTMLDivElement;
        }
        return this.attackersTitleText;
    }

    getDefendersTitleText(): HTMLDivElement{
        if(this.defendersTitleText == undefined){
            this.defendersTitleText = document.getElementById("defendersTitleText") as HTMLDivElement;
        }
        return this.defendersTitleText;
    }

    getAttackArmiesBox(): HTMLDivElement{
        if(this.attackArmiesBox == undefined){
            this.attackArmiesBox = document.getElementById("attackArmiesBox") as HTMLDivElement;
        }
        return this.attackArmiesBox;
    }

    getUnsortedArmiesBox(): HTMLDivElement{
        if(this.unsortedArmiesBox == undefined){
            this.unsortedArmiesBox = document.getElementById("unsortedArmiesBox") as HTMLDivElement;
        }
        return this.unsortedArmiesBox;
    }

    getDefenseArmiesBox(): HTMLDivElement{
        if(this.defenseArmiesBox == undefined){
            this.defenseArmiesBox = document.getElementById("defenseArmiesBox") as HTMLDivElement;
        }
        return this.defenseArmiesBox;
    }

    getAttackBattleSide(): HTMLDivElement{
        if(this.attackBattleSide == undefined){
            this.attackBattleSide = document.getElementById("attackBattleSide") as HTMLDivElement;
        }
        return this.attackBattleSide;
    }

    getAttackDiceRoll(): HTMLSelectElement{
        if(this.attackDiceRoll == undefined){
            this.attackDiceRoll = document.getElementById("attackDiceRoll") as HTMLSelectElement;
        }
        return this.attackDiceRoll;
    }

    getDefenseDiceRoll(): HTMLSelectElement{
        if(this.defenseDiceRoll == undefined){
            this.defenseDiceRoll = document.getElementById("defenseDiceRoll") as HTMLSelectElement;
        }
        return this.defenseDiceRoll;
    }

    getDefenseBattleSide(): HTMLDivElement{
        if(this.defenseBattleSide == undefined){
            this.defenseBattleSide = document.getElementById("defenseBattleSide") as HTMLDivElement;
        }
        return this.defenseBattleSide;
    }

    getBattleButton(): HTMLButtonElement{
        if(this.battleButton == undefined){
            this.battleButton = document.getElementById("battleButton") as HTMLButtonElement;
        }
        return this.battleButton;
    }
}