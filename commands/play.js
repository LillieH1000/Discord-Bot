const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var globalsaudio = require('../globals/audio.js');
const tts = require('google-translate-tts');
const ytdl = require('ytdl-core');
const scdl = require('soundcloud-downloader').default;
const fs = require('fs');

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('source')
                .setDescription('Choose the video/audio source')
                .setRequired(true)
                .addChoices(
                    { name: 'YouTube', value: 'youtube' },
                    { name: 'SoundCloud', value: 'soundcloud' },
                ))
        .addStringOption(option =>
            option.setName('url')
                .setDescription('Enter the url')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString('source');
        const url = interaction.options.getString('url');

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        
        if (!voiceConnection) {
            globalsaudio.connection = joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
        }

        const filename = makeid(50);
        const ttsfilename = makeid(50);

        if (source == "youtube") {
            var videoid = '';

            const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
            if (url.match(rx)) {
                videoid = url.match(rx)[1];
            } else {
                payload = {
                    "context": {
                        "client": {
                            "hl": "en",
                            "clientName": "ANDROID",
                            "clientVersion": "16.20",
                            "playbackContext": {
                                "contentPlaybackContext": {
                                    "html5Preference": "HTML5_PREF_WANTS"
                                }
                            }
                        }
                    },
                    "contentCheckOk": true,
                    "racyCheckOk": true,
                    "order": "relevance",
                    "items": "videos",
                    "duration": "any",
                    "query": url
                }
                const res = await fetch('https://www.youtube.com/youtubei/v1/search?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false', {
                    method: "post",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    videoid = data.contents.sectionListRenderer.contents[1].itemSectionRenderer.contents[0].compactVideoRenderer.videoId;
                }
            }

            const info = await ytdl.getInfo(videoid);

            const buffer = await tts.synthesize({
                text: 'Now playing ' + info.player_response.videoDetails.title,
                voice: 'en-US',
                slow: false
            });
            
            await fs.writeFileSync('downloads/' + ttsfilename + '.mp3', buffer);

            var audiodownload = await ytdl(videoid, { quality: 'highestaudio' }).pipe(fs.createWriteStream('downloads/' + filename + '.mp3'));

            globalsaudio.queue.push('downloads/' + ttsfilename + '.mp3', 'downloads/' + filename + '.mp3');

            globalsaudio.titles.push('ai', info.player_response.videoDetails.title);

            audiodownload.on('finish', function() {
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Music Player')
                    .setDescription('Queued: ' + info.player_response.videoDetails.title)
                    .setTimestamp()

                interaction.editReply({ embeds: [embed] });
                if (globalsaudio.connectionstatus == 0) {
                    globalsaudio.connectionstatus = 1;
                    globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                        inlineVolume: true
                    });
                    globalsaudio.resource.volume.setVolume(0.3);
                    globalsaudio.player.play(globalsaudio.resource);
                    globalsaudio.connection.subscribe(globalsaudio.player);
                    globalsaudio.queue.shift();
                    globalsaudio.titles.shift();
                }
            });
        }
        if (source == "soundcloud") {
            const info = await scdl.getInfo(url);

            const buffer = await tts.synthesize({
                text: 'Now playing ' + info.title,
                voice: 'en-US',
                slow: false
            });

            await fs.writeFileSync('downloads/' + ttsfilename + '.mp3', buffer);

            var audiodownload = await scdl.download(url).then(stream => stream.pipe(fs.createWriteStream('downloads/' + filename + '.mp3')));

            globalsaudio.queue.push('downloads/' + ttsfilename + '.mp3', 'downloads/' + filename + '.mp3');

            globalsaudio.titles.push('ai', info.title);

            audiodownload.on('finish', function() {
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Music Player')
                    .setDescription('Queued: ' + info.title)
                    .setTimestamp()

                interaction.editReply({ embeds: [embed] });
                if (globalsaudio.connectionstatus == 0) {
                    globalsaudio.connectionstatus = 1;
                    globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                        inlineVolume: true
                    });
                    globalsaudio.resource.volume.setVolume(0.3);
                    globalsaudio.player.play(globalsaudio.resource);
                    globalsaudio.connection.subscribe(globalsaudio.player);
                    globalsaudio.queue.shift();
                    globalsaudio.titles.shift();
                }
            });
        }
	},
};