const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fox')
		.setDescription('Posts a random fox picture'),
	async execute(interaction) {
        await interaction.deferReply();
        try {
            const response = await axios.get('https://randomfox.ca/floof/');
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Fox Pics')
                .setImage(response.data.image)
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(response.data.image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        } catch (error) {
            console.log(error);
        }
	},
};