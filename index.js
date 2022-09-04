const fs = require('node:fs');
const { Client, Collection, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildScheduledEvents] });

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
	if (!fs.existsSync('downloads')) {
		fs.mkdirSync('downloads', '0755')
	}
	client.user.setActivity("Keqing Be Adorable", { type: ActivityType.Watching})
	console.log(`Logged in as ${client.user.tag}`);
});

client.login(token);