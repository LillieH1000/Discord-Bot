import { ActivityType } from "discord.js";
import { formatInTimeZone } from "date-fns-tz";
import _ from "underscore";
let hour;

async function invoke(client) {
    setInterval(async function() {
        try {
            const date = new Date();
            const currentdate = formatInTimeZone(date, "America/New_York", "d");
            const currenthour = formatInTimeZone(date, "America/New_York", "h");
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
    }, 60000);
}

export { invoke };