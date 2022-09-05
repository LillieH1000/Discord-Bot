const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');

module.exports = async(client) => {
    client.on('interactionCreate', async interaction => {
        if (!interaction.isSelectMenu()) return;
        
        try {
            const pokemon = interaction.customId.split('custommenuid')[0];
            const game = interaction.customId.split('custommenuid')[1];

            const res = await fetch('https://pokeapi.co/api/v2/pokemon/'.concat(pokemon));
            if (res.ok) {
                const data = await res.json();
                
                var typescount = 0;
                var types = '';
                for (const type of data.types) {
                    types += type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
                    typescount += 1;
                    if (data.types.length != typescount) {
                        types += ', ';
                    }
                }
        
                var abilitiescount = 0;
                var abilities = '';
                for (const ability of data.abilities) {
                    abilities += ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1);
                    if (ability.is_hidden == true) {
                        abilities += ' (Hidden)';
                    }
                    abilitiescount += 1;
                    if (data.abilities.length != abilitiescount) {
                        abilities += ', ';
                    }
                }
        
                var basestatscount = 0;
                var basestats = '';
                for (const basestat of data.stats) {
                    basestats += basestat.stat.name.charAt(0).toUpperCase() + basestat.stat.name.slice(1) + ': ' + basestat.base_stat.toString();
                    basestatscount += 1;
                    if (data.stats.length != basestatscount) {
                        basestats += '\n';
                    }
                }
                    
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle(data.name.charAt(0).toUpperCase() + data.name.slice(1))
                    .addFields(
                        { name: 'Pokedex ID', value: data.id.toString(), inline: false },
                        { name: 'Types', value: types, inline: false },
                        { name: 'Abilities', value: abilities, inline: false },
                        { name: 'Base Stats', value: basestats, inline: false },
                    )
                    .setTimestamp()
                if (interaction.values[0] == 'defaultregular') {
                    embed.setThumbnail(data.sprites.other.home.front_default);
                }
                if (interaction.values[0] == 'defaultshiny') {
                    embed.setThumbnail(data.sprites.other.home.front_shiny);
                }
                if (interaction.values[0] == 'femaleregular') {
                    embed.setThumbnail(data.sprites.other.home.front_female);
                }
                if (interaction.values[0] == 'femaleshiny') {
                    embed.setThumbnail(data.sprites.other.home.front_shiny_female);
                }
        
                const menu = new SelectMenuBuilder().setPlaceholder('Choose Sprite Image');
        
                if (game != '') {
                    embed.addFields(
                        { name: 'Game And Count', value: game, inline: false },
                    );
                    menu.setCustomId(data.name + 'custommenuid' + game);
                } else {
                    menu.setCustomId(data.name + 'custommenuid');
                }
                
                if (data.sprites.other.home.front_default != null) {
                    menu.addOptions([
                        {
                            label: "Default (Regular)",
                            value: "defaultregular",
                            description: "Show the regular default pic of the pokemon"
                        }
                    ])
                }
                if (data.sprites.other.home.front_shiny != null) {
                    menu.addOptions([
                        {
                            label: "Default (Shiny)",
                            value: "defaultshiny",
                            description: "Show the shiny default pic of the pokemon"
                        }
                    ])
                }
                if (data.sprites.other.home.front_female != null) {
                    menu.addOptions([
                        {
                            label: "Female (Regular)",
                            value: "femaleregular",
                            description: "Show the regular female pic of the pokemon"
                        }
                    ])
                }
                if (data.sprites.other.home.front_shiny_female != null) {
                    menu.addOptions([
                        {
                            label: "Female (Shiny)",
                            value: "femaleshiny",
                            description: "Show the shiny female pic of the pokemon"
                        }
                    ])
                }
        
                const row = new ActionRowBuilder().addComponents(menu);
        
                await interaction.update({ embeds: [embed], components: [row] });
            }
        } catch (error) {
            console.error(error);
        }
    });
};