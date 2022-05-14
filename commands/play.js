const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const execSync = require("child_process").execSync;
var globalsaudio = require('../globals/audio.js');

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
            globalsaudio.player = createAudioPlayer();
            const resource = createAudioResource('downloads/' + filename, {
                inputType: StreamType.Opus,
            });
            globalsaudio.player.play(resource);

            globalsaudio.connection.subscribe(globalsaudio.player);

            interaction.editReply('Now Playing: ' + title);
        } catch (error) {
            console.log(error.response);
        }
	},
};
