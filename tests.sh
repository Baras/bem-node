#!/bin/bash
enb make
node ./tests/simple/simple.server.js --socket 3000 & mocha-phantomjs http://127.0.0.1:3000/
killall node
