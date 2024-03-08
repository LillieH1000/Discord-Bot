import { EmbedBuilder } from "discord.js";
import globals from "../globals.js";

async function invoke(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;

        message.content = message.content.replace(/</gm, "").replace(/>/gm, "");
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                if (word.match(rx)) {
                    const data1 = await globals.request(word.match(rx)[1]);

                    const time = new Date(parseInt(data1.videoDetails.lengthSeconds) * 1000).toISOString().slice(11, 19);
                    const timesplit = time.split(":");
                    let formattedTime;
                    if (timesplit[0] == "00") {
                        const splicedTime = timesplit.splice(1).join(":");
                        if (splicedTime.split(":")[0].startsWith("0")) {
                            formattedTime = splicedTime.slice(1);
                        } else {
                            formattedTime = splicedTime;
                        }
                    } else if (timesplit[0].startsWith("0")) {
                        formattedTime = timesplit.join(":").slice(1);
                    } else {
                        formattedTime = timesplit.join(":");
                    }

                    const embed = new EmbedBuilder()
                        .setColor(globals.colours.embed)
                        .setFooter({ text: `Length: ${formattedTime}` })
                        .setTimestamp();

                    const res = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${word.match(rx)[1]}`);
                    if (res.ok) {
                        const data2 = await res.json();
                        embed.setDescription(`Views: ${parseInt(data1.videoDetails.viewCount).toLocaleString()}\nLikes: ${data2.likes.toLocaleString()}\nDislikes: ${data2.dislikes.toLocaleString()}`)
                    } else {
                        embed.setDescription(`Views: ${parseInt(data1.videoDetails.viewCount).toLocaleString()}`)
                    }

                    await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };