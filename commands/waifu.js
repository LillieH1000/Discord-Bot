const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
let _ = require("underscore");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("waifu")
		.setDescription("Posts a random waifu picture"),
	async execute(interaction) {
        await interaction.deferReply();
        let url = new String();
        let option = _.sample([1, 2]);
        if (option == 1) {
            const res = await fetch("https://api.waifu.pics/sfw/waifu");
            if (res.ok) {
                const data = await res.json();
                url = data.url;
            }
        }
        if (option == 2) {
            const res = await fetch("https://nekos.best/api/v2/waifu");
            if (res.ok) {
                const data = await res.json();
                url = data.results[0].url;
            }
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Waifu Pics")
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