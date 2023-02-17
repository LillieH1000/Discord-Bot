const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globalscolours = require('../globals/colours.js');
var globalsreddit = require('../globals/reddit.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Posts a random cat picture'),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2, 3, 4, 5]);
        if (option == 1) {
            const res = await fetch('https://nekos.life/api/v2/img/meow');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globalscolours.embed)
                    .setTitle('Cat Pics')
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
            const res = await fetch('https://api.alexflipnote.dev/cats');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globalscolours.embed)
                    .setTitle('Cat Pics')
                    .setDescription('[AlexFlipnote.Dev](https://alexflipnote.dev/)')
                    .setImage(data.file)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.file)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 3) {
            const res = await fetch('https://cataas.com/cat?json=true');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globalscolours.embed)
                    .setTitle('Cat Pics')
                    .setDescription('[Cataas](https://cataas.com/)')
                    .setImage('https://cataas.com' + data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL('https://cataas.com' + data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 4) {
            const image = await globalsreddit.sfw('cats');
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Cat Pics')
                .setDescription('[r/Cats](https://www.reddit.com/r/cats/)')
                .setImage(image)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle(ButtonStyle.Link)
                        .setURL(image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
        if (option == 5) {
            const image = await globalsreddit.sfw('catpictures');
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Cat Pics')
                .setDescription('[r/Cat Pictures](https://www.reddit.com/r/catpictures/)')
                .setImage(image)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle(ButtonStyle.Link)
                        .setURL(image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};