const { InteractionType } = require("discord.js");

module.exports = async(client) => {
    client.on("interactionCreate", async interaction => {
        if (interaction.type !== InteractionType.ApplicationCommandAutocomplete) return;

        if (interaction.commandName === "genshin") {
            const focusedOption = interaction.options.getFocused(true);
            var choices;

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

            try {
                const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );
            } catch (error) {
                console.error(error);
            }
        }

        if (interaction.commandName === "hentai") {
            const focusedOption = interaction.options.getFocused(true);
            var choices;

            if (focusedOption.value.startsWith("a")) {
                choices = ["amber", "anal", "ayaka"];
            }
            if (focusedOption.value.startsWith("b")) {
                choices = ["bdsm", "blowjob", "byleth"];
            }
            if (focusedOption.value.startsWith("c")) {
                choices = ["cum"];
            }
            if (focusedOption.value.startsWith("e")) {
                choices = ["emilia", "eula"];
            }
            if (focusedOption.value.startsWith("f")) {
                choices = ["femboy", "femdom", "futanari"];
            }
            if (focusedOption.value.startsWith("g")) {
                choices = ["ganyu", "genshin"];
            }
            if (focusedOption.value.startsWith("h")) {
                choices = ["hutao"];
            }
            if (focusedOption.value.startsWith("k")) {
                choices = ["keqing"];
            }
            if (focusedOption.value.startsWith("l")) {
                choices = ["lumine"];
            }
            if (focusedOption.value.startsWith("m")) {
                choices = ["masturbation"];
            }
            if (focusedOption.value.startsWith("n")) {
                choices = ["neko", "nilou"];
            }
            if (focusedOption.value.startsWith("o")) {
                choices = ["overwatch"];
            }
            if (focusedOption.value.startsWith("p")) {
                choices = ["pee", "pegging", "public"];
            }
            if (focusedOption.value.startsWith("r")) {
                choices = ["raiden"];
            }
            if (focusedOption.value.startsWith("s")) {
                choices = ["shenhe"];
            }
            if (focusedOption.value.startsWith("t")) {
                choices = ["tentacles", "thick", "trap"];
            }
            if (focusedOption.value.startsWith("u")) {
                choices = ["undressing", "uniform", "upskirt"];
            }
            if (focusedOption.value.startsWith("w")) {
                choices = ["waifu"];
            }
            if (focusedOption.value.startsWith("y")) {
                choices = ["yaemiko", "yuri"];
            }

            try {
                const filtered = choices.filter(choice => choice.startsWith(focusedOption.value));
                await interaction.respond(
                    filtered.map(choice => ({ name: choice, value: choice })),
                );
            } catch (error) {
                console.error(error);
            }
        }
    });
};