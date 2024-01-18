import fs from "node:fs";
import { REST, Routes } from "discord.js";
import config from "./config.json" assert { type: "json" };

const commands = new Array();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
	const command = await import(`./commands/${file}`);
	commands.push(command.info.toJSON());
}

const rest = new REST({ version: "10" }).setToken(config.token);

rest.put(Routes.applicationCommands(config.client), { body: commands })
	.then(() => console.log("Successfully registered application commands."))
	.catch(console.error);