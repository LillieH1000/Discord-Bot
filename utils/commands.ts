import { Client } from "discord.js";

async function invoke(client: Client) {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.invoke(interaction);
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };