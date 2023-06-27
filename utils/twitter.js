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
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const tx = /^http(?:s)?:\/\/(.*)twitter\.com\//;
                const fx = /^http(?:s)?:\/\/(.*)fxtwitter\.com\//;
                const vx = /^http(?:s)?:\/\/(.*)vxtwitter\.com\//;
                if (word.match(tx) && !word.match(fx) && !word.match(vx)) {
                    const command = `yt-dlp -J --no-playlist ${word}`;
                    os.execCommand(command, function(value) {
                        JSON.parse(value);
                        message.suppressEmbeds(true)
                        message.reply({ content: message.content.replace(/twitter.com/gm, "vxtwitter.com"), allowedMentions: { repliedUser: false } });
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};