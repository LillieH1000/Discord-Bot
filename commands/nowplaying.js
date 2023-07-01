const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
let globals = require("../globals.js");

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

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        if (voiceConnection && globals.player[interaction.guild.id].status == 1) {
            embed.setDescription(`Now Playing: ${globals.player[interaction.guild.id].titles[0]}`)
        } else {
            embed.setDescription("There is currently nothing playing")
        }

        await interaction.editReply({ embeds: [embed] });
	},
};