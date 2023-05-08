const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("futaba")
		.setDescription("Posts a random futaba (persona 5) picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const url = await globals.reddit("churchoffutaba", false, []);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Futaba Pics")
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