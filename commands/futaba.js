const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("futaba")
		.setDescription("Posts a random futaba (persona 5) picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const image = await globals.reddit("churchoffutaba", []);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Futaba Pics")
            .setDescription("[r/The Church Of Futaba](https://www.reddit.com/r/churchoffutaba/)")
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