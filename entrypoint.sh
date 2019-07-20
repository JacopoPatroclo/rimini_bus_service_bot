#!/bin/sh

if [ "$NODE_ENV" == "local" ]
then
  npm install
  npm run dev
fi

node index.js