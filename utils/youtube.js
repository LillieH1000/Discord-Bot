const { EmbedBuilder } = require("discord.js");
let globals = require("../globals.js");
const exec = require("child_process").exec;

function os_func() {
    this.execCommand = function(cmd, callback) {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                return;
            }
            callback(stdout);
        });
    }
}

let os = new os_func();

async function ytdlp(message, details, dislikes) {
    os.execCommand(`yt-dlp -J --no-playlist ${details}`, function(value) {
        const output = JSON.parse(value);

        const time = new Date(output.duration * 1000).toISOString().slice(11, 19);
        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setFooter({ text: `Length: ${time}` })
            .setTimestamp()

        let description = new String();
        if (output.view_count != null && output.view_count != undefined && output.view_count.length != 0) {
            if (description != null && description != undefined && description.length != 0) {
                description += "\n";
            }
            description += `Views: ${output.view_count.toLocaleString()}`;
        }
        if (output.like_count != null && output.like_count != undefined && output.like_count.length != 0) {
            if (description != null && description != undefined && description.length != 0) {
                description += "\n";
            }
            description += `Likes: ${output.like_count.toLocaleString()}`;
        }
        if (dislikes != null && dislikes != undefined && dislikes.length != 0) {
            if (description != null && description != undefined && description.length != 0) {
                description += "\n";
            }
            description += `Dislikes: ${dislikes.toLocaleString()}`;
        }
        if (description != null && description != undefined && description.length != 0) {
            embed.setDescription(description);
        }

        globals.music("youtube", output.id, null).then((components) => {
            if (components != null && components != undefined && components.length != 0) {
                message.reply({ embeds: [embed], components: components, allowedMentions: { repliedUser: false } });
            } else {
                message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
            }
        });
    });
}

module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                if (word.match(rx)) {
                    const res = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${encodeURIComponent(word.match(rx)[1])}`);
                    if (res.ok) {
                        const data = await res.json();
                        await ytdlp(message, word, data.dislikes);
                    } else {
                        await ytdlp(message, word, null);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};