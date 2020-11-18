#!/usr/bin/env bash

XXXX="CA3-part2"
DROPLET_URL="albertsl.com"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./build root@$DROPLET_URL:/var/www/$XXXX

