const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Change the volume of the current playing song')
        .setDMPermission(false)
        .addIntegerOption(option =>
            option.setName('volume')
                .setDescription('Enter the volume integer (1 - 100) [Default: 30]')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const volume = interaction.options.getInteger('volume');
        
        globalsaudio.resource.volume.setVolume(volume / 100);

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setDescription('Changed audio volume level to: ' + volume.toString())
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
	},
};
