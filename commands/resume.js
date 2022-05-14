const { SlashCommandBuilder } = require('@discordjs/builders');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('Resumes the current playing song'),
	async execute(interaction) {
        await interaction.deferReply();
        try {
            globalsaudio.player.unpause();

            interaction.editReply('Resumed playing audio');
        } catch (error) {
            console.log(error.response);
        }
	},
};
