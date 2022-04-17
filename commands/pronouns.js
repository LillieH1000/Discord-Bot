const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pronouns')
		.setDescription('Get a users pronouns')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        try {
            const user = interaction.options.getUser('user');
            const response = await axios.get('https://pronoundb.org/api/v1/lookup?platform=discord&id='.concat(user.id));
            var pronoun = '';
            if (response.data.pronouns == "unspecified") {
                pronoun += "unspecified";
            }
            if (response.data.pronouns == "hh") {
                pronoun += "he/him";
            }
            if (response.data.pronouns == "hi") {
                pronoun += "he/it";
            }
            if (response.data.pronouns == "hs") {
                pronoun += "he/she";
            }
            if (response.data.pronouns == "ht") {
                pronoun += "he/they";
            }
            if (response.data.pronouns == "ih") {
                pronoun += "it/him";
            }
            if (response.data.pronouns == "ii") {
                pronoun += "it/its";
            }
            if (response.data.pronouns == "is") {
                pronoun += "it/she";
            }
            if (response.data.pronouns == "it") {
                pronoun += "it/they";
            }
            if (response.data.pronouns == "shh") {
                pronoun += "she/he";
            }
            if (response.data.pronouns == "sh") {
                pronoun += "she/her";
            }
            if (response.data.pronouns == "si") {
                pronoun += "she/it";
            }
            if (response.data.pronouns == "st") {
                pronoun += "she/they";
            }
            if (response.data.pronouns == "th") {
                pronoun += "they/he";
            }
            if (response.data.pronouns == "ti") {
                pronoun += "they/it";
            }
            if (response.data.pronouns == "ts") {
                pronoun += "they/she";
            }
            if (response.data.pronouns == "tt") {
                pronoun += "they/them";
            }
            if (response.data.pronouns == "any") {
                pronoun += "Any pronouns";
            }
            if (response.data.pronouns == "other") {
                pronoun += "Other pronouns";
            }
            if (response.data.pronouns == "ask") {
                pronoun += "Ask me my pronouns";
            }
            if (response.data.pronouns == "avoid") {
                pronoun += "Avoid pronouns, use my name";
            }
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('PronounDB')
                .addField('Pronouns of ' + user.username + ':', pronoun, false)
                .setTimestamp()
            await interaction.editReply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.log(error);
        }
	},
};