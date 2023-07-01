const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Lists all the songs in the queue")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        let queuecount = 0;
        let queuelistcount = 0;
        let queuelist = "";

        for (let i = 0; i < globals.player[interaction.guild.id].urls.length; i++) {
            queuecount += 1;
            queuelistcount += 1;
            queuelist += queuelistcount.toString() + ") " + globals.titles[i];
            if (globals.player[interaction.guild.id].urls.length != queuecount) {
                queuelist += "\n";
            }
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Music Player")
            .setTimestamp()

        if (globals.player[interaction.guild.id].urls == null || globals.player[interaction.guild.id].urls == undefined || globals.player[interaction.guild.id].urls.length == 0) {
            embed.addFields(
                { name: "Songs In Queue", value: "None", inline: false },
            );
        } else {
            embed.addFields(
                { name: "Songs In Queue", value: queuelist, inline: false },
            );
        }

        await interaction.editReply({ embeds: [embed] });
	},
};
