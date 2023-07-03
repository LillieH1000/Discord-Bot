const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
let _ = require("underscore");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("neko")
		.setDescription("Posts a random neko picture"),
	async execute(interaction) {
        await interaction.deferReply();
        let option = _.sample([1, 2, 3]);
        if (option == 1) {
            const res = await fetch("https://nekos.life/api/v2/img/neko");
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.colours.embed)
                    .setTitle("Neko Pics")
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
                    .setColor(globals.colours.embed)
                    .setTitle("Neko Pics")
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
                    .setColor(globals.colours.embed)
                    .setTitle("Neko Pics")
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
	},
};