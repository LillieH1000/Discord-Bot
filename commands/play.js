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
            option.setName("url")
                .setDescription("Enter the yt url")
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
            const body = {
                "videoID": url.match(rx)[1],
                "countryCode": "CA",
                "clientName": "ANDROID",
                "clientVersion": "16.20",
                "showLinks": true
            }
            const res = await fetch("https://yt.lillieh1000.gay/player/v2/", {
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
            const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Music Player")
                    .setDescription("Search for audio is currently in-development, please pass a yt url for the time being")
                    .setTimestamp()

            await interaction.editReply({ embeds: [embed] });
        }
	},
};