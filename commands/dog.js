const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globals = require('../globals.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Posts a random dog picture'),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2, 3, 4]);
        if (option == 1) {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle('Dog Pics')
                    .setDescription('[Dog.Ceo](https://dog.ceo/)')
                    .setImage(data.message)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.message)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 2) {
            const res = await fetch('https://nekos.life/api/v2/img/woof');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle('Dog Pics')
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
        if (option == 3) {
            const res = await fetch('https://api.alexflipnote.dev/dogs');
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle('Dog Pics')
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
        if (option == 4) {
            const image = await globals.reddit('dogpictures');
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle('Dog Pics')
                .setDescription('[r/Dog Pictures](https://www.reddit.com/r/dogpictures/)')
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