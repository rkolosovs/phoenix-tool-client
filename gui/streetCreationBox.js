"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StreetCreationBox {
    getSelf() {
        if (this.self == undefined) {
            this.self = document.getElementById("streetCreationBox");
        }
        return this.self;
    }
    getBuildStreet() {
        if (this.buildStreet == undefined) {
            this.buildStreet = document.getElementById("buildStreet");
        }
        return this.buildStreet;
    }
    getAddStreetNW() {
        if (this.addStreetNW == undefined) {
            this.addStreetNW = document.getElementById("addStreetNW");
        }
        return this.addStreetNW;
    }
    getAddStreetNE() {
        if (this.addStreetNE == undefined) {
            this.addStreetNE = document.getElementById("addStreetNE");
        }
        return this.addStreetNE;
    }
    getAddStreetE() {
        if (this.addStreetE == undefined) {
            this.addStreetE = document.getElementById("addStreetE");
        }
        return this.addStreetE;
    }
    getAddStreetSE() {
        if (this.addStreetSE == undefined) {
            this.addStreetSE = document.getElementById("addStreetSE");
        }
        return this.addStreetSE;
    }
    getAddStreetSW() {
        if (this.addStreetSW == undefined) {
            this.addStreetSW = document.getElementById("addStreetSW");
        }
        return this.addStreetSW;
    }
    getAddStreetW() {
        if (this.addStreetW == undefined) {
            this.addStreetW = document.getElementById("addStreetW");
        }
        return this.addStreetW;
    }
    getRemoveStreet() {
        if (this.removeStreet == undefined) {
            this.removeStreet = document.getElementById("removeStreet");
        }
        return this.removeStreet;
    }
    getRemoveStreetNW() {
        if (this.removeStreetNW == undefined) {
            this.removeStreetNW = document.getElementById("removeStreetNW");
        }
        return this.removeStreetNW;
    }
    getRemoveStreetNE() {
        if (this.removeStreetNE == undefined) {
            this.removeStreetNE = document.getElementById("removeStreetNE");
        }
        return this.removeStreetNE;
    }
    getRemoveStreetE() {
        if (this.removeStreetE == undefined) {
            this.removeStreetE = document.getElementById("removeStreetE");
        }
        return this.removeStreetE;
    }
    getRemoveStreetSE() {
        if (this.removeStreetSE == undefined) {
            this.removeStreetSE = document.getElementById("removeStreetSE");
        }
        return this.removeStreetSE;
    }
    getRemoveStreetSW() {
        if (this.removeStreetSW == undefined) {
            this.removeStreetSW = document.getElementById("removeStreetSW");
        }
        return this.removeStreetSW;
    }
    getRemoveStreetW() {
        if (this.removeStreetW == undefined) {
            this.removeStreetW = document.getElementById("removeStreetW");
        }
        return this.removeStreetW;
    }
    getSaveBuildings() {
        if (this.saveBuildings == undefined) {
            this.saveBuildings = document.getElementById("SaveBuildings");
        }
        return this.saveBuildings;
    }
}
exports.StreetCreationBox = StreetCreationBox;
