set -euxo pipefail

export DATABASE_URL

if [ ! -z $ENV_FILE -a -f $ENV_FILE ]; then
    cat $ENV_FILE > .env
fi

npx prisma migrate deploy
node server.js
