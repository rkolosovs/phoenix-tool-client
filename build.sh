#!/usr/bin/env bash
echo Building Phoenixtool
browserify phoenixclient.js --outfile app.js
echo Build finished