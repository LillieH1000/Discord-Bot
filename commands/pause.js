const { SlashCommandBuilder } = require('@discordjs/builders');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pauses the current playing song'),
	async execute(interaction) {
        await interaction.deferReply();
        try {
            globalsaudio.player.pause();

            interaction.editReply('Paused playing audio');
        } catch (error) {
            console.log(error.response);
        }
	},
};
