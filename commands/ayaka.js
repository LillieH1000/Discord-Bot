const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ayaka")
		.setDescription("Posts a random ayaka picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit("ayakamains", false);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Ayaka Pics")
            .setDescription("[r/AyakaMains](https://www.reddit.com/r/AyakaMains/)")
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