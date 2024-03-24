if [ $1 == "register" ]
then
    npx tsx --no-cache ./deploy.ts
fi
if [ $1 == "start" ]
then
    pm2 stop "discordbot" > /dev/null 2>&1
    pm2 delete "discordbot" > /dev/null 2>&1
    pm2 save --force > /dev/null 2>&1
    pm2 start "npx tsx --no-cache ./index.ts" --name "discordbot" > /dev/null 2>&1
    pm2 save --force > /dev/null 2>&1
    echo "Successfully started application process."
fi
if [ $1 == "stop" ]
then
    pm2 stop "discordbot" > /dev/null 2>&1
    pm2 delete "discordbot" > /dev/null 2>&1
    pm2 save --force > /dev/null 2>&1
    echo "Successfully stopped application process."
fi