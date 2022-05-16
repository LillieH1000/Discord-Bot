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
            option.setName('value')
                .setDescription('Enter the value to convert')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const conversion = interaction.options.getString('conversion');
        const value = interaction.options.getString('value');
        if (conversion == 'fahrenheit_to_celcius') {
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Converter')
                .addField('Fahrenheit -> Celcius', ((parseInt(value) - 32) / 1.8).toString(), false)
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
        }
        if (conversion == 'celcius_to_fahrenheit') {
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Converter')
                .addField('Celcius -> Fahrenheit', ((parseInt(value) * 1.8) + 32).toString(), false)
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
        }
	},
};