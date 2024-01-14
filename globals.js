const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

let player = new Object();

const colours = {
    "embed": "#FFC0DD"
};

async function music(id, url) {
    let res;
    if (id == null && url != null) {
        res = await fetch(`https://api.song.link/v1-alpha.1/links?url=${url}&songIfSingle=true`);
    } else {
        res = await fetch(`https://api.song.link/v1-alpha.1/links?platform=youtube&type=song&id=${id}&songIfSingle=true`);
    }
    
    const row1 = new ActionRowBuilder();
    const row2 = new ActionRowBuilder();
    const row3 = new ActionRowBuilder();
    const row4 = new ActionRowBuilder();
    const row5 = new ActionRowBuilder();

    async function add(button) {
        if (row1.components != null && row1.components != undefined && row1.components.length < 5) {
            row1.addComponents(button);
        } else if (row2.components != null && row2.components != undefined && row2.components.length < 5) {
            row2.addComponents(button);
        } else if (row3.components != null && row3.components != undefined && row3.components.length < 5) {
            row3.addComponents(button);
        } else if (row4.components != null && row4.components != undefined && row4.components.length < 5) {
            row4.addComponents(button);
        } else if (row5.components != null && row5.components != undefined && row5.components.length < 5) {
            row5.addComponents(button);
        }
    }

    if (id != null) {
        const watchNativeButton = new ButtonBuilder().setLabel("Watch Native").setCustomId(id).setStyle(ButtonStyle.Secondary);
        await add(watchNativeButton);
    }

    if (res.ok) {
        const data = await res.json();

        const appleMusicButton = new ButtonBuilder().setLabel("Apple Music").setStyle(ButtonStyle.Link);
        const audiomackButton = new ButtonBuilder().setLabel("Audiomack").setStyle(ButtonStyle.Link);
        const deezerButton = new ButtonBuilder().setLabel("Deezer").setStyle(ButtonStyle.Link);
        const napsterButton = new ButtonBuilder().setLabel("Napster").setStyle(ButtonStyle.Link);
        const pandoraButton = new ButtonBuilder().setLabel("Pandora").setStyle(ButtonStyle.Link);
        const soundcloudButton = new ButtonBuilder().setLabel("SoundCloud").setStyle(ButtonStyle.Link);
        const spotifyButton = new ButtonBuilder().setLabel("Spotify").setStyle(ButtonStyle.Link);
        const tidalButton = new ButtonBuilder().setLabel("Tidal").setStyle(ButtonStyle.Link);
        const youtubeButton = new ButtonBuilder().setLabel("YouTube").setStyle(ButtonStyle.Link);
        const youtubeMusicButton = new ButtonBuilder().setLabel("YouTube Music").setStyle(ButtonStyle.Link);

        if (data.linksByPlatform.appleMusic != null) {
            appleMusicButton.setURL(data.linksByPlatform.appleMusic.url);
            await add(appleMusicButton);
        }
        if (data.linksByPlatform.audiomack != null) {
            audiomackButton.setURL(data.linksByPlatform.audiomack.url);
            await add(audiomackButton);
        }
        if (data.linksByPlatform.deezer != null) {
            deezerButton.setURL(data.linksByPlatform.deezer.url);
            await add(deezerButton);
        }
        if (data.linksByPlatform.napster != null) {
            napsterButton.setURL(data.linksByPlatform.napster.url);
            await add(napsterButton);
        }
        if (data.linksByPlatform.pandora != null) {
            pandoraButton.setURL(data.linksByPlatform.pandora.url);
            await add(pandoraButton);
        }
        if (data.linksByPlatform.soundcloud != null) {
            soundcloudButton.setURL(data.linksByPlatform.soundcloud.url);
            await add(soundcloudButton);
        }
        if (data.linksByPlatform.spotify != null) {
            spotifyButton.setURL(data.linksByPlatform.spotify.url);
            await add(spotifyButton)
        }
        if (data.linksByPlatform.tidal != null) {
            tidalButton.setURL(data.linksByPlatform.tidal.url);
            await add(tidalButton);
        }
        if (data.linksByPlatform.youtube != null) {
            youtubeButton.setURL(data.linksByPlatform.youtube.url);
            await add(youtubeButton);
        }
        if (data.linksByPlatform.youtubeMusic != null) {
            youtubeMusicButton.setURL(data.linksByPlatform.youtubeMusic.url);
            await add(youtubeMusicButton);
        }
    }
    
    const components = new Array();

    if (row1.components != null && row1.components != undefined && row1.components.length != 0) {
        components.push(row1);
    }
    if (row2.components != null && row2.components != undefined && row2.components.length != 0) {
        components.push(row2);
    }
    if (row3.components != null && row3.components != undefined && row3.components.length != 0) {
        components.push(row3);
    }
    if (row4.components != null && row4.components != undefined && row4.components.length != 0) {
        components.push(row4);
    }
    if (row5.components != null && row5.components != undefined && row5.components.length != 0) {
        components.push(row5);
    }

    return components;
}

module.exports = {
    player,
    colours,
    music: music
};