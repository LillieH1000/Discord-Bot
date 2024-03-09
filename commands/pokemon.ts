import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChatInputCommandInteraction } from "discord.js";
import globals from "../globals.js";

const info = new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Gives you info about the specified pokemon")
    .addStringOption(option =>
        option.setName("name")
            .setDescription("Enter the pokemon name")
            .setRequired(true))
    .addStringOption(option =>
        option.setName("form")
            .setDescription("Enter the pokemon form")
            .addChoices(
                { name: "Alola", value: "alola" },
                { name: "Galar", value: "galar" },
                { name: "Hisui", value: "hisui" },
                { name: "Paldea", value: "paldea" }
            ))
    .addStringOption(option =>
        option.setName("message")
            .setDescription("Enter your message"));

async function invoke(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const name = interaction.options.getString("name");
    const form = interaction.options.getString("form");
    const message = interaction.options.getString("message");

    let pokemon = new String();
    if (form == "alola") {
        pokemon = name + "-alola";
    } else if (form == "galar") {
        pokemon = name + "-galar";
    } else if (form == "hisui") {
        pokemon = name + "-hisui";
    } else if (form == "paldea") {
        pokemon = name + "-paldea";
    } else {
        pokemon = name;
    }

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.replace(" ", "-").toLowerCase()}`);
    if (res.ok) {
        const data = await res.json() as object;

        let weakness = {
            normal: 1,
            fire: 1,
            water: 1,
            electric: 1,
            grass: 1,
            ice: 1,
            fighting: 1,
            poison: 1,
            ground: 1,
            flying: 1,
            psychic: 1,
            bug: 1,
            rock: 1,
            ghost: 1,
            dragon: 1,
            dark: 1,
            steel: 1,
            fairy: 1
        };
        
        let typescount = 0;
        let types = new String();
        for (const type of data.types) {
            const res1 = await fetch(type.type.url);
            const data1 = await res1.json() as object;

            for (const double of data1.damage_relations.double_damage_from) {
                weakness[double.name] = weakness[double.name] * 2;
            }
            for (const half of data1.damage_relations.half_damage_from) {
                weakness[half.name] = weakness[half.name] * 0.5;
            }
            for (const none of data1.damage_relations.no_damage_from) {
                weakness[none.name] = weakness[none.name] * 0;
            }

            types += type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
            typescount += 1;
            if (data.types.length != typescount) {
                types += ", ";
            }
        }

        let weaknessescount = 0;
        let weaknesses = new String();
        for (const weaknessobject in weakness) {
            weaknesses += `${weaknessobject.charAt(0).toUpperCase()}${weaknessobject.slice(1)}: ${weakness[weaknessobject]}x`;
            weaknessescount += 1;
            if (weakness.length != weaknessescount) {
                weaknesses += "\n";
            }
        }

        let abilitiescount = 0;
        let abilities = new String();
        for (const ability of data.abilities) {
            abilities += ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1);
            if (ability.is_hidden == true) {
                abilities += " (Hidden)";
            }
            abilitiescount += 1;
            if (data.abilities.length != abilitiescount) {
                abilities += ", ";
            }
        }

        let basestatscount = 0;
        let basestats = new String();
        for (const basestat of data.stats) {
            basestats += basestat.stat.name.charAt(0).toUpperCase() + basestat.stat.name.slice(1) + ": " + basestat.base_stat.toString();
            basestatscount += 1;
            if (data.stats.length != basestatscount) {
                basestats += "\n";
            }
        }
            
        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setTimestamp();

        if (data.name != null) {
            embed.setTitle(data.name.charAt(0).toUpperCase() + data.name.slice(1));
        }

        if (data.id != null) {
            embed.addFields(
                { name: "Pokedex ID", value: data.id.toString(), inline: false }
            );
        }

        embed.addFields(
            { name: "Types", value: types, inline: false },
            { name: "Weakness", value: weaknesses, inline: false },
            { name: "Abilities", value: abilities, inline: false }
        );

        if (data.height != null) {
            embed.addFields(
                { name: "Height (Decimetres)", value: data.height.toString(), inline: false }
            );
        }

        if (data.weight != null) {
            embed.addFields(
                { name: "Weight (Hectograms)", value: data.weight.toString(), inline: false }
            );
        }

        if (data.base_experience != null) {
            embed.addFields(
                { name: "Base Experience", value: data.base_experience.toString(), inline: false }
            );
        }

        embed.addFields(
            { name: "Base Stats", value: basestats, inline: false }
        );

        // Town Of Salem Server
        if (interaction.guild && interaction.guild.id == "416350699794857986" && message) {
            const channel = interaction.guild.channels.cache.get("894979033484369980");
            if (channel) {
                const count = parseInt(channel.name.replace("shiny-stuff-", "").replace("-left", ""));
                await channel.setName(`shiny stuff ${count - 1} left`);
            }
            embed.addFields(
                { name: "Game And Count", value: message, inline: false }
            );
        }

        if (data.sprites.other.home.front_default != null) {
            embed.setThumbnail(data.sprites.other.home.front_default);

            const menu = new StringSelectMenuBuilder().setPlaceholder("Choose Sprite Image");

            menu.setCustomId(JSON.stringify({
                name: data.name,
                game: message
            }));
            
            if (data.sprites.other.home.front_default != null) {
                menu.addOptions([{
                    label: "Default (Regular)",
                    value: "defaultregular",
                    description: "Show the regular default pic of the pokemon"
                }]);
            }
            if (data.sprites.other.home.front_shiny != null) {
                menu.addOptions([{
                    label: "Default (Shiny)",
                    value: "defaultshiny",
                    description: "Show the shiny default pic of the pokemon"
                }]);
            }
            if (data.sprites.other.home.front_female != null) {
                menu.addOptions([{
                    label: "Female (Regular)",
                    value: "femaleregular",
                    description: "Show the regular female pic of the pokemon"
                }]);
            }
            if (data.sprites.other.home.front_shiny_female != null) {
                menu.addOptions([{
                    label: "Female (Shiny)",
                    value: "femaleshiny",
                    description: "Show the shiny female pic of the pokemon"
                }]);
            }
    
            const row = new ActionRowBuilder().addComponents(menu);

            await interaction.editReply({ embeds: [embed], components: [row] });
        } else {
            await interaction.editReply({ embeds: [embed] });
        }
    } else {
        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setTitle("Pokemon Not Found")
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    }
}

export { info, invoke };