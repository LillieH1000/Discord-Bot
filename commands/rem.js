const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("rem")
		.setDescription("Posts a random rem picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const url = await globals.reddit("onetruerem", []);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Rem Pics")
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