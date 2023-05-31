const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const R6API = require("r6api.js").default;
const { ubisoftaccount } = require("../config.json");
let globals = require("../globals.js");

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
        
        const r6api = new R6API({ email: ubisoftaccount[0], password: ubisoftaccount[1] });
        
        const platform = "uplay";

        const { 0: player } = await r6api.findByUsername(platform, username);
        
        const { 0: progression } = await r6api.getProgression(platform, player.id);

        const { 0: ranks } = await r6api.getRanks(platform, player.id, -1);

        const { 0: stats } = await r6api.getStats(platform, player.id);

        const { 0: userstatus } = await r6api.getUserStatus(player.id);

        const rankedstatus = ranks.seasons[Object.keys(ranks.seasons)[0]];

        const playerinfo = `Status:\xa0${userstatus.status.charAt(0).toUpperCase() + userstatus.status.slice(1)}
        Level:\xa0${progression.level.toLocaleString()}
        XP\xa0Of\xa0Current\xa0Level:\xa0${progression.xp.toLocaleString()}
        Total\xa0XP:\xa0${stats.pvp.general.xp.toLocaleString()}
        Lootbox\xa0Probability:\xa0${progression.lootboxProbability.percent.toLocaleString()}
        Rank:\xa0${rankedstatus.regions.ncsa.boards.pvp_ranked.current.name.toString()}
        MMR:\xa0${rankedstatus.regions.ncsa.boards.pvp_ranked.current.mmr.toLocaleString()}`.replace(/[ \t]/gm, "");

        const generalinfo = `Playtime:\xa0${stats.pvp.general.playtime.toLocaleString()}
        Matches\xa0Played:\xa0${stats.pvp.general.matches.toLocaleString()}
        Bullets\xa0Connected:\xa0${stats.pvp.general.bulletsConnected.toLocaleString()}
        Kills:\xa0${stats.pvp.general.kills.toLocaleString()}
        Deaths:\xa0${stats.pvp.general.deaths.toLocaleString()}
        KD\xa0Rate:\xa0${stats.pvp.general.kd.toLocaleString()}
        Assists:\xa0${stats.pvp.general.assists.toLocaleString()}
        Headshots:\xa0${stats.pvp.general.headshots.toLocaleString()}
        Melee\xa0Kills:\xa0${stats.pvp.general.meleeKills.toLocaleString()}
        Penetration\xa0Kills:\xa0${stats.pvp.general.penetrationKills.toLocaleString()}
        Blind\xa0Kills:\xa0${stats.pvp.general.blindKills.toLocaleString()}
        Revives:\xa0${stats.pvp.general.revives.toLocaleString()}
        Gadgets\xa0Destroyed:\xa0${stats.pvp.general.gadgetsDestroyed.toLocaleString()}
        Rappel\xa0Breaches:\xa0${stats.pvp.general.rappelBreaches.toLocaleString()}
        Barricades\xa0Deployed:\xa0${stats.pvp.general.barricadesDeployed.toLocaleString()}
        Reinforcements\xa0Deployed:\xa0${stats.pvp.general.reinforcementsDeployed.toLocaleString()}
        Suicides:\xa0${stats.pvp.general.suicides.toLocaleString()}`.replace(/[ \t]/gm, "");

        const casualinfo = `Playtime:\xa0${stats.pvp.queues.casual.playtime.toLocaleString()}
        Matches\xa0Played:\xa0${stats.pvp.queues.casual.matches.toLocaleString()}
        Wins:\xa0${stats.pvp.queues.casual.wins.toLocaleString()}
        Losses:\xa0${stats.pvp.queues.casual.losses.toLocaleString()}
        Win\xa0Rate:\xa0${stats.pvp.queues.casual.winRate.toLocaleString()}
        Kills:\xa0${stats.pvp.queues.casual.kills.toLocaleString()}
        Deaths:\xa0${stats.pvp.queues.casual.deaths.toLocaleString()}
        KD\xa0Rate:\xa0${stats.pvp.queues.casual.kd.toLocaleString()}`.replace(/[ \t]/gm, "");

        const rankedinfo = `Playtime:\xa0${stats.pvp.queues.ranked.playtime.toLocaleString()}
        Matches\xa0Played:\xa0${stats.pvp.queues.ranked.matches.toLocaleString()}
        Wins:\xa0${stats.pvp.queues.ranked.wins.toLocaleString()}
        Losses:\xa0${stats.pvp.queues.ranked.losses.toLocaleString()}
        Win\xa0Rate:\xa0${stats.pvp.queues.ranked.winRate.toLocaleString()}
        Kills:\xa0${stats.pvp.queues.ranked.kills.toLocaleString()}
        Deaths:\xa0${stats.pvp.queues.ranked.deaths.toLocaleString()}
        KD\xa0Rate:\xa0${stats.pvp.queues.ranked.kd.toLocaleString()}`.replace(/[ \t]/gm, "");

        const terroristhuntinfo = `Playtime:\xa0${stats.pve.general.playtime.toLocaleString()}
        Matches\xa0Played:\xa0${stats.pve.general.matches.toLocaleString()}
        Bullets\xa0Connected:\xa0${stats.pve.general.bulletsConnected.toLocaleString()}
        Kills:\xa0${stats.pve.general.kills.toLocaleString()}
        Deaths:\xa0${stats.pve.general.deaths.toLocaleString()}
        KD\xa0Rate:\xa0${stats.pve.general.kd.toLocaleString()}
        Assists:\xa0${stats.pve.general.assists.toLocaleString()}
        Headshots:\xa0${stats.pve.general.headshots.toLocaleString()}
        Melee\xa0Kills:\xa0${stats.pve.general.meleeKills.toLocaleString()}
        Penetration\xa0Kills:\xa0${stats.pve.general.penetrationKills.toLocaleString()}
        Blind\xa0Kills:\xa0${stats.pve.general.blindKills.toLocaleString()}
        Revives:\xa0${stats.pve.general.revives.toLocaleString()}
        Gadgets\xa0Destroyed:\xa0${stats.pve.general.gadgetsDestroyed.toLocaleString()}
        Rappel\xa0Breaches:\xa0${stats.pve.general.rappelBreaches.toLocaleString()}
        Barricades\xa0Deployed:\xa0${stats.pve.general.barricadesDeployed.toLocaleString()}
        Reinforcements\xa0Deployed:\xa0${stats.pve.general.reinforcementsDeployed.toLocaleString()}
        Suicides:\xa0${stats.pve.general.suicides.toLocaleString()}`.replace(/[ \t]/gm, "");

        const terroristhuntdisarmbombinfo = `Matches\xa0Played:\xa0${stats.pve.modes.disarmBomb.matches.toLocaleString()}
        Wins:\xa0${stats.pve.modes.disarmBomb.wins.toLocaleString()}
        Losses:\xa0${stats.pve.modes.disarmBomb.losses.toLocaleString()}
        Win\xa0Rate:\xa0${stats.pve.modes.disarmBomb.winRate.toLocaleString()}`.replace(/[ \t]/gm, "");

        const terroristhunteliminationinfo = `Matches\xa0Played:\xa0${stats.pve.modes.elimination.matches.toLocaleString()}
        Wins:\xa0${stats.pve.modes.elimination.wins.toLocaleString()}
        Losses:\xa0${stats.pve.modes.elimination.losses.toLocaleString()}
        Win\xa0Rate:\xa0${stats.pve.modes.elimination.winRate.toLocaleString()}`.replace(/[ \t]/gm, "");

        const terroristhuntprotecthostageinfo = `Matches\xa0Played:\xa0${stats.pve.modes.protectHostage.matches.toLocaleString()}
        Wins:\xa0${stats.pve.modes.protectHostage.wins.toLocaleString()}
        Losses:\xa0${stats.pve.modes.protectHostage.losses.toLocaleString()}
        Win\xa0Rate:\xa0${stats.pve.modes.protectHostage.winRate.toLocaleString()}`.replace(/[ \t]/gm, "");

        const terroristhuntextracthostageinfo = `Matches\xa0Played:\xa0${stats.pve.modes.extractHostage.matches.toLocaleString()}
        Wins:\xa0${stats.pve.modes.extractHostage.wins.toLocaleString()}
        Losses:\xa0${stats.pve.modes.extractHostage.losses.toLocaleString()}
        Win\xa0Rate:\xa0${stats.pve.modes.extractHostage.winRate.toLocaleString()}`.replace(/[ \t]/gm, "");
        
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