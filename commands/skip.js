const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnection, createAudioResource } = require("@discordjs/voice");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skips the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        if (voiceConnection && globals.player[interaction.guild.id].status == 1) {
            globals.player[interaction.guild.id].titles.shift();
            globals.player[interaction.guild.id].urls.shift();
            const stream = await fetch(globals.player[interaction.guild.id].urls[0]);
            if (stream.ok) {
                globals.player[interaction.guild.id].resource = createAudioResource(stream.body, {
                    inlineVolume: true
                });
                globals.player[interaction.guild.id].resource.volume.setVolume(0.3);
                globals.player[interaction.guild.id].player.play(globals.player[interaction.guild.id].resource);
                voiceConnection.subscribe(globals.player[interaction.guild.id].player);
            }
        }

        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setTitle("Music Player")
            .setDescription("Skipped playing audio")
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
	},
};