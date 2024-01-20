async function invoke(client) {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        
        try {
            const id = JSON.parse(interaction.customId);
            if (id.id = "youtube") {
                await interaction.reply({
                    content: `https://yt.lillieh1000.gay/?videoID=${id.video}#`,
                    ephemeral: true
                });
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };