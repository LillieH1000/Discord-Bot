const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('fox')
		.setDescription('Posts a random fox picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://randomfox.ca/floof/');
        if (res.ok) {
            const data = await res.json();
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Fox Pics')
                .setDescription('[Random Fox](https://randomfox.ca/)')
                .setImage(data.image)
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(data.image)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};