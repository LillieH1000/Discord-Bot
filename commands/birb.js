const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('birb')
		.setDescription('Posts a random birb picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const response = await axios.get('https://api.alexflipnote.dev/birb');
        if (response.status == 200) {
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Birb Pics')
                .setImage(response.data.file)
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(response.data.file)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};