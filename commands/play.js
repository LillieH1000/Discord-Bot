const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const axios = require('axios');

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
                const ytapiurloptions = '&options=[%22bestaudio%22]';
                const response = await axios.get(ytapiurl.concat(videoid, ytapiurloptions));
                const player = createAudioPlayer();
                const resource = createAudioResource(response.data.bestaudio);
                player.play(resource);

                connection.subscribe(player);

                await interaction.editReply('test');
            } catch (error) {
                console.log(error.response);
            }
        })();
	},
};
