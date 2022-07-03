const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('summonthe')
		.setDescription('Summon whoever you want')
        .setDMPermission(false)
		.addUserOption(option =>
            option.setName('user')
                .setDescription('Select a user')
                .setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true });
		if (interaction.guild.id == "416350699794857986") {
			const user = interaction.options.getUser('user');
			for (var i = 1; i <= 5; i++) {
				await interaction.channel.send(`<@${user.id}> You are being summoned`).then(msg => {
					setTimeout(() => msg.delete(), 1000*60*1)
				});
			}
			await interaction.editReply(`Summoned the <@${user.id}>`, { ephemeral: true });
		} else {
			await interaction.editReply('Command cannot be used in this server', { ephemeral: true });
		}
	},
};