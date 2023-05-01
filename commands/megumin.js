const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var _ = require("underscore");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("megumin")
		.setDescription("Posts a random megumin picture"),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2]);
        if (option == 1) {
            const res = await fetch("https://api.waifu.pics/sfw/megumin");
            if (res.ok) {
                const data = await res.json();
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Megumin Pics")
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
            const url = await globals.reddit("megumin", []);
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Megumin Pics")
                .setImage(url)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("View Original Image")
                        .setStyle(ButtonStyle.Link)
                        .setURL(url)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};