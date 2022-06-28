const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('summontheevan')
		.setDescription('Summon the Evan')
        .setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		for (var i = 1; i <= 10; i++) {
        	await interaction.channel.send(`<@335528799481495554> You are being summoned`);
		}
		await interaction.editReply('Summoning the Evan', { ephemeral: true });
	},
};