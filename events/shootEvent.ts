import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Drawing} from "../gui/drawingFunctions";
import {ShootingBigBox} from "../gui/shootingBigBox";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {PhoenixEvent} from "./event";
import {EventStatus} from "./eventStatus";
import {ButtonFunctions} from "../controls/buttonFunctions";

export class ShootEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, protected realm: Realm, protected armyId: number,
                protected to: [number, number], protected from: [number, number], protected lkpCount: number,
                protected skpCount: number, protected target: string, databasePrimaryKey: number){
        super(listPosition, status, databasePrimaryKey);
    }

    getContent(): JSON{
        // TODO
        return JSON.parse('{}');
    }

    getLightCatapultCount(): number{
        return this.lkpCount;
    }

    getHeavyCatapultCount(): number{
        return this.skpCount;
    }

    getTo(): [number, number]{
        return this.to;
    }

    getTarget(): string{
        return this.target;
    }

    getArmyId(): number{
        return this.armyId;
    }

    getRealm(): Realm{
        return this.realm;
    }

    checkEvent(): void{
        let shootBox: ShootingBigBox = GUI.getShootingBigBox();
        BoxVisibility.show(shootBox.getSelf());

        shootBox.getShooterTitleText().innerHTML = this.armyId + ", " + this.realm.tag;;
        shootBox.getAttackersLKPText().innerHTML = this.lkpCount.toString();
        shootBox.getAttackersSKPText().innerHTML = this.skpCount.toString();
        shootBox.getTargetText().innerHTML = this.target;
        shootBox.getXTargetText().innerHTML = this.to[0].toString();
        shootBox.getYTargetText().innerHTML = this.to[1].toString();

        let shootButton = shootBox.getRangedBattleButton();
        shootButton.addEventListener("click", (e:Event) => ButtonFunctions.shootButtonLogic(this));

        shootBox.getCloseRangedBattleButton().onclick = function(){
            BoxVisibility.hide(shootBox.getSelf());
        };
        GUI.getBigBox().fillEventList();
        //sendCheckEvent(event.pk, event.type);
        Drawing.drawStuff();
    }
    
    determineEventStatus(): void{
        if (!(this.status === EventStatus.Checked || this.status === EventStatus.Deleted)) {

            let shooter = GameState.armies[this.findArmyPlaceInList(this.armyId, this.realm)];
            let canShoot = true;

            //check if remaining Lkp that have not shot yet
            if(shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() < this.lkpCount){
                canShoot = false;
            }
            //check if remaining Lkp that have not shot yet
            if(shooter.getHeavyCatapultCount() - shooter.getHeavyCatapultsShot() < this.skpCount){
                canShoot = false;
            }

            if (this.armyExistsAndIsLocated(shooter.owner.tag, this.armyId, this.from[0], this.from[1]) && canShoot) {
                this.status = EventStatus.Available;
            } else if (this.armyExists(this.realm, this.armyId) && 
            this.possibleMoveOfArmyTo(shooter.owner.tag, this.armyId, this.from[0], this.from[1])) {
                this.status = EventStatus.Withheld;
            } else {
                this.status = EventStatus.Impossible;
            }
        }
    }

    makeEventListItemText(): string{
        return ""+ this.realm.tag +"'s army "+this.armyId+" shoots a Field ("+this.to[0]+", "+ this.to[1]+") with " +
            this.lkpCount + " LKP and " + this.skpCount + " SKP";
    }
}