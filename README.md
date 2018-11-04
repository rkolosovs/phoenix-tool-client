# Phoenix Tool Client

## LICENSE

Copyright 2018 Janos Klieber, Roberts Kolosovs, Peter Spieler
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

The icons and graphics used in this program are licensed under the
[CC BY-NC-SA 4.0] (https://creativecommons.org/licenses/by-nc-sa/4.0/).

## SETUP / REQUIREMENTS

Install docker version 17.05 or later

## BUILD

docker build -t <image_name>:<version_tag> .

## TEST

Unit tests are run automatically when the image is built. The build will (and should) fail if a unit test does not succeed.

### Running tests manually
**To manually run unit tests install node and npm then run:** \
npm install \
npm run test

## RUN

docker run -d -p 80:80 <image_name>:<version_tag> \
The frontend is now accessible via http://0.0.0.0:80. To see container details use docker ps

## CONTRIBUTION POLICY

Do not commit build artifacts:
* In case you build the application by hand instead of using docker (which you shouldn't do):
    * Do not commit .js files transpiled from .ts files (include any new folder into .gitignore).
    * Do not commit the node_modules folder
    * Do not commit the build folder
