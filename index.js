const fs = require("node:fs");
const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const { token } = require("./config.json");
var globals = require("./globals.js");

const client = new Client({ intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildBans, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildScheduledEvents] });

client.commands = new Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const utilsFiles = fs.readdirSync("./utils").filter(file => file.endsWith(".js"));

for (const file of utilsFiles) {
	const utils = require(`./utils/${file}`);
	utils(client);
}

client.once("ready", () => {
	console.log(`Logged in as ${client.user.tag}`);
	const guild = client.guilds.cache.first();
	const embed = new EmbedBuilder()
		.setColor(globals.embedcolour)
		.setTitle("Notice From Developer")
		.setDescription("Hello everybody, today reddit announced that they are making all of their apis paid only which greatly affects my bot.\n\nThe change from reddit to paid only apis will mean the end of 95% of my bots commands and functions as reddit has a huge integration into my bot for anything pictures/images related.\n\nUnfortunately it seems nothing can be done about this right now, I will follow up with more announcements in the future about this ongoing issue for countless developers and projects.\n\nMore Info:\n[Apollo For Reddit Post](https://www.reddit.com/r/apolloapp/comments/12ram0f/had_a_few_calls_with_reddit_today_about_the/)\n[Official Reddit Post](https://www.reddit.com/r/reddit/comments/12qwagm/an_update_regarding_reddits_api/)")
		.setTimestamp()
	// guild.systemChannel.send({ embeds: [embed] });
});

client.login(token);