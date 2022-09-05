const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('About Ganyu discord bot'),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        // const member = interaction.guild.members.cache.get(1016070725305639002);
        
        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Ganyu')
            .setDescription('About being worked on')
            // .setThumbnail(member.displayAvatarURL())
            .setTimestamp()

        await interaction.editReply({ embeds: [embed], ephemeral: true });
	},
};