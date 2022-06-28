const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('summontheconnor')
		.setDescription('Summon the Connor')
        .setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		for (var i = 1; i <= 10; i++) {
        	await interaction.channel.send(`<@141321545220882432> You are being summoned`);
		}
		await interaction.editReply('Summoning the Connor', { ephemeral: true });
	},
};