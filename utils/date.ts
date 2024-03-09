import { formatInTimeZone } from "date-fns-tz";
import { Client, Guild, TextChannel } from "discord.js";

async function invoke(client: Client) {
    // Town Of Salem Server
    setInterval(async function() {
        const guild = client.guilds.cache.get("416350699794857986") as Guild;
        if (guild) {
            const channel = guild.channels.cache.get("772878026521182248") as TextChannel;
            if (channel) {
                const date = new Date();
                const formatteddate = formatInTimeZone(date, "America/New_York", "MMMM d, yyyy");
                await channel.setName(`Date: ${formatteddate}`);
            }
        }
    }, 60000);
}

export { invoke };