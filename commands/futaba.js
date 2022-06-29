const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
var _ = require('underscore');

function resultscheck(data) {
    var option = _.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    if (data.data.children[option].data.over_18 == false & data.data.children[option].data.stickied == false & data.data.children[option].data.pinned == false & data.data.children[option].data.is_video == false) {
        return option;
    } else {
        resultscheck(data);
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('futaba')
		.setDescription('Posts a random futaba (persona 5) picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://www.reddit.com/r/churchoffutaba.json?limit=10');
        if (res.ok) {
            const data = await res.json();
            const results = resultscheck(data);
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Futaba Pics')
                .setDescription('[r/The Church Of Futaba](https://www.reddit.com/r/churchoffutaba/)')
                .setImage(data.data.children[results].data.url)
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('View Reddit Post')
                        .setStyle('LINK')
                        .setURL('https://www.reddit.com' + data.data.children[results].data.permalink)
                )
                .addComponents(
                    new MessageButton()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(data.data.children[results].data.url)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};