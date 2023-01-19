const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { clientId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('About my discord bot'),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const member = interaction.guild.members.cache.get(clientId) || await interaction.guild.members.fetch(clientId);
        
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Discord Bot')
            .setDescription('Made By Trans Lillie')
            .setThumbnail(member.displayAvatarURL())
            .setFooter({ text: 'ID: ' + member.id })
            .setTimestamp()

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Source Code (GitHub)')
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://github.com/LillieH1000/Discord-Bot")
            );

        await interaction.editReply({ embeds: [embed], components: [row], ephemeral: true });
	},
};