import { formatInTimeZone } from "date-fns-tz";
import { Client } from "discord.js";

async function invoke(client: Client) {
    // Town Of Salem Server
    setInterval(async function() {
        try {
            const guild = client.guilds.cache.get("416350699794857986");
            const channel = guild.channels.cache.get("772878026521182248");
            const date = new Date();
            const formatteddate = formatInTimeZone(date, "America/New_York", "MMMM d, yyyy");
            channel.setName(`Date: ${formatteddate}`);
        } catch (error) {
            console.error(error);
        }
    }, 60000);
}

export { invoke };