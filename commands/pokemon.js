const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
var globalscolours = require('../globals/colours.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pokemon')
		.setDescription('Gives you info about the specified pokemon')
        .addStringOption(option =>
            option.setName('name')
                .setDescription('Enter the pokemon name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('form')
                .setDescription('Enter the pokemon form')
                .setRequired(true)
                .addChoices(
                    { name: 'None', value: 'none' },
                    { name: 'Alola', value: 'alola' },
                    { name: 'Galar', value: 'galar' },
                    { name: 'Hisui', value: 'hisui' },
                    { name: 'Paldea', value: 'paldea' },
                ))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Enter your message')),
	async execute(interaction) {
        await interaction.deferReply();
        const name = interaction.options.getString('name');
        const form = interaction.options.getString('form');
        const message = interaction.options.getString('message');

        var pokemon = '';
        if (form == 'none') {
            pokemon = name;
        } else if (form == 'alola') {
            pokemon = name + '-alola';
        } else if (form == 'galar') {
            pokemon = name + '-galar';
        } else if (form == 'hisui') {
            pokemon = name + '-hisui';
        } else if (form == 'paldea') {
            pokemon = name + '-paldea';
        }

        const res = await fetch('https://pokeapi.co/api/v2/pokemon/'.concat(pokemon.toLowerCase()));
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
                .setColor(globalscolours.embed)
                .setTimestamp()

            if (data.name != null) {
                embed.setTitle(data.name.charAt(0).toUpperCase() + data.name.slice(1))
            }

            if (data.id != null) {
                embed.addFields(
                    { name: 'Pokedex ID', value: data.id.toString(), inline: false },
                )
            }

            embed.addFields(
                { name: 'Types', value: types, inline: false },
                { name: 'Abilities', value: abilities, inline: false },
            )

            if (data.height != null) {
                embed.addFields(
                    { name: 'Height (Decimetres)', value: data.height.toString(), inline: false },
                )
            }

            if (data.weight != null) {
                embed.addFields(
                    { name: 'Weight (Hectograms)', value: data.weight.toString(), inline: false },
                )
            }

            if (data.base_experience != null) {
                embed.addFields(
                    { name: 'Base Experience', value: data.base_experience.toString(), inline: false },
                )
            }

            embed.addFields(
                { name: 'Base Stats', value: basestats, inline: false },
            )
    
            if (form == 'paldea') {
                if (message) {
                    embed.addFields(
                        { name: 'Game And Count', value: message, inline: false },
                    );
                }

                embed.addFields(
                    { name: 'Notice', value: 'Unfortunately sprites for Paldea forms aren\'t available via pokeapi at this time', inline: false },
                );

                await interaction.editReply({ embeds: [embed] });
            } else {
                embed.setThumbnail(data.sprites.other.home.front_default)

                const menu = new SelectMenuBuilder().setPlaceholder('Choose Sprite Image');
    
                if (message) {
                    embed.addFields(
                        { name: 'Game And Count', value: message, inline: false },
                    );
                    menu.setCustomId(data.name + 'custommenuid' + message);
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

                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        } else {
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Pokemon Not Found')
                .setTimestamp()

            await interaction.editReply({ embeds: [embed] });
        }
	},
};