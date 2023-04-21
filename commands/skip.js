const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { createAudioResource, StreamType } = require("@discordjs/voice");
var got = require("got");
var globals = require("../globals.js");

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
            globals.resource = createAudioResource(got.stream(globals.queue[0]), {
                inputType: StreamType.WebmOpus,
                inlineVolume: true
            });
            globals.resource.volume.setVolume(0.3);
            globals.player.play(globals.resource);
            globals.connection.subscribe(globals.player);
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle("Music Player")
            .setDescription("Skipped playing audio")
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
	},
};