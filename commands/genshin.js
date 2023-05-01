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
                Y:\nyaemiko`)
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
            return;
        }
        if (category == "amber") {
            url = await globals.reddit("ambermains", ["art"]);
        }
        if (category == "ayaka") {
            url = await globals.reddit("ayakamains", ["art"]);
        }
        if (category == "collei") {
            url = await globals.reddit("colleimains", ["non-oc art", "oc art"]);
        }
        if (category == "eula") {
            url = await globals.reddit("eulamains", ["non-oc fanart", "oc art"]);
        }
        if (category == "ganyu") {
            var option = _.sample([1, 2]);
            if (option == 1) {
                url = await globals.reddit("ganyu", ["non-oc art", "oc art"]);
            }
            if (option == 2) {
                url = await globals.reddit("ganyusimps", ["fanart"]);
            }
        }
        if (category == "hutao") {
            url = await globals.reddit("hutao_mains", ["non-oc fanart", "oc fanart"]);
        }
        if (category == "keqing") {
            url = await globals.reddit("keqingmains", ["art"]);
        }
        if (category == "layla") {
            url = await globals.reddit("laylamains", ["non-oc art", "oc art"]);
        }
        if (category == "lumine") {
            var option = _.sample([1, 2]);
            if (option == 1) {
                url = await globals.reddit("luminemains", ["non-oc art", "oc art"]);
            }
            if (option == 2) {
                url = await globals.reddit("lumine_mains", ["fan art"]);
            }
        }
        if (category == "nahida") {
            url = await globals.reddit("nahida_mains", ["art - original content", "art - non oc"]);
        }
        if (category == "nilou") {
            url = await globals.reddit("niloumains", ["non-oc art", "oc art"]);
        }
        if (category == "noelle") {
            url = await globals.reddit("noellemains", ["art"]);
        }
        if (category == "raiden") {
            url = await globals.reddit("raidenmains", ["non-oc fanart", "oc fanart"]);
        }
        if (category == "shenhe") {
            url = await globals.reddit("shenhemains", ["non-oc art", "oc art"]);
        }
        if (category == "yaemiko") {
            url = await globals.reddit("yaemiko", ["art | oc", "art | non-oc"]);
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