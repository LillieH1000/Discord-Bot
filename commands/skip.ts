import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getVoiceConnection, createAudioResource } from "@discordjs/voice";
import globals from "../globals.js";

const info = new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current playing song")
    .setDMPermission(false);

async function invoke(interaction) {
    await interaction.deferReply();

    const voiceConnection = getVoiceConnection(interaction.guild.id);
    if (voiceConnection && voiceConnection.joinConfig.channelId == interaction.member.voice.channelId && globals.player[interaction.guild.id].status == 1) {
        globals.player[interaction.guild.id].ids.shift();

        const data = await globals.request(globals.player[interaction.guild.id].ids[0]);
        if (data.url == null) {
            globals.player[interaction.guild.id].resource = createAudioResource(data.streamingData.hlsManifestUrl, {
                inlineVolume: true
            });
        } else {
            globals.player[interaction.guild.id].resource = createAudioResource(data.url, {
                inlineVolume: true
            });
        }
        globals.player[interaction.guild.id].resource.volume.setVolume(globals.player[interaction.guild.id].volume);
        globals.player[interaction.guild.id].player.play(globals.player[interaction.guild.id].resource);
        voiceConnection.subscribe(globals.player[interaction.guild.id].player);

        const embed = new EmbedBuilder()
            .setColor(globals.colours.embed)
            .setTitle("Music Player")
            .setDescription("Skipped playing audio")
            .setTimestamp();

        await interaction.editReply({ embeds: [embed] });
    } else {
        await interaction.deleteReply();
    }
}

export { info, invoke };