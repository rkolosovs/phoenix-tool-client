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
import {UserGroup} from "../src/gameState/gameState";
import {Realm} from "../src/model/realm";
import {FieldType} from "../src/model/map/field";

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
    });
});