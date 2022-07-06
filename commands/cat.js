const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');

async function images(category) {
    var res;
    if (category == 'cats') {
        res = await fetch('https://www.reddit.com/r/cats.json?limit=100');
    } else if (category == 'catstwo') {
        res = await fetch('https://www.reddit.com/r/catpictures.json?limit=100');
    }
    if (res.ok) {
        const images = [];
        const data = await res.json();
        data.data.children.forEach((child) => {
            if (child.data.over_18 == false) {
                if (child.data.url.endsWith('jpg') || child.data.url.endsWith('jpeg') || child.data.url.endsWith('png') || child.data.url.endsWith('gif')) {
                    images.push(child.data.url);
                }
            }
        });
        return images;
    } else {
        return null;
    }
}

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
                    .setColor('#FFC0DD')
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
                    .setColor('#FFC0DD')
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
                    .setColor('#FFC0DD')
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
            const imageslist = await images('cats');
            var image = _.sample(imageslist);
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
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
            const imageslist = await images('catstwo');
            var image = _.sample(imageslist);
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
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