const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');

async function components(platform, type, info) {
    const res = await fetch(`https://api.song.link/v1-alpha.1/links?platform=${platform}&type=song&${type}=${info}`);
    if (res.ok) {
        const data = await res.json();

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
        const youtubeButton = new ButtonBuilder().setLabel('YouTube').setStyle(ButtonStyle.Link);
        const youtubeMusicButton = new ButtonBuilder().setLabel('YouTube Music').setStyle(ButtonStyle.Link);

        if (data.linksByPlatform.appleMusic != null) {
            appleMusicButton.setURL(data.linksByPlatform.appleMusic.url);
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
        if (data.linksByPlatform.audiomack != null) {
            audiomackButton.setURL(data.linksByPlatform.audiomack.url);
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
        if (data.linksByPlatform.deezer != null) {
            deezerButton.setURL(data.linksByPlatform.deezer.url);
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
        if (data.linksByPlatform.napster != null) {
            napsterButton.setURL(data.linksByPlatform.napster.url);
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
        if (data.linksByPlatform.pandora != null) {
            pandoraButton.setURL(data.linksByPlatform.pandora.url);
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
        if (data.linksByPlatform.soundcloud != null) {
            soundcloudButton.setURL(data.linksByPlatform.soundcloud.url);
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
        if (data.linksByPlatform.tidal != null) {
            tidalButton.setURL(data.linksByPlatform.tidal.url);
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
        if (data.linksByPlatform.spotify != null) {
            spotifyButton.setURL(data.linksByPlatform.spotify.url);
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
        if (data.linksByPlatform.youtube != null) {
            youtubeButton.setURL(data.linksByPlatform.youtube.url);
            if (row1.components != undefined && row1.components.length < 5) {
                row1.addComponents(youtubeButton);
            } else if (row2.components != undefined && row2.components.length < 5) {
                row2.addComponents(youtubeButton);
            } else if (row3.components != undefined && row3.components.length < 5) {
                row3.addComponents(youtubeButton);
            } else if (row4.components != undefined && row4.components.length < 5) {
                row4.addComponents(youtubeButton);
            } else if (row5.components != undefined && row5.components.length < 5) {
                row5.addComponents(youtubeButton);
            }
        }
        if (data.linksByPlatform.youtubeMusic != null) {
            youtubeMusicButton.setURL(data.linksByPlatform.youtubeMusic.url);
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
        
        const components = new Array();

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

        return components;
    } else {
        return null;
    }
}

module.exports = {
    components: components
};