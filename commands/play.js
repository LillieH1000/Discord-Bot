const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require("@discordjs/voice");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
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

async function ytdlp(type, interaction, components, details) {
    var command = new String();
    if (type == 0) {
        command = `yt-dlp -J -f "bestaudio/best" --no-playlist ${details}`;
    }
    if (type == 1) {
        command = `yt-dlp -J -f "bestaudio/best" --no-playlist "ytsearch:${details}"`;
    }
    os.execCommand(command, function(value) {
        const output = JSON.parse(value);

        var embed;
        if (type == 0) {
            globals.queue.push(output.url);
            globals.titles.push(output.title);

            const time = new Date(output.duration * 1000).toISOString().slice(11, 19);
            embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Music Player")
                .setDescription("Queued")
                .setThumbnail(output.thumbnail)
                .addFields(
                    { name: output.title, value: output.uploader, inline: false },
                )
                .setFooter({ text: `Length: ${time}` })
                .setTimestamp()
        }
        if (type == 1) {
            globals.queue.push(output.entries[0].url);
            globals.titles.push(output.entries[0].title);

            const time = new Date(output.entries[0].duration * 1000).toISOString().slice(11, 19);
            embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Music Player")
                .setDescription("Queued")
                .setThumbnail(output.entries[0].thumbnail)
                .addFields(
                    { name: output.entries[0].title, value: output.entries[0].uploader, inline: false },
                )
                .setFooter({ text: `Length: ${time}` })
                .setTimestamp()
        }

        if (components != null && components != undefined && components.length != 0) {
            interaction.editReply({ embeds: [embed], components: components });
        } else {
            interaction.editReply({ embeds: [embed] });
        }

        if (globals.connectionstatus == 0) {
            globals.connectionstatus = 1;
            globals.nowplaying = globals.titles[0];
            fetch(globals.queue[0]).then((stream) => {
                if (stream.ok) {
                    globals.resource = createAudioResource(stream.body, {
                        inlineVolume: true
                    });
                    globals.resource.volume.setVolume(0.3);
                    globals.player.play(globals.resource);
                    globals.connection.subscribe(globals.player);
                }
            });
        }
    });
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a song")
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName("url")
                .setDescription("Enter the url")
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const url = interaction.options.getString("url");

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        
        if (!voiceConnection) {
            globals.connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
        }

        const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        if (url.match(rx)) {
            const components = await globals.music(null, url.match(rx)[1]);
            await ytdlp(0, interaction, components, url);
        } else if (url == "test") {
            const components = await globals.music(null, "zyRt-nBM3dY");
            await ytdlp(0, interaction, components, "https://www.youtube.com/watch?v=zyRt-nBM3dY");
        } else {
            const components = await globals.music(url, null);
            await ytdlp(1, interaction, components, url);
        }
	},
};