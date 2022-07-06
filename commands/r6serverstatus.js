const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const R6API = require('r6api.js').default;
const { ubisoftaccountinfo } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('r6serverstatus')
		.setDescription('Sends info about rainbow 6 siege servers'),
	async execute(interaction) {
        await interaction.deferReply();
        
        const r6api = new R6API({ email: ubisoftaccountinfo[0], password: ubisoftaccountinfo[1] });
        
        const serverstatus = await r6api.getStatus();

        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Rainbow Six Siege Server Status')
            .setTimestamp()

        for (const status of serverstatus) {
            embed.addFields(
                { name: status.name, value: status.status, inline: false },
            )
        }

        await interaction.editReply({ embeds: [embed] });
	},
};