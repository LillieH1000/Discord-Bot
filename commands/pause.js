const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the current playing song'),
	async execute(interaction) {
        await interaction.deferReply();

        globalsaudio.player.pause();

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setDescription('Paused playing audio')
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
	},
};
