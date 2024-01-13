const { joinVoiceChannel, getVoiceConnection, createAudioResource, createAudioPlayer, AudioPlayerStatus } = require("@discordjs/voice");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
let globals = require("../globals.js");

async function play(interaction, id) {
    globals.player[interaction.guild.id].ids.push(id);

    const voiceConnection = getVoiceConnection(interaction.guild.id);
    if (voiceConnection && globals.player[interaction.guild.id].status == 0) {
        globals.player[interaction.guild.id].status = 1;

        const url = await request(globals.player[interaction.guild.id].ids[0]);
        globals.player[interaction.guild.id].resource = createAudioResource(url, {
            inlineVolume: true
        });
        globals.player[interaction.guild.id].resource.volume.setVolume(0.3);
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
                        const url = await request(globals.player[interaction.guild.id].ids[0]);
                        globals.player[interaction.guild.id].resource = createAudioResource(url, {
                            inlineVolume: true
                        });
                        globals.player[interaction.guild.id].resource.volume.setVolume(0.3);
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
        return data.streamingData.hlsManifestUrl;
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a song")
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName("query")
                .setDescription("Enter the video name or url")
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const query = interaction.options.getString("query");

        const voiceConnection = getVoiceConnection(interaction.guild.id);
        
        if (!voiceConnection) {
            joinVoiceChannel({
                channelId: interaction.member.voice.channel.id,
                guildId: interaction.guild.id,
                adapterCreator: interaction.guild.voiceAdapterCreator,
            });
            if (!globals.player.hasOwnProperty([interaction.guild.id])) {
                globals.player = {
                    [interaction.guild.id]: {
                        "status": 0,
                        "titles": [],
                        "ids": [],
                        "player": createAudioPlayer(),
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
                console.log(contents.toString());
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
	},
};