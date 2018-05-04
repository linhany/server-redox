#!/bin/bash

COMMIT_MSG=$@

git add .

if [ -z "$COMMIT_MSG" ]; then
    git status
    exit
fi

git commit -m "$COMMIT_MSG"
git push heroku master