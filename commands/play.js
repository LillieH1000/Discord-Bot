const { joinVoiceChannel, getVoiceConnection, createAudioResource } = require('@discordjs/voice');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
var globalsaudio = require('../globals/audio.js');
const exec = require('child_process').exec;

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function os_func() {
    this.execCommand = function(cmd, callback) {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                return;
            }
            callback(stdout);
        });
    }
}

var os = new os_func();

async function ytdlp(type, filename, interaction, details) {
    var titlecommand = '';
    var downloadcommand = '';
    if (type == 0) {
        titlecommand = 'yt-dlp --get-title --no-playlist ' + details;
        downloadcommand = 'yt-dlp -o "downloads/' + filename + '.mp3" -f "bestaudio/best" --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist ' + details;
    }
    if (type == 1) {
        titlecommand = 'yt-dlp --get-title --no-playlist "scsearch:' + details + '"';
        downloadcommand = 'yt-dlp -o "downloads/' + filename + '.mp3" -f "bestaudio/best" --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist "scsearch:' + details + '"';
    }
    var title = '';
    os.execCommand(titlecommand, function (returnvalue) {
        title = returnvalue;
        os.execCommand(downloadcommand, function () {
            globalsaudio.queue.push('downloads/' + filename + '.mp3');
            globalsaudio.titles.push(title);

            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Music Player')
                .setDescription('Queued: ' + title)
                .setTimestamp()

            interaction.editReply({ embeds: [embed] });

            if (globalsaudio.connectionstatus == 0) {
                globalsaudio.connectionstatus = 1;
                globalsaudio.nowplaying = globalsaudio.titles[0];
                globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                    inlineVolume: true
                });
                globalsaudio.resource.volume.setVolume(0.3);
                globalsaudio.player.play(globalsaudio.resource);
                globalsaudio.connection.subscribe(globalsaudio.player);
            }
        })
    })
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
                    { name: 'SoundCloud', value: 'soundcloud' },
                    { name: 'Bandcamp', value: 'bandcamp' },
                    { name: 'Last.fm', value: 'lastfm' },
                    { name: 'Jamando', value: 'jamando' },
                    { name: 'ReverbNation', value: 'reverbnation' },
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

        if (source == 'soundcloud') {
            const rx = /^http(?:s)?:\/\/(.*)soundcloud\.com|snd\.sc\/$/;
            if (url.match(rx)) {
                await ytdlp(0, filename, interaction, url);
            } else {
                await ytdlp(1, filename, interaction, url);
            }
        }
        if (source == 'bandcamp') {
            const rx = /^http(?:s)?:\/\/(.*)bandcamp\.com|\/$/;
            if (url.match(rx)) {
                await ytdlp(0, filename, interaction, url);
            } else {
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Music Player')
                    .setDescription('Only urls are supported for Bandcamp, search for Bandcamp is currently unsupported')
                    .setTimestamp()

                await interaction.editReply({ embeds: [embed] });
            }
        }
        if (source == 'lastfm') {
            const rx = /^http(?:s)?:\/\/(.*)last\.fm|\/$/;
            if (url.match(rx)) {
                await ytdlp(0, filename, interaction, url);
            } else {
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Music Player')
                    .setDescription('Only urls are supported for Last.fm, search for Last.fm is currently unsupported')
                    .setTimestamp()

                await interaction.editReply({ embeds: [embed] });
            }
        }
        if (source == 'jamando') {
            const rx = /^http(?:s)?:\/\/(.*)jamendo\.com|\/$/;
            if (url.match(rx)) {
                await ytdlp(0, filename, interaction, url);
            } else {
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Music Player')
                    .setDescription('Only urls are supported for Jamando, search for Jamando is currently unsupported')
                    .setTimestamp()

                await interaction.editReply({ embeds: [embed] });
            }
        }
        if (source == 'reverbnation') {
            const rx = /^http(?:s)?:\/\/(.*)reverbnation\.com|\/$/;
            if (url.match(rx)) {
                await ytdlp(0, filename, interaction, url);
            } else {
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Music Player')
                    .setDescription('Only urls are supported for ReverbNation, search for ReverbNation is currently unsupported')
                    .setTimestamp()

                await interaction.editReply({ embeds: [embed] });
            }
        }
	},
};