const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { createAudioResource, StreamType } = require('@discordjs/voice');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips the current playing song'),
	async execute(interaction) {
        await interaction.deferReply();

        if (globalsaudio.connectionstatus == 1) {
            globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                inputType: StreamType.Opus,
                inlineVolume: true
            });
            globalsaudio.resource.volume.setVolume(0.3);
            globalsaudio.player.play(globalsaudio.resource);
            globalsaudio.connection.subscribe(globalsaudio.player);
            globalsaudio.queue.shift();
            globalsaudio.titles.shift();
        }

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setDescription('Skipped playing audio')
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });
	},
};
