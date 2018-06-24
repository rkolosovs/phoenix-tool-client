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

import {GodFunctions, Saving} from "../types";

export class WorldBenderBox{
    private self: HTMLDivElement|undefined;
    private creationWarning: HTMLHeadingElement|undefined;
    private toggleOnClickWorldCreationMode: HTMLButtonElement|undefined;
    private saveFields: HTMLButtonElement|undefined;
    private changeFieldSection: HTMLTableSectionElement|undefined;
    private changeFieldClickedTo0: HTMLButtonElement|undefined;
    private changeFieldClickedTo1: HTMLButtonElement|undefined;
    private changeFieldClickedTo2: HTMLButtonElement|undefined;
    private changeFieldClickedTo3: HTMLButtonElement|undefined;
    private changeFieldClickedTo4: HTMLButtonElement|undefined;
    private changeFieldClickedTo5: HTMLButtonElement|undefined;
    private changeFieldClickedTo6: HTMLButtonElement|undefined;
    private changeFieldClickedTo7: HTMLButtonElement|undefined;
    private changeFieldClickedTo8: HTMLButtonElement|undefined;
    private changeFieldClickedTo9: HTMLButtonElement|undefined;

    getSelf(): HTMLDivElement{
        if(this.self == undefined){
            this.self = document.getElementById("worldBenderBox") as HTMLDivElement;
        }
        return this.self;
    }

    getCreationWarning(): HTMLHeadingElement{
        if(this.creationWarning == undefined){
            this.creationWarning = document.getElementById("creationWarning") as HTMLHeadingElement;
        }
        return this.creationWarning;
    }

    getToggleOnClickWorldCreationMode(): HTMLButtonElement{
        if(this.toggleOnClickWorldCreationMode == undefined){
            this.toggleOnClickWorldCreationMode = document.getElementById("ToggleOnClickWorldCreationMode") as HTMLButtonElement;
            this.toggleOnClickWorldCreationMode.onclick = function(){GodFunctions.toggleOnClickWorldCreationMode()}
        }
        return this.toggleOnClickWorldCreationMode;
    }

    getSaveFields(): HTMLButtonElement{
        if(this.saveFields == undefined){
            this.saveFields = document.getElementById("SaveFields") as HTMLButtonElement;
            this.saveFields.onclick = function(){Saving.saveFields();};
        }
        return this.saveFields;
    }

    getChangeFieldSection(): HTMLTableSectionElement{
        if(this.changeFieldSection == undefined){
            this.changeFieldSection = document.getElementById("changeFieldSection") as HTMLTableSectionElement;
        }
        return this.changeFieldSection;
    }

    getChangeFieldClickedTo0(): HTMLButtonElement{
        if(this.changeFieldClickedTo0 == undefined){
            this.changeFieldClickedTo0 = document.getElementById("ChangeFieldClickedTo0") as HTMLButtonElement;
            this.changeFieldClickedTo0.onclick = function(){GodFunctions.changeFieldClickedTo(0);};
        }
        return this.changeFieldClickedTo0;
    }

    getChangeFieldClickedTo1(): HTMLButtonElement{
        if(this.changeFieldClickedTo1 == undefined){
            this.changeFieldClickedTo1 = document.getElementById("ChangeFieldClickedTo1") as HTMLButtonElement;
            this.changeFieldClickedTo1.onclick = function(){GodFunctions.changeFieldClickedTo(1);};
        }
        return this.changeFieldClickedTo1;
    }

    getChangeFieldClickedTo2(): HTMLButtonElement{
        if(this.changeFieldClickedTo2 == undefined){
            this.changeFieldClickedTo2 = document.getElementById("ChangeFieldClickedTo2") as HTMLButtonElement;
            this.changeFieldClickedTo2.onclick = function(){GodFunctions.changeFieldClickedTo(2);};
        }
        return this.changeFieldClickedTo2;
    }

    getChangeFieldClickedTo3(): HTMLButtonElement{
        if(this.changeFieldClickedTo3 == undefined){
            this.changeFieldClickedTo3 = document.getElementById("ChangeFieldClickedTo3") as HTMLButtonElement;
            this.changeFieldClickedTo3.onclick = function(){GodFunctions.changeFieldClickedTo(3);};
        }
        return this.changeFieldClickedTo3;
    }

    getChangeFieldClickedTo4(): HTMLButtonElement{
        if(this.changeFieldClickedTo4 == undefined){
            this.changeFieldClickedTo4 = document.getElementById("ChangeFieldClickedTo4") as HTMLButtonElement;
            this.changeFieldClickedTo4.onclick = function(){GodFunctions.changeFieldClickedTo(4);};
        }
        return this.changeFieldClickedTo4;
    }

    getChangeFieldClickedTo5(): HTMLButtonElement{
        if(this.changeFieldClickedTo5 == undefined){
            this.changeFieldClickedTo5 = document.getElementById("ChangeFieldClickedTo5") as HTMLButtonElement;
            this.changeFieldClickedTo5.onclick = function(){GodFunctions.changeFieldClickedTo(5);};
        }
        return this.changeFieldClickedTo5;
    }

    getChangeFieldClickedTo6(): HTMLButtonElement{
        if(this.changeFieldClickedTo6 == undefined){
            this.changeFieldClickedTo6 = document.getElementById("ChangeFieldClickedTo6") as HTMLButtonElement;
            this.changeFieldClickedTo6.onclick = function(){GodFunctions.changeFieldClickedTo(6);};
        }
        return this.changeFieldClickedTo6;
    }

    getChangeFieldClickedTo7(): HTMLButtonElement{
        if(this.changeFieldClickedTo7 == undefined){
            this.changeFieldClickedTo7 = document.getElementById("ChangeFieldClickedTo7") as HTMLButtonElement;
            this.changeFieldClickedTo7.onclick = function(){GodFunctions.changeFieldClickedTo(7);};
        }
        return this.changeFieldClickedTo7;
    }

    getChangeFieldClickedTo8(): HTMLButtonElement{
        if(this.changeFieldClickedTo8 == undefined){
            this.changeFieldClickedTo8 = document.getElementById("ChangeFieldClickedTo8") as HTMLButtonElement;
            this.changeFieldClickedTo8.onclick = function(){GodFunctions.changeFieldClickedTo(8);};
        }
        return this.changeFieldClickedTo8;
    }

    getChangeFieldClickedTo9(): HTMLButtonElement{
        if(this.changeFieldClickedTo9 == undefined){
            this.changeFieldClickedTo9 = document.getElementById("ChangeFieldClickedTo9") as HTMLButtonElement;
            this.changeFieldClickedTo9.onclick = function(){GodFunctions.changeFieldClickedTo(9);};
        }
        return this.changeFieldClickedTo9;
    }
}