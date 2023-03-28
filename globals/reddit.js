var _ = require('underscore');

async function sfw(subreddit) {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=50`);
    if (res.ok) {
        const images = [];
        const data = await res.json();
        data.data.children.forEach((child) => {
            if (child.data.over_18 == false) {
                if (child.data.url.endsWith('jpg') || child.data.url.endsWith('jpeg') || child.data.url.endsWith('png') || child.data.url.endsWith('gif')) {
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

async function nsfw(subreddit) {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=50`);
    if (res.ok) {
        const images = [];
        const data = await res.json();
        data.data.children.forEach((child) => {
            if (child.data.over_18 == true) {
                if (child.data.url.endsWith('jpg') || child.data.url.endsWith('jpeg') || child.data.url.endsWith('png') || child.data.url.endsWith('gif')) {
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
    sfw: sfw,
    nsfw: nsfw
};