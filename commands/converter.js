const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('convert')
		.setDescription('Its a converter')
        .addStringOption(option =>
            option.setName('conversion')
                .setDescription('Choose which conversion you want')
                .setRequired(true)
                .addChoices(
                    { name: 'Fahrenheit -> Celcius', value: 'fahrenheit_to_celcius' },
                    { name: 'Celcius -> Fahrenheit', value: 'celcius_to_fahrenheit' }
                ))
        .addStringOption(option =>
            option.setName('valueone')
                .setDescription('Enter the first value')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('valuetwo')
                .setDescription('Enter the second value')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const conversion = interaction.options.getString('conversion');
        if (conversion == 'fahrenheit_to_celcius') {
        }
        if (conversion == 'celcius_to_fahrenheit') {
        }
	},
};