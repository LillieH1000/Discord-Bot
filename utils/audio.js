const { createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
var globalsaudio = require('../globals/audio.js');

module.exports = async() => {
    globalsaudio.player.on(AudioPlayerStatus.Idle, () => {
        try {
            if (globalsaudio.queue === undefined || globalsaudio.queue.length == 0) {
                globalsaudio.connection.destroy();
                globalsaudio.queue = [];
                globalsaudio.titles = [];
                globalsaudio.nowplaying = '';
                globalsaudio.connectionstatus = 0;
            } else {
                globalsaudio.nowplaying = globalsaudio.titles[0];
                globalsaudio.resource = createAudioResource(globalsaudio.queue[0], {
                    inlineVolume: true
                });
                globalsaudio.resource.volume.setVolume(0.3);
                globalsaudio.player.play(globalsaudio.resource);
                globalsaudio.connection.subscribe(globalsaudio.player);
                globalsaudio.queue.shift();
                globalsaudio.titles.shift();
            }
        } catch (error) {
            console.error(error);
        }
    });

    globalsaudio.player.on('error', voiceerror => {
        console.error(voiceerror);
        try {
            globalsaudio.connection.destroy();
            globalsaudio.queue = [];
            globalsaudio.titles = [];
            globalsaudio.nowplaying = '';
            globalsaudio.connectionstatus = 0;
        } catch (error) {
            console.error(error);
        }
    });
};