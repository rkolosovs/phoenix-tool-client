import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Drawing} from "../gui/drawingFunctions";
import {ShootingBigBox} from "../gui/shootingBigBox";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {PhoenixEvent} from "./event";

export class ShootEvent extends PhoenixEvent{
    
    constructor(protected id: number, protected status: string, protected realm: Realm, 
        protected armyId: number, protected toX: number, protected toY: number, protected fromX: number, 
        protected fromY: number, protected lkpCount: number, protected skpCount: number, protected target: string, protected pk: number){
            
            super(id, status, pk);
    }

    checkEvent(): void{
        let shootBox: ShootingBigBox = GUI.getShootingBigBox();
        BoxVisibility.show(shootBox.getSelf());

        shootBox.getShooterTitleText().innerHTML = this.armyId + ", " + this.realm.tag;;
        shootBox.getAttackersLKPText().innerHTML = this.lkpCount.toString();
        shootBox.getAttackersSKPText().innerHTML = this.skpCount.toString();
        shootBox.getTargetText().innerHTML = this.target;
        shootBox.getXTargetText().innerHTML = this.toX.toString();
        shootBox.getYTargetText().innerHTML = this.toY.toString();

        let shootButton = shootBox.getRangedBattleButton();
        shootButton.addEventListener("click", (e:Event) => this.shootButtonLogic(shootBox));

        shootBox.getCloseRangedBattleButton().onclick = function(){
            BoxVisibility.hide(shootBox.getSelf());
        };
        fillEventList();
        //sendCheckEvent(event.pk, event.type);
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        if (this.status === 'undetermined' || this.status === 'available' ||
        this.status === 'withheld' || this.status === 'impossible') {

            let shooter = GameState.armies[this.findArmyPlaceInList(this.armyId, this.realm)];
            let canShoot = true;

            if(shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() < this.lkpCount){//check if remaining Lkp that have not shot yet
                canShoot = false;
            }
            if(shooter.getHeavyCatapultCount() - shooter.getHeavyCatapultsShot() < this.skpCount){//check if remaining Lkp that have not shot yet
                canShoot = false;
            }

            if (this.armyExistsAndIsLocated(shooter.owner.tag, this.armyId, this.fromX, this.fromY) && canShoot) {
                this.status = 'available';
            } else if (this.armyExists(this.realm, this.armyId) && 
            this.possibleMoveOfArmyTo(shooter.owner.tag, this.armyId, this.fromX, this.fromY)) {
                this.status = 'withheld';
            } else {
                this.status = 'impossible';
            }
        }
    }
    
    makeEventListItem(): HTMLElement{
        let eli = document.createElement("DIV");
        eli.classList.add("eventListItem");
        eli.id = "eli" + this.id;
        
        eli.innerHTML = "<div>"+ this.realm.tag +"'s army "+this.armyId+" shoots a Field ("+this.toX+", "+
        this.toY+") with "+this.lkpCount + " LKP and " + this.skpCount + " SKP.</div>";

        return this.commonEventListItem(eli, this.id);
    }

    getType(): string{
        return "shoot";
    }

    private shootButtonLogic(shootBox: ShootingBigBox): boolean{
        let shooter;
        let lkpRolls = [];
        let skpRolls = [];
        for(let i = 0; i < GameState.armies.length; i++){//TODO use array functions
            if(GameState.armies[i].getErkenfaraID() === this.armyId && GameState.armies[i].owner === this.realm)
            shooter = GameState.armies[i];
        }
        for(let i = 0; i < 10; i++){//creating the dice roll array
            let currentRollLKP = parseInt(shootBox.getLKPInputs()[i].value, 10);
            let currentRollSKP = parseInt(shootBox.getSKPInputs()[i].value, 10);
            if(!isNaN(currentRollLKP) && currentRollLKP !== 0){
                for(let j = 0; j < currentRollLKP; j++){
                    lkpRolls.push(i);
                }
            }
            if(!isNaN(currentRollSKP) && currentRollSKP !== 0){
                for(let j = 0; j < currentRollSKP; j++){
                    skpRolls.push(i);
                }
            }
        }
        //TODO check target field

        if(lkpRolls.length < this.lkpCount){
            window.alert("Sie haben zu wenig Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }else if(skpRolls.length < this.skpCount){
            window.alert("Sie haben zu wenig Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }else if(lkpRolls.length > this.lkpCount){
            window.alert("Sie haben zu viele Würfe für leichte Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }else if(skpRolls.length > this.skpCount){
            window.alert("Sie haben zu viele Würfe für schwere Katapulte/Kriegsschiffe eingetragenen");
            return false;
        }else{
            fernkampf(lkpRolls, skpRolls, shooter, this.target, [this.toX, this.toY], null);// TODO chars
            BoxVisibility.hide(shootBox.getSelf());
            this.status = 'checked';
            fillEventList();
            Drawing.drawStuff();
            return true;
        }
    }

}