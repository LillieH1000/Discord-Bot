const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uwu')
		.setDescription('UwU')
        .addStringOption(option =>
            option.setName('uwu')
                .setDescription('UwU')),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        if (interaction.user.id == "122831916687818755") {
            const uwu = interaction.options.getString('uwu');
            
            await interaction.channel.send(uwu);

            await interaction.editReply('Sent', { ephemeral: true });
        } else {
            await interaction.editReply('UwU', { ephemeral: true });
        }
	},
};