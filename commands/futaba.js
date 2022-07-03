const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');

function resultscheck(data) {
    var option = _.sample([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
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
        const res = await fetch('https://www.reddit.com/r/churchoffutaba.json?limit=20');
        if (res.ok) {
            const data = await res.json();
            const results = resultscheck(data);
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Futaba Pics')
                .setDescription('[r/The Church Of Futaba](https://www.reddit.com/r/churchoffutaba/)')
                .setImage(data.data.children[results].data.url)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Reddit Post')
                        .setStyle(ButtonStyle.Link)
                        .setURL('https://www.reddit.com' + data.data.children[results].data.permalink)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle(ButtonStyle.Link)
                        .setURL(data.data.children[results].data.url)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};