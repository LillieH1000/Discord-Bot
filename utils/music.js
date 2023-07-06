let shellescape = require('shell-escape');
let globals = require('../globals.js');
const exec = require("child_process").exec;

function os_func() {
    this.execCommand = function(cmd, callback) {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                return;
            }
            callback(stdout);
        });
    }
}

let os = new os_func();

module.exports = async(client) => {
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
                    word.match(/^http(?:s)?:\/\/(.*)spotify\.com\//) ||
                    word.match(/^http(?:s)?:\/\/(.*)tidal\.com\//)
                ) {
                    const components = await globals.music(null, null, word);
                    
                    if (components != null && components != undefined && components.length != 0) {
                        await message.reply({ components: components, allowedMentions: { repliedUser: false } });
                    }
                } else if (word.match(/^http(?:s)?:\/\/(.*)soundcloud\.com|snd\.sc\/$/)) {
                    os.execCommand(shellescape(["yt-dlp", "-J", "--no-playlist", word]), function(value) {
                        const output = JSON.parse(value);

                        globals.music("soundcloud", output.id, null).then((components) => {
                            if (components != null && components != undefined && components.length != 0) {
                                message.reply({ components: components, allowedMentions: { repliedUser: false } });
                            }
                        });
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};