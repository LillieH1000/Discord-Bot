const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("resume")
		.setDescription("Resumes the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        if (voiceConnection && voiceConnection.joinConfig.channelId == interaction.member.voice.channelId && globals.player[interaction.guild.id].status == 1) {
            globals.player[interaction.guild.id].player.unpause();

            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Music Player")
                .setDescription("Resumed playing audio")
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } else {
            await interaction.deleteReply();
        }
	},
};
