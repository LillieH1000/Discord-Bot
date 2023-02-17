const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
var globalscolours = require('../globals/colours.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick a member')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Enter the reason')),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);
        const reason = interaction.options.getString('reason');

        if (reason) {
            await member.kick({ reason: reason });
        } else {
            await member.kick();
        }

        const embed = new EmbedBuilder()
            .setColor(globalscolours.embed)
            .setTitle('Kicked User')
            .setDescription(`Name: ${user.tag}\nID: ${user.id}`)
            .setTimestamp()

        await interaction.editReply({ embeds: [embed], ephemeral: true });
	},
};