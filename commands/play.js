const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require("@discordjs/voice");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
var got = require("got");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a song")
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName("info")
                .setDescription("Enter the yt video name or url")
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const info = interaction.options.getString("info");

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        
        if (!voiceConnection) {
            globals.connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
        }

        const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        if (info.match(rx)) {
            const body = {
                "videoID": info.match(rx)[1],
                "countryCode": "CA",
                "showLinks": true
            }
            const res = await fetch("https://yt.lillieh1000.gay/player/v3/", {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res.ok) {
                const data = await res.json();

                globals.queue.push(data.bestAudio);
                globals.titles.push(data.title);

                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Music Player")
                    .setDescription("Queued: " + data.title)
                    .setTimestamp()

                await interaction.editReply({ embeds: [embed] });

                if (globals.connectionstatus == 0) {
                    globals.connectionstatus = 1;
                    globals.nowplaying = globals.titles[0];
                    globals.resource = createAudioResource(got.stream(globals.queue[0]), {
                        inlineVolume: true
                    });
                    globals.resource.volume.setVolume(0.3);
                    globals.player.play(globals.resource);
                    globals.connection.subscribe(globals.player);
                }
            }
        } else {
            const body = {
                "query": info,
                "countryCode": "CA"
            }
            const res1 = await fetch("https://yt.lillieh1000.gay/search/v1/", {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (res1.ok) {
                const data1 = await res1.json();

                const body = {
                    "videoID": data1.info[0].videoID,
                    "countryCode": "CA",
                    "showLinks": true
                }
                const res2 = await fetch("https://yt.lillieh1000.gay/player/v3/", {
                    method: "post",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (res2.ok) {
                    const data2 = await res2.json();

                    globals.queue.push(data2.bestAudio);
                    globals.titles.push(data2.title);

                    const embed = new EmbedBuilder()
                        .setColor(globals.embedcolour)
                        .setTitle("Music Player")
                        .setDescription("Queued: " + data2.title)
                        .setTimestamp()

                    await interaction.editReply({ embeds: [embed] });

                    if (globals.connectionstatus == 0) {
                        globals.connectionstatus = 1;
                        globals.nowplaying = globals.titles[0];
                        globals.resource = createAudioResource(got.stream(globals.queue[0]), {
                            inlineVolume: true
                        });
                        globals.resource.volume.setVolume(0.3);
                        globals.player.play(globals.resource);
                        globals.connection.subscribe(globals.player);
                    }
                }
            }
        }
	},
};