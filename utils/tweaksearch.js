const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = async(client) => {
    client.on('messageCreate', async message => {
        if (message.author.bot) return;
    
        try {
            if (message.content.startsWith("[[") & message.content.endsWith("]]")) {
                const res = await fetch('https://api.canister.me/v1/community/packages/search?query='.concat(message.content.replace('[[', '').replace(']]', ''), '&limit=1&responseFields=name,description,author,price,packageIcon,depiction,repository.name,repository.uri,latestVersion,identifier'));
                if (res.ok) {
                    const data = await res.json();
                    const author = data.data[0].author.replace(/<.*>/, '');
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .addFields(
                            { name: data.data[0].name, value: data.data[0].description, inline: false },
                            { name: 'Author:', value: author, inline: true },
                            { name: 'Version:', value: data.data[0].latestVersion, inline: true },
                            { name: 'Price:', value: data.data[0].price, inline: true },
                            { name: 'Repository:', value: '[' + data.data[0].repository.name + '](' + data.data[0].repository.uri + ')', inline: true },
                            { name: 'Bundle ID:', value: data.data[0].identifier, inline: true },
                        )
                        .setTimestamp()
                    if (data.data[0].packageIcon !== undefined) {
                        embed.setThumbnail(data.data[0].packageIcon);
                    }
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('Add Repo To Package Manager')
                                .setStyle(ButtonStyle.Link)
                                .setURL('https://repos.slim.rocks/repo/?repoUrl=' + data.data[0].repository.uri)
                        );
                    await message.delete();
                    await message.channel.send({ embeds: [embed], components: [row] });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
};