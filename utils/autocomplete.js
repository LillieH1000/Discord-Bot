const { InteractionType } = require('discord.js');

module.exports = async(client) => {
    client.on('interactionCreate', async interaction => {
        if (interaction.type !== InteractionType.ApplicationCommandAutocomplete) return;

        if (interaction.commandName === 'hentai') {
            const focusedOption = interaction.options.getFocused(true);
            var choices;

            if (focusedOption.value.startsWith('a')) {
                choices = ['amber', 'anal', 'ass', 'ayaka'];
            }
            if (focusedOption.value.startsWith('b')) {
                choices = ['bdsm', 'blowjob', 'boobjob', 'boobs', 'byleth'];
            }
            if (focusedOption.value.startsWith('c')) {
                choices = ['creampie', 'cum'];
            }
            if (focusedOption.value.startsWith('e')) {
                choices = ['emilia', 'ero', 'eula'];
            }
            if (focusedOption.value.startsWith('f')) {
                choices = ['femboy', 'femdom', 'footjob', 'futanari'];
            }
            if (focusedOption.value.startsWith('g')) {
                choices = ['gangbang', 'ganyu', 'genshin', 'glasses'];
            }
            if (focusedOption.value.startsWith('h')) {
                choices = ['handjob', 'hutao'];
            }
            if (focusedOption.value.startsWith('k')) {
                choices = ['keqing'];
            }
            if (focusedOption.value.startsWith('l')) {
                choices = ['lumine'];
            }
            if (focusedOption.value.startsWith('m')) {
                choices = ['masturbation'];
            }
            if (focusedOption.value.startsWith('n')) {
                choices = ['neko', 'nilou'];
            }
            if (focusedOption.value.startsWith('o')) {
                choices = ['orgy', 'overwatch'];
            }
            if (focusedOption.value.startsWith('p')) {
                choices = ['pantsu', 'pee', 'pegging', 'public'];
            }
            if (focusedOption.value.startsWith('r')) {
                choices = ['rem'];
            }
            if (focusedOption.value.startsWith('s')) {
                choices = ['shenhe'];
            }
            if (focusedOption.value.startsWith('t')) {
                choices = ['tentacles', 'thick', 'thighs', 'trap'];
            }
            if (focusedOption.value.startsWith('u')) {
                choices = ['undressing', 'uniform', 'upskirt'];
            }
            if (focusedOption.value.startsWith('w')) {
                choices = ['waifu'];
            }
            if (focusedOption.value.startsWith('y')) {
                choices = ['yaemiko', 'yuri'];
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