const dayjs = require('dayjs');
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone');

module.exports = async(client) => {
    try {
        // Town Of Salem Server
        setInterval(function() {
            let guild = client.guilds.cache.get("416350699794857986");
            let channel = guild.channels.cache.get("772878026521182248");
            const date = new Date();
            dayjs.extend(utc);
            dayjs.extend(timezone);
            const formatteddate = dayjs.tz(date, "America/New_York").format('MMMM D, YYYY');
            channel.setName('Date: ' + formatteddate);
        }, 1000*60*1)
    } catch (error) {
        console.error(error);
    }
};