const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hatsunemiku")
		.setDescription("Posts a random hatsune miku picture. Made for Grace <3"),
	async execute(interaction) {
        await interaction.deferReply();
        const url = await globals.reddit("hatsunemiku", false, ["fanart"]);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Hatsune Miku Pics")
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
	},
};