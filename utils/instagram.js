module.exports = async(client) => {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            for (const word of message.content.split(" ")) {
                if (word.match(/^http(?:s)?:\/\/(.*)instragram\.com\//) && !word.match(/^http(?:s)?:\/\/(.*)ddinstagram\.com\//)) {
                    message.suppressEmbeds(true)
                    message.reply({ content: message.content.replace(/instagram.com/gm, "ddinstagram.com"), allowedMentions: { repliedUser: false } });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};