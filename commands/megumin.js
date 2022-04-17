const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('megumin')
		.setDescription('Posts a random megumin picture'),
	async execute(interaction) {
        await interaction.deferReply();
        try {
            const response = await axios.get('https://api.waifu.pics/sfw/megumin');
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Megumin Pics')
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