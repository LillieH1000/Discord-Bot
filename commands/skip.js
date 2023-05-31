const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { createAudioResource } = require("@discordjs/voice");
let globals = require("../globals.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skips the current playing song")
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        if (globals.connectionstatus == 1) {
            globals.queue.shift();
            globals.titles.shift();
            globals.nowplaying = globals.titles[0];
            const stream = await fetch(globals.queue[0]);
            if (stream.ok) {
                globals.resource = createAudioResource(stream.body, {
                    inlineVolume: true
                });
                globals.resource.volume.setVolume(0.3);
                globals.player.play(globals.resource);
                globals.connection.subscribe(globals.player);
            }
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Music Player")
            .setDescription("Skipped playing audio")
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
	},
};