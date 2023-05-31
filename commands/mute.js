const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("mute")
		.setDescription("Mute a member")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(option =>
            option.setName("user")
                .setDescription("Select a user")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName("days")
                .setDescription("Enter number of days")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName("hours")
                .setDescription("Enter number of hours")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName("minutes")
                .setDescription("Enter number of minutes")
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName("seconds")
                .setDescription("Enter number of seconds")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("reason")
                .setDescription("Enter the reason")),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        const user = interaction.options.getUser("user");
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id);

        const days = interaction.options.getInteger("days");
        const daysmil = days * 24 * 60 * 60 * 1000;

        const hours = interaction.options.getInteger("hours");
        const hoursmil = hours * 60 * 60 * 1000;

        const minutes = interaction.options.getInteger("minutes");
        const minutessmil = minutes * 60 * 1000;

        const seconds = interaction.options.getInteger("seconds");
        const secondssmil = seconds * 1000;

        const reason = interaction.options.getString("reason");

        if (reason) {
            await member.timeout(Math.round(daysmil + hoursmil + minutessmil + secondssmil), { reason: reason });
        } else {
            await member.timeout(Math.round(daysmil + hoursmil + minutessmil + secondssmil));
        }
        
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Muted User")
            .setDescription(`Name: ${user.tag}\nID: ${user.id}`)
            .setTimestamp()

        await interaction.editReply({ embeds: [embed], ephemeral: true });
	},
};