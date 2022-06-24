const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const R6API = require('r6api.js').default;
const { ubisoftaccountinfo } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('r6playerinfo')
		.setDescription('Sends info about the rainbow 6 siege player you enter')
        .addStringOption(option =>
            option.setName('username')
                .setDescription('Enter the username of the player')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        /* const username = interaction.options.getString('username');
        
        const r6api = new R6API(ubisoftaccountinfo[0], ubisoftaccountinfo[1]);
        
        const platform = 'uplay';

        const player = await r6api.findByUsername(platform, username);

        const stats = await r6api.getStats(platform, player.id);

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle(player.username)
            .addField('Matches', stats.pvp.general.matches, false)
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] }); */
        await interaction.editReply("This command is in development", { ephemeral: true });
	},
};