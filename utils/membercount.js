async function invoke(client) {
    // Town Of Salem Server
    setInterval(async function() {
        try {
            const guild = client.guilds.cache.get("416350699794857986") || await client.guilds.fetch("416350699794857986");
            const channel = guild.channels.cache.get("772878081907884072") || await guild.channels.fetch("772878081907884072");
            channel.setName(`Members: ${guild.memberCount}`);
        } catch (error) {
            console.error(error);
        }
    }, 60000);
}

export { invoke };