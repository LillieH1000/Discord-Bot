const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('convert')
		.setDescription('Its a converter').addStringOption(option =>
            option.setName('conversion')
                .setDescription('Choose which conversion you want')
                .setRequired(true)
                .addChoices(
                    { name: 'Fahrenheit -> Celcius', value: 'fahrenheit_to_celcius' },
                    { name: 'Celcius -> Fahrenheit', value: 'celcius_to_fahrenheit' }
                )),
	async execute(interaction) {
        await interaction.deferReply();
	},
};