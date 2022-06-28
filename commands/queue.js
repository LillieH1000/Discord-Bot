const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Lists all the songs in the queue')
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        var queuecount = 0;
        var queuelistcount = 0;
        var queuelist = '';

        for (i = 0; i < globalsaudio.queue.length; i++) {
            queuecount += 1;
            if (globalsaudio.titles[i] != 'ai') {
                queuelistcount += 1;
                queuelist += queuelistcount.toString() + ') ' + globalsaudio.titles[i];
                if (globalsaudio.queue.length != queuecount) {
                    queuelist += '\n';
                }
            }
        }

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setTimestamp()

        if (globalsaudio.queue === undefined || globalsaudio.queue.length == 0) {
            embed.addField('Songs In Queue', 'None', false);
        } else {
            embed.addField('Songs In Queue', queuelist, false);
        }

        await interaction.editReply({ embeds: [embed] });
	},
};
