const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globalscolours = require('../globals/colours.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cuddle')
		.setDescription('Posts a random cuddling picture'),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2, 3, 4]);
        if (option == 1) {
            const res = await fetch('https://nekos.life/api/v2/img/cuddle');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globalscolours.embed)
                    .setTitle('Cuddle Pics')
                    .setDescription('[Nekos.Life](https://nekos.life/)')
                    .setImage(data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 2) {
            const res = await fetch('https://api.waifu.pics/sfw/cuddle');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globalscolours.embed)
                    .setTitle('Cuddle Pics')
                    .setDescription('[Waifu.Pics](https://waifu.pics/)')
                    .setImage(data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 3) {
            const res = await fetch('https://nekos.best/api/v2/cuddle');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globalscolours.embed)
                    .setTitle('Cuddle Pics')
                    .setDescription('[Nekos.Best](https://nekos.best/)')
                    .setImage(data.results[0].url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.results[0].url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 4) {
            const res = await fetch('https://hmtai.herokuapp.com/v2/cuddle/');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globalscolours.embed)
                    .setTitle('Cuddle Pics')
                    .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                    .setImage(data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
	},
};