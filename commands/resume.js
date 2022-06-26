const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the current playing song')
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        globalsaudio.player.unpause();

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setDescription('Resumed playing audio')
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
	},
};
