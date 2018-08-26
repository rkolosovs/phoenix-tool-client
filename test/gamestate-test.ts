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

import {test, module} from "../node_modules/qunit";
import {
    Action, ADD_REALMS, addRealms, LOG_IN, LOG_OUT, logIn, logOut, REMOVE_REALMS, removeRealms, SET_REALMS, setRealms,
    UPDATE_REALMS, updateRealms
} from "../src/gameState/actions";
import {TurnStatus, UserGroup} from "../src/gameState/gameState";
import {Realm} from "../src/model/realm";
import {Field, FieldType} from "../src/model/map/field";
import {River} from "../src/model/map/river";
import {FootArmy} from "../src/model/armies/footArmy";
import {ProductionBuilding} from "../src/model/buildings/productionBuilding";
import {BuildingType} from "../src/model/buildings/building";
import {MoveEvent} from "../src/model/events/moveEvent";
import {EventStatus} from "../src/model/events/event";

module("Game state", function () {
    module("Action creators", function () {
        test("logIn", function (t: any) {
            const result: Action<LOG_IN> = logIn({
                'name': 'Bobby',
                'group': UserGroup.PLAYER,
                'realm': new Realm(
                    "Unabhängige Stämme Assimilans",
                    "usa", "",
                    FieldType.DESERT,
                    true)
            });
            t.deepEqual(result, {
                type: LOG_IN,
                payload: {
                    login: {
                        'name': 'Bobby',
                        'group': UserGroup.PLAYER,
                        'realm': new Realm(
                            "Unabhängige Stämme Assimilans",
                            "usa", "",
                            FieldType.DESERT,
                            true)
                    }
                }
            },
            "Action creator logIn should create an action of type LOG_IN with the correct payload.");
        });
        test("logOut", function (t: any) {
            const result: Action<LOG_OUT> = logOut();
            t.deepEqual(result, {
                    type: LOG_OUT,
                    payload: {}
                },
                "Action creator logOut should create an action of type LOG_OUT with empty payload.");
        });
        test("addRealms", function (t: any) {
            const result: Action<ADD_REALMS> = addRealms([
                new Realm(
                    "Unabhängige Stämme Assimilans",
                    "usa", "000,000,000",
                    FieldType.DESERT,
                    true)
            ]);
            t.deepEqual(result, {
                    type: ADD_REALMS,
                    payload: {
                        newRealms: [new Realm(
                            "Unabhängige Stämme Assimilans",
                            "usa", "000,000,000",
                            FieldType.DESERT,
                            true)
                    ]}
                },
                "Action creator addRealms should create an action of type ADD_REALMS with the correct payload.");
        });
        test("setRealms", function (t: any) {
            const result: Action<SET_REALMS> = setRealms([
                new Realm(
                    "Unabhängige Stämme Assimilans",
                    "usa", "000,000,000",
                    FieldType.DESERT,
                    true)
            ]);
            t.deepEqual(result, {
                    type: SET_REALMS,
                    payload: {
                        newRealms: [new Realm(
                            "Unabhängige Stämme Assimilans",
                            "usa", "000,000,000",
                            FieldType.DESERT,
                            true)
                        ]}
                },
                "Action creator setRealms should create an action of type SET_REALMS with the correct payload.");
        });
        test("removeRealms", function (t: any) {
            const result: Action<REMOVE_REALMS> = removeRealms([0]);
            t.deepEqual(result, {
                    type: REMOVE_REALMS,
                    payload: {
                        idsToRemove: [0]
                    }
                },
                "Action creator removeRealms should create an action of type REMOVE_REALMS with the correct payload.");
        });
        test("updateRealms", function (t: any) {
            const result: Action<UPDATE_REALMS> = updateRealms([{'id': 0,
                'updatedRealm': new Realm(
                    "Unabhängige Stämme Assimilans",
                    "usa", "000,000,000",
                    FieldType.DESERT,
                    true)
            }]);
            t.deepEqual(result, {
                    type: UPDATE_REALMS,
                    payload: {
                        updatedRealms: [{
                            'id': 0, 'updatedRealm': new Realm(
                                "Unabhängige Stämme Assimilans",
                                "usa", "000,000,000",
                                FieldType.DESERT,
                                true)
                        }]}
                },
                "Action creator updateRealms should create an action of type UPDATE_REALMS with the correct payload.");
        });
        test("addFields", function (t: any) {
            const result: Action<ADD_FIELDS> = addFields([
                new Field([1, 1], FieldType.DESERT)
            ]);
            t.deepEqual(result, {
                    type: ADD_FIELDS,
                    payload: {
                        newFields: [new Field([1, 1], FieldType.DESERT)
                        ]}
                },
                "Action creator addFields should create an action of type ADD_FIELDS with the correct payload.");
        });
        test("removeFields", function (t: any) {
            const result: Action<REMOVE_FIELDS> = removeFields([0]);
            t.deepEqual(result, {
                    type: REMOVE_FIELDS,
                    payload: {
                        idsToRemove: [0]
                    }
                },
                "Action creator removeFields should create an action of type REMOVE_FIELDS with the correct payload.");
        });
        test("setFields", function (t: any) {
            const result: Action<SET_FIELDS> = setFields([
                new Field([1, 1], FieldType.DESERT)
            ]);
            t.deepEqual(result, {
                    type: SET_FIELDS,
                    payload: {
                        newFields: [new Field([1, 1], FieldType.DESERT)
                        ]}
                },
                "Action creator setFields should create an action of type SET_FIELDS with the correct payload.");
        });
        test("updateFields", function (t: any) {
            const result: Action<UPDATE_FIELDS> = updateFields([{'id': 0,
                'updatedField': new Field([1, 1], FieldType.DESERT)
            }]);
            t.deepEqual(result, {
                    type: UPDATE_FIELDS,
                    payload: {
                        updatedFields: [{
                            'id': 0, 'updatedField': new Field([1, 1], FieldType.DESERT)
                        }]}
                },
                "Action creator updateFields should create an action of type UPDATE_FIELDS with the correct payload.");
        });

        test("addRivers", function (t: any) {
            const result: Action<ADD_RIVERS> = addRivers([
                new River([0, 0], [0, 1])
            ]);
            t.deepEqual(result, {
                    type: ADD_RIVERS,
                    payload: {
                        newRivers: [new River([0, 0], [0, 1])
                        ]}
                },
                "Action creator addRivers should create an action of type ADD_RIVERS with the correct payload.");
        });
        test("removeRivers", function (t: any) {
            const result: Action<REMOVE_RIVERS> = removeRivers([0]);
            t.deepEqual(result, {
                    type: REMOVE_RIVERS,
                    payload: {
                        idsToRemove: [0]
                    }
                },
                "Action creator removeRivers should create an action of type REMOVE_RIVERS with the correct payload.");
        });
        test("setRivers", function (t: any) {
            const result: Action<SET_RIVERS> = setRivers([
                new River([0, 0], [0, 1])
            ]);
            t.deepEqual(result, {
                    type: SET_RIVERS,
                    payload: {
                        newRivers: [new Field([1, 1], FieldType.DESERT)
                        ]}
                },
                "Action creator setRivers should create an action of type SET_RIVERS with the correct payload.");
        });

        test("addArmies", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<ADD_ARMIES> = addArmies([
                new FootArmy(101, realm, 1000, 1,
                    0, 0, 0,
                    [0, 0], 0, 0)
            ]);
            t.deepEqual(result, {
                    type: ADD_ARMIES,
                    payload: {
                        newArmies: [new FootArmy(101, realm, 1000, 1,
                            0, 0, 0,
                            [0, 0], 0, 0)
                        ]}
                },
                "Action creator addArmies should create an action of type ADD_ARMIES with the correct payload.");
        });
        test("removeArmies", function (t: any) {
            const result: Action<REMOVE_ARMIES> = removeArmies([0]);
            t.deepEqual(result, {
                    type: REMOVE_ARMIES,
                    payload: {
                        idsToRemove: [0]
                    }
                },
                "Action creator removeArmies should create an action of type REMOVE_ARMIES with the correct payload.");
        });
        test("setArmies", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<ADD_ARMIES> = addArmies([
                new FootArmy(101, realm, 1000, 1,
                    0, 0, 0,
                    [0, 0], 0, 0)
            ]);
            t.deepEqual(result, {
                    type: SET_ARMIES,
                    payload: {
                        newArmies: [new FootArmy(101, realm, 1000, 1,
                            0, 0, 0,
                            [0, 0], 0, 0)
                        ]}
                },
                "Action creator setArmies should create an action of type SET_ARMIES with the correct payload.");
        });
        test("updateArmies", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<UPDATE_ARMIES> = updateArmies([{'id': 0,
                'updatedArmy': new FootArmy(101, realm, 1000, 1,
                    0, 0, 0,
                    [0, 0], 0, 0)
            }]);
            t.deepEqual(result, {
                    type: UPDATE_ARMIES,
                    payload: {
                        updatedArmies: [{
                            'id': 0, 'updatedArmy': new FootArmy(101, realm, 1000, 1,
                                0, 0, 0,
                                [0, 0], 0, 0)
                        }]}
                },
                "Action creator updateArmies should create an action of type UPDATE_ARMIES with the correct payload.");
        });

        test("addBuildings", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<ADD_BUILDINGS> = addBuildings([
                new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 10)
            ]);
            t.deepEqual(result, {
                    type: ADD_BUILDINGS,
                    payload: {
                        newBuildings: [
                            new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 10)
                        ]}
                },
                "Action creator addBuildings should create an action of type ADD_BUILDINGS with the correct payload.");
        });
        test("removeBuildings", function (t: any) {
            const result: Action<REMOVE_BUILDINGS> = removeBuildings([0]);
            t.deepEqual(result, {
                    type: REMOVE_BUILDINGS,
                    payload: {
                        idsToRemove: [0]
                    }
                },
                "Action creator removeBuildings should create an action of type REMOVE_BUILDINGS with the correct payload.");
        });
        test("setBuildings", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<SET_BUILDINGS> = setBuildings([
                new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 10)
            ]);
            t.deepEqual(result, {
                    type: SET_BUILDINGS,
                    payload: {
                        newBuildings: [
                            new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 10)
                        ]}
                },
                "Action creator setBuildings should create an action of type SET_BUILDINGS with the correct payload.");
        });
        test("updateBuildings", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<UPDATE_BUILDINGS> = updateBuildings([{'id': 0,
                'updatedArmy': new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 10)
            }]);
            t.deepEqual(result, {
                    type: UPDATE_BUILDINGS,
                    payload: {
                        updatedBuildings: [{
                            'id': 0, 'updatedBulding':
                                new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 10)
                        }]}
                },
                "Action creator updateBuildings should create an action of type UPDATE_BUILDINGS with the correct payload.");
        });

        test("addNewEvents", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<ADD_NEW_EVENTS> = addNewEvents([
                new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [0, 1])
            ]);
            t.deepEqual(result, {
                    type: ADD_NEW_EVENTS,
                    payload: {
                        newEvents: [
                            new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [0, 1])
                        ]}
                },
                "Action creator addNewEvents should create an action of type ADD_NEW_EVENTS with the correct payload.");
        });
        test("removeNewEvents", function (t: any) {
            const result: Action<REMOVE_NEW_EVENTS> = removeNewEvents([0]);
            t.deepEqual(result, {
                    type: REMOVE_NEW_EVENTS,
                    payload: {
                        idsToRemove: [0]
                    }
                },
                "Action creator removeNewEvents should create an action of type REMOVE_NEW_EVENTS with the correct payload.");
        });
        test("setNewEvents", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<SET_NEW_EVENTS> = setNewEvents([
                new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [0, 1])
            ]);
            t.deepEqual(result, {
                    type: SET_NEW_EVENTS,
                    payload: {
                        newEvents: [
                            new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [0, 1])
                        ]}
                },
                "Action creator setNewEvents should create an action of type SET_NEW_EVENTS with the correct payload.");
        });
        test("updateNewEvents", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<UPDATE_NEW_EVENTS> = updateNewEvents([{'id': 0,
                'updatedNewEvent': new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [0, 1])
            }]);
            t.deepEqual(result, {
                    type: UPDATE_NEW_EVENTS,
                    payload: {
                        updatedNewEvents: [{
                            'id': 0, 'updatedNewEvent':
                                new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [0, 1])
                        }]}
                },
                "Action creator updateNewEvents should create an action of type UPDATE_NEW_EVENTS with the correct payload.");
        });

        test("setLoadedEvents", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<SET_LOADED_EVENTS> = setLoadedEvents([
                new MoveEvent(0, EventStatus.Impossible, realm,
                    101, [0, 0], [0, 1],
                    [], 1)
            ]);
            t.deepEqual(result, {
                    type: SET_LOADED_EVENTS,
                    payload: {
                        newLoadedEvents: [
                            new MoveEvent(0, EventStatus.Impossible, realm,
                                101, [0, 0], [0, 1],
                                [], 1)
                        ]}
                },
                "Action creator setLoadedEvents should create an action of type SET_LOADED_EVENTS with the correct payload.");
        });
        test("updateLoadedEvents", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans",
                "usa", "000,000,000",
                FieldType.DESERT,
                true);
            const result: Action<UPDATE_LOADED_EVENTS> = updateLoadedEvents([{'id': 0,
                'updatedLoadedEvent': new MoveEvent(0, EventStatus.Impossible, realm,
                    101, [0, 0], [0, 1],
                    [], 1)
            }]);
            t.deepEqual(result, {
                    type: UPDATE_LOADED_EVENTS,
                    payload: {
                        updatedLoadedEvents: [{
                            'id': 0, 'updatedLoadedEvent':
                                new MoveEvent(0, EventStatus.Impossible, realm,
                                    101, [0, 0], [0, 1],
                                    [], 1)
                        }]}
                },
                "Action creator updateLoadedEvents should create an action of type UPDATE_LOADED_EVENTS with the correct payload.");
        });

        test("setCurrentTurn", function (t: any) {
            const result: Action<SET_CURRENT_TURN> = setCurrentTurn({'turn': 1, 'realm': "sl", 'status': TurnStatus.STARTED});
            t.deepEqual(result, {
                    type: SET_CURRENT_TURN,
                    payload: {
                        newCurrentTurn: {'turn': 1, 'realm': "sl", 'status': TurnStatus.STARTED}}
                },
                "Action creator setCurrentTurn should create an action of type SET_CURRENT_TURN with the correct payload.");
        });
    });
});