import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import globals from "../globals.js";

const info = new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Change the volume of the current playing song")
    .setDMPermission(false)
    .addIntegerOption(option =>
        option.setName("volume")
            .setDescription("Enter the volume integer (1 - 100) [Default: 10]")
            .setRequired(true));

async function invoke(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();
    const volume = interaction.options.getInteger("volume");
    
    const voiceConnection = getVoiceConnection(interaction.guild.id);
    if (voiceConnection && voiceConnection.joinConfig.channelId == interaction.member.voice.channelId && globals.player[interaction.guild.id].status == 1) {
        globals.player[interaction.guild.id].volume = volume / 100
        globals.player[interaction.guild.id].resource.volume.setVolume(globals.player[interaction.guild.id].volume);

        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setTitle("Music Player")
            .setDescription(`Changed audio volume level to: ${volume.toString()}`)
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    } else {
        await interaction.deleteReply();
    }
}

export { info, invoke };