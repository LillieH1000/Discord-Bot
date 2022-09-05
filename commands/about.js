const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('About Ganyu discord bot'),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const member = interaction.guild.members.cache.get("1016070725305639002") || await interaction.guild.members.fetch("1016070725305639002");
        
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Ganyu')
            .setDescription('Made By Lillie')
            .setThumbnail(member.displayAvatarURL())
            .setFooter({ text: 'ID: ' + member.id })
            .setTimestamp()

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Patreon')
                    .setStyle(ButtonStyle.Link)
                    .setURL("https://www.patreon.com/lillieweeb")
            );

        await interaction.editReply({ embeds: [embed], components: [row], ephemeral: true });
	},
};