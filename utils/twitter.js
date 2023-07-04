module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            for (const word of message.content.split(" ")) {
                if (word.match(/^http(?:s)?:\/\/(.*)twitter\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)fxtwitter\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)vxtwitter\.com\//)) {
                    message.suppressEmbeds(true)
                    message.reply({ content: message.content.replace(/twitter.com/gm, "vxtwitter.com"), allowedMentions: { repliedUser: false } });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};