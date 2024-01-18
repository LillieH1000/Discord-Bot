import { ActivityType } from "discord.js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import _ from "underscore";
let hour;

async function invoke(client) {
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
}

export { invoke };