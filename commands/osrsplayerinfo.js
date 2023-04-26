const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
var globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("osrsplayerinfo")
		.setDescription("Sends info about the old school runescape player you enter")
        .addStringOption(option =>
            option.setName("username")
                .setDescription("Enter the username of the player")
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const username = interaction.options.getString("username");
        
        const res = await fetch(`https://osrs.lillieh1000.gay/?name=${username}`);
        if (res.ok) {
            const data = await res.json();

            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle(data.name)
                .addFields(
                    { name: `Skill (${data.skill.overall.text})`, value: `Rank: ${data.skill.overall.rank.toLocaleString()}\nLevel: ${data.skill.overall.level.toLocaleString()}\nXP: ${data.skill.overall.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.attack.text})`, value: `Rank: ${data.skill.attack.rank.toLocaleString()}\nLevel: ${data.skill.attack.level.toLocaleString()}\nXP: ${data.skill.attack.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.defence.text})`, value: `Rank: ${data.skill.defence.rank.toLocaleString()}\nLevel: ${data.skill.defence.level.toLocaleString()}\nXP: ${data.skill.defence.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.strength.text})`, value: `Rank: ${data.skill.strength.rank.toLocaleString()}\nLevel: ${data.skill.strength.level.toLocaleString()}\nXP: ${data.skill.strength.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.hitpoints.text})`, value: `Rank: ${data.skill.hitpoints.rank.toLocaleString()}\nLevel: ${data.skill.hitpoints.level.toLocaleString()}\nXP: ${data.skill.hitpoints.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.ranged.text})`, value: `Rank: ${data.skill.ranged.rank.toLocaleString()}\nLevel: ${data.skill.ranged.level.toLocaleString()}\nXP: ${data.skill.ranged.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.prayer.text})`, value: `Rank: ${data.skill.prayer.rank.toLocaleString()}\nLevel: ${data.skill.prayer.level.toLocaleString()}\nXP: ${data.skill.prayer.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.magic.text})`, value: `Rank: ${data.skill.magic.rank.toLocaleString()}\nLevel: ${data.skill.magic.level.toLocaleString()}\nXP: ${data.skill.magic.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.cooking.text})`, value: `Rank: ${data.skill.cooking.rank.toLocaleString()}\nLevel: ${data.skill.cooking.level.toLocaleString()}\nXP: ${data.skill.cooking.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.woodcutting.text})`, value: `Rank: ${data.skill.woodcutting.rank.toLocaleString()}\nLevel: ${data.skill.woodcutting.level.toLocaleString()}\nXP: ${data.skill.woodcutting.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.fletching.text})`, value: `Rank: ${data.skill.fletching.rank.toLocaleString()}\nLevel: ${data.skill.fletching.level.toLocaleString()}\nXP: ${data.skill.fletching.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.fishing.text})`, value: `Rank: ${data.skill.fishing.rank.toLocaleString()}\nLevel: ${data.skill.fishing.level.toLocaleString()}\nXP: ${data.skill.fishing.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.firemaking.text})`, value: `Rank: ${data.skill.firemaking.rank.toLocaleString()}\nLevel: ${data.skill.firemaking.level.toLocaleString()}\nXP: ${data.skill.firemaking.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.crafting.text})`, value: `Rank: ${data.skill.crafting.rank.toLocaleString()}\nLevel: ${data.skill.crafting.level.toLocaleString()}\nXP: ${data.skill.crafting.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.smithing.text})`, value: `Rank: ${data.skill.smithing.rank.toLocaleString()}\nLevel: ${data.skill.smithing.level.toLocaleString()}\nXP: ${data.skill.smithing.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.mining.text})`, value: `Rank: ${data.skill.mining.rank.toLocaleString()}\nLevel: ${data.skill.mining.level.toLocaleString()}\nXP: ${data.skill.mining.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.herblore.text})`, value: `Rank: ${data.skill.herblore.rank.toLocaleString()}\nLevel: ${data.skill.herblore.level.toLocaleString()}\nXP: ${data.skill.herblore.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.agility.text})`, value: `Rank: ${data.skill.agility.rank.toLocaleString()}\nLevel: ${data.skill.agility.level.toLocaleString()}\nXP: ${data.skill.agility.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.thieving.text})`, value: `Rank: ${data.skill.thieving.rank.toLocaleString()}\nLevel: ${data.skill.thieving.level.toLocaleString()}\nXP: ${data.skill.thieving.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.slayer.text})`, value: `Rank: ${data.skill.slayer.rank.toLocaleString()}\nLevel: ${data.skill.slayer.level.toLocaleString()}\nXP: ${data.skill.slayer.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.farming.text})`, value: `Rank: ${data.skill.farming.rank.toLocaleString()}\nLevel: ${data.skill.farming.level.toLocaleString()}\nXP: ${data.skill.farming.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.runecraft.text})`, value: `Rank: ${data.skill.runecraft.rank.toLocaleString()}\nLevel: ${data.skill.runecraft.level.toLocaleString()}\nXP: ${data.skill.runecraft.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.hunter.text})`, value: `Rank: ${data.skill.hunter.rank.toLocaleString()}\nLevel: ${data.skill.hunter.level.toLocaleString()}\nXP: ${data.skill.hunter.xp.toLocaleString()}`, inline: false },
                    { name: `Skill (${data.skill.construction.text})`, value: `Rank: ${data.skill.construction.rank.toLocaleString()}\nLevel: ${data.skill.construction.level.toLocaleString()}\nXP: ${data.skill.construction.xp.toLocaleString()}`, inline: false },
                    { name: "Minigame", value: "Info coming soon", inline: false },
                )
                .setTimestamp()

            await interaction.editReply({ embeds: [embed] });
        }
	},
};