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

import {Constants} from "./constants";

import {BoxVisibility} from "./gui/boxVisibilty";

import {Authentication} from "./serverInteraction/authenticationFunctions";
import {Loading} from "./serverInteraction/loadingDataFunctions";
import {Saving} from "./serverInteraction/savingFunctions";

import {FieldType, Field} from "./map/field";
import {River} from "./map/river";
import {MapEntity} from "./map/mapEntity";
import {Direction, stringToDirection, directionToString, reverseDirection} from "./map/direction";

import {MobileEntity} from "./armies/mobileEntity";
import {Army} from "./armies/army";
import {BattleHandler} from "./armies/battleHandler";
import {BattleResult, Result} from "./armies/battleResult";
import {Fleet} from "./armies/fleet";
import {LandArmy} from "./armies/landArmy";
import {FootArmy} from "./armies/footArmy";
import {Move} from "./armies/move";
import {RiderArmy} from "./armies/riderArmy";
import {ShootingTarget, ShootingFunctions, ShootingCondition} from "./armies/shootingFunctions";

import {Building, BuildingType} from "./buildings/building";
import {NonDestructibleBuilding} from "./buildings/nonDestructibleBuilding";
import {DestructibleBuilding} from "./buildings/destructibleBuilding";
import {Wall} from "./buildings/wall";
import {ProductionBuilding} from "./buildings/productionBuilding";

import {MouseFunctions} from "./controls/mouseFunctions";
import {Controls} from "./controls/controlVariables";
import {ButtonFunctions} from "./controls/buttonFunctions";

import {PhoenixEvent} from "./events/event";
import {EventStatus} from "./events/eventStatus";
import {MoveEvent} from "./events/moveEvent";
import {BattleEvent} from "./events/battleEvent";
import {MergeEvent} from "./events/mergeEvent";
import {TransferEvent} from "./events/transferEvent";
import {SplitEvent} from "./events/splitEvent";
import {MountEvent} from "./events/mountEvent";
import {ShootEvent} from "./events/shootEvent";

import {Drawing} from "./gui/drawingFunctions";
import {GUI} from "./gui/gui";
import {Images} from "./gui/images";
import {InfoBox} from "./gui/infoBox";
import {InfoChangeBox} from "./gui/infoChangeBox";
import {MultiFieldFunctions} from "./gui/multifieldFunctions";
import {MainBox} from "./gui/mainBox";
import {BattleBox} from "./gui/battleBox";
import {ShootingBigBox} from "./gui/shootingBigBox";
import {GodModeBox} from "./gui/godModeBox";
import {ArmyGeneratorBox} from "./gui/armyGeneratorBox";
import {WorldBenderBox} from "./gui/worldBenderBox";
import {RiverBenderBox} from "./gui/riverBenderBox";
import {BuildingCreationBox} from "./gui/buildingCreationBox";
import {WallCreationBox} from "./gui/wallCreationBox";
import {HarborCreationBox} from "./gui/harborCreationBox";
import {BridgeCreationBox} from "./gui/bridgeCreationBox";
import {StreetCreationBox} from "./gui/streetCreationBox";

import {HexFunction} from "./libraries/hexFunctions";
import {ArmyFunctions} from "./libraries/armyFunctions";

import {Realm} from "./realm";
import {GameState} from "./gameState";

import {GodFunctions} from "./godmode/godModeFunctions";


export {FieldType, Field, MouseFunctions, Drawing, GUI, Loading, Army, Realm,
    River, Building, PhoenixEvent, Constants, GameState, Controls, Authentication, 
    FootArmy, LandArmy, EventStatus, MoveEvent, BattleEvent, MergeEvent, TransferEvent, 
    SplitEvent, MountEvent, ShootEvent, RiderArmy, Fleet, stringToDirection, Wall, 
    ProductionBuilding, NonDestructibleBuilding, Images, BoxVisibility, Direction, 
    BuildingType, GodFunctions, BattleHandler, BattleResult, Result, InfoBox, InfoChangeBox, 
    ButtonFunctions, Saving, HexFunction, MultiFieldFunctions, MainBox, BattleBox, 
    ShootingBigBox, GodModeBox, ArmyGeneratorBox, WorldBenderBox, RiverBenderBox, 
    BuildingCreationBox, WallCreationBox, HarborCreationBox, BridgeCreationBox, 
    StreetCreationBox, ArmyFunctions, ShootingTarget, ShootingFunctions, MapEntity, 
    DestructibleBuilding, directionToString, ShootingCondition, MobileEntity, Move,
    reverseDirection};