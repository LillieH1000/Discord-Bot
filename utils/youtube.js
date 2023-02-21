const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var globalscolours = require('../globals/colours.js');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            for (const word of message.content.split(" ")) {
                const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
                if (word.match(rx)) {
                    const res1 = await fetch('https://returnyoutubedislikeapi.com/votes?videoId='.concat(word.match(rx)[1]));
                    const res2 = await fetch('https://api.song.link/v1-alpha.1/links?platform=youtube&type=song&id='.concat(word.match(rx)[1]));
                    if (res1.ok & res2.ok) {
                        const data1 = await res1.json();
                        const data2 = await res2.json();

                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
                            .setDescription('Views: ' + data1.viewCount.toLocaleString() + '\nLikes: ' + data1.likes.toLocaleString() + '\nDislikes: ' + data1.dislikes.toLocaleString())
                            .setTimestamp()

                        try {
                            const row = new ActionRowBuilder();

                            if (data2.linksByPlatform.appleMusic.url != null) {
                                row.addComponents(
                                    new ButtonBuilder()
                                        .setLabel('Apple Music')
                                        .setStyle(ButtonStyle.Link)
                                        .setURL(data2.linksByPlatform.appleMusic.url)
                                )
                            }
                            if (data2.linksByPlatform.deezer.url != null) {
                                row.addComponents(
                                    new ButtonBuilder()
                                        .setLabel('Deezer')
                                        .setStyle(ButtonStyle.Link)
                                        .setURL(data2.linksByPlatform.deezer.url)
                                )
                            }
                            if (data2.linksByPlatform.spotify.url != null) {
                                row.addComponents(
                                    new ButtonBuilder()
                                        .setLabel('Spotify')
                                        .setStyle(ButtonStyle.Link)
                                        .setURL(data2.linksByPlatform.spotify.url)
                                )
                            }
                            row.addComponents(
                                new ButtonBuilder()
                                    .setLabel('Other')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL('https://song.link/y/' + word.match(rx)[1])
                            );
                            await message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
                        } catch (error) {
                            await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};