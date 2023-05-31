const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var _ = require("underscore");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("hentai")
		.setDescription("Posts a random hentai picture, can only be used in nsfw channels")
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName("category")
                .setDescription("Choose which hentai picture type you want")
                .setAutocomplete(true)),
	async execute(interaction) {
        if (interaction.channel.nsfw) {
            await interaction.deferReply();
            const category = interaction.options.getString("category");
            var url = new String();
            if (!category) {
                const embed = new EmbedBuilder()
                    .setColor(globals.embedcolour)
                    .setTitle("Hentai Categories")
                    .setDescription(`B:\nblowjob\n
                    N:\nneko\n
                    T:\ntrap\n
                    W:\nwaifu`.replace(/[ \t]/gm, ""))
                    .setTimestamp()
                await interaction.editReply({ embeds: [embed] });
                return;
            }
            if (category == "blowjob") {
                const res = await fetch("https://api.waifu.pics/nsfw/blowjob");
                if (res.ok) {
                    const data = await res.json();
                    url = data.url;
                }
            }
            if (category == "neko") {
                const res = await fetch("https://api.waifu.pics/nsfw/neko");
                if (res.ok) {
                    const data = await res.json();
                    url = data.url;
                }
            }
            if (category == "trap") {
                const res = await fetch("https://api.waifu.pics/nsfw/trap");
                if (res.ok) {
                    const data = await res.json();
                    url = data.url;
                }
            }
            if (category == "waifu") {
                const res = await fetch("https://api.waifu.pics/nsfw/waifu");
                if (res.ok) {
                    const data = await res.json();
                    url = data.url;
                }
            }

            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle(`Hentai Pics (${category.charAt(0).toUpperCase() + category.slice(1)})`)
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
        } else {
            await interaction.deferReply({ ephemeral: true });
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Notice")
                .setDescription("This command can only be ran in nsfw channels")
                .setTimestamp()
            await interaction.editReply({ embeds: [embed], ephemeral: true });
        }
	},
};