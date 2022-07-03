const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
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
		.setName('lillie')
		.setDescription('Posts a random lillie (pokemon) picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://www.reddit.com/r/lillie.json?limit=20');
        if (res.ok) {
            const data = await res.json();
            const results = resultscheck(data);
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Lillie Pics')
                .setDescription('[r/Lillie](https://www.reddit.com/r/Lillie/)')
                .setImage(data.data.children[results].data.url)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Reddit Post')
                        .setStyle('LINK')
                        .setURL('https://www.reddit.com' + data.data.children[results].data.permalink)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(data.data.children[results].data.url)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};