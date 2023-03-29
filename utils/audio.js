const fs = require("node:fs");
const { createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
var globals = require("../globals.js");

module.exports = async() => {
    globals.player.on(AudioPlayerStatus.Idle, () => {
        try {
            if (fs.existsSync(globals.queue[0])) {
                fs.unlinkSync(globals.queue[0])
            }
            globals.queue.shift();
            globals.titles.shift();
            if (globals.queue === undefined || globals.queue.length == 0) {
                globals.connection.destroy();
                globals.queue = [];
                globals.titles = [];
                globals.nowplaying = "";
                globals.connectionstatus = 0;
            } else {
                globals.nowplaying = globals.titles[0];
                globals.resource = createAudioResource(globals.queue[0], {
                    inlineVolume: true
                });
                globals.resource.volume.setVolume(0.3);
                globals.player.play(globals.resource);
                globals.connection.subscribe(globals.player);
            }
        } catch (error) {
            console.error(error);
        }
    });

    globals.player.on("error", voiceerror => {
        console.error(voiceerror);
        try {
            globals.connection.destroy();
            for (const list of globals.queue) {
                if (fs.existsSync(list)) {
                    fs.unlinkSync(list)
                }
            }
            globals.queue = [];
            globals.titles = [];
            globals.nowplaying = "";
            globals.connectionstatus = 0;
        } catch (error) {
            console.error(error);
        }
    });
};