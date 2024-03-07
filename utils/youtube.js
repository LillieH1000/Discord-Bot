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
                    const res1 = await fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc&prettyPrint=false", {
                        method: "post",
                        body: JSON.stringify({
                            "context": {
                                "client": {
                                    "hl": "en",
                                    "gl": "CA",
                                    "clientName": "IOS",
                                    "clientVersion": "17.33.2",
                                    "deviceModel": "iPhone14,3"
                                }
                            },
                            "contentCheckOk": true,
                            "racyCheckOk": true,
                            "videoId": word.match(rx)[1]
                        }),
                        headers: {
                            "Content-Type": "application/json",
                            "User-Agent": "com.google.ios.youtube/17.33.2 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)"
                        }
                    });
                    const res2 = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${word.match(rx)[1]}`);
                    if (res1.ok && res2.ok) {
                        const data1 = await res1.json();
                        const data2 = await res2.json();

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
                            .setDescription(`Views: ${parseInt(data1.videoDetails.viewCount).toLocaleString()}\nLikes: ${data2.likes.toLocaleString()}\nDislikes: ${data2.dislikes.toLocaleString()}`)
                            .setFooter({ text: `Length: ${formattedTime}` })
                            .setTimestamp();

                        await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };