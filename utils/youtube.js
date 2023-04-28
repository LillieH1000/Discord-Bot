const { EmbedBuilder } = require("discord.js");
var globals = require("../globals.js");

module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                if (word.match(rx)) {
                    const res1 = await fetch(`https://yt.lillieh1000.gay/player/v6/?videoID=${word.match(rx)[1]}`);
                    const res2 = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${word.match(rx)[1]}`);
                    if (res1.ok && res2.ok) {
                        const data1 = await res1.json();
                        const data2 = await res2.json();
                        const components = await globals.music(null, word.match(rx)[1]);

                        const embed = new EmbedBuilder()
                            .setColor(globals.embedcolour)
                            .setDescription(`Views: ${data1.viewcount.toLocaleString()}\nLikes: ${data2.likes.toLocaleString()}\nDislikes: ${data2.dislikes.toLocaleString()}`)
                            .setTimestamp()

                        if (components != null && components != undefined && components.length != 0) {
                            await message.reply({ embeds: [embed], components: components, allowedMentions: { repliedUser: false } });
                        } else {
                            await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};