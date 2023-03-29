const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pause")
		.setDescription("Pauses the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        globals.player.pause();

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Music Player")
            .setDescription("Paused playing audio")
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
	},
};
