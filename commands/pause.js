const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("pause")
		.setDescription("Pauses the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        if (voiceConnection && voiceConnection.joinConfig.channelId == interaction.member.voice.channelId && globals.player[interaction.guild.id].status == 1) {
            globals.player[interaction.guild.id].player.pause();

            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Music Player")
                .setDescription("Paused playing audio")
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } else {
            await interaction.deleteReply();
        }
	},
};
