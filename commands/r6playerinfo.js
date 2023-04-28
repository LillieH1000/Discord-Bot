const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const R6API = require("r6api.js").default;
const { ubisoftaccountinfo } = require("../config.json");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("r6playerinfo")
		.setDescription("Sends info about the rainbow 6 siege player you enter")
        .addStringOption(option =>
            option.setName("username")
                .setDescription("Enter the username of the player")
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const username = interaction.options.getString("username");
        
        const r6api = new R6API({ email: ubisoftaccountinfo[0], password: ubisoftaccountinfo[1] });
        
        const platform = "uplay";

        const { 0: player } = await r6api.findByUsername(platform, username);
        
        const { 0: progression } = await r6api.getProgression(platform, player.id);

        const { 0: ranks } = await r6api.getRanks(platform, player.id, -1);

        const { 0: stats } = await r6api.getStats(platform, player.id);

        const { 0: userstatus } = await r6api.getUserStatus(player.id);

        const rankedstatus = ranks.seasons[Object.keys(ranks.seasons)[0]];

        const playerinfo = `Status: ${userstatus.status.charAt(0).toUpperCase() + userstatus.status.slice(1)}
        Level: ${progression.level.toLocaleString()}
        XP Of Current Level: ${progression.xp.toLocaleString()}
        Total XP: ${stats.pvp.general.xp.toLocaleString()}
        Lootbox Probability: ${progression.lootboxProbability.percent.toLocaleString()}
        Rank: ${rankedstatus.regions.ncsa.boards.pvp_ranked.current.name.toString()}
        MMR: ${rankedstatus.regions.ncsa.boards.pvp_ranked.current.mmr.toLocaleString()}`;

        const generalinfo = `Playtime: ${stats.pvp.general.playtime.toLocaleString()}
        Matches Played: ${stats.pvp.general.matches.toLocaleString()}
        Bullets Connected: ${stats.pvp.general.bulletsConnected.toLocaleString()}
        Kills: ${stats.pvp.general.kills.toLocaleString()}
        Deaths: ${stats.pvp.general.deaths.toLocaleString()}
        KD Rate: ${stats.pvp.general.kd.toLocaleString()}
        Assists: ${stats.pvp.general.assists.toLocaleString()}
        Headshots: ${stats.pvp.general.headshots.toLocaleString()}
        Melee Kills: ${stats.pvp.general.meleeKills.toLocaleString()}
        Penetration Kills: ${stats.pvp.general.penetrationKills.toLocaleString()}
        Blind Kills: ${stats.pvp.general.blindKills.toLocaleString()}
        Revives: ${stats.pvp.general.revives.toLocaleString()}
        Gadgets Destroyed: ${stats.pvp.general.gadgetsDestroyed.toLocaleString()}
        Rappel Breaches: ${stats.pvp.general.rappelBreaches.toLocaleString()}
        Barricades Deployed: ${stats.pvp.general.barricadesDeployed.toLocaleString()}
        Reinforcements Deployed: ${stats.pvp.general.reinforcementsDeployed.toLocaleString()}
        Suicides: ${stats.pvp.general.suicides.toLocaleString()}`;

        const casualinfo = `Playtime: ${stats.pvp.queues.casual.playtime.toLocaleString()}
        Matches Played: ${stats.pvp.queues.casual.matches.toLocaleString()}
        Wins: ${stats.pvp.queues.casual.wins.toLocaleString()}
        Losses: ${stats.pvp.queues.casual.losses.toLocaleString()}
        Win Rate: ${stats.pvp.queues.casual.winRate.toLocaleString()}
        Kills: ${stats.pvp.queues.casual.kills.toLocaleString()}
        Deaths: ${stats.pvp.queues.casual.deaths.toLocaleString()}
        KD Rate: ${stats.pvp.queues.casual.kd.toLocaleString()}`;

        const rankedinfo = `Playtime: ${stats.pvp.queues.ranked.playtime.toLocaleString()}
        Matches Played: ${stats.pvp.queues.ranked.matches.toLocaleString()}
        Wins: ${stats.pvp.queues.ranked.wins.toLocaleString()}
        Losses: ${stats.pvp.queues.ranked.losses.toLocaleString()}
        Win Rate: ${stats.pvp.queues.ranked.winRate.toLocaleString()}
        Kills: ${stats.pvp.queues.ranked.kills.toLocaleString()}
        Deaths: ${stats.pvp.queues.ranked.deaths.toLocaleString()}
        KD Rate: ${stats.pvp.queues.ranked.kd.toLocaleString()}`;

        const terroristhuntinfo = `Playtime: ${stats.pve.general.playtime.toLocaleString()}
        Matches Played: ${stats.pve.general.matches.toLocaleString()}
        Bullets Connected: ${stats.pve.general.bulletsConnected.toLocaleString()}
        Kills: ${stats.pve.general.kills.toLocaleString()}
        Deaths: ${stats.pve.general.deaths.toLocaleString()}
        KD Rate: ${stats.pve.general.kd.toLocaleString()}
        Assists: ${stats.pve.general.assists.toLocaleString()}
        Headshots: ${stats.pve.general.headshots.toLocaleString()}
        Melee Kills: ${stats.pve.general.meleeKills.toLocaleString()}
        Penetration Kills: ${stats.pve.general.penetrationKills.toLocaleString()}
        Blind Kills: ${stats.pve.general.blindKills.toLocaleString()}
        Revives: ${stats.pve.general.revives.toLocaleString()}
        Gadgets Destroyed: ${stats.pve.general.gadgetsDestroyed.toLocaleString()}
        Rappel Breaches: ${stats.pve.general.rappelBreaches.toLocaleString()}
        Barricades Deployed: ${stats.pve.general.barricadesDeployed.toLocaleString()}
        Reinforcements Deployed: ${stats.pve.general.reinforcementsDeployed.toLocaleString()}
        Suicides: ${stats.pve.general.suicides.toLocaleString()}`;

        const terroristhuntdisarmbombinfo = `Matches Played: ${stats.pve.modes.disarmBomb.matches.toLocaleString()}
        Wins: ${stats.pve.modes.disarmBomb.wins.toLocaleString()}
        Losses: ${stats.pve.modes.disarmBomb.losses.toLocaleString()}
        Win Rate: ${stats.pve.modes.disarmBomb.winRate.toLocaleString()}`;

        const terroristhunteliminationinfo = `Matches Played: ${stats.pve.modes.elimination.matches.toLocaleString()}
        Wins: ${stats.pve.modes.elimination.wins.toLocaleString()}
        Losses: ${stats.pve.modes.elimination.losses.toLocaleString()}
        Win Rate: ${stats.pve.modes.elimination.winRate.toLocaleString()}`;

        const terroristhuntprotecthostageinfo = `Matches Played: ${stats.pve.modes.protectHostage.matches.toLocaleString()}
        Wins: ${stats.pve.modes.protectHostage.wins.toLocaleString()}
        Losses: ${stats.pve.modes.protectHostage.losses.toLocaleString()}
        Win Rate: ${stats.pve.modes.protectHostage.winRate.toLocaleString()}`;

        const terroristhuntextracthostageinfo = `Matches Played: ${stats.pve.modes.extractHostage.matches.toLocaleString()}
        Wins: ${stats.pve.modes.extractHostage.wins.toLocaleString()}
        Losses: ${stats.pve.modes.extractHostage.losses.toLocaleString()}
        Win Rate: ${stats.pve.modes.extractHostage.winRate.toLocaleString()}`;
        
        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle(player.username.toString())
            .addFields(
                { name: "Info", value: playerinfo, inline: false },
                { name: "General", value: generalinfo, inline: false },
                { name: "Casual", value: casualinfo, inline: false },
                { name: "Ranked", value: rankedinfo, inline: false },
                { name: "Terrorist Hunt (General)", value: terroristhuntinfo, inline: false },
                { name: "Terrorist Hunt (Disarm Bomb)", value: terroristhuntdisarmbombinfo, inline: false },
                { name: "Terrorist Hunt (Elimination)", value: terroristhunteliminationinfo, inline: false },
                { name: "Terrorist Hunt (Protect Hostage)", value: terroristhuntprotecthostageinfo, inline: false },
                { name: "Terrorist Hunt (Extract Hostage)", value: terroristhuntextracthostageinfo, inline: false },
            )
            .setTimestamp()

        if (player.avatar[Object.keys(player.avatar)[2]] != null) {
            embed.setThumbnail(player.avatar[Object.keys(player.avatar)[2]]);
        } else if (player.avatar[Object.keys(player.avatar)[1]] != null) {
            embed.setThumbnail(player.avatar[Object.keys(player.avatar)[1]]);
        } else if (player.avatar[Object.keys(player.avatar)[0]] != null) {
            embed.setThumbnail(player.avatar[Object.keys(player.avatar)[0]]);
        }

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel("R6 Tracker")
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://r6.tracker.network/profile/pc/${player.username.toString()}`)
            );

        await interaction.editReply({ embeds: [embed], components: [row] });
	},
};