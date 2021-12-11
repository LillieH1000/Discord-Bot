const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

const commands = [
	// Other
	new SlashCommandBuilder().setName('cat').setDescription('Posts a picture of a random cat using a cat api'),
	new SlashCommandBuilder().setName('dog').setDescription('Posts a picture of a random dog using a dog api'),
	// YouTube Dislikes Api
	new SlashCommandBuilder().setName('ytdislikes').setDescription('Gets the dislikes count based off the video id')
		.addStringOption(option => option.setName('videoid')
			.setDescription('The input to echo back')
			.setRequired(true)),
	// Music
	new SlashCommandBuilder().setName('pause').setDescription('Pauses the playing song'),
	new SlashCommandBuilder().setName('unpause').setDescription('Unpauses the playing song'),
	new SlashCommandBuilder().setName('stop').setDescription('Stops the playing song'),
	new SlashCommandBuilder().setName('queue').setDescription('Lists all the songs in the queue'),
	new SlashCommandBuilder().setName('volume').setDescription('[0.0 - 0.9] - Changes the volume')
		.addStringOption(option => option.setName('volume_int')
		.setDescription('The input to echo back')
		.setRequired(true)),
	new SlashCommandBuilder().setName('play').setDescription('Plays a song')
		.addSubcommand(subcommand => subcommand
			.setName('youtube')
			.setDescription('Play a song from YouTube')
			.addStringOption(option => option.setName('name')
				.setDescription('The input to echo back'))
			.addStringOption(option => option.setName('url')
				.setDescription('The input to echo back')))
		.addSubcommand(subcommand => subcommand
			.setName('soundcloud')
			.setDescription('Play a song from SoundCloud')
			.addStringOption(option => option.setName('name')
				.setDescription('The input to echo back'))
			.addStringOption(option => option.setName('url')
				.setDescription('The input to echo back')))
		.addSubcommand(subcommand => subcommand
			.setName('bandcamp')
			.setDescription('Play a song from Bandcamp')
			.addStringOption(option => option.setName('url')
				.setDescription('The input to echo back')
				.setRequired(true))),
]
.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
	try {
		await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log('Successfully registered application commands.');
	} catch (error) {
		console.error(error);
	}
})();