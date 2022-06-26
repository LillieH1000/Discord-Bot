const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
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
        await interaction.deferReply();
        const username = interaction.options.getString('username');
        
        const r6api = new R6API({ email: ubisoftaccountinfo[0], password: ubisoftaccountinfo[1] });
        
        const platform = 'uplay';

        const { 0: player } = await r6api.findByUsername(platform, username);
        
        const { 0: progression } = await r6api.getProgression(platform, player.id);

        const { 0: ranks } = await r6api.getRanks(platform, player.id, -1);

        const { 0: stats } = await r6api.getStats(platform, player.id);

        const { 0: userstatus } = await r6api.getUserStatus(player.id);

        const rankedstatus = ranks.seasons[Object.keys(ranks.seasons)[0]];

        var playerinfo = '';
        playerinfo += 'Status: ' + userstatus.status.charAt(0).toUpperCase() + userstatus.status.slice(1) + '\n';
        playerinfo += 'Level: ' + progression.level.toLocaleString() + '\n';
        playerinfo += 'XP Of Current Level: ' + progression.xp.toLocaleString() + '\n';
        playerinfo += 'Total XP: ' + stats.pvp.general.xp.toLocaleString() + '\n';
        playerinfo += 'Lootbox Probability: ' + progression.lootboxProbability.percent.toLocaleString() + '\n';
        playerinfo += 'Rank: ' + rankedstatus.regions.ncsa.boards.pvp_ranked.current.name.toString() + '\n';
        playerinfo += 'MMR: ' + rankedstatus.regions.ncsa.boards.pvp_ranked.current.mmr.toLocaleString();

        var generalinfo = '';
        generalinfo += 'Playtime: ' + stats.pvp.general.playtime.toLocaleString() + '\n';
        generalinfo += 'Matches Played: ' + stats.pvp.general.matches.toLocaleString() + '\n';
        generalinfo += 'Bullets Connected: ' + stats.pvp.general.bulletsConnected.toLocaleString() + '\n';
        generalinfo += 'Kills: ' + stats.pvp.general.kills.toLocaleString() + '\n';
        generalinfo += 'Deaths: ' + stats.pvp.general.deaths.toLocaleString() + '\n';
        generalinfo += 'KD Rate: ' + stats.pvp.general.kd.toLocaleString() + '\n';
        generalinfo += 'Assists: ' + stats.pvp.general.assists.toLocaleString() + '\n';
        generalinfo += 'Headshots: ' + stats.pvp.general.headshots.toLocaleString() + '\n';
        generalinfo += 'Melee Kills: ' + stats.pvp.general.meleeKills.toLocaleString() + '\n';
        generalinfo += 'Penetration Kills: ' + stats.pvp.general.penetrationKills.toLocaleString() + '\n';
        generalinfo += 'Blind Kills: ' + stats.pvp.general.blindKills.toLocaleString() + '\n';
        generalinfo += 'Revives: ' + stats.pvp.general.revives.toLocaleString() + '\n';
        generalinfo += 'Gadgets Destroyed: ' + stats.pvp.general.gadgetsDestroyed.toLocaleString() + '\n';
        generalinfo += 'Rappel Breaches: ' + stats.pvp.general.rappelBreaches.toLocaleString() + '\n';
        generalinfo += 'Barricades Deployed: ' + stats.pvp.general.barricadesDeployed.toLocaleString() + '\n';
        generalinfo += 'Reinforcements Deployed: ' + stats.pvp.general.reinforcementsDeployed.toLocaleString() + '\n';
        generalinfo += 'Suicides: ' + stats.pvp.general.suicides.toLocaleString();

        var casualinfo = '';
        casualinfo += 'Playtime: ' + stats.pvp.queues.casual.playtime.toLocaleString() + '\n';
        casualinfo += 'Matches Played: ' + stats.pvp.queues.casual.matches.toLocaleString() + '\n';
        casualinfo += 'Wins: ' + stats.pvp.queues.casual.wins.toLocaleString() + '\n';
        casualinfo += 'Losses: ' + stats.pvp.queues.casual.losses.toLocaleString() + '\n';
        casualinfo += 'Win Rate: ' + stats.pvp.queues.casual.winRate.toLocaleString() + '\n';
        casualinfo += 'Kills: ' + stats.pvp.queues.casual.kills.toLocaleString() + '\n';
        casualinfo += 'Deaths: ' + stats.pvp.queues.casual.deaths.toLocaleString() + '\n';
        casualinfo += 'KD Rate: ' + stats.pvp.queues.casual.kd.toLocaleString();

        var rankedinfo = '';
        rankedinfo += 'Playtime: ' + stats.pvp.queues.ranked.playtime.toLocaleString() + '\n';
        rankedinfo += 'Matches Played: ' + stats.pvp.queues.ranked.matches.toLocaleString() + '\n';
        rankedinfo += 'Wins: ' + stats.pvp.queues.ranked.wins.toLocaleString() + '\n';
        rankedinfo += 'Losses: ' + stats.pvp.queues.ranked.losses.toLocaleString() + '\n';
        rankedinfo += 'Win Rate: ' + stats.pvp.queues.ranked.winRate.toLocaleString() + '\n';
        rankedinfo += 'Kills: ' + stats.pvp.queues.ranked.kills.toLocaleString() + '\n';
        rankedinfo += 'Deaths: ' + stats.pvp.queues.ranked.deaths.toLocaleString() + '\n';
        rankedinfo += 'KD Rate: ' + stats.pvp.queues.ranked.kd.toLocaleString();

        var custominfo = '';
        custominfo += 'Playtime: ' + stats.pvp.queues.custom.playtime.toLocaleString();
        
        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle(player.username.toString())
            .addField('Info', playerinfo, false)
            .addField('General', generalinfo, false)
            .addField('Casual', casualinfo, false)
            .addField('Ranked', rankedinfo, false)
            .addField('Custom', custominfo, false)
            .setTimestamp()

        if (player.avatar[Object.keys(player.avatar)[2]] != null) {
            embed.setThumbnail(player.avatar[Object.keys(player.avatar)[2]]);
        } else if (player.avatar[Object.keys(player.avatar)[1]] != null) {
            embed.setThumbnail(player.avatar[Object.keys(player.avatar)[1]]);
        } else if (player.avatar[Object.keys(player.avatar)[0]] != null) {
            embed.setThumbnail(player.avatar[Object.keys(player.avatar)[0]]);
        }

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('R6 Tracker')
                    .setStyle('LINK')
                    .setURL('https://r6.tracker.network/profile/pc/' + player.username.toString())
            );

        await interaction.editReply({ embeds: [embed], components: [row] });
	},
};