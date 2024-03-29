import { Client } from "discord.js";

async function invoke(client: Client) {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;

        let messageContentNew = message.content.replace(/</gm, "").replace(/>/gm, "");

        let matched = false;
        for (const word of messageContentNew.split(" ")) {
            if (word.match(/^http(?:s)?:\/\/(.*)instagram\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)ddinstagram\.com\//)) {
                messageContentNew = messageContentNew.replace(/instagram.com/gm, "ddinstagram.com");
                matched = true;
            }

            if (word.match(/^http(?:s)?:\/\/(.*)reddit\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)rxddit\.com\//)) {
                messageContentNew = messageContentNew.replace(/reddit.com/gm, "rxddit.com");
                matched = true;
            }

            if (word.match(/^http(?:s)?:\/\/(.*)tiktok\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)vxtiktok\.com\//)) {
                messageContentNew = messageContentNew.replace(/tiktok.com/gm, "vxtiktok.com");
                matched = true;
            }

            if ((word.match(/^http(?:s)?:\/\/(.*)twitter\.com\//) || word.match(/^http(?:s)?:\/\/x\.com\//)) && !word.match(/^http(?:s)?:\/\/(.*)fxtwitter\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)vxtwitter\.com\//)) {
                messageContentNew = messageContentNew.replace(/twitter.com/gm, "fxtwitter.com").replace(/x.com/gm, "fxtwitter.com");
                matched = true;
            }
        }

        if (matched) {
            await message.suppressEmbeds(true);
            await message.reply({ content: messageContentNew, allowedMentions: { repliedUser: false } });
        }
    });
}

export { invoke };