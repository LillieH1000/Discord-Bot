module.exports = async(client) => {
    // Town Of Salem Server
    setInterval(function() {
        try {
            let guild = client.guilds.cache.get("416350699794857986");
            let channel = guild.channels.cache.get("772878081907884072");
            channel.setName('Members: ' + guild.memberCount);
        } catch (error) {
            console.error(error);
        }
    }, 1000*60*1)
    // Lillie's Server
    setInterval(function() {
        try {
            let guild = client.guilds.cache.get("918949427522191361");
            let channel = guild.channels.cache.get("932817405556690944");
            channel.setName('Members: ' + guild.memberCount);
        } catch (error) {
            console.error(error);
        }
    }, 1000*60*1)
    // Chariz Server
    setInterval(function() {
        try {
            let guild = client.guilds.cache.get("326739046531596289");
            let channel = guild.channels.cache.get("879526082154496012");
            channel.setName('Members: ' + guild.memberCount);
        } catch (error) {
            console.error(error);
        }
    }, 1000*60*1)
};