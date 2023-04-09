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
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=100`);
    if (res.ok) {
        const images = [];
        const data = await res.json();
        data.data.children.forEach((child) => {
            if (child.data.url.endsWith("jpg") || child.data.url.endsWith("jpeg") || child.data.url.endsWith("png") || child.data.url.endsWith("gif")) {
                if (nsfw == false && child.data.over_18 == false) {
                    if (flairs != null && flairs != undefined && flairs.length != 0) {
                        flairs.forEach(function(value){
                            const flair = child.data.link_flair_text;
                            if (flair != undefined && flair != null) {
                                if (value == flair.toLowerCase()) {
                                    images.push(child.data.url);
                                }
                            }
                        });
                    } else {
                        images.push(child.data.url);
                    }
                } else if (nsfw == true && child.data.over_18 == true) {
                    if (flairs != null && flairs != undefined && flairs.length != 0) {
                        flairs.forEach(function(value){
                            const flair = child.data.link_flair_text;
                            if (flair != undefined && flair != null) {
                                if (value == flair.toLowerCase()) {
                                    images.push(child.data.url);
                                }
                            }
                        });
                    } else {
                        images.push(child.data.url);
                    }
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