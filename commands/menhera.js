const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("menhera")
		.setDescription("Posts a random menhera picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit("menhera", false);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Menhera Pics")
            .setDescription("[r/menhera](https://www.reddit.com/r/menhera/)")
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