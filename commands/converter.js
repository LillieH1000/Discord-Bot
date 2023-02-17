const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var globalscolours = require('../globals/colours.js');

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
            option.setName('value')
                .setDescription('Enter the value to convert')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const conversion = interaction.options.getString('conversion');
        const value = interaction.options.getString('value');
        if (conversion == 'fahrenheit_to_celcius') {
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Converter')
                .addFields(
                    { name: 'Fahrenheit -> Celcius', value: ((parseInt(value) - 32) / 1.8).toString(), inline: false },
                )
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
        }
        if (conversion == 'celcius_to_fahrenheit') {
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Converter')
                .addFields(
                    { name: 'Celcius -> Fahrenheit', value: ((parseInt(value) * 1.8) + 32).toString(), inline: false },
                )
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
        }
	},
};