const { InteractionType } = require('discord.js');

module.exports = async(client) => {
    client.on('interactionCreate', async interaction => {
        if (interaction.type !== InteractionType.ApplicationCommandAutocomplete) return;

        if (interaction.commandName === 'hentai') {
            const focusedOption = interaction.options.getFocused(true);
            var choices;

            if (focusedOption.value.startsWith('a')) {
                choices = ['amber', 'anal', 'ass'];
            }
            if (focusedOption.value.startsWith('b')) {
                choices = ['bdsm', 'blowjob', 'boobjob', 'boobs'];
            }
            if (focusedOption.value.startsWith('c')) {
                choices = ['creampie', 'cum'];
            }
            if (focusedOption.value.startsWith('e')) {
                choices = ['ero', 'eula'];
            }
            if (focusedOption.value.startsWith('f')) {
                choices = ['femboy', 'femdom', 'footjob', 'futanari'];
            }
            if (focusedOption.value.startsWith('g')) {
                choices = ['gangbang', 'ganyu', 'genshin', 'glasses'];
            }
            if (focusedOption.value.startsWith('h')) {
                choices = ['handjob'];
            }
            if (focusedOption.value.startsWith('l')) {
                choices = ['lumine'];
            }
            if (focusedOption.value.startsWith('m')) {
                choices = ['masturbation'];
            }
            if (focusedOption.value.startsWith('n')) {
                choices = ['neko'];
            }
            if (focusedOption.value.startsWith('o')) {
                choices = ['orgy', 'overwatch'];
            }
            if (focusedOption.value.startsWith('p')) {
                choices = ['pantsu', 'pee', 'pegging', 'public'];
            }
            if (focusedOption.value.startsWith('t')) {
                choices = ['tentacles', 'thighs', 'trap'];
            }
            if (focusedOption.value.startsWith('u')) {
                choices = ['uniform', 'upskirt'];
            }
            if (focusedOption.value.startsWith('w')) {
                choices = ['waifu'];
            }
            if (focusedOption.value.startsWith('y')) {
                choices = ['yuri'];
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