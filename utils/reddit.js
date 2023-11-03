module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            for (const word of message.content.split(" ")) {
                if (word.match(/^http(?:s)?:\/\/(.*)reddit\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)rxddit\.com\//)) {
                    message.suppressEmbeds(true)
                    message.reply({ content: message.content.replace(/reddit.com/gm, "rxddit.com"), allowedMentions: { repliedUser: false } });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};