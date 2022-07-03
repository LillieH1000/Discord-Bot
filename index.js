const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const intents = new Intents();
intents.add(GatewayIntentBits.GUILDS, GatewayIntentBits.GUILD_MEMBERS, GatewayIntentBits.GUILD_BANS, GatewayIntentBits.GUILD_EMOJIS_AND_STICKERS, GatewayIntentBits.GUILD_INTEGRATIONS, GatewayIntentBits.GUILD_WEBHOOKS, GatewayIntentBits.GUILD_INVITES, GatewayIntentBits.GUILD_VOICE_STATES, GatewayIntentBits.GUILD_PRESENCES, GatewayIntentBits.GUILD_MESSAGES, GatewayIntentBits.GUILD_MESSAGE_REACTIONS, GatewayIntentBits.GUILD_MESSAGE_TYPING, GatewayIntentBits.GUILD_SCHEDULED_EVENTS);

const client = new Client({ intents: intents });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const utilsFiles = fs.readdirSync('./utils').filter(file => file.endsWith('.js'));

for (const file of utilsFiles) {
	const utils = require(`./utils/${file}`);
	utils(client);
}

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
	}
});

client.login(token);