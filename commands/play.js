const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
const { MessageEmbed } = require('discord.js');
const execSync = require("child_process").execSync;
var globalsaudio = require('../globals/audio.js');
const tts = require('google-translate-tts');
const fs = require('fs');

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

        globalsaudio.connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        var title;
        var filename;
        try {
            title = execSync('yt-dlp --get-title --no-playlist ' + url);
            filename = execSync('yt-dlp --get-filename -f "bestaudio/best" --no-playlist ' + url);
            execSync('yt-dlp -o "downloads/' + filename + '" -f "bestaudio/best" --no-playlist ' + url);
        } catch (error) {
            title = execSync('yt-dlp --get-title --no-playlist "ytsearch:' + url + '"');
            filename = execSync('yt-dlp --get-filename -f "bestaudio/best" --no-playlist "ytsearch:' + url + '"');
            execSync('yt-dlp -o "downloads/' + filename + '" -f "bestaudio/best" --no-playlist "ytsearch:' + url + '"');
        }

        const buffer = await tts.synthesize({
            text: 'Now playing ' + title,
            voice: 'en-US',
            slow: false
        });
        
        fs.writeFileSync('downloads/' + filename + '.mp3', buffer);

        globalsaudio.queue.push('downloads/' + filename + '.mp3', 'downloads/' + filename)

        if (AudioPlayerStatus.Idle) {
            globalsaudio.player = createAudioPlayer();
            globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                inputType: StreamType.Opus,
                inlineVolume: true
            });
            globalsaudio.resource.volume.setVolume(0.3);
            globalsaudio.player.play(globalsaudio.resource);
            globalsaudio.connection.subscribe(globalsaudio.player);

            globalsaudio.queue.shift();
        }

        const embed = new MessageEmbed()
            .setColor('#FFC0DD')
            .setTitle('Music Player')
            .setDescription('Queued: ' + title)
            .setTimestamp()

        interaction.editReply({ embeds: [embed] });

        globalsaudio.player.on(AudioPlayerStatus.Idle, () => {
            if (globalsaudio.queue === undefined || globalsaudio.queue.length == 0) {
                globalsaudio.connection.destroy();
            } else {
                globalsaudio.player = createAudioPlayer();
                globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                    inputType: StreamType.Opus,
                    inlineVolume: true
                });
                globalsaudio.resource.volume.setVolume(0.3);
                globalsaudio.player.play(globalsaudio.resource);
                globalsaudio.connection.subscribe(globalsaudio.player);

                globalsaudio.queue.shift();
            }
        });
	},
};
