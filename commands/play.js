const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus } = require('@discordjs/voice');
const execSync = require("child_process").execSync;
/* const axios = require('axios');
const fs = require('fs'); */

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Enter the url')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const url = interaction.options.getString('url');
        try {
            const connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });

            const title = execSync('yt-dlp --get-title --no-playlist ' + url);
            const filename = execSync('yt-dlp --get-filename -f "bestaudio[ext=m4a]/best[ext=m4a]" --no-playlist ' + url);
            execSync('yt-dlp -o "downloads/' + filename + '" -f "bestaudio[ext=m4a]/best[ext=m4a]" --no-playlist ' + url);
            const player = createAudioPlayer();
            const resource = createAudioResource('downloads/' + filename);
            player.play(resource);

            connection.subscribe(player);

            interaction.editReply('Now Playing: ' + title);
        } catch (error) {
            console.log(error.response);
        }
	},
};
