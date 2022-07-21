module.exports = async(client) => {
    // Chariz Server
    setInterval(function() {
        try {
            let guild = client.guilds.cache.get("326739046531596289");
            let channel = guild.channels.cache.get("879527500659699713");
            let role = guild.roles.cache.get("698463407816573039").members.size;
            channel.setName('New Releases: ' + role);
        } catch (error) {
            console.error(error);
        }
    }, 1000*60*1)
    setInterval(function() {
        try {
            let guild = client.guilds.cache.get("326739046531596289");
            let channel = guild.channels.cache.get("879526368541548625");
            let role = guild.roles.cache.get("547343519585665025").members.size;
            channel.setName('Linked: ' + role);
        } catch (error) {
            console.error(error);
        }
    }, 1000*60*1)
};