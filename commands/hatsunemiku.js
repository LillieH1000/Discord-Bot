const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var _ = require("underscore");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hatsunemiku")
		.setDescription("Posts a random hatsune miku picture. Made for Grace <3"),
	async execute(interaction) {
        await interaction.deferReply();
        var url = new String();
        var option = _.sample([1, 2]);
        if (option == 1) {
            url = await globals.reddit("hatsune", false);
        }
        if (option == 2) {
            url = await globals.reddit("hatsunemiku", false);
        }
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