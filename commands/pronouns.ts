import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import globals from "../globals.js";

const info = new SlashCommandBuilder()
    .setName("pronouns")
    .setDescription("Get a users pronouns from pronoundb")
    .addUserOption(option =>
        option.setName("user")
            .setDescription("Select a user")
            .setRequired(true));

async function invoke(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    const user = interaction.options.getUser("user");

    const res = await fetch(`https://pronoundb.org/api/v1/lookup?platform=discord&id=${user.id}`);
    if (res.ok) {
        const data = await res.json() as object;
        let pronoun = new String();
        if (data.pronouns == "unspecified") {
            pronoun = "unspecified";
        }
        if (data.pronouns == "hh") {
            pronoun = "he/him";
        }
        if (data.pronouns == "hi") {
            pronoun = "he/it";
        }
        if (data.pronouns == "hs") {
            pronoun = "he/she";
        }
        if (data.pronouns == "ht") {
            pronoun = "he/they";
        }
        if (data.pronouns == "ih") {
            pronoun = "it/him";
        }
        if (data.pronouns == "ii") {
            pronoun = "it/its";
        }
        if (data.pronouns == "is") {
            pronoun = "it/she";
        }
        if (data.pronouns == "it") {
            pronoun = "it/they";
        }
        if (data.pronouns == "shh") {
            pronoun = "she/he";
        }
        if (data.pronouns == "sh") {
            pronoun = "she/her";
        }
        if (data.pronouns == "si") {
            pronoun = "she/it";
        }
        if (data.pronouns == "st") {
            pronoun = "she/they";
        }
        if (data.pronouns == "th") {
            pronoun = "they/he";
        }
        if (data.pronouns == "ti") {
            pronoun = "they/it";
        }
        if (data.pronouns == "ts") {
            pronoun = "they/she";
        }
        if (data.pronouns == "tt") {
            pronoun = "they/them";
        }
        if (data.pronouns == "any") {
            pronoun = "Any pronouns";
        }
        if (data.pronouns == "other") {
            pronoun = "Other pronouns";
        }
        if (data.pronouns == "ask") {
            pronoun = "Ask me my pronouns";
        }
        if (data.pronouns == "avoid") {
            pronoun = "Avoid pronouns, use my name";
        }
        
        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setTitle("PronounDB")
            .addFields(
                { name: `Pronouns of ${user.username}:`, value: pronoun, inline: false }
            )
            .setTimestamp();

        await interaction.editReply({ embeds: [embed], ephemeral: true });
    }
}

export { info, invoke };