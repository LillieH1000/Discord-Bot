const { SlashCommandBuilder } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("amber")
		.setDescription("Posts a random amber picture"),
	async execute(interaction) {
        await interaction.deferReply();
        const url = await globals.reddit("ambermains", false);

        var object = new Object()
        object.interaction = interaction
        object.ephemeral = false
        object.type = "image"
        object.title = "Amber Pics"
        object.url = url
        await globals.response(object);
	},
};