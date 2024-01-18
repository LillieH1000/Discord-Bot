import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import globals from "../globals.js";

const info = new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses the current playing song")
    .setDMPermission(false);

async function invoke(interaction) {
    await interaction.deferReply();

    const voiceConnection = getVoiceConnection(interaction.guild.id);
    if (voiceConnection && voiceConnection.joinConfig.channelId == interaction.member.voice.channelId && globals.player[interaction.guild.id].status == 1) {
        globals.player[interaction.guild.id].player.pause();

        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setTitle("Music Player")
            .setDescription("Paused playing audio")
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    } else {
        await interaction.deleteReply();
    }
}

export { info, invoke };