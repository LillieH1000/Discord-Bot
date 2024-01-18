async function invoke(client) {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        
        try {
            await interaction.reply({
                content: `https://lillieh1000.gay/yt?videoID=${interaction.customId}#`,
                ephemeral: true
            });
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };