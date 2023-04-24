module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;
        if (!message.content) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const tx = /^http(?:s)?:\/\/(.*)twitter\.com\//;
                const fx = /^http(?:s)?:\/\/(.*)fxtwitter\.com\//;
                const vx = /^http(?:s)?:\/\/(.*)vxtwitter\.com\//;
                if (word.match(tx) && !word.match(fx) && !word.match(vx)) {
                    message.suppressEmbeds(true)
                    message.reply({ content: word.replace("twitter.com", "vxtwitter.com"), allowedMentions: { repliedUser: false } });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};