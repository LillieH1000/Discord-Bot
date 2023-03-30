const { SlashCommandBuilder } = require("discord.js");
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
        var object = new Object();
        var url = new String();
        if (!category) {
            object.interaction = interaction;
            object.ephemeral = false;
            object.type = "text";
            object.title = "Genshin Categories";
            object.description = `A:\namber\nayaka\n
            C:\ncollei\n
            E:\neula\n
            G:\nganyu\n
            H:\nhutao\n
            K:\nkeqing\n
            L:\nlayla\nlumine\n
            N:\nnahida\nnilou\nnoelle\n
            R:\nraiden\n
            S:\nshenhe\n
            Y:\nyaemiko`;
            await globals.response(object);
            return;
        }
        if (category == "amber") {
            url = await globals.reddit("ambermains", false);
        }
        if (category == "ayaka") {
            url = await globals.reddit("ayakamains", false);
        }
        if (category == "collei") {
            url = await globals.reddit("colleimains", false);
        }
        if (category == "eula") {
            url = await globals.reddit("eulamains", false);
        }
        if (category == "ganyu") {
            var option = _.sample([1, 2]);
            if (option == 1) {
                url = await globals.reddit("ganyu", false);
            }
            if (option == 2) {
                url = await globals.reddit("ganyusimps", false);
            }
        }
        if (category == "hutao") {
            url = await globals.reddit("hutao_mains", false);
        }
        if (category == "keqing") {
            url = await globals.reddit("keqingmains", false);
        }
        if (category == "layla") {
            url = await globals.reddit("laylamains", false);
        }
        if (category == "lumine") {
            var option = _.sample([1, 2]);
            if (option == 1) {
                url = await globals.reddit("luminemains", false);
            }
            if (option == 2) {
                url = await globals.reddit("lumine_mains", false);
            }
        }
        if (category == "nahida") {
            url = await globals.reddit("nahida_mains", false);
        }
        if (category == "nilou") {
            url = await globals.reddit("niloumains", false);
        }
        if (category == "noelle") {
            url = await globals.reddit("noellemains", false);
        }
        if (category == "raiden") {
            url = await globals.reddit("raidenmains", false);
        }
        if (category == "shenhe") {
            url = await globals.reddit("shenhemains", false);
        }
        if (category == "yaemiko") {
            url = await globals.reddit("yaemiko", false);
        }

        object.interaction = interaction;
        object.ephemeral = false;
        object.type = "image";
        object.title = `Genshin Pics (${category.charAt(0).toUpperCase() + category.slice(1)})`;
        object.url = url;
        await globals.response(object);
	},
};