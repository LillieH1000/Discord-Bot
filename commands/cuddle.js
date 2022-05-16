const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cuddle')
		.setDescription('Posts a random cuddling picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const response = await axios.get('https://nekos.life/api/v2/img/cuddle');
        if (response.status == 200) {
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Cuddle Pics')
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
        }
	},
};