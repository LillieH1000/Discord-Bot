const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var _ = require("underscore");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("genshin")
		.setDescription("Posts a random genshin picture")
        .addStringOption(option =>
            option.setName("category")
                .setDescription("Choose which genshin picture type you want")
                .setAutocomplete(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const category = interaction.options.getString("category");
        var url = new String();
        if (!category) {
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle("Genshin Categories")
                .setDescription(`A:\namber\nayaka\n
                C:\ncollei\n
                E:\neula\n
                G:\nganyu\n
                H:\nhutao\n
                K:\nkeqing\n
                L:\nlayla\nlumine\n
                N:\nnahida\nnilou\nnoelle\n
                R:\nraiden\n
                S:\nshenhe\n
                Y:\nyaemiko`.replace(/[ \t]/gm, ""))
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
            return;
        }
        if (category == "amber") {
            url = await globals.reddit("ambermains", false, ["art"]);
        }
        if (category == "ayaka") {
            url = await globals.reddit("ayakamains", false, ["art"]);
        }
        if (category == "collei") {
            url = await globals.reddit("colleimains", false, ["non-oc art", "oc art"]);
        }
        if (category == "eula") {
            url = await globals.reddit("eulamains", false, ["non-oc fanart", "oc art"]);
        }
        if (category == "ganyu") {
            var option = _.sample([1, 2]);
            if (option == 1) {
                url = await globals.reddit("ganyu", false, ["non-oc art", "oc art"]);
            }
            if (option == 2) {
                url = await globals.reddit("ganyusimps", false, ["fanart"]);
            }
        }
        if (category == "hutao") {
            url = await globals.reddit("hutao_mains", false, ["non-oc fanart", "oc fanart"]);
        }
        if (category == "keqing") {
            url = await globals.reddit("keqingmains", false, ["art"]);
        }
        if (category == "layla") {
            url = await globals.reddit("laylamains", false, ["non-oc art", "oc art"]);
        }
        if (category == "lumine") {
            var option = _.sample([1, 2]);
            if (option == 1) {
                url = await globals.reddit("luminemains", false, ["non-oc art", "oc art"]);
            }
            if (option == 2) {
                url = await globals.reddit("lumine_mains", false, ["fan art"]);
            }
        }
        if (category == "nahida") {
            url = await globals.reddit("nahida_mains", false, ["art - original content", "art - non oc"]);
        }
        if (category == "nilou") {
            url = await globals.reddit("niloumains", false, ["non-oc art", "oc art"]);
        }
        if (category == "noelle") {
            url = await globals.reddit("noellemains", false, ["art"]);
        }
        if (category == "raiden") {
            url = await globals.reddit("raidenmains", false, ["non-oc fanart", "oc fanart"]);
        }
        if (category == "shenhe") {
            url = await globals.reddit("shenhemains", false, ["non-oc art", "oc art"]);
        }
        if (category == "yaemiko") {
            url = await globals.reddit("yaemiko", false, ["art | oc", "art | non-oc"]);
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle(`Genshin Pics (${category.charAt(0).toUpperCase() + category.slice(1)})`)
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