const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Lists all the songs in the queue'),
	async execute(interaction) {
        await interaction.deferReply();

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setDescription('Songs in queue')
            .setTimestamp()

        for (i = 0; i < globalsaudio.queue.length; i++) {
            embed.addField(i.toString() + ':', globalsaudio.queue[i], false);
        }

        interaction.editReply({ embeds: [embed] });
	},
};
