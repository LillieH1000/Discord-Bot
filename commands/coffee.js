const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coffee')
		.setDescription('Posts a random coffee picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const response = await axios.get('https://coffee.alexflipnote.dev/random.json');
        if (response.status == 200) {
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Coffee Pics')
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