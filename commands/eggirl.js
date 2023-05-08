const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("egg_irl")
		.setDescription("Posts a random pic from egg_irl"),
	async execute(interaction) {
        await interaction.deferReply();
        const url = await globals.reddit("egg_irl", false, []);
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("egg_irl Pics")
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