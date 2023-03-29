const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var globals = require('../globals.js');

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

        for (i = 0; i < globals.queue.length; i++) {
            queuecount += 1;
            queuelistcount += 1;
            queuelist += queuelistcount.toString() + ') ' + globals.titles[i];
            if (globals.queue.length != queuecount) {
                queuelist += '\n';
            }
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle('Music Player')
            .setTimestamp()

        if (globals.queue === undefined || globals.queue.length == 0) {
            embed.addFields(
                { name: 'Songs In Queue', value: 'None', inline: false },
            );
        } else {
            embed.addFields(
                { name: 'Songs In Queue', value: queuelist, inline: false },
            );
        }

        await interaction.editReply({ embeds: [embed] });
	},
};
