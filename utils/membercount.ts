import { Client, Guild, TextChannel } from "discord.js";

async function invoke(client: Client) {
    // Town Of Salem Server
    setInterval(async function() {
        const guild = client.guilds.cache.get("416350699794857986") as Guild;
        if (guild) {
            const channel = guild.channels.cache.get("772878081907884072") as TextChannel;
            if (channel) {
                await channel.setName(`Members: ${guild.memberCount}`);
            }
        }
    }, 60000);
}

export { invoke };