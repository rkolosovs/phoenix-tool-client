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
import { Authentication } from "../app";

export class InfoChangeBox{
    private self: HTMLDivElement;
    private guardChangeInput: HTMLInputElement;
    private ownerChange: HTMLParagraphElement;
    private ownerChangeInput: HTMLInputElement;
    private armyIdChange: HTMLParagraphElement;
    private armyIdChangeInput: HTMLInputElement;
    private countChange: HTMLParagraphElement;
    private countChangeInput: HTMLInputElement;
    private leadersChange: HTMLParagraphElement;
    private leadersChangeInput: HTMLInputElement;
    private mountsChange: HTMLParagraphElement;
    private mountsChangeInput: HTMLInputElement;
    private lkpChange: HTMLParagraphElement;
    private lkpChangeInput: HTMLInputElement;
    private skpChange: HTMLParagraphElement;
    private skpChangeInput: HTMLInputElement;
    private movePointsChange: HTMLParagraphElement;
    private movePointsChangeInput: HTMLInputElement;
    private heightPointsChange: HTMLParagraphElement;
    private heightPointsChangeInput: HTMLInputElement;
    private changeArmyInfo: HTMLButtonElement;
    private logoutBtnChange: HTMLButtonElement;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("infoChangeBox") as HTMLDivElement;
        }
        return this.self;
    }

    getOwnerChange(): HTMLParagraphElement{
        if(this.ownerChange == undefined){
            this.ownerChange = document.getElementById("ownerChange") as HTMLParagraphElement;
        }
        return this.ownerChange;
    }

    getArmyIdChange(): HTMLParagraphElement{
        if(this.armyIdChange == undefined){
            this.armyIdChange = document.getElementById("armyIdChange") as HTMLParagraphElement;
        }
        return this.armyIdChange;
    }

    getCountChange(): HTMLParagraphElement{
        if(this.countChange == undefined){
            this.countChange = document.getElementById("countChange") as HTMLParagraphElement;
        }
        return this.countChange;
    }

    getLeadersChange(): HTMLParagraphElement{
        if(this.leadersChange == undefined){
            this.leadersChange = document.getElementById("leadersChange") as HTMLParagraphElement;
        }
        return this.leadersChange;
    }

    getMountsChange(): HTMLParagraphElement{
        if(this.mountsChange == undefined){
            this.mountsChange = document.getElementById("mountsChange") as HTMLParagraphElement;
        }
        return this.mountsChange;
    }

    getLKPChange(): HTMLParagraphElement{
        if(this.lkpChange == undefined){
            this.lkpChange = document.getElementById("lkpChange") as HTMLParagraphElement;
        }
        return this.lkpChange;
    }

    getSKPChange(): HTMLParagraphElement{
        if(this.skpChange == undefined){
            this.skpChange = document.getElementById("skpChange") as HTMLParagraphElement;
        }
        return this.skpChange;
    }

    getMovePointsChange(): HTMLParagraphElement{
        if(this.movePointsChange == undefined){
            this.movePointsChange = document.getElementById("movePointsChange") as HTMLParagraphElement;
        }
        return this.movePointsChange;
    }

    getHeightPointsChange(): HTMLParagraphElement{
        if(this.heightPointsChange == undefined){
            this.heightPointsChange = document.getElementById("heightPointsChange") as HTMLParagraphElement;
        }
        return this.heightPointsChange;
    }

    getGuardChangeInput(): HTMLInputElement{
        if(this.guardChangeInput == undefined){
            this.guardChangeInput = document.getElementById("guardChangeInput") as HTMLInputElement;
        }
        return this.guardChangeInput;
    }

    getOwnerChangeInput(): HTMLInputElement{
        if(this.ownerChangeInput == undefined){
            this.ownerChangeInput = document.getElementById("ownerChangeInput") as HTMLInputElement;
        }
        return this.ownerChangeInput;
    }

    getArmyIdChangeInput(): HTMLInputElement{
        if(this.armyIdChangeInput == undefined){
            this.armyIdChangeInput = document.getElementById("armyIdChangeInput") as HTMLInputElement;
        }
        return this.armyIdChangeInput;
    }

    getCountChangeInput(): HTMLInputElement{
        if(this.countChangeInput == undefined){
            this.countChangeInput = document.getElementById("countChangeInput") as HTMLInputElement;
        }
        return this.countChangeInput;
    }

    getLeadersChangeInput(): HTMLInputElement{
        if(this.leadersChangeInput == undefined){
            this.leadersChangeInput = document.getElementById("leadersChangeInput") as HTMLInputElement;
        }
        return this.leadersChangeInput;
    }

    getMountsChangeInput(): HTMLInputElement{
        if(this.mountsChangeInput == undefined){
            this.mountsChangeInput = document.getElementById("mountsChangeInput") as HTMLInputElement;
        }
        return this.mountsChangeInput;
    }

    getLKPChangeInput(): HTMLInputElement{
        if(this.lkpChangeInput == undefined){
            this.lkpChangeInput = document.getElementById("lkpChangeInput") as HTMLInputElement;
        }
        return this.lkpChangeInput;
    }

    getSKPChangeInput(): HTMLInputElement{
        if(this.skpChangeInput == undefined){
            this.skpChangeInput = document.getElementById("skpChangeInput") as HTMLInputElement;
        }
        return this.skpChangeInput;
    }

    getMovePointsChangeInput(): HTMLInputElement{
        if(this.movePointsChangeInput == undefined){
            this.movePointsChangeInput = document.getElementById("movePointsChangeInput") as HTMLInputElement;
        }
        return this.movePointsChangeInput;
    }

    getHeightPointsChangeInput(): HTMLInputElement{
        if(this.heightPointsChangeInput == undefined){
            this.heightPointsChangeInput = document.getElementById("heightPointsChangeInput") as HTMLInputElement;
        }
        return this.heightPointsChangeInput;
    }

    getChangeArmyInfoButton(): HTMLButtonElement{
        if(this.changeArmyInfo == undefined){
            this.changeArmyInfo = document.getElementById("changeArmyInfo") as HTMLButtonElement;
            this.changeArmyInfo.onclick = function(){GodFunctions.changeArmyInfo();};
        }
        return this.changeArmyInfo;
    }

    getLogoutButton(): HTMLButtonElement{
        if(this.logoutBtnChange == undefined){
            this.logoutBtnChange = document.getElementById("logoutBtnChange") as HTMLButtonElement;
            this.logoutBtnChange.onclick = function(){Authentication.logoutFromServer();};
        }
        return this.logoutBtnChange;
    }
}