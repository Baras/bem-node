#!/bin/bash
enb make
echo Client tests
node ./tests/simple/simple.server.js & mocha-phantomjs http://127.0.0.1:3000/
killall node
echo Server tests
mocha ./tests/simple/simple.server.tests.js
