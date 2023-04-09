const { createAudioPlayer } = require("@discordjs/voice");
var _ = require("underscore");

var connection;
var player = createAudioPlayer();
var resource;
var connectionstatus = 0;
var queue = [];
var titles = [];
var nowplaying = "";

const embedcolour = "#FFC0DD";

async function reddit(subreddit, nsfw, flairs) {
    var url = `https://www.reddit.com/r/${subreddit}/search.json?q=nsfw:${nsfw}&restrict_sr=true&limit=100`;

    if (flairs != null && flairs != undefined && flairs.length != 0) {
        flairs.forEach((flair) => {
            url += `&q=flair_name:"${flair}"`;
        });
    }

    const res = await fetch(encodeURI(url));
    if (res.ok) {
        const images = [];
        const data = await res.json();
        data.data.children.forEach((child) => {
            if (child.data.url.endsWith("jpg") || child.data.url.endsWith("jpeg") || child.data.url.endsWith("png") || child.data.url.endsWith("gif")) {
                if (nsfw == false && child.data.over_18 == false) {
                    images.push(child.data.url);
                } else if (nsfw == true && child.data.over_18 == true) {
                    images.push(child.data.url);
                }
            }
        });
        var image = _.sample(images);
        return image;
    } else {
        return null;
    }
}

module.exports = {
    connection,
    player,
    resource,
    connectionstatus,
    queue,
    titles,
    nowplaying,
    embedcolour,
    reddit: reddit
};