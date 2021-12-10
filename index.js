const { Client, Intents, MessageEmbed } = require('discord.js');
const { AudioPlayerStatus, joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice');
const { token } = require('./config.json');
const fetch = require('node-fetch');
const exec = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(`Selene Be Adorable`, { type: 'WATCHING' });
});

var player;
var connection;
var resource;

let songsarray = [];

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.content.toLowerCase() == "hello") {
        message.reply("Hiiiiiiii");
    }
    if (message.content.toLowerCase() == "hi") {
        message.reply("Hiiiiiiii");
    }
});

client.on('messageDelete', message => {
    if (message.author.bot) return;
    const logchannel = client.channels.cache.find(channel => channel.name === 'message-logs');
    const logembed = new MessageEmbed()
	.setColor('#FFC0DD')
	.setTitle('Message Deleted')
	.addFields(
		{ name: 'User Name: ', value: message.author.username },
		{ name: 'User Id: ', value: message.author.id },
		{ name: 'Message: ', value: message.content },
	)
	.setTimestamp()
    logchannel.send({ embeds: [logembed] });
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.author.bot) return;
    if (newMessage.author.bot) return;
    if (!oldMessage.author) return;
    const logchannel = client.channels.cache.find(channel => channel.name === 'message-logs');
    const logembed = new MessageEmbed()
	.setColor('#FFC0DD')
	.setTitle('Message Edited')
	.addFields(
		{ name: 'User Name: ', value: newMessage.author.username },
		{ name: 'User Id: ', value: newMessage.author.id },
		{ name: 'Original: ', value: oldMessage.content },
		{ name: 'Edited: ', value: newMessage.content },
	)
	.setTimestamp()
    logchannel.send({ embeds: [logembed] });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'play') {
        await interaction.deferReply();
        const test1 = interaction.member.voice.channel.id;
        const test2 = interaction.member.voice.channel.guild.id;
        const test3 = interaction.member.voice.channel.guild.voiceAdapterCreator;
        connect(test1, test2, test3);
        if (interaction.options.getSubcommand() === 'youtube') {
            const name = interaction.options.getString('name');
            const url = interaction.options.getString('url');
            if (name == null && url == null) {
                interaction.editReply(`Please provide the name or url option`);
            }
            if (name == null) {
                const result = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/.test(url);
                console.log(result);
                if (result == true) {
                    const videotitle = exec(`yt-dlp -j --no-playlist ${url} | jq ".title"`).slice(1,-2);
                    const videofilename = exec(`yt-dlp -j --no-playlist ${url} | jq ".filename"`).slice(1,-2);
                    interaction.editReply(`Queued: ${videotitle.toString()}`);
                    exec(`yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist --output "/root/discordbot/downloads/%(title)s [%(id)s].%(ext)s" ${url}`);
                    const title = path.parse(videofilename.toString());
                    const name = path.join(title.name);
                    const video = name.toString() + ".mp3";
                    console.log(video.toString());
                    songsarray.push(`downloads/${video}`);
                    if (songsarray.length == 1) {
                        play();
                    }
                } else {
                    interaction.editReply(`Not a youtube url`);
                }
            }
            if (url == null) {
                const videotitle = exec(`yt-dlp -j --no-playlist "ytsearch:${name}" | jq ".title"`).slice(1,-2);
                const videofilename = exec(`yt-dlp -j --no-playlist "ytsearch:${name}" | jq ".filename"`).slice(1,-2);
                interaction.editReply(`Queued: ${videotitle.toString()}`);
                exec(`yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist --output "/root/discordbot/downloads/%(title)s [%(id)s].%(ext)s" "ytsearch:${name}"`);
                const title = path.parse(videofilename.toString());
                const name = path.join(title.name);
                const video = name.toString() + ".mp3";
                console.log(video.toString());
                songsarray.push(`downloads/${video}`);
                if (songsarray.length == 1) {
                    play();
                }
            }
        }
        if (interaction.options.getSubcommand() === 'soundcloud') {
            const name = interaction.options.getString('name');
            const url = interaction.options.getString('url');
            if (name == null && url == null) {
                interaction.editReply(`Please provide the name or url option`);
            }
            if (name == null) {
                const result = /^https?:\/\/(soundcloud\.com|snd\.sc)\/(.*)$/.test(url);
                console.log(result);
                if (result == true) {
                    const videotitle = exec(`yt-dlp -j --no-playlist ${url} | jq ".title"`).slice(1,-2);
                    interaction.editReply(`Queued: ${videotitle.toString()}`);
                    exec(`yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist --output "/root/discordbot/downloads/%(title)s.%(ext)s" ${url}`);
                    songsarray.push(`downloads/${videotitle}.mp3`);
                    if (songsarray.length == 1) {
                        play();
                    }
                } else {
                    interaction.editReply(`Not a soundcloud url`);
                }
            }
            if (url == null) {
                const videotitle = exec(`yt-dlp -j --no-playlist "scsearch:${name}" | jq ".title"`).slice(1,-2);
                interaction.editReply(`Queued: ${videotitle.toString()}`);
                exec(`yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist --output "/root/discordbot/downloads/%(title)s.%(ext)s" "scsearch:${name}"`);
                songsarray.push(`downloads/${videotitle}.mp3`);
                if (songsarray.length == 1) {
                    play();
                }
            }
        }
        if (interaction.options.getSubcommand() === 'bandcamp') {
            const url = interaction.options.getString('url');
            const videotitle = exec(`yt-dlp -j --no-playlist ${url} | jq ".title"`).slice(1,-2);
            interaction.editReply(`Queued: ${videotitle.toString()}`);
            exec(`yt-dlp -f bestaudio --extract-audio --audio-format mp3 --audio-quality 0 --no-playlist --output "/root/discordbot/downloads/%(title)s.%(ext)s" ${url}`);
            songsarray.push(`downloads/${videotitle}.mp3`);
            if (songsarray.length == 1) {
                play();
            }
        }
    }
    if (commandName === 'pause') {
        await interaction.deferReply();
        pause();
        await interaction.editReply("Song paused");
    }
    if (commandName === 'unpause') {
        await interaction.deferReply();
        unpause();
        await interaction.editReply("Song unpaused");
    }
    if (commandName === 'stop') {
        await interaction.deferReply();
        stop();
        await interaction.editReply("Song stopped");
    }
    if (commandName === 'volume') {
        await interaction.deferReply();
        const volume = interaction.options.getString('volume_int');
        resource.volume.setVolume(volume);
        await interaction.editReply(`Changed the volume to ${volume}`);
    }
    if (commandName === 'cat') {
        await interaction.deferReply();
        const res = await fetch("http://aws.random.cat/meow");
        const data = await res.json();
        await interaction.editReply(data.file);
    }
    if (commandName === 'dog') {
        await interaction.deferReply();
        const res = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await res.json();
        await interaction.editReply(data.message);
    }
    if (commandName === 'ytdislikes') {
        await interaction.deferReply();
        const videoid = interaction.options.getString('videoid');
        const res = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoid}`);
        const data = await res.json();
        if(data.hasOwnProperty('dislikes')){
            await interaction.editReply(`Dislikes Count: ${data.dislikes.toString()}`);
        } else {
            await interaction.editReply("Failed");
        }
    }
});

function connect(test1, test2, test3) {
    connection = joinVoiceChannel({
        channelId: test1,
        guildId: test2,
        adapterCreator: test3,
    })
}

function play() {
    resource = createAudioResource(songsarray[0].toString(), { inlineVolume: true });
    resource.volume.setVolume(0.3);
    player = createAudioPlayer();
    connection.subscribe(player);
    player.play(resource);
    player.on(AudioPlayerStatus.Playing, () => {
        console.log('The audio player has started');
    });
    player.on(AudioPlayerStatus.Idle, () => {
        songsarray.shift();
        if (songsarray.length != 0) {
            play();
        }
    });
}

function pause() {
    player.pause();
}

function unpause() {
    player.unpause();
}

function stop() {
    player.stop();
    connection.destroy();
    songsarray.length = 0;
}

client.login(token);