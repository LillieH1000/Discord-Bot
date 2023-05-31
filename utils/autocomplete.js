module.exports = async(client) => {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isAutocomplete()) return;

        const focusedOption = interaction.options.getFocused(true);
        var choices;
        
        if (interaction.commandName === "animals") {
            if (focusedOption.value.startsWith("b")) {
                choices = ["birb"];
            }
            if (focusedOption.value.startsWith("c")) {
                choices = ["cat"];
            }
            if (focusedOption.value.startsWith("d")) {
                choices = ["dog", "duck"];
            }
            if (focusedOption.value.startsWith("f")) {
                choices = ["fox", "frog"];
            }
            if (focusedOption.value.startsWith("g")) {
                choices = ["goose"];
            }
        }

        if (interaction.commandName === "hentai") {
            if (focusedOption.value.startsWith("b")) {
                choices = ["blowjob"];
            }
            if (focusedOption.value.startsWith("n")) {
                choices = ["neko"];
            }
            if (focusedOption.value.startsWith("t")) {
                choices = ["trap"];
            }
            if (focusedOption.value.startsWith("w")) {
                choices = ["waifu"];
            }
        }

        try {
            const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );
        } catch (error) {
            console.error(error);
        }
    });
};