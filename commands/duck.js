const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('duck')
		.setDescription('Posts a random duck picture'),
	async execute(interaction) {
        await interaction.deferReply();
        try {
            const response = await axios.get('https://random-d.uk/api/v2/random');
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Duck Pics')
                .setImage(response.data.url)
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(response.data.url)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        } catch (error) {
            console.log(error);
        }
	},
};