const { InteractionType } = require('discord.js');

module.exports = async(client) => {
    client.on('interactionCreate', async interaction => {
        if (interaction.type !== InteractionType.ApplicationCommand) return;
    
        const command = client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
        }
    });
};