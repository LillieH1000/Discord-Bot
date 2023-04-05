const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var _ = require("underscore");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("animals")
		.setDescription("Posts a random animal picture")
        .addStringOption(option =>
            option.setName("category")
                .setDescription("Choose which animal picture type you want")
                .setAutocomplete(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const category = interaction.options.getString("category");
        var url = new String();
        if (!category) {
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Animal Categories")
                .setDescription(`B:\nbeardeddragon\nbirb\n
                G:\ngoose`)
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
            return;
        }
        if (category == "beardeddragon") {
            url = await globals.reddit("beardeddragon", false);
        }
        if (category == "birb") {
            const res = await fetch("https://api.alexflipnote.dev/birb");
            if (res.ok) {
                const data = await res.json();
                url = data.file
            }
        }
        if (category == "goose") {
            const res = await fetch("https://nekos.life/api/v2/img/goose");
            if (res.ok) {
                const data = await res.json();
                url = data.url
            }
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle(`Animal Pics (${category.charAt(0).toUpperCase() + category.slice(1)})`)
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