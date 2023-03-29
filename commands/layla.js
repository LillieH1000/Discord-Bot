const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("layla")
		.setDescription("Posts a random layla picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit("laylamains", false);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Layla Pics")
            .setDescription("[r/LaylaMains](https://www.reddit.com/r/LaylaMains/)")
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
	},
};