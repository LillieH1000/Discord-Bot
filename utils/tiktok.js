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
                const tx = /^http(?:s)?:\/\/(.*)tiktok\.com\//;
                const vx = /^http(?:s)?:\/\/(.*)vxtiktok\.com\//;
                if (word.match(tx) && !word.match(vx)) {
                    const command = `yt-dlp -J --no-playlist ${word}`;
                    os.execCommand(command, function(value) {
                        JSON.parse(value);
                        message.suppressEmbeds(true)
                        message.reply({ content: message.content.replace(/tiktok.com/gm, "vxtiktok.com"), allowedMentions: { repliedUser: false } });
                    });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};