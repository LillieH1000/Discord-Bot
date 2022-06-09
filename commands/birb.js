const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('birb')
		.setDescription('Posts a random birb picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://api.alexflipnote.dev/birb');
        if (res.ok) {
            const data = await res.json();
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Birb Pics')
                .setImage(data.file)
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(data.file)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};