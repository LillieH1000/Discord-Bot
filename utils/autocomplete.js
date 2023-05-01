module.exports = async(client) => {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isAutocomplete()) return;

        const focusedOption = interaction.options.getFocused(true);
        var choices;
        
        if (interaction.commandName === "animals") {
            if (focusedOption.value.startsWith("b")) {
                choices = ["beardeddragon", "birb"];
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
            if (focusedOption.value.startsWith("s")) {
                choices = ["snake"];
            }
        }

        if (interaction.commandName === "genshin") {
            if (focusedOption.value.startsWith("a")) {
                choices = ["amber", "ayaka"];
            }
            if (focusedOption.value.startsWith("c")) {
                choices = ["collei"];
            }
            if (focusedOption.value.startsWith("e")) {
                choices = ["eula"];
            }
            if (focusedOption.value.startsWith("g")) {
                choices = ["ganyu"];
            }
            if (focusedOption.value.startsWith("h")) {
                choices = ["hutao"];
            }
            if (focusedOption.value.startsWith("k")) {
                choices = ["keqing"];
            }
            if (focusedOption.value.startsWith("l")) {
                choices = ["layla", "lumine"];
            }
            if (focusedOption.value.startsWith("n")) {
                choices = ["nahida", "nilou", "noelle"];
            }
            if (focusedOption.value.startsWith("r")) {
                choices = ["raiden"];
            }
            if (focusedOption.value.startsWith("s")) {
                choices = ["shenhe"];
            }
            if (focusedOption.value.startsWith("y")) {
                choices = ["yaemiko"];
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