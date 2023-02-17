module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^http(?:s)?:\/\/(.*)twitter\.com\//;
                if (word.match(rx)) {
                    message.suppressEmbeds(true)
                    message.reply({ content: word.replace("twitter.com", "vxtwitter.com"), allowedMentions: { repliedUser: false } });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};