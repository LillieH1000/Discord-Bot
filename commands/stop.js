const { SlashCommandBuilder } = require('@discordjs/builders');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the current playing song'),
	async execute(interaction) {
        await interaction.deferReply();
        try {
            globalsaudio.connection.destroy();

            interaction.editReply('Stopped play audio and disconnected from voice chat');
        } catch (error) {
            console.log(error.response);
        }
	},
};
