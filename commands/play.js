import { joinVoiceChannel, getVoiceConnection, createAudioResource, createAudioPlayer, AudioPlayerStatus } from "@discordjs/voice";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import globals from "../globals.js";

async function play(interaction, id) {
    globals.player[interaction.guild.id].ids.push(id);

    const data = await request(id);

    const time = new Date(parseInt(data.videoDetails.lengthSeconds) * 1000).toISOString().slice(11, 19);
    const timesplit = time.split(":");
    let formattedTime;
    if (timesplit[0] == "00") {
        const splicedTime = timesplit.splice(1).join(":");
        if (splicedTime.split(":")[0].startsWith("0")) {
            formattedTime = splicedTime.slice(1);
        } else {
            formattedTime = splicedTime;
        }
    } else if (timesplit[0].startsWith("0")) {
        formattedTime = timesplit.join(":").slice(1);
    } else {
        formattedTime = timesplit.join(":");
    }

    const artworks = data.videoDetails.thumbnail.thumbnails;

    const embed = new EmbedBuilder()
        .setColor(globals.colours.embed)
        .setTitle("Music Player")
        .setDescription("Queued")
        .setThumbnail(artworks[artworks.length - 1].url)
        .addFields(
            { name: data.videoDetails.title, value: data.videoDetails.author, inline: false }
        )
        .setFooter({ text: `Length: ${formattedTime}` })
        .setTimestamp();

    await interaction.editReply({ embeds: [embed], allowedMentions: { repliedUser: false } });

    const voiceConnection = getVoiceConnection(interaction.guild.id);
    if (voiceConnection && globals.player[interaction.guild.id].status == 0) {
        globals.player[interaction.guild.id].status = 1;

        globals.player[interaction.guild.id].resource = createAudioResource(data.streamingData.hlsManifestUrl, {
            inlineVolume: true
        });
        globals.player[interaction.guild.id].resource.volume.setVolume(globals.player[interaction.guild.id].volume);
        globals.player[interaction.guild.id].player.play(globals.player[interaction.guild.id].resource);
        voiceConnection.subscribe(globals.player[interaction.guild.id].player);

        globals.player[interaction.guild.id].player.on(AudioPlayerStatus.Idle, () => {
            try {
                globals.player[interaction.guild.id].ids.shift();
                const voiceConnection = getVoiceConnection(interaction.guild.id);
                if (globals.player[interaction.guild.id].ids == null || globals.player[interaction.guild.id].ids == undefined || globals.player[interaction.guild.id].ids.length == 0) {
                    voiceConnection.destroy();
                    delete globals.player[interaction.guild.id];
                } else {
                    (async () => {
                        const data = await request(globals.player[interaction.guild.id].ids[0]);
                        globals.player[interaction.guild.id].resource = createAudioResource(data.streamingData.hlsManifestUrl, {
                            inlineVolume: true
                        });
                        globals.player[interaction.guild.id].resource.volume.setVolume(globals.player[interaction.guild.id].volume);
                        globals.player[interaction.guild.id].player.play(globals.player[interaction.guild.id].resource);
                        voiceConnection.subscribe(globals.player[interaction.guild.id].player);
                    })();
                }
            } catch (error) {
                console.error(error);
            }
        });

        globals.player[interaction.guild.id].player.on("error", voiceerror => {
            console.error(voiceerror);
            try {
                const voiceConnection = getVoiceConnection(interaction.guild.id);
                voiceConnection.destroy();
                delete globals.player[interaction.guild.id];
            } catch (error) {
                console.error(error);
            }
        });
    }
}

async function request(id) {
    const res = await fetch("https://www.youtube.com/youtubei/v1/player?key=AIzaSyB-63vPrdThhKuerbB2N_l7Kwwcxj6yUAc&prettyPrint=false", {
        method: "post",
        body: JSON.stringify({
            "context": {
                "client": {
                    "hl": "en",
                    "gl": "CA",
                    "clientName": "IOS",
                    "clientVersion": "17.33.2",
                    "deviceModel": "iPhone14,3"
                }
            },
            "contentCheckOk": true,
            "racyCheckOk": true,
            "videoId": id
        }),
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "com.google.ios.youtube/17.33.2 (iPhone14,3; U; CPU iOS 15_6 like Mac OS X)"
        }
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    }
}

const info = new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays a song")
    .setDMPermission(false)
    .addStringOption(option =>
        option.setName("query")
            .setDescription("Enter the video name or url")
            .setRequired(true));

async function invoke(interaction) {
    await interaction.deferReply();
    const query = interaction.options.getString("query");

    const voiceConnection = getVoiceConnection(interaction.guild.id);
    
    if (!voiceConnection) {
        joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });
        if (!globals.player.hasOwnProperty([interaction.guild.id])) {
            globals.player = {
                [interaction.guild.id]: {
                    "status": 0,
                    "ids": [],
                    "player": createAudioPlayer(),
                    "volume": 0.1,
                    "resource": null
                }
            };
        }
    }

    const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/|shorts\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    if (query.match(rx)) {
        await play(interaction, query.match(rx)[1]);
    } else {
        const res = await fetch("https://www.youtube.com/youtubei/v1/search?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false", {
            method: "post",
            body: JSON.stringify({
                "context": {
                    "client": {
                        "hl": "en",
                        "gl": "CA",
                        "clientName": "WEB",
                        "clientVersion": "2.20220801.00.00"
                    }
                },
                "contentCheckOk": true,
                "racyCheckOk": true,
                "query": query
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const data = await res.json();

            const contents = data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
            for (let i = 0; i < contents.length; i++) {
                if (contents[i].videoRenderer != null) {
                    if (contents[i].videoRenderer.videoId != null) {
                        await play(interaction, contents[i].videoRenderer.videoId);
                        break;
                    }
                }
            }
        }
    }
}

export { info, invoke };