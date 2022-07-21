const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nowplaying')
		.setDescription('Shows the current playing song')
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setTimestamp()

        if (globalsaudio.nowplaying == '') {
            embed.setDescription('There is currently nothing playing')
        } else {
            embed.setDescription('Now Playing: ' + globalsaudio.nowplaying)
        }

        await interaction.editReply({ embeds: [embed] });
	},
};