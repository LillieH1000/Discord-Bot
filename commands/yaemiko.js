const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("yaemiko")
		.setDescription("Posts a random yaemiko picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit("yaemiko", false);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Yae Miko Pics")
            .setDescription("[r/YaeMiko](https://www.reddit.com/r/YaeMiko/)")
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