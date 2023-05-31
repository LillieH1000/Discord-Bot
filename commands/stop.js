const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stops the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        globals.connection.destroy();
        globals.queue = [];
        globals.titles = [];
        globals.nowplaying = "";
        globals.connectionstatus = 0;

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Music Player")
            .setDescription("Stopped play audio and disconnected from voice chat")
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
	},
};