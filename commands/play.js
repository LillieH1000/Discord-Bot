const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, VoiceConnectionStatus, entersState } = require('@discordjs/voice');
const axios = require('axios');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays a song')
        .addStringOption(option =>
            option.setName('videoid')
                .setDescription('Enter the video id')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const videoid = interaction.options.getString('videoid');
        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        (async () => {
            try {
                const ytapiurl = 'https://yt.lillieweeb001.xyz/?videoID=';
                const ytapiurloptions = '&options=[%22filename%22,%22bestaudio%22]';
                const ytapiresponse = await axios.get(ytapiurl.concat(videoid, ytapiurloptions));
                const ytapiresponseaudio = ytapiresponse.data.bestaudio;
                await axios.get(ytapiresponseaudio, {responseType: "stream"}).then(response => {
                    console.log('Downloading Audio');
                    const file = fs.createWriteStream('downloads/test2.mp3');
                    response.data.pipe(file);

                    file.on("finish", () => {
                        file.close();
                        console.log("Download Completed");
                        const player = createAudioPlayer();
                        const resource = createAudioResource('downloads/test2.mp3');
                        player.play(resource);

                        connection.subscribe(player);

                        interaction.editReply('test');
                    });
                });
            } catch (error) {
                console.log(error.response);
            }
        })();

        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log('Connection ready to play audio');
        });
	},
};
