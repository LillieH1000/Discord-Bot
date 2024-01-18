import globals from "../globals.js";

async function invoke(client) {
    client.on('messageCreate', async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            for (const word of message.content.split(' ')) {
                if (
                    word.match(/^http(?:s)?:\/\/(.*)apple\.com\//) ||
                    word.match(/^http(?:s)?:\/\/(.*)audiomack\.com\//) ||
                    word.match(/^http(?:s)?:\/\/(.*)deezer\.com\//) ||
                    word.match(/^http(?:s)?:\/\/(.*)napster\.com\//) ||
                    word.match(/^http(?:s)?:\/\/(.*)pandora\.com\//) ||
                    word.match(/^http(?:s)?:\/\/(.*)soundcloud\.com|snd\.sc\/$/) ||
                    word.match(/^http(?:s)?:\/\/(.*)spotify\.com\//) ||
                    word.match(/^http(?:s)?:\/\/(.*)tidal\.com\//)
                ) {
                    const components = await globals.music(null, word);
                    
                    if (components != null && components != undefined && components.length != 0) {
                        await message.reply({ components: components, allowedMentions: { repliedUser: false } });
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };