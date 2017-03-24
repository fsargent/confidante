#!/bin/bash
mkdir -p gen
watchify -t [ babelify --presets [ es2015 react ] ] src/web/js/inbox.js -o gen/inbox-bundle.js  --debug --ignore-missing --no-builtins --no-commondir --insert-global-vars=\"global\" --no-browser-field -v & \
watchify -t [ babelify --presets [ es2015 react ] ] src/web/js/signup.js -o gen/signup-bundle.js  --debug --ignore-missing --no-builtins --no-commondir --insert-global-vars=\"global\" --no-browser-field -v & \
watchify -t [ babelify --presets [ es2015 react ] ] src/web/js/login.js -o gen/login-bundle.js  --debug --ignore-missing --no-builtins --no-commondir --insert-global-vars=\"global\" --no-browser-field -v

