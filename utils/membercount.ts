import { Client } from "discord.js";

async function invoke(client: Client) {
    // Town Of Salem Server
    setInterval(async function() {
        try {
            const guild = client.guilds.cache.get("416350699794857986");
            const channel = guild.channels.cache.get("772878081907884072");
            channel.setName(`Members: ${guild.memberCount}`);
        } catch (error) {
            console.error(error);
        }
    }, 60000);
}

export { invoke };