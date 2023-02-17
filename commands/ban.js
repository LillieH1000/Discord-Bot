const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
var globalscolours = require('../globals/colours.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription('Ban a member')
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('delete')
                .setDescription('Enter number of days for messages to delete for banned user')
                .setRequired(true)
                .addChoices(
                    { name: '0', value: 0 },
                    { name: '1', value: 1 },
                    { name: '2', value: 2 },
                    { name: '3', value: 3 },
                    { name: '4', value: 4 },
                    { name: '5', value: 5 },
                    { name: '6', value: 6 },
                    { name: '7', value: 7 },
                ))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Enter the reason')),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);
        const deletemessages = interaction.options.getInteger('delete');
        const reason = interaction.options.getString('reason');

        if (reason) {
            await member.ban({ deleteMessageDays: deletemessages, reason: reason });
        } else {
            await member.ban({ deleteMessageDays: deletemessages });
        }
        
        const embed = new EmbedBuilder()
            .setColor(globalscolours.embed)
            .setTitle('Banned User')
            .setDescription(`Name: ${user.tag}\nID: ${user.id}`)
            .setTimestamp()

        await interaction.editReply({ embeds: [embed], ephemeral: true });
	},
};