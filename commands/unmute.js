const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("unmute")
		.setDescription("Unmute a member")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("Select a user")
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);

        await member.timeout(null);
        
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Unmuted User")
            .setDescription(`Name: ${user.tag}\nID: ${user.id}`)
            .setTimestamp()

        await interaction.editReply({ embeds: [embed], ephemeral: true });
	},
};