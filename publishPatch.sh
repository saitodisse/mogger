#!/usr/bin/env bash

while true; do
    read -p "Do you want to publish a patch? [y/n]: " yn
    case $yn in
        [Yy]* ) bower version patch; sudo npm version patch; git add .; git commit -m'publishing a new patch';git push; sudo npm publish .; break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done
