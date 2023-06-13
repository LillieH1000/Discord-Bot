const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("osrsplayerinfo")
		.setDescription("Sends info about the old school runescape player you enter")
        .addStringOption(option =>
            option.setName("username")
                .setDescription("Enter the username of the player")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("info")
                .setDescription("Choose the info you want")
                .setRequired(true)
                .addChoices(
                    { name: "Skill", value: "skill" },
                    { name: "Minigame (Page 1)", value: "minigame1" },
                    { name: "Minigame (Page 2)", value: "minigame2" },
                )),
	async execute(interaction) {
        await interaction.deferReply();
        const username = interaction.options.getString("username");
        const info = interaction.options.getString("info");
        
        const res = await fetch(`https://osrs.lillieh1000.gay/?name=${username}`);
        if (res.ok) {
            const data = await res.json();

            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle(data.name)
                .setTimestamp()

            if (info == "skill") {
                const skillArray = Object.keys(data.skill);
                skillArray.forEach(function(skillKey) {
                    embed.addFields(
                        { name: data.skill[skillKey].text, value: `Rank: ${data.skill[skillKey].rank.toLocaleString()}\nLevel: ${data.skill[skillKey].level.toLocaleString()}\nXP: ${data.skill[skillKey].xp.toLocaleString()}`, inline: false },
                    );
                });
            }

            if (info == "minigame1") {
                let minigameCount = 0;
                const minigameArray = Object.keys(data.minigame);
                minigameArray.forEach(function(minigameKey) {
                    minigameCount += 1;
                    if (minigameCount <= 16) {
                        embed.addFields(
                            { name: data.minigame[minigameKey].text, value: `Rank: ${data.minigame[minigameKey].rank.toLocaleString()}\nScore: ${data.minigame[minigameKey].score.toLocaleString()}`, inline: false },
                        );
                    }
                });
            }

            if (info == "minigame2") {
                let minigameCount = 0;
                const minigameArray = Object.keys(data.minigame);
                minigameArray.forEach(function(minigameKey) {
                    minigameCount += 1;
                    if (minigameCount >= 17) {
                        embed.addFields(
                            { name: data.minigame[minigameKey].text, value: `Rank: ${data.minigame[minigameKey].rank.toLocaleString()}\nScore: ${data.minigame[minigameKey].score.toLocaleString()}`, inline: false },
                        );
                    }
                });
            }

            await interaction.editReply({ embeds: [embed] });
        }
	},
};