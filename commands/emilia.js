const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("emilia")
		.setDescription("Posts a random emilia picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const url = await globals.reddit("onetrueemilia", false, []);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Emilia Pics")
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