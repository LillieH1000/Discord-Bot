const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var _ = require("underscore");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("yuri")
		.setDescription("Posts a random yuri picture"),
	async execute(interaction) {
        await interaction.deferReply();
        var option = _.sample([1, 2]);
        if (option == 1) {
            const url = await globals.reddit("wholesomeyuri", []);
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Yuri Pics")
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
        if (option == 2) {
            const url = await globals.reddit("hololiveyuri", []);
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Yuri Pics")
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