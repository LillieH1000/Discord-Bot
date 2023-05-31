let globals = require('../globals.js');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            for (const word of message.content.split(' ')) {
                const amrx = /^http(?:s)?:\/\/(.*)audiomack\.com\//;
                const sprx = /^http(?:s)?:\/\/(.*)spotify\.com\//;
                if (word.match(amrx) || word.match(sprx)) {
                    const components = await globals.music(word, null);
                    
                    if (components != null && components != undefined && components.length != 0) {
                        await message.reply({ components: components, allowedMentions: { repliedUser: false } });
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};