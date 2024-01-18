async function invoke(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;

        let messageContentNew = message.content;
    
        try {
            for (const word of message.content.split(" ")) {
                if (word.match(/^http(?:s)?:\/\/(.*)instagram\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)ddinstagram\.com\//)) {
                    messageContentNew = messageContentNew.replace(/instagram.com/gm, "ddinstagram.com");
                }

                if (word.match(/^http(?:s)?:\/\/(.*)reddit\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)rxddit\.com\//)) {
                    messageContentNew = messageContentNew.replace(/reddit.com/gm, "rxddit.com");
                }

                if (word.match(/^http(?:s)?:\/\/(.*)tiktok\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)vxtiktok\.com\//)) {
                    messageContentNew = messageContentNew.replace(/tiktok.com/gm, "vxtiktok.com");
                }

                if ((word.match(/^http(?:s)?:\/\/(.*)twitter\.com\//) || word.match(/^http(?:s)?:\/\/x\.com\//)) && !word.match(/^http(?:s)?:\/\/(.*)fxtwitter\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)vxtwitter\.com\//)) {
                    messageContentNew = messageContentNew.replace(/twitter.com/gm, "vxtwitter.com").replace(/x.com/gm, "vxtwitter.com");
                }
            }

            if (message.content != messageContentNew) {
                message.suppressEmbeds(true);
                message.reply({ content: messageContentNew, allowedMentions: { repliedUser: false } });
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };