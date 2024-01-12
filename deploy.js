const fs = require("node:fs");
const { REST, Routes } = require("discord.js");
const { client, token } = require("./config.json");

const commands = new Array();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

rest.put(Routes.applicationCommands(client), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);