const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc")
let timezone = require("dayjs/plugin/timezone");

module.exports = async(client) => {
    // Town Of Salem Server
    setInterval(async function() {
        try {
            const guild = client.guilds.cache.get("416350699794857986") || await client.guilds.fetch("416350699794857986");
            const channel = guild.channels.cache.get("772878026521182248") || await guild.channels.fetch("772878026521182248");
            const date = new Date();
            dayjs.extend(utc);
            dayjs.extend(timezone);
            const formatteddate = dayjs.tz(date, "America/New_York").format("MMMM D, YYYY");
            channel.setName(`Date: ${formatteddate}`);
        } catch (error) {
            console.error(error);
        }
    }, 1000*60*1)
};