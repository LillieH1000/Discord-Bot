const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("nowplaying")
		.setDescription("Shows the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Music Player")
            .setTimestamp()

        if (globals.nowplaying == "") {
            embed.setDescription("There is currently nothing playing")
        } else {
            embed.setDescription("Now Playing: " + globals.nowplaying)
        }

        await interaction.editReply({ embeds: [embed] });
	},
};