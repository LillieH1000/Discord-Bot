import { ActivityType, Client } from "discord.js";
import { formatInTimeZone } from "date-fns-tz";

let hour: number;

async function invoke(client: Client) {
    setInterval(async function() {
        if (client.user) {
            const date = new Date();
            const currentdate = parseInt(formatInTimeZone(date, "America/New_York", "e"));
            const currenthour = parseInt(formatInTimeZone(date, "America/New_York", "h"));
            if (currentdate == 2) {
                hour = -1;
                client.user.setActivity("It's Miku monday", { type: ActivityType.Custom });
            } else {
                if (hour != currenthour) {
                    hour = currenthour;
                    const statuses = ["Miku gang", "oo ee oo", "I'm thinking Miku"];
                    const status = statuses[Math.floor(Math.random() * statuses.length)];
                    client.user.setActivity(status, { type: ActivityType.Custom });
                }
            }
        }
    }, 60000);
}

export { invoke };