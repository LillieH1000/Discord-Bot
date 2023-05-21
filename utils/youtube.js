const { EmbedBuilder } = require("discord.js");
var globals = require("../globals.js");
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

var os = new os_func();

async function ytdlp(message, components, details, dislikes) {
    const command = `yt-dlp -J -f "bestaudio/best" --no-playlist ${details}`;
    os.execCommand(command, function(value) {
        const output = JSON.parse(value);

        const time = new Date(output.duration * 1000).toISOString().slice(11, 19);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setFooter({ text: `Length: ${time}` })
            .setTimestamp()

        if (dislikes != null) {
            embed.setDescription(`Views: ${output.view_count.toLocaleString()}\nLikes: ${output.like_count.toLocaleString()}\nDislikes: ${dislikes.toLocaleString()}`)
        }
        if (dislikes == null) {
            embed.setDescription(`Views: ${output.view_count.toLocaleString()}\nLikes: ${output.like_count.toLocaleString()}`)
        }

        if (components != null && components != undefined && components.length != 0) {
            message.reply({ embeds: [embed], components: components, allowedMentions: { repliedUser: false } });
        } else {
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }
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
                        const components = await globals.music(null, word.match(rx)[1]);
                        await ytdlp(message, components, word, data.dislikes);
                    } else {
                        const components = await globals.music(null, word.match(rx)[1]);
                        await ytdlp(message, components, word, null);
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};