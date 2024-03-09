if [ $1 == "register" ]
then
    npx tsx --no-cache ./deploy.ts
fi
if [ $1 == "start" ]
then
    pm2 start "npx tsx --no-cache ./index.ts" --name "discordbot"
fi
if [ $1 == "stop" ]
then
    pm2 stop discordbot
fi
if [ $1 == "restart" ]
then
    pm2 restart discordbot
fi