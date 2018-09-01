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
    Action, ADD_ARMIES, ADD_BUILDINGS, ADD_FIELDS, ADD_NEW_EVENTS, ADD_REALMS, ADD_RIVERS, addArmies, addBuildings,
    addFields,
    addNewEvents,
    addRealms,
    addRivers, LOG_IN,
    LOG_OUT, logIn,
    logOut, REMOVE_ARMIES, REMOVE_BUILDINGS, REMOVE_FIELDS, REMOVE_NEW_EVENTS,
    REMOVE_REALMS, REMOVE_RIVERS,
    removeArmies, removeBuildings,
    removeFields, removeNewEvents,
    removeRealms,
    removeRivers, SET_ARMIES, SET_BUILDINGS, SET_CURRENT_TURN, SET_FIELDS, SET_LOADED_EVENTS, SET_NEW_EVENTS,
    SET_REALMS, SET_RIVERS, setArmies, setBuildings, setCurrentTurn, setFields, setLoadedEvents, setNewEvents,
    setRealms, setRivers, UPDATE_ARMIES, UPDATE_BUILDINGS, UPDATE_FIELDS, UPDATE_LOADED_EVENTS, UPDATE_NEW_EVENTS,
    UPDATE_REALMS, updateArmies, updateBuildings, updateFields, updateLoadedEvents, updateNewEvents, updateRealms
} from "../src/gameState/actions";
import {GameState, initialState, TurnStatus, UserGroup} from "../src/gameState/gameState";
import {Realm} from "../src/model/realm";
import {Field, FieldType} from "../src/model/map/field";
import {River} from "../src/model/map/river";
import {FootArmy} from "../src/model/armies/footArmy";
import {ProductionBuilding} from "../src/model/buildings/productionBuilding";
import {BuildingType} from "../src/model/buildings/building";
import {MoveEvent} from "../src/model/events/moveEvent";
import {EventStatus, PhoenixEvent} from "../src/model/events/event";
import reducers from "../src/gameState/reducers";

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
                        newRivers: [new River([0, 0], [0, 1])
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
            const result: Action<SET_ARMIES> = setArmies([
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
                'updatedBuilding': new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 10)
            }]);
            t.deepEqual(result, {
                    type: UPDATE_BUILDINGS,
                    payload: {
                        updatedBuildings: [{
                            'id': 0, 'updatedBuilding':
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
                    [], 1) as PhoenixEvent
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
    module("Reducers", function () {
        test("unknown action", function (t: any) {
            const result: GameState = reducers(undefined, {type: undefined, payload: undefined});
            t.deepEqual(result, initialState,
                "Given no current state and unknown action the reducers should produce the initial state.");
        });
        test("LOG_IN", function (t: any) {
            const result: GameState = reducers(undefined, {
                type: LOG_IN,
                payload: {
                    login: {
                        name: "Peter", group: UserGroup.GAME_MASTER, realm: undefined
                    }
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                login: {name: "Peter", group: UserGroup.GAME_MASTER, realm: undefined}
            });
            t.deepEqual(result, expected, "Reducers should handle the LOG_IN action properly.");
        });
        test("LOG_OUT", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                login: {name: "Peter", group: UserGroup.GAME_MASTER, realm: undefined}
            });
            const result: GameState = reducers(previousState, {
                type: LOG_OUT,
                payload: {}
            });
            t.deepEqual(result, initialState, "Reducers should handle the LOG_OUT action properly.");
        });
        test("ADD_REALMS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                realms: [
                    new Realm("Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: ADD_REALMS,
                payload: {
                    newRealms: [
                        new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, true),
                        new Realm("Eoganachta", "eos", "200,200,200", FieldType.SWAMP, true)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                realms: [
                    new Realm("Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true),
                    new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, true),
                    new Realm("Eoganachta", "eos", "200,200,200", FieldType.SWAMP, true)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the ADD_REALMS action properly.");
        });
        test("SET_REALMS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                realms: [
                    new Realm("Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: SET_REALMS,
                payload: {
                    newRealms: [
                        new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, true),
                        new Realm("Eoganachta", "eos", "200,200,200", FieldType.SWAMP, true)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                realms: [
                    new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, true),
                    new Realm("Eoganachta", "eos", "200,200,200", FieldType.SWAMP, true)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the SET_REALMS action properly.");
        });
        test("REMOVE_REALMS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                realms: [
                    new Realm("Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true),
                    new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, true),
                    new Realm("Eoganachta", "eos", "200,200,200", FieldType.SWAMP, true),
                    new Realm("Helborn", "hbn", "300,300,300", FieldType.HILLS, true)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: REMOVE_REALMS,
                payload: {
                    idsToRemove: [0, 2]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                realms: [
                    new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, true),
                    new Realm("Helborn", "hbn", "300,300,300", FieldType.HILLS, true)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the REMOVE_REALMS action properly.");
        });
        test("UPDATE_REALMS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                realms: [
                    new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, true),
                    new Realm("Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true),
                    new Realm("Helborn", "hbn", "300,300,300", FieldType.HILLS, true)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: UPDATE_REALMS,
                payload: {
                    updatedRealms: [
                        {id: 0, updatedRealm: new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, false)},
                        {id: 2, updatedRealm: new Realm("Eoganachta", "eos", "555,100,250", FieldType.LOWLANDS, true)}
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                realms: [
                    new Realm("VirVahal", "vvh", "100,100,100", FieldType.WOODS, false),
                    new Realm("Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true),
                    new Realm("Eoganachta", "eos", "555,100,250", FieldType.LOWLANDS, true)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the UPDATE_REALMS action properly.");
        });
        test("ADD_FIELDS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                fields: [
                    new Field([0, 0], FieldType.LOWLANDS)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: ADD_FIELDS,
                payload: {
                    newFields: [
                        new Field([1, 2], FieldType.HILLS),
                        new Field([2, 1], FieldType.WOODS)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                fields: [
                    new Field([0, 0], FieldType.LOWLANDS),
                    new Field([1, 2], FieldType.HILLS),
                    new Field([2, 1], FieldType.WOODS)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the ADD_FIELDS action properly.");
        });
        test("SET_FIELDS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                fields: [
                    new Field([0, 0], FieldType.LOWLANDS)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: SET_FIELDS,
                payload: {
                    newFields: [
                        new Field([1, 2], FieldType.HILLS),
                        new Field([2, 1], FieldType.WOODS)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                fields: [
                    new Field([1, 2], FieldType.HILLS),
                    new Field([2, 1], FieldType.WOODS)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the SET_FIELDS action properly.");
        });
        test("REMOVE_FIELDS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                fields: [
                    new Field([1, 2], FieldType.HILLS),
                    new Field([2, 1], FieldType.WOODS),
                    new Field([0, 0], FieldType.LOWLANDS),
                    new Field([-2, -2], FieldType.SHALLOWS)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: REMOVE_FIELDS,
                payload: {
                    idsToRemove: [0, 2]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                fields: [
                    new Field([2, 1], FieldType.WOODS),
                    new Field([-2, -2], FieldType.SHALLOWS)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the REMOVE_FIELDS action properly.");
        });
        test("UPDATE_FIELDS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                fields: [
                    new Field([1, 2], FieldType.HILLS),
                    new Field([2, 1], FieldType.WOODS),
                    new Field([0, 0], FieldType.LOWLANDS),
                    new Field([-2, -2], FieldType.SHALLOWS)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: UPDATE_FIELDS,
                payload: {
                    updatedFields: [
                        {id: 0, updatedField: new Field([1, 2], FieldType.MOUNTAINS)},
                        {id: 2, updatedField: new Field([5, 5], FieldType.LOWLANDS)}
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                fields: [
                    new Field([1, 2], FieldType.HILLS),
                    new Field([2, 1], FieldType.MOUNTAINS),
                    new Field([0, 0], FieldType.LOWLANDS),
                    new Field([-2, -2], FieldType.SHALLOWS)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the UPDATE_FIELDS action properly.");
        });
        test("ADD_RIVERS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                rivers: [
                    new River([0, 0], [0, 1])
                ]
            });
            const result: GameState = reducers(previousState, {
                type: ADD_RIVERS,
                payload: {
                    newRivers: [
                        new River([1, 0], [0, 0]),
                        new River([2, 2], [2, 1])
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                rivers: [
                    new River([0, 0], [0, 1]),
                    new River([1, 0], [0, 0]),
                    new River([2, 2], [2, 1])
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the ADD_RIVERS action properly.");
        });
        test("SET_RIVERS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                rivers: [
                    new River([0, 0], [0, 1])
                ]
            });
            const result: GameState = reducers(previousState, {
                type: SET_RIVERS,
                payload: {
                    newRivers: [
                        new River([1, 0], [0, 0]),
                        new River([2, 2], [2, 1])
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                rivers: [
                    new River([1, 0], [0, 0]),
                    new River([2, 2], [2, 1])
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the SET_RIVERS action properly.");
        });
        test("REMOVE_RIVERS", function (t: any) {
            const previousState: GameState = Object.assign({}, initialState, {
                rivers: [
                    new River([0, 0], [0, 1]),
                    new River([1, 0], [0, 0]),
                    new River([2, 2], [2, 1]),
                    new River([1, 2], [2, 2])
                ]
            });
            const result: GameState = reducers(previousState, {
                type: REMOVE_RIVERS,
                payload: {
                    idsToRemove: [0, 2]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                rivers: [
                    new River([1, 0], [0, 0]),
                    new River([1, 2], [2, 2])
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the REMOVE_RIVERS action properly.");
        });
        test("ADD_ARMIES", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                armies: [
                    new FootArmy(101, realm, 1000, 1, 0,
                        0, 0, [0, 0], 0, 0)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: ADD_ARMIES,
                payload: {
                    newArmies: [
                        new FootArmy(102, realm, 2000, 11, 0,
                            0, 0, [1, 1], 0, 0),
                        new FootArmy(103, realm, 1500, 2, 5,
                            3, 500, [2, 1], 0, 0)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                armies: [
                    new FootArmy(101, realm, 1000, 1, 0,
                        0, 0, [0, 0], 0, 0),
                    new FootArmy(102, realm, 2000, 11, 0,
                        0, 0, [1, 1], 0, 0),
                    new FootArmy(103, realm, 1500, 2, 5,
                        3, 500, [2, 1], 0, 0)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the ADD_ARMIES action properly.");
        });
        test("SET_ARMIES", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                armies: [
                    new FootArmy(101, realm, 1000, 1, 0,
                        0, 0, [0, 0], 0, 0)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: ADD_ARMIES,
                payload: {
                    newArmies: [
                        new FootArmy(102, realm, 2000, 11, 0,
                            0, 0, [1, 1], 0, 0),
                        new FootArmy(103, realm, 1500, 2, 5,
                            3, 500, [2, 1], 0, 0)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                armies: [
                    new FootArmy(102, realm, 2000, 11, 0,
                        0, 0, [1, 1], 0, 0),
                    new FootArmy(103, realm, 1500, 2, 5,
                        3, 500, [2, 1], 0, 0)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the SET_ARMIES action properly.");
        });
        test("REMOVE_ARMIES", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                armies: [
                    new FootArmy(101, realm, 1000, 1, 0,
                        0, 0, [0, 0], 0, 0),
                    new FootArmy(102, realm, 2000, 11, 0,
                        0, 0, [1, 1], 0, 0),
                    new FootArmy(103, realm, 1500, 2, 5,
                        3, 500, [2, 1], 0, 0),
                    new FootArmy(104, realm, 2000, 3, 0,
                        0, 2000, [0, 1], 0, 0)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: REMOVE_FIELDS,
                payload: {
                    idsToRemove: [0, 2]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                armies: [
                    new FootArmy(102, realm, 2000, 11, 0,
                        0, 0, [1, 1], 0, 0),
                    new FootArmy(104, realm, 2000, 3, 0,
                        0, 2000, [0, 1], 0, 0)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the REMOVE_ARMIES action properly.");
        });
        test("UPDATE_ARMIES", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const otherRealm = new Realm(
                "Eoganachta", "eos", "300,300,300", FieldType.SWAMP, true);
            const previousState: GameState = Object.assign({}, initialState, {
                armies: [
                    new FootArmy(101, realm, 1000, 1, 0,
                        0, 0, [0, 0], 0, 0),
                    new FootArmy(102, realm, 2000, 11, 0,
                        0, 0, [1, 1], 0, 0),
                    new FootArmy(103, realm, 1500, 2, 5,
                        3, 500, [2, 1], 0, 0),
                    new FootArmy(104, realm, 2000, 3, 0,
                        0, 2000, [0, 1], 0, 0)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: UPDATE_FIELDS,
                payload: {
                    updatedArmies: [
                        {id: 0, updatedArmy:
                                new FootArmy(101, otherRealm, 1000, 1, 0,
                                    0, 0, [0, 0], 0, 0)},
                        {id: 2, updatedArmy:
                                new FootArmy(103, realm, 1356, 1, 4,
                                2, 500, [2, 1], 0, 0)}
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                armies: [
                    new FootArmy(101, otherRealm, 1000, 1, 0,
                        0, 0, [0, 0], 0, 0),
                    new FootArmy(102, realm, 2000, 11, 0,
                        0, 0, [1, 1], 0, 0),
                    new FootArmy(103, realm, 1356, 1, 4,
                        2, 500, [2, 1], 0, 0),
                    new FootArmy(104, realm, 2000, 3, 0,
                        0, 2000, [0, 1], 0, 0)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the UPDATE_ARMIES action properly.");
        });
        test("ADD_BUILDINGS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                buildings: [
                    new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 1)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: ADD_BUILDINGS,
                payload: {
                    newBuildings: [
                        new ProductionBuilding(BuildingType.CASTLE, "", [1, 1], realm, 1),
                        new ProductionBuilding(BuildingType.CASTLE, "", [2, 2], realm, 1)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                buildings: [
                    new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [1, 1], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [2, 2], realm, 1)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the ADD_BUILDINGS action properly.");
        });
        test("SET_BUILDINGS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                buildings: [
                    new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 1)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: SET_BUILDINGS,
                payload: {
                    newBuildings: [
                        new ProductionBuilding(BuildingType.CASTLE, "", [1, 1], realm, 1),
                        new ProductionBuilding(BuildingType.CASTLE, "", [2, 2], realm, 1)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                buildings: [
                    new ProductionBuilding(BuildingType.CASTLE, "", [1, 1], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [2, 2], realm, 1)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the SET_BUILDINGS action properly.");
        });
        test("REMOVE_BUILDINGS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                buildings: [
                    new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [1, 1], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [2, 2], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [3, 3], realm, 1)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: REMOVE_BUILDINGS,
                payload: {
                    idsToRemove: [0, 2]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                buildings: [
                    new ProductionBuilding(BuildingType.CASTLE, "", [1, 1], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [3, 3], realm, 1)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the REMOVE_BUILDINGS action properly.");
        });
        test("UPDATE_BUILDINGS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const otherRealm = new Realm(
                "Eoganachta", "eos", "300,300,300", FieldType.SWAMP, true);
            const previousState: GameState = Object.assign({}, initialState, {
                buildings: [
                    new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [1, 1], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [2, 2], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [3, 3], realm, 1)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: UPDATE_BUILDINGS,
                payload: {
                    updatedBuildings: [
                        {id: 0, updatedBuilding:
                                new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], otherRealm, 1)},
                        {id: 2, updatedBuilding:
                                new ProductionBuilding(BuildingType.CITY, "", [2, 2], realm, 1)}
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                buildings: [
                    new ProductionBuilding(BuildingType.CASTLE, "", [0, 0], otherRealm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [1, 1], realm, 1),
                    new ProductionBuilding(BuildingType.CITY, "", [2, 2], realm, 1),
                    new ProductionBuilding(BuildingType.CASTLE, "", [3, 3], realm, 1)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the UPDATE_BUILDINGS action properly.");
        });
        test("ADD_NEW_EVENTS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                newEvents: [
                    new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [1, 1])
                ]
            });
            const result: GameState = reducers(previousState, {
                type: ADD_NEW_EVENTS,
                payload: {
                    newEvents: [
                        new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1]),
                        new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1])
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                newEvents: [
                    new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [1, 1]),
                    new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1]),
                    new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1])
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the ADD_NEW_EVENTS action properly.");
        });
        test("SET_NEW_EVENTS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                newEvents: [
                    new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [1, 1])
                ]
            });
            const result: GameState = reducers(previousState, {
                type: SET_NEW_EVENTS,
                payload: {
                    newEvents: [
                        new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1]),
                        new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1])
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                newEvents: [
                    new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1]),
                    new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1])
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the SET_NEW_EVENTS action properly.");
        });
        test("REMOVE_NEW_EVENTS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                newEvents: [
                    new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [1, 1]),
                    new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1]),
                    new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1]),
                    new MoveEvent(3, EventStatus.Impossible, realm, 104, [0, 0], [1, 1])
                ]
            });
            const result: GameState = reducers(previousState, {
                type: REMOVE_NEW_EVENTS,
                payload: {
                    idsToRemove: [0, 2]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                newEvents: [
                    new MoveEvent(1, EventStatus.Impossible, realm, 101, [0, 0], [1, 1]),
                    new MoveEvent(3, EventStatus.Impossible, realm, 104, [0, 0], [1, 1])
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the REMOVE_NEW_EVENTS action properly.");
        });
        test("UPDATE_NEW_EVENTS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const otherRealm = new Realm(
                "Eoganachta", "eos", "300,300,300", FieldType.SWAMP, true);
            const previousState: GameState = Object.assign({}, initialState, {
                newEvents: [
                    new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [1, 1]),
                    new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1]),
                    new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1]),
                    new MoveEvent(3, EventStatus.Impossible, realm, 104, [0, 0], [1, 1])
                ]
            });
            const result: GameState = reducers(previousState, {
                type: UPDATE_NEW_EVENTS,
                payload: {
                    updatedNewEvents: [
                        {id: 0, updatedNewEvent:
                                new MoveEvent(0, EventStatus.Impossible, otherRealm, 101, [0, 0], [1, 1])},
                        {id: 2, updatedNewEvent:
                                new MoveEvent(2, EventStatus.Deleted, realm, 103, [0, 0], [1, 1])}
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                newEvents: [
                    new MoveEvent(0, EventStatus.Impossible, otherRealm, 101, [0, 0], [1, 1]),
                    new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1]),
                    new MoveEvent(2, EventStatus.Deleted, realm, 103, [0, 0], [1, 1]),
                    new MoveEvent(3, EventStatus.Impossible, realm, 104, [0, 0], [1, 1])
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the UPDATE_NEW_EVENTS action properly.");
        });
        test("SET_LOADED_EVENTS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const previousState: GameState = Object.assign({}, initialState, {
                loadedEvents: [
                    new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [1, 1],
                        [], 1)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: SET_LOADED_EVENTS,
                payload: {
                    newLoadedEvents: [
                        new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1],
                            [], 2),
                        new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1],
                            [], 3)
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                loadedEvents: [
                    new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1],
                        [], 2),
                    new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1],
                        [], 3)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the SET_LOADED_EVENTS action properly.");
        });
        test("UPDATE_LOADED_EVENTS", function (t: any) {
            const realm = new Realm(
                "Unabhängige Stämme Assimilans", "usa", "000,000,000", FieldType.DESERT, true);
            const otherRealm = new Realm(
                "Eoganachta", "eos", "300,300,300", FieldType.SWAMP, true);
            const previousState: GameState = Object.assign({}, initialState, {
                loadedEvents: [
                    new MoveEvent(0, EventStatus.Impossible, realm, 101, [0, 0], [1, 1],
                        [], 1),
                    new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1],
                        [], 2),
                    new MoveEvent(2, EventStatus.Impossible, realm, 103, [0, 0], [1, 1],
                        [], 3),
                    new MoveEvent(3, EventStatus.Impossible, realm, 104, [0, 0], [1, 1],
                        [], 4)
                ]
            });
            const result: GameState = reducers(previousState, {
                type: UPDATE_LOADED_EVENTS,
                payload: {
                    updatedLoadedEvents: [
                        {id: 0, updatedLoadedEvent:
                                new MoveEvent(0, EventStatus.Impossible, otherRealm, 101, [0, 0], [1, 1],
                                    [], 1)},
                        {id: 2, updatedLoadedEvent:
                                new MoveEvent(2, EventStatus.Deleted, realm, 103, [0, 0], [1, 1],
                                    [], 3)}
                    ]
                }
            });
            const expected: GameState = Object.assign({}, initialState, {
                loadedEvents: [
                    new MoveEvent(0, EventStatus.Impossible, otherRealm, 101, [0, 0], [1, 1],
                        [], 1),
                    new MoveEvent(1, EventStatus.Impossible, realm, 102, [0, 0], [1, 1],
                        [], 2),
                    new MoveEvent(2, EventStatus.Deleted, realm, 103, [0, 0], [1, 1],
                        [], 3),
                    new MoveEvent(3, EventStatus.Impossible, realm, 104, [0, 0], [1, 1],
                        [], 4)
                ]
            });
            t.deepEqual(result, expected, "Reducers should handle the UPDATE_LOADED_EVENTS action properly.");
        });
    });
});