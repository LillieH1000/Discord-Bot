const { joinVoiceChannel, getVoiceConnection, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require("@discordjs/voice");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
let shellescape = require('shell-escape');
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

async function ytdlp(interaction, platform, extension, flag, details) {
    let command;
    if (flag == null) {
        command = ["yt-dlp", "-J", "-f", `bestaudio[ext=${extension}]/best[ext=${extension}]`, "--no-playlist", details];
    } else if (flag != null) {
        command = ["yt-dlp", "-J", "-f", `bestaudio[ext=${extension}]/best[ext=${extension}]`, "--no-playlist", `${flag}:${details}`];
    }
    os.execCommand(shellescape(command), function(value) {
        const output = JSON.parse(value);

        let embed;
        let id;
        if (flag == null) {
            id = output.id;
            globals.player[interaction.guild.id].titles.push(output.title);
            globals.player[interaction.guild.id].urls.push(output.url);

            const time = new Date(output.duration * 1000).toISOString().slice(11, 19);
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

            embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Music Player")
                .setDescription("Queued")
                .setThumbnail(output.thumbnail)
                .addFields(
                    { name: output.title, value: output.uploader, inline: false },
                )
                .setFooter({ text: `Length: ${formattedTime}` })
                .setTimestamp()
        } else if (flag != null) {
            id = output.entries[0].id;
            globals.player[interaction.guild.id].titles.push(output.entries[0].title);
            globals.player[interaction.guild.id].urls.push(output.entries[0].url);

            const time = new Date(output.entries[0].duration * 1000).toISOString().slice(11, 19);
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
            
            embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Music Player")
                .setDescription("Queued")
                .setThumbnail(output.entries[0].thumbnail)
                .addFields(
                    { name: output.entries[0].title, value: output.entries[0].uploader, inline: false },
                )
                .setFooter({ text: `Length: ${formattedTime}` })
                .setTimestamp()
        }

        globals.music(platform, id, null).then((components) => {
            if (components != null && components != undefined && components.length != 0) {
                interaction.editReply({ embeds: [embed], components: components });
            } else {
                interaction.editReply({ embeds: [embed] });
            }
        });

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        if (voiceConnection && globals.player[interaction.guild.id].status == 0) {
            globals.player[interaction.guild.id].status = 1;
            fetch(globals.player[interaction.guild.id].urls[0]).then((stream) => {
                if (stream.ok) {
                    globals.player[interaction.guild.id].resource = createAudioResource(stream.body, {
                        inlineVolume: true
                    });
                    globals.player[interaction.guild.id].resource.volume.setVolume(0.3);
                    globals.player[interaction.guild.id].player.play(globals.player[interaction.guild.id].resource);
                    voiceConnection.subscribe(globals.player[interaction.guild.id].player);

                    globals.player[interaction.guild.id].player.on(AudioPlayerStatus.Idle, () => {
                        try {
                            globals.player[interaction.guild.id].titles.shift();
                            globals.player[interaction.guild.id].urls.shift();
                            const voiceConnection = getVoiceConnection(interaction.guild.id);
                            if (globals.player[interaction.guild.id].urls == null || globals.player[interaction.guild.id].urls == undefined || globals.player[interaction.guild.id].urls.length == 0) {
                                voiceConnection.destroy();
                                delete globals.player[interaction.guild.id];
                            } else {
                                fetch(globals.player[interaction.guild.id].urls[0]).then((stream) => {
                                    if (stream.ok) {
                                        globals.player[interaction.guild.id].resource = createAudioResource(stream.body, {
                                            inlineVolume: true
                                        });
                                        globals.player[interaction.guild.id].resource.volume.setVolume(0.3);
                                        globals.player[interaction.guild.id].player.play(globals.player[interaction.guild.id].resource);
                                        voiceConnection.subscribe(globals.player[interaction.guild.id].player);
                                    }
                                });
                            }
                        } catch (error) {
                            console.error(error);
                        }
                    })

                    globals.player[interaction.guild.id].player.on("error", voiceerror => {
                        console.error(voiceerror);
                        try {
                            const voiceConnection = getVoiceConnection(interaction.guild.id);
                            voiceConnection.destroy();
                            delete globals.player[interaction.guild.id];
                        } catch (error) {
                            console.error(error);
                        }
                    })
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
            option.setName("source")
                .setDescription("Choose the video/audio source")
                .setRequired(true)
                .addChoices(
                    { name: "YouTube", value: "youtube" },
                    { name: "SoundCloud", value: "soundcloud" },
                    { name: "Bandcamp", value: "bandcamp" },
                ))
        .addStringOption(option =>
            option.setName("url")
                .setDescription("Enter the url")
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString("source");
        const url = interaction.options.getString("url");

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        
        if (!voiceConnection) {
            joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            if (!globals.player.hasOwnProperty([interaction.guild.id])) {
                globals.player = {
                    [interaction.guild.id]: {
                        "status": 0,
                        "titles": [],
                        "urls": [],
                        "player": createAudioPlayer(),
                        "resource": null
                    }
                };
            }
        }

        if (source == "youtube") {
            const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            if (url.match(rx)) {
                await ytdlp(interaction, "youtube", "m4a", null, url);
            } else {
                await ytdlp(interaction, "youtube", "m4a", "ytsearch", url);
            }
        }
        if (source == "soundcloud") {
            const rx = /^http(?:s)?:\/\/(.*)soundcloud\.com|snd\.sc\/$/;
            if (url.match(rx)) {
                await ytdlp(interaction, "soundcloud", "mp3", null, url);
            } else {
                await ytdlp(interaction, "soundcloud", "mp3", "scsearch", url);
            }
        }
        if (source == "bandcamp") {
            const rx = /^http(?:s)?:\/\/(.*)bandcamp\.com\//;
            if (url.match(rx)) {
                await ytdlp(interaction, "bandcamp", "mp3", null, url);
            } else {
                const embed = new EmbedBuilder()
                    .setColor(globals.colours.embed)
                    .setTitle("Music Player")
                    .setDescription("Only urls are supported for Bandcamp, search for Bandcamp is currently unsupported")
                    .setTimestamp()

                await interaction.editReply({ embeds: [embed] });
            }
        }
	},
};