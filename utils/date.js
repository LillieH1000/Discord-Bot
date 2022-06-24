module.exports = async(client) => {
    try {
        // Town Of Salem Server
        setInterval(function() {
            let guild = client.guilds.cache.get("416350699794857986");
            let channel = guild.channels.cache.get("772878026521182248");
            const date = new Date();
            const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            channel.setName('Date: ' + month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear());
        }, 1000*60*1)
    } catch (error) {
        console.error(error);
    }
};