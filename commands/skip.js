const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnection, createAudioResource } = require("@discordjs/voice");
let globals = require("../globals.js");

async function request(id) {
    const res = await fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc&prettyPrint=false", {
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
            "videoId": id
        }),
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "com.google.ios.youtube/17.33.2 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)"
        }
    });

    if (res.ok) {
        const data = await res.json();
        return data.streamingData.hlsManifestUrl;
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skips the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        if (voiceConnection && voiceConnection.joinConfig.channelId == interaction.member.voice.channelId && globals.player[interaction.guild.id].status == 1) {
            globals.player[interaction.guild.id].ids.shift();

            const url = await request(globals.player[interaction.guild.id].ids[0]);
            globals.player[interaction.guild.id].resource = createAudioResource(url, {
                inlineVolume: true
            });
            globals.player[interaction.guild.id].resource.volume.setVolume(0.3);
            globals.player[interaction.guild.id].player.play(globals.player[interaction.guild.id].resource);
            voiceConnection.subscribe(globals.player[interaction.guild.id].player);

            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Music Player")
                .setDescription("Skipped playing audio")
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } else {
            await interaction.deleteReply();
        }
	},
};