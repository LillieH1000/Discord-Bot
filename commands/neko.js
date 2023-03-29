const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var _ = require("underscore");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("neko")
		.setDescription("Posts a random neko picture"),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2, 3, 4, 5, 6]);
        if (option == 1) {
            const res = await fetch("https://nekos.life/api/v2/img/neko");
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Neko Pics")
                    .setDescription("[Nekos.Life](https://nekos.life/)")
                    .setImage(data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("View Original Image")
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 2) {
            const res = await fetch("https://api.waifu.pics/sfw/neko");
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Neko Pics")
                    .setDescription("[Waifu.Pics](https://waifu.pics/)")
                    .setImage(data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("View Original Image")
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 3) {
            const res = await fetch("https://nekos.best/api/v2/neko");
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Neko Pics")
                    .setDescription("[Nekos.Best](https://nekos.best/)")
                    .setImage(data.results[0].url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("View Original Image")
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.results[0].url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 4) {
            const res = await fetch("https://neko-love.xyz/api/v1/neko/");
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Neko Pics")
                    .setDescription("[Neko-Love](https://neko-love.xyz/)")
                    .setImage(data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("View Original Image")
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 5) {
            const res = await fetch("https://hmtai.herokuapp.com/v2/neko/");
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Neko Pics")
                    .setDescription("[Hmtai](https://hmtai.herokuapp.com/)")
                    .setImage(data.url)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("View Original Image")
                            .setStyle(ButtonStyle.Link)
                            .setURL(data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (option == 6) {
            const image = await globals.reddit("catgirlsfw", false);
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Neko Pics")
                .setDescription("[r/CatgirlSFW](https://www.reddit.com/r/CatgirlSFW/)")
                .setImage(image)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("View Original Image")
                        .setStyle(ButtonStyle.Link)
                        .setURL(image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};