#!/bin/bash
enb make
#killall node
mocha-phantomjs tests/simple/simple.html
#node ./tests/simple/simple.server.js --socket 3000 & phantomjs tests.js
