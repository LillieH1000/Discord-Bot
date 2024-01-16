const { ActivityType } = require('discord.js');
const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc")
let timezone = require("dayjs/plugin/timezone");
let _ = require("underscore");
let hour;

module.exports = async(client) => {
    setInterval(async function() {
        try {
            const date = new Date();
            dayjs.extend(utc);
            dayjs.extend(timezone);
            const currentdate = dayjs.tz(date, "America/New_York").day();
            const currenthour = dayjs.tz(date, "America/New_York").hour();
            if (currentdate == 1) {
                hour = null;
                client.user.setActivity("It's Miku monday", { type: ActivityType.Custom });
            } else {
                if (hour != currenthour) {
                    hour = currenthour;
                    let status = _.sample(["Miku gang", "oo ee oo", "I'm thinking Miku"]);
                    client.user.setActivity(status, { type: ActivityType.Custom });
                }
            }
        } catch (error) {
            console.error(error);
        }
    }, 60000)
};