const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the current playing song'),
	async execute(interaction) {
        await interaction.deferReply();

        globalsaudio.connection.destroy();
        globalsaudio.queue = [];

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setDescription('Stopped play audio and disconnected from voice chat')
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
	},
};
