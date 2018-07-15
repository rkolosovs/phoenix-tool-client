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

import { ButtonFunctions } from "../controls/buttonFunctions";
import { BoxVisibility } from "./boxVisibilty";
import { Authentication } from "../app";

export class InfoBox{
    private self: HTMLDivElement|undefined;
    private armySelectBtns: HTMLDivElement|undefined;
    private armyId: HTMLHeadingElement|undefined;
    private guard: HTMLParagraphElement|undefined;
    private count: HTMLParagraphElement|undefined;
    private leaders: HTMLParagraphElement|undefined;
    private mounts: HTMLParagraphElement|undefined;
    private lkp: HTMLParagraphElement|undefined;
    private skp: HTMLParagraphElement|undefined;
    private movePoints: HTMLParagraphElement|undefined;
    private heightPoints: HTMLParagraphElement|undefined;
    private mount: HTMLButtonElement|undefined;
    private unMount: HTMLButtonElement|undefined;
    private splitBtn: HTMLButtonElement|undefined;
    private shoot: HTMLButtonElement|undefined;
    private logoutBtn: HTMLButtonElement|undefined;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("infoBox") as HTMLDivElement;
        }
        return this.self;
    }

    getArmySelectButtons(): HTMLDivElement{
        if(this.armySelectBtns == undefined){
            this.armySelectBtns = document.getElementById("armySelectBtns") as HTMLDivElement;
        }
        return this.armySelectBtns;
    }

    getArmyIdText(): HTMLHeadingElement{
        if(this.armyId == undefined){
            this.armyId = document.getElementById("armyId") as HTMLHeadingElement;
        }
        return this.armyId;
    }

    getGuardText(): HTMLParagraphElement{
        if(this.guard == undefined){
            this.guard = document.getElementById("guard") as HTMLParagraphElement;
        }
        return this.guard;
    }

    getCountText(): HTMLParagraphElement{
        if(this.count == undefined){
            this.count = document.getElementById("count") as HTMLParagraphElement;
        }
        return this.count;
    }

    getLeadersText(): HTMLParagraphElement{
        if(this.leaders == undefined){
            this.leaders = document.getElementById("leaders") as HTMLParagraphElement;
        }
        return this.leaders;
    }

    getMountsText(): HTMLParagraphElement{
        if(this.mounts == undefined){
            this.mounts = document.getElementById("mounts") as HTMLParagraphElement;
        }
        return this.mounts;
    }

    getLKPText(): HTMLParagraphElement{
        if(this.lkp == undefined){
            this.lkp = document.getElementById("lkp") as HTMLParagraphElement;
        }
        return this.lkp;
    }

    getSKPText(): HTMLParagraphElement{
        if(this.skp == undefined){
            this.skp = document.getElementById("skp") as HTMLParagraphElement;
        }
        return this.skp;
    }

    getMovePointsText(): HTMLParagraphElement{
        if(this.movePoints == undefined){
            this.movePoints = document.getElementById("movePoints") as HTMLParagraphElement;
        }
        return this.movePoints;
    }

    getHeightPointsText(): HTMLParagraphElement{
        if(this.heightPoints == undefined){
            this.heightPoints = document.getElementById("heightPoints") as HTMLParagraphElement;
        }
        return this.heightPoints;
    }

    getMountButton(): HTMLButtonElement{
        if(this.mount == undefined){
            this.mount = document.getElementById("mount") as HTMLButtonElement;
            this.mount.onclick = function(){BoxVisibility.activateMountBox();};
        }
        return this.mount;
    }

    getUnMountButton(): HTMLButtonElement{
        if(this.unMount == undefined){
            this.unMount = document.getElementById("unMount") as HTMLButtonElement;
            this.unMount.onclick = function(){BoxVisibility.activateUnMountBox();};
        }
        return this.unMount;
    }

    getSplitButton(): HTMLButtonElement{
        if(this.splitBtn == undefined){
            this.splitBtn = document.getElementById("splitBtn") as HTMLButtonElement;
            this.splitBtn.onclick = function(){ButtonFunctions.activateSplitbox();};
        }
        return this.splitBtn;
    }

    getShootButton(): HTMLButtonElement{
        if(this.shoot == undefined){
            this.shoot = document.getElementById("shoot") as HTMLButtonElement;
            this.shoot.onclick = function(){ButtonFunctions.toggleShootingMode();};
        }
        return this.shoot;
    }

    getLogoutButton(): HTMLButtonElement{
        if(this.logoutBtn == undefined){
            this.logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;
            this.logoutBtn.onclick = function(){Authentication.logoutFromServer();};
        }
        return this.logoutBtn;
    }
}