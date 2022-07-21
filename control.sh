if [ $1 == "register" ]
then
    node deploy-commands.js
fi
if [ $1 == "start" ]
then
    pm2 start index.js --name "discordbot"
fi
if [ $1 == "stop" ]
then
    pm2 stop discordbot
fi