#!/usr/bin/env bash

set -e

DIR="$(cd "$(dirname "$0")" && pwd)"

echo 'Started process to publish grypp...'

echo '🟡 - Verifying environment variables...'

if [ ! -f .env ]; then
    echo '❌Error: .env file not found!'
    exit 1
fi

export $(grep -v '^#' .env | xargs)

DIR="$(cd "$(dirname "$0")" && pwd)"

echo '🟢 - Environment variables are ready'

echo '🟡 - Changing to branch main and updating it...'

git checkout main || { echo '❌Error: Could not change to branch main'; exit 1;}
git pull origin main

echo '🟢 - Changed to branch main and updated'

echo '🟡 - Merging changes from origin/develop...'

git merge origin/develop || { echo '❌Error: Could not merge with develop branch'; exit 1;}

echo '🟢 - Merged with develop branch'

echo '🟡 - Running tests...'

npm run test || { echo '❌Error: Tests failed'; exit 1;}

echo '🟢 - Tests concluded with successfull'

echo '🎩 Starting process to deploying API...'

echo '🟡 - Changing to api directory...'

cd ./apps/api || { echo '❌Error: Could not change to api directory'; exit 1;}

echo '🟢 - Changed to api directory'

echo '🟡 - Deploying API on stage:prod ...'

dotenv -e .env -- yarn deploy:prod || { echo '❌Error: Fail to deploy API'; exit 1;}

echo '🟢 - API Deployed'

echo '🟡 - Pushing modifications for remote branch...'

git push origin main

echo '🟢 - Application published with successfull'

echo '🟡 - Updating develop branch...'

git checkout develop
git merge main

echo '🟢 - Deployment finished'