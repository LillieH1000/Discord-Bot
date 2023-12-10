const { ActivityType } = require('discord.js');
const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc")
let timezone = require("dayjs/plugin/timezone");

module.exports = async(client) => {
    setInterval(async function() {
        try {
            const date = new Date();
            dayjs.extend(utc);
            dayjs.extend(timezone);
            const currentdate = dayjs.tz(date, "America/New_York").day();
            if (currentdate == 1) {
                client.user.setActivity("It's Miku Monday!!!!", { type: ActivityType.Custom });
            } else {
                client.user.setActivity("Miku Gang!!!!", { type: ActivityType.Custom });
            }
        } catch (error) {
            console.error(error);
        }
    }, 60000)
};