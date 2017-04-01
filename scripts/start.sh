#!/bin/bash
export NODE_ENV=production
mongod &
until nc -z 127.0.0.1 27017
do
  echo "Waiting for mongo to start..."
  sleep 3
done
node src/app.js --toolname=Confidante 2>> error.log 1>> console.log
