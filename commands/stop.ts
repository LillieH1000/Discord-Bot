import { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } from "discord.js";
import { getVoiceConnection } from "@discordjs/voice";
import globals from "../globals.js";

const info = new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops the current playing song")
    .setDMPermission(false);

async function invoke(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply();

    const voiceConnection = getVoiceConnection(interaction.guild.id);
    if (voiceConnection && voiceConnection.joinConfig.channelId == interaction.member.voice.channelId && globals.player[interaction.guild.id].status == 1) {
        voiceConnection.destroy();
        delete globals.player[interaction.guild.id];

        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setTitle("Music Player")
            .setDescription("Stopped play audio and disconnected from voice chat")
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    } else {
        await interaction.deleteReply();
    }
}

export { info, invoke };