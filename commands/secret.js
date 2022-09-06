const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secret')
		.setDescription('Nothing to see here')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Nothing to see here')),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        if (interaction.user.id == "122831916687818755") {
            const message = interaction.options.getString('message');
            
            await interaction.channel.send(message);

            await interaction.editReply('Sent', { ephemeral: true });
        } else {
            await interaction.editReply('UwU', { ephemeral: true });
        }
	},
};