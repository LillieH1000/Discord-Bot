const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coffee')
		.setDescription('Posts a random coffee picture'),
	async execute(interaction) {
        await interaction.deferReply();
        const res = await fetch('https://coffee.alexflipnote.dev/random.json');
        if (res.ok) {
            const data = await res.json();
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Coffee Pics')
                .setDescription('[AlexFlipnote.Dev](https://alexflipnote.dev/)')
                .setImage(data.file)
                .setTimestamp()
            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel('View Original Image')
                        .setStyle('LINK')
                        .setURL(data.file)
                );
            await interaction.editReply({ embeds: [embed], components: [row] });
        }
	},
};