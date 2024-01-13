const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getVoiceConnection } = require("@discordjs/voice");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stops the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        if (voiceConnection && voiceConnection.joinConfig.channelId == interaction.member.voice.channelId && globals.player[interaction.guild.id].status == 1) {
            voiceConnection.destroy();
            delete globals.player[interaction.guild.id];

            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Music Player")
                .setDescription("Stopped play audio and disconnected from voice chat")
                .setTimestamp();

            await interaction.editReply({ embeds: [embed] });
        } else {
            await interaction.deleteReply();
        }
	},
};