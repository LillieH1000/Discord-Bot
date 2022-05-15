const { SlashCommandBuilder } = require('@discordjs/builders');
var globalsaudio = require('../globals/audio.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('volume')
		.setDescription('Change the volume of the current playing song')
        .addIntegerOption(option =>
            option.setName('volume')
                .setDescription('Enter the volume integer (1 - 100) [Default: 30]')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const volume = interaction.options.getInteger('volume');
        try {
            globalsaudio.resource.volume.setVolume(volume / 100);

            interaction.editReply('Changed playing audio to');
        } catch (error) {
            console.log(error.response);
        }
	},
};
