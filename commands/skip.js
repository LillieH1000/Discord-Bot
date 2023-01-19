const fs = require('node:fs');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createAudioResource } = require('@discordjs/voice');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current playing song')
        .setDMPermission(false),
	async execute(interaction) {
        await interaction.deferReply();

        if (globalsaudio.connectionstatus == 1) {
            if (fs.existsSync(globalsaudio.queue[0])) {
                fs.unlinkSync(globalsaudio.queue[0])
            }
            globalsaudio.queue.shift();
            globalsaudio.titles.shift();
            globalsaudio.nowplaying = globalsaudio.titles[0];
            globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                inlineVolume: true
            });
            globalsaudio.resource.volume.setVolume(0.3);
            globalsaudio.player.play(globalsaudio.resource);
            globalsaudio.connection.subscribe(globalsaudio.player);
        }

        const embed = new EmbedBuilder()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setDescription('Skipped playing audio')
            .setTimestamp()

        await interaction.editReply({ embeds: [embed] });
	},
};