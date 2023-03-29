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

        var playerinfo = "";
        playerinfo += "Status: " + userstatus.status.charAt(0).toUpperCase() + userstatus.status.slice(1) + "\n";
        playerinfo += "Level: " + progression.level.toLocaleString() + "\n";
        playerinfo += "XP Of Current Level: " + progression.xp.toLocaleString() + "\n";
        playerinfo += "Total XP: " + stats.pvp.general.xp.toLocaleString() + "\n";
        playerinfo += "Lootbox Probability: " + progression.lootboxProbability.percent.toLocaleString() + "\n";
        playerinfo += "Rank: " + rankedstatus.regions.ncsa.boards.pvp_ranked.current.name.toString() + "\n";
        playerinfo += "MMR: " + rankedstatus.regions.ncsa.boards.pvp_ranked.current.mmr.toLocaleString();

        var generalinfo = "";
        generalinfo += "Playtime: " + stats.pvp.general.playtime.toLocaleString() + "\n";
        generalinfo += "Matches Played: " + stats.pvp.general.matches.toLocaleString() + "\n";
        generalinfo += "Bullets Connected: " + stats.pvp.general.bulletsConnected.toLocaleString() + "\n";
        generalinfo += "Kills: " + stats.pvp.general.kills.toLocaleString() + "\n";
        generalinfo += "Deaths: " + stats.pvp.general.deaths.toLocaleString() + "\n";
        generalinfo += "KD Rate: " + stats.pvp.general.kd.toLocaleString() + "\n";
        generalinfo += "Assists: " + stats.pvp.general.assists.toLocaleString() + "\n";
        generalinfo += "Headshots: " + stats.pvp.general.headshots.toLocaleString() + "\n";
        generalinfo += "Melee Kills: " + stats.pvp.general.meleeKills.toLocaleString() + "\n";
        generalinfo += "Penetration Kills: " + stats.pvp.general.penetrationKills.toLocaleString() + "\n";
        generalinfo += "Blind Kills: " + stats.pvp.general.blindKills.toLocaleString() + "\n";
        generalinfo += "Revives: " + stats.pvp.general.revives.toLocaleString() + "\n";
        generalinfo += "Gadgets Destroyed: " + stats.pvp.general.gadgetsDestroyed.toLocaleString() + "\n";
        generalinfo += "Rappel Breaches: " + stats.pvp.general.rappelBreaches.toLocaleString() + "\n";
        generalinfo += "Barricades Deployed: " + stats.pvp.general.barricadesDeployed.toLocaleString() + "\n";
        generalinfo += "Reinforcements Deployed: " + stats.pvp.general.reinforcementsDeployed.toLocaleString() + "\n";
        generalinfo += "Suicides: " + stats.pvp.general.suicides.toLocaleString();

        var casualinfo = "";
        casualinfo += "Playtime: " + stats.pvp.queues.casual.playtime.toLocaleString() + "\n";
        casualinfo += "Matches Played: " + stats.pvp.queues.casual.matches.toLocaleString() + "\n";
        casualinfo += "Wins: " + stats.pvp.queues.casual.wins.toLocaleString() + "\n";
        casualinfo += "Losses: " + stats.pvp.queues.casual.losses.toLocaleString() + "\n";
        casualinfo += "Win Rate: " + stats.pvp.queues.casual.winRate.toLocaleString() + "\n";
        casualinfo += "Kills: " + stats.pvp.queues.casual.kills.toLocaleString() + "\n";
        casualinfo += "Deaths: " + stats.pvp.queues.casual.deaths.toLocaleString() + "\n";
        casualinfo += "KD Rate: " + stats.pvp.queues.casual.kd.toLocaleString();

        var rankedinfo = "";
        rankedinfo += "Playtime: " + stats.pvp.queues.ranked.playtime.toLocaleString() + "\n";
        rankedinfo += "Matches Played: " + stats.pvp.queues.ranked.matches.toLocaleString() + "\n";
        rankedinfo += "Wins: " + stats.pvp.queues.ranked.wins.toLocaleString() + "\n";
        rankedinfo += "Losses: " + stats.pvp.queues.ranked.losses.toLocaleString() + "\n";
        rankedinfo += "Win Rate: " + stats.pvp.queues.ranked.winRate.toLocaleString() + "\n";
        rankedinfo += "Kills: " + stats.pvp.queues.ranked.kills.toLocaleString() + "\n";
        rankedinfo += "Deaths: " + stats.pvp.queues.ranked.deaths.toLocaleString() + "\n";
        rankedinfo += "KD Rate: " + stats.pvp.queues.ranked.kd.toLocaleString();

        var terroristhuntinfo = "";
        terroristhuntinfo += "Playtime: " + stats.pve.general.playtime.toLocaleString() + "\n";
        terroristhuntinfo += "Matches Played: " + stats.pve.general.matches.toLocaleString() + "\n";
        terroristhuntinfo += "Bullets Connected: " + stats.pve.general.bulletsConnected.toLocaleString() + "\n";
        terroristhuntinfo += "Kills: " + stats.pve.general.kills.toLocaleString() + "\n";
        terroristhuntinfo += "Deaths: " + stats.pve.general.deaths.toLocaleString() + "\n";
        terroristhuntinfo += "KD Rate: " + stats.pve.general.kd.toLocaleString() + "\n";
        terroristhuntinfo += "Assists: " + stats.pve.general.assists.toLocaleString() + "\n";
        terroristhuntinfo += "Headshots: " + stats.pve.general.headshots.toLocaleString() + "\n";
        terroristhuntinfo += "Melee Kills: " + stats.pve.general.meleeKills.toLocaleString() + "\n";
        terroristhuntinfo += "Penetration Kills: " + stats.pve.general.penetrationKills.toLocaleString() + "\n";
        terroristhuntinfo += "Blind Kills: " + stats.pve.general.blindKills.toLocaleString() + "\n";
        terroristhuntinfo += "Revives: " + stats.pve.general.revives.toLocaleString() + "\n";
        terroristhuntinfo += "Gadgets Destroyed: " + stats.pve.general.gadgetsDestroyed.toLocaleString() + "\n";
        terroristhuntinfo += "Rappel Breaches: " + stats.pve.general.rappelBreaches.toLocaleString() + "\n";
        terroristhuntinfo += "Barricades Deployed: " + stats.pve.general.barricadesDeployed.toLocaleString() + "\n";
        terroristhuntinfo += "Reinforcements Deployed: " + stats.pve.general.reinforcementsDeployed.toLocaleString() + "\n";
        terroristhuntinfo += "Suicides: " + stats.pve.general.suicides.toLocaleString();

        var terroristhuntdisarmbombinfo = "";
        terroristhuntdisarmbombinfo += "Matches Played: " + stats.pve.modes.disarmBomb.matches.toLocaleString() + "\n";
        terroristhuntdisarmbombinfo += "Wins: " + stats.pve.modes.disarmBomb.wins.toLocaleString() + "\n";
        terroristhuntdisarmbombinfo += "Losses: " + stats.pve.modes.disarmBomb.losses.toLocaleString() + "\n";
        terroristhuntdisarmbombinfo += "Win Rate: " + stats.pve.modes.disarmBomb.winRate.toLocaleString() + "\n";

        var terroristhunteliminationinfo = "";
        terroristhunteliminationinfo += "Matches Played: " + stats.pve.modes.elimination.matches.toLocaleString() + "\n";
        terroristhunteliminationinfo += "Wins: " + stats.pve.modes.elimination.wins.toLocaleString() + "\n";
        terroristhunteliminationinfo += "Losses: " + stats.pve.modes.elimination.losses.toLocaleString() + "\n";
        terroristhunteliminationinfo += "Win Rate: " + stats.pve.modes.elimination.winRate.toLocaleString() + "\n";

        var terroristhuntprotecthostageinfo = "";
        terroristhuntprotecthostageinfo += "Matches Played: " + stats.pve.modes.protectHostage.matches.toLocaleString() + "\n";
        terroristhuntprotecthostageinfo += "Wins: " + stats.pve.modes.protectHostage.wins.toLocaleString() + "\n";
        terroristhuntprotecthostageinfo += "Losses: " + stats.pve.modes.protectHostage.losses.toLocaleString() + "\n";
        terroristhuntprotecthostageinfo += "Win Rate: " + stats.pve.modes.protectHostage.winRate.toLocaleString() + "\n";

        var terroristhuntextracthostageinfo = "";
        terroristhuntextracthostageinfo += "Matches Played: " + stats.pve.modes.extractHostage.matches.toLocaleString() + "\n";
        terroristhuntextracthostageinfo += "Wins: " + stats.pve.modes.extractHostage.wins.toLocaleString() + "\n";
        terroristhuntextracthostageinfo += "Losses: " + stats.pve.modes.extractHostage.losses.toLocaleString() + "\n";
        terroristhuntextracthostageinfo += "Win Rate: " + stats.pve.modes.extractHostage.winRate.toLocaleString() + "\n";
        
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
                    .setURL("https://r6.tracker.network/profile/pc/" + player.username.toString())
            );

        await interaction.editReply({ embeds: [embed], components: [row] });
	},
};