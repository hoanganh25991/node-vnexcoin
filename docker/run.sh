#!/bin/bash
cd /var/www/html && echo "<?php header(\"Location: ./cms/index.php\");" > index.php
cd /var/www && touch .babel.json
cd /var/www/node-gobear && rm -rf .env && git fetch origin master && git reset --hard FETCH_HEAD && git clean -df && yarn install
cd /var/www/html/cms && git fetch origin master && git reset --hard FETCH_HEAD && git clean -df
cd /var/www/html && git clone git@gitlab.com:originallyus/go-bear-html.git html