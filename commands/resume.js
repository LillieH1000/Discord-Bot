const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("resume")
		.setDescription("Resumes the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        globals.player.unpause();

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Music Player")
            .setDescription("Resumed playing audio")
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
	},
};
