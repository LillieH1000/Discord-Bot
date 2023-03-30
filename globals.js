const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
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

async function reddit(subreddit, nsfw) {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=50`);
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

async function response(info) {
    const embed = new EmbedBuilder()
        .setColor(embedcolour)
        .setTimestamp();
    const row = new ActionRowBuilder();

    if (info.type == "text") {
        embed.setTitle(info.title);
        embed.setDescription(info.description);
    }
    if (info.type == "image") {
        embed.setTitle(info.title);
        embed.setImage(info.url);
        row.addComponents(
            new ButtonBuilder()
                .setLabel("View Original Image")
                .setStyle(ButtonStyle.Link)
                .setURL(info.url)
        );
    }

    if (row.components != null && row.components != undefined && row.components.length != 0) {
        await info.interaction.editReply({ embeds: [embed], components: [row], ephemeral: info.ephemeral });
    } else {
        await info.interaction.editReply({ embeds: [embed], ephemeral: info.ephemeral });
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
    reddit: reddit,
    response: response
};