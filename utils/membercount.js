module.exports = async(client) => {
    // Town Of Salem Server
    setInterval(async function() {
        try {
            let guild = client.guilds.cache.get("416350699794857986") || await client.guilds.fetch("416350699794857986");
            let channel = guild.channels.cache.get("772878081907884072") || await guild.channels.fetch("772878081907884072");
            channel.setName("Members: " + guild.memberCount);
        } catch (error) {
            console.error(error);
        }
    }, 1000*60*1)
};