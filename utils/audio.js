const { createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
let globals = require("../globals.js");

module.exports = async() => {
    globals.player.on(AudioPlayerStatus.Idle, () => {
        try {
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
                fetch(globals.queue[0]).then((stream) => {
                    if (stream.ok) {
                        globals.resource = createAudioResource(stream.body, {
                            inlineVolume: true
                        });
                        globals.resource.volume.setVolume(0.3);
                        globals.player.play(globals.resource);
                        globals.connection.subscribe(globals.player);
                    }
                });
            }
        } catch (error) {
            console.error(error);
        }
    });

    globals.player.on("error", voiceerror => {
        console.error(voiceerror);
        try {
            globals.connection.destroy();
            globals.queue = [];
            globals.titles = [];
            globals.nowplaying = "";
            globals.connectionstatus = 0;
        } catch (error) {
            console.error(error);
        }
    });
};