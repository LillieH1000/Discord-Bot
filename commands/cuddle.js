const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cuddle')
		.setDescription('Posts a random cuddling picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://nekos.life/api/v2/img/cuddle');
        if (res.ok) {
            const data = await res.json();
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .setTitle('Cuddle Pics')
                .setDescription('[Nekos.Life](https://nekos.life/)')
                .setImage(data.url)
                .setTimestamp()
            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(data.url)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};