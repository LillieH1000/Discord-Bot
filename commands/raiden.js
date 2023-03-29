const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("raiden")
		.setDescription("Posts a random raiden picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit("raidenmains", false);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Raiden Pics")
            .setDescription("[r/RaidenMains](https://www.reddit.com/r/RaidenMains/)")
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