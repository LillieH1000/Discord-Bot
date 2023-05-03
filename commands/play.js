const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require("@discordjs/voice");
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a song")
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName("info")
                .setDescription("Enter the song name (YouTube) or url (YouTube, Audiomack)")
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

        const ytrx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
        const amrx = /^http(?:s)?:\/\/(.*)audiomack\.com\//;
        if (info.match(ytrx)) {
            const res = await fetch(`https://yt.lillieh1000.gay/?videoID=${encodeURIComponent(info.match(ytrx)[1])}`);
            if (res.ok) {
                const data = await res.json();
                const components = await globals.music(null, info.match(ytrx)[1]);

                globals.queue.push(data.best.audio.mp4);
                globals.titles.push(data.title);

                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Music Player")
                    .setDescription("Queued")
                    .setThumbnail(data.artwork)
                    .addFields(
                        { name: data.title, value: data.author, inline: false },
                    )
                    .setTimestamp()

                if (components != null && components != undefined && components.length != 0) {
                    await interaction.editReply({ embeds: [embed], components: components });
                } else {
                    await interaction.editReply({ embeds: [embed] });
                }

                if (globals.connectionstatus == 0) {
                    globals.connectionstatus = 1;
                    globals.nowplaying = globals.titles[0];
                    const stream = await fetch(globals.queue[0]);
                    if (stream.ok) {
                        globals.resource = createAudioResource(stream.body, {
                            inlineVolume: true
                        });
                        globals.resource.volume.setVolume(0.3);
                        globals.player.play(globals.resource);
                        globals.connection.subscribe(globals.player);
                    }
                }
            }
        } else if (info.match(amrx)) {
            const res = await fetch(`https://am.lillieh1000.gay/?url=${encodeURIComponent(info)}`);
            if (res.ok) {
                const data = await res.json();
                const components = await globals.music(info, null);

                globals.queue.push(data.streamURL);
                globals.titles.push(data.title);

                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Music Player")
                    .setDescription("Queued")
                    .setThumbnail(data.artwork)
                    .addFields(
                        { name: data.title, value: data.author, inline: false },
                    )
                    .setTimestamp()

                if (components != null && components != undefined && components.length != 0) {
                    await interaction.editReply({ embeds: [embed], components: components });
                } else {
                    await interaction.editReply({ embeds: [embed] });
                }

                if (globals.connectionstatus == 0) {
                    globals.connectionstatus = 1;
                    globals.nowplaying = globals.titles[0];
                    const stream = await fetch(globals.queue[0]);
                    if (stream.ok) {
                        globals.resource = createAudioResource(stream.body, {
                            inlineVolume: true
                        });
                        globals.resource.volume.setVolume(0.3);
                        globals.player.play(globals.resource);
                        globals.connection.subscribe(globals.player);
                    }
                }
            }
        } else {
            const res1 = await fetch(`https://yt.lillieh1000.gay/?query=${encodeURIComponent(info)}`);
            if (res1.ok) {
                const data1 = await res1.json();

                const res2 = await fetch(`https://yt.lillieh1000.gay/?videoID=${encodeURIComponent(data1.info[0].videoID)}`);
                if (res2.ok) {
                    const data2 = await res2.json();
                    const components = await globals.music(null, data1.info[0].videoID);

                    globals.queue.push(data2.best.audio.mp4);
                    globals.titles.push(data2.title);

                    const embed = new EmbedBuilder()
                        .setColor(globals.embedcolour)
                        .setTitle("Music Player")
                        .setDescription("Queued")
                        .setThumbnail(data2.artwork)
                        .addFields(
                            { name: data2.title, value: data2.author, inline: false },
                        )
                        .setTimestamp()

                    if (components != null && components != undefined && components.length != 0) {
                        await interaction.editReply({ embeds: [embed], components: components });
                    } else {
                        await interaction.editReply({ embeds: [embed] });
                    }

                    if (globals.connectionstatus == 0) {
                        globals.connectionstatus = 1;
                        globals.nowplaying = globals.titles[0];
                        const stream = await fetch(globals.queue[0]);
                        if (stream.ok) {
                            globals.resource = createAudioResource(stream.body, {
                                inlineVolume: true
                            });
                            globals.resource.volume.setVolume(0.3);
                            globals.player.play(globals.resource);
                            globals.connection.subscribe(globals.player);
                        }
                    }
                }
            }
        }
	},
};