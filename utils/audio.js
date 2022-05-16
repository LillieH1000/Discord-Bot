const { createAudioResource, StreamType, AudioPlayerStatus } = require('@discordjs/voice');
var globalsaudio = require('../globals/audio.js');

module.exports = async() => {
    globalsaudio.player.on(AudioPlayerStatus.Idle, () => {
        try {
            if (globalsaudio.queue === undefined || globalsaudio.queue.length == 0) {
                globalsaudio.connection.destroy();
                globalsaudio.queue = [];
                globalsaudio.titles = [];
                globalsaudio.connectionstatus = 0;
            } else {
                globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                    inputType: StreamType.Opus,
                    inlineVolume: true
                });
                globalsaudio.resource.volume.setVolume(0.3);
                globalsaudio.player.play(globalsaudio.resource);
                globalsaudio.connection.subscribe(globalsaudio.player);
                globalsaudio.queue.shift();
                globalsaudio.titles.shift();
            }
        }
        catch (error) {
            console.error(error);
        }
    });

    globalsaudio.player.on('error', error => {
        console.error(error);
        try {
            globalsaudio.connection.destroy();
            globalsaudio.queue = [];
            globalsaudio.titles = [];
            globalsaudio.connectionstatus = 0;
        }
        catch (error) {
            console.error(error);
        }
    });
};