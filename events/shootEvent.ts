import {GUI} from "../gui/gui";
import {BoxVisibility} from "../gui/boxVisibilty";
import {Drawing} from "../gui/drawingFunctions";
import {ShootingBigBox} from "../gui/shootingBigBox";
import {Realm} from "../realm";
import {GameState} from "../gameState";
import {PhoenixEvent} from "./event";
import {EventStatus} from "./eventStatus";
import {ButtonFunctions} from "../controls/buttonFunctions";
import {Army} from "../armies/army";
import {ShootingTarget} from "../armies/shootingFunctions";

export class ShootEvent extends PhoenixEvent{
    
    constructor(listPosition: number, status: EventStatus, protected realm: Realm, protected shooterId: number,
                protected to: [number, number], protected from: [number, number], protected lkpCount: number,
                protected skpCount: number, protected target: ShootingTarget, prerequisiteEvents?: number[],
                databasePrimaryKey?: number){
        super(listPosition, status, prerequisiteEvents, databasePrimaryKey);
    }

    typeAsString(): string{
        return "shoot";
    }

    protected getContent(): string{
        return "{'armyId': " + this.shooterId + ", 'realm': " + this.realm.tag +
            ", 'LKPcount': " + this.lkpCount + ", 'SKPcount': " + this.skpCount +
            ", 'fromX': " + this.from[0] + ", 'fromY': " + this.from[1] +
            ", 'toX': " + this.to[0] + ", 'toY': " + this.to[1] +
            ", 'target': " + (this.target === ShootingTarget.OnField)?"on field":"wall" + "}";
    }

    protected validGameState(): boolean{
        //Shooter exists, is positioned on the from-field, has enough catapults and the target is valid
        let shooter: Army|undefined = GameState.armies.find(army =>
            army.owner === this.realm &&
            army.getErkenfaraID() === this.shooterId &&
            army.getPosition()[0] === this.from[0] &&
            army.getPosition()[1] === this.from[1]);
        if(shooter != undefined){
            shooter.findShootingTargets();
            return (shooter.getLightCatapultCount() - shooter.getLightCatapultsShot() >= this.lkpCount) &&
                (shooter.getHeavyCatapultCount() - shooter.getHeavyCatapultsShot() >= this.skpCount) &&
                shooter.targetList.some(target => target[0] === this.to[0] && target[1] === this.to[1]);
        } else{
            return false;
        }
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

    getTarget(): ShootingTarget{
        return this.target;
    }

    getShooterId(): number{
        return this.shooterId;
    }

    getRealm(): Realm{
        return this.realm;
    }

    checkEvent(): void{
        let shootBox: ShootingBigBox = GUI.getShootingBigBox();
        BoxVisibility.show(shootBox.getSelf());

        shootBox.getShooterTitleText().innerHTML = this.shooterId + ", " + this.realm.tag;;
        shootBox.getAttackersLKPText().innerHTML = this.lkpCount.toString();
        shootBox.getAttackersSKPText().innerHTML = this.skpCount.toString();
        shootBox.getTargetText().innerHTML = this.target === ShootingTarget.OnField?"On Field":"Wall";
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

    makeEventListItemText(): string{
        return ""+ this.realm.tag +"'s army "+this.shooterId+" shoots a Field ("+this.to[0]+", "+ this.to[1]+") with " +
            this.lkpCount + " LKP and " + this.skpCount + " SKP";
    }
}