import fs from "node:fs";
import { Client, Collection, GatewayIntentBits } from "discord.js";

let config;

if (process.argv[2] == "dev") {
	config = await import("file:///C:/Users/lilli/OneDrive/Desktop/Stuff/config.json", {
		assert: {
		  type: "json"
		}
	});
} else {
	config = await import("./config.json", {
		assert: {
		  type: "json"
		}
	});
}

const client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildScheduledEvents] });

client.commands = new Collection();

const commandFiles: string[] = fs.readdirSync("./commands").filter((file: string) => file.endsWith(".ts"));

for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	client.commands.set(command.info.name, command);
}

const utilsFiles: string[] = fs.readdirSync("./utils").filter((file: string) => file.endsWith(".ts"));

for (const file of utilsFiles) {
	const utils = await import(`./utils/${file}`);
	utils.invoke(client);
}

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.guilds.cache.forEach(guild => {
		console.log(`${guild.name} - ${guild.id}`);
	});
});

client.login(config.token);