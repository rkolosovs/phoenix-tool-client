/*Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This file is part of Phoenixclient.

Phoenixclient is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Phoenixclient is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Phoenixclient.  If not, see <http://www.gnu.org/licenses/>.*/

import { GodFunctions } from "../godmode/godModeFunctions";

export class ArmyGeneratorBox{
    private self: HTMLDivElement|undefined;
    private ownerField: HTMLInputElement|undefined;
    private armyNumberField: HTMLInputElement|undefined;
    private countField: HTMLInputElement|undefined;
    private leaderField: HTMLInputElement|undefined;
    private mountsField: HTMLInputElement|undefined;
    private lkpField: HTMLInputElement|undefined;
    private skpField: HTMLInputElement|undefined;
    private guardField: HTMLInputElement|undefined;
    private generateArmyBtn: HTMLButtonElement|undefined;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("armyGeneratorBox") as HTMLDivElement;
        }
        return this.self;
    }

    getOwnerField(): HTMLInputElement{
        if(this.ownerField == undefined){
            this.ownerField = document.getElementById("ownerField") as HTMLInputElement;
        }
        return this.ownerField;
    }

    getArmyNumberField(): HTMLInputElement{
        if(this.armyNumberField == undefined){
            this.armyNumberField = document.getElementById("armyNumberField") as HTMLInputElement;
        }
        return this.armyNumberField;
    }

    getCountField(): HTMLInputElement{
        if(this.countField == undefined){
            this.countField = document.getElementById("countField") as HTMLInputElement;
        }
        return this.countField;
    }

    getLeaderField(): HTMLInputElement{
        if(this.leaderField == undefined){
            this.leaderField = document.getElementById("leaderField") as HTMLInputElement;
        }
        return this.leaderField;
    }

    getMountsField(): HTMLInputElement{
        if(this.mountsField == undefined){
            this.mountsField = document.getElementById("mountsField") as HTMLInputElement;
        }
        return this.mountsField;
    }

    getLKPField(): HTMLInputElement{
        if(this.lkpField == undefined){
            this.lkpField = document.getElementById("lkpField") as HTMLInputElement;
        }
        return this.lkpField;
    }

    getSKPField(): HTMLInputElement{
        if(this.skpField == undefined){
            this.skpField = document.getElementById("skpField") as HTMLInputElement;
        }
        return this.skpField;
    }

    getGuardField(): HTMLInputElement{
        if(this.guardField == undefined){
            this.guardField = document.getElementById("guardField") as HTMLInputElement;
        }
        return this.guardField;
    }

    getGenerateArmyBtn(): HTMLButtonElement{
        if(this.generateArmyBtn == undefined){
            this.generateArmyBtn = document.getElementById("GenerateArmyBtn") as HTMLButtonElement;
            this.generateArmyBtn.onclick = function (){GodFunctions.generateArmyBtn();}
        }
        return this.generateArmyBtn;
    }
}