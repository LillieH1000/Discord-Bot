const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalscolours = require('../globals/colours.js');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                if (word.match(rx)) {
                    const res1 = await fetch('https://returnyoutubedislikeapi.com/votes?videoId='.concat(word.match(rx)[1]));
                    const res2 = await fetch('https://api.song.link/v1-alpha.1/links?platform=youtube&type=song&id='.concat(word.match(rx)[1]));
                    if (res1.ok & res2.ok) {
                        const data1 = await res1.json();
                        const data2 = await res2.json();

                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
                            .setDescription('Views: ' + data1.viewCount.toLocaleString() + '\nLikes: ' + data1.likes.toLocaleString() + '\nDislikes: ' + data1.dislikes.toLocaleString())
                            .setTimestamp()

                        const row1 = new ActionRowBuilder();
                        const row2 = new ActionRowBuilder();
                        const row3 = new ActionRowBuilder();
                        const row4 = new ActionRowBuilder();
                        const row5 = new ActionRowBuilder();

                        const appleMusicButton = new ButtonBuilder().setLabel('Apple Music').setStyle(ButtonStyle.Link);
                        const audiomackButton = new ButtonBuilder().setLabel('Audiomack').setStyle(ButtonStyle.Link);
                        const deezerButton = new ButtonBuilder().setLabel('Deezer').setStyle(ButtonStyle.Link);
                        const napsterButton = new ButtonBuilder().setLabel('Napster').setStyle(ButtonStyle.Link);
                        const pandoraButton = new ButtonBuilder().setLabel('Pandora').setStyle(ButtonStyle.Link);
                        const soundcloudButton = new ButtonBuilder().setLabel('SoundCloud').setStyle(ButtonStyle.Link);
                        const tidalButton = new ButtonBuilder().setLabel('Tidal').setStyle(ButtonStyle.Link);
                        const spotifyButton = new ButtonBuilder().setLabel('Spotify').setStyle(ButtonStyle.Link);
                        const youtubeMusicButton = new ButtonBuilder().setLabel('YouTube Music').setStyle(ButtonStyle.Link);

                        if (data2.linksByPlatform.appleMusic != null) {
                            appleMusicButton.setURL(data2.linksByPlatform.appleMusic.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(appleMusicButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(appleMusicButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(appleMusicButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(appleMusicButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(appleMusicButton);
                            }
                        }
                        if (data2.linksByPlatform.audiomack != null) {
                            audiomackButton.setURL(data2.linksByPlatform.audiomack.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(audiomackButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(audiomackButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(audiomackButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(audiomackButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(audiomackButton);
                            }
                        }
                        if (data2.linksByPlatform.deezer != null) {
                            deezerButton.setURL(data2.linksByPlatform.deezer.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(deezerButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(deezerButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(deezerButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(deezerButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(deezerButton);
                            }
                        }
                        if (data2.linksByPlatform.napster != null) {
                            napsterButton.setURL(data2.linksByPlatform.napster.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(napsterButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(napsterButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(napsterButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(napsterButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(napsterButton);
                            }
                        }
                        if (data2.linksByPlatform.pandora != null) {
                            pandoraButton.setURL(data2.linksByPlatform.pandora.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(pandoraButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(pandoraButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(pandoraButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(pandoraButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(pandoraButton);
                            }
                        }
                        if (data2.linksByPlatform.soundcloud != null) {
                            soundcloudButton.setURL(data2.linksByPlatform.soundcloud.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(soundcloudButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(soundcloudButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(soundcloudButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(soundcloudButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(soundcloudButton);
                            }
                        }
                        if (data2.linksByPlatform.tidal != null) {
                            tidalButton.setURL(data2.linksByPlatform.tidal.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(tidalButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(tidalButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(tidalButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(tidalButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(tidalButton);
                            }
                        }
                        if (data2.linksByPlatform.spotify != null) {
                            spotifyButton.setURL(data2.linksByPlatform.spotify.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(spotifyButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(spotifyButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(spotifyButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(spotifyButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(spotifyButton);
                            }
                        }
                        if (data2.linksByPlatform.youtubeMusic != null) {
                            youtubeMusicButton.setURL(data2.linksByPlatform.youtubeMusic.url);
                            if (row1.components != undefined && row1.components.length < 5) {
                                row1.addComponents(youtubeMusicButton);
                            } else if (row2.components != undefined && row2.components.length < 5) {
                                row2.addComponents(youtubeMusicButton);
                            } else if (row3.components != undefined && row3.components.length < 5) {
                                row3.addComponents(youtubeMusicButton);
                            } else if (row4.components != undefined && row4.components.length < 5) {
                                row4.addComponents(youtubeMusicButton);
                            } else if (row5.components != undefined && row5.components.length < 5) {
                                row5.addComponents(youtubeMusicButton);
                            }
                        }
                        
                        var components = new Array();

                        if (row1.components != undefined && row1.components.length != 0) {
                            components.push(row1);
                        }
                        if (row2.components != undefined && row2.components.length != 0) {
                            components.push(row2);
                        }
                        if (row3.components != undefined && row3.components.length != 0) {
                            components.push(row3);
                        }
                        if (row4.components != undefined && row4.components.length != 0) {
                            components.push(row4);
                        }
                        if (row5.components != undefined && row5.components.length != 0) {
                            components.push(row5);
                        }

                        if (components == undefined || components.length == 0) {
                            await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                        } else {
                            await message.reply({ embeds: [embed], components: components, allowedMentions: { repliedUser: false } });
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};