const { EmbedBuilder } = require("discord.js");
var globals = require("../globals.js");

module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                if (word.match(rx)) {
                    const res1 = await fetch("https://yt.lillieh1000.gay/?videoID=".concat(word.match(rx)[1]));
                    const res2 = await fetch("https://returnyoutubedislikeapi.com/votes?videoId=".concat(word.match(rx)[1]));
                    if (res1.ok && res2.ok) {
                        const data1 = await res1.json();
                        const data2 = await res2.json();

                        const embed = new EmbedBuilder()
                            .setColor(globals.embedcolour)
                            .setDescription("Views: " + data1.viewcount.toLocaleString() + "\nLikes: " + data2.likes.toLocaleString() + "\nDislikes: " + data2.dislikes.toLocaleString())
                            .setTimestamp()

                        await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};