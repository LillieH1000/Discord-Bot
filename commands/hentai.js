const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');

async function images(category) {
    var res;
    if (category == 'anal') {
        res = await fetch('https://www.reddit.com/r/hentaianal.json?limit=100');
    } else if (category == 'bdsm') {
        res = await fetch('https://www.reddit.com/r/hentaibondage.json?limit=100');
    } else if (category == 'cum') {
        res = await fetch('https://www.reddit.com/r/cumhentai.json?limit=100');
    } else if (category == 'femboy') {
        res = await fetch('https://www.reddit.com/r/femboyhentai.json?limit=100');
    } else if (category == 'femboytwo') {
        res = await fetch('https://www.reddit.com/r/femboysandhentai.json?limit=100');
    } else if (category == 'femdom') {
        res = await fetch('https://www.reddit.com/r/hentaifemdom.json?limit=100');
    } else if (category == 'femdomtwo') {
        res = await fetch('https://www.reddit.com/r/femdomhentai.json?limit=100');
    } else if (category == 'genshin') {
        res = await fetch('https://www.reddit.com/r/genshinimpacthentai.json?limit=100');
    } else if (category == 'genshintwo') {
        res = await fetch('https://www.reddit.com/r/genshinimpactnsfw.json?limit=100');
    } else if (category == 'futanari') {
        res = await fetch('https://www.reddit.com/r/futanari.json?limit=100');
    } else if (category == 'masturbation') {
        res = await fetch('https://www.reddit.com/r/masturbationhentai.json?limit=100');
    } else if (category == 'tentacles') {
        res = await fetch('https://www.reddit.com/r/tentai.json?limit=100');
    } else if (category == 'trap') {
        res = await fetch('https://www.reddit.com/r/traphentai.json?limit=100');
    } else if (category == 'upskirt') {
        res = await fetch('https://www.reddit.com/r/upskirthentai.json?limit=100');
    } else if (category == 'yuri') {
        res = await fetch('https://www.reddit.com/r/yurihentai.json?limit=100');
    }
    if (res.ok) {
        const images = [];
        const data = await res.json();
        data.data.children.forEach((child) => {
            if (child.data.over_18 == true) {
                if (child.data.url.endsWith('jpg') || child.data.url.endsWith('jpeg') || child.data.url.endsWith('png') || child.data.url.endsWith('gif')) {
                    images.push(child.data.url);
                }
            }
        });
        return images;
    } else {
        return null;
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('Posts a random hentai picture, can only be used in nsfw channels')
        .setDMPermission(false)
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Choose which hentai picture type you want')
                .setRequired(true)
                .setAutocomplete(true)),
	async execute(interaction) {
        if (interaction.channel.nsfw) {
            await interaction.deferReply();
            const category = interaction.options.getString('category');
            if (category == "anal") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/anal');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Anal)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const imageslist = await images('anal');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Anal)')
                        .setDescription('[r/HentaiAnal](https://www.reddit.com/r/HentaiAnal/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "ass") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/ass');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Ass)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "bdsm") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/bdsm');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Bdsm)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const imageslist = await images('bdsm');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Bdsm)')
                        .setDescription('[r/Hentai Bondage](https://www.reddit.com/r/hentaibondage/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "blowjob") {
                var option = _.sample([1, 2, 3]);
                if (option == 1) {
                    const res = await fetch("https://hmtai.herokuapp.com/nsfw/blowjob");
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Blowjob)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const res = await fetch("https://api.waifu.pics/nsfw/blowjob");
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Blowjob)')
                            .setDescription('[Waifu.Pics](https://waifu.pics/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 3) {
                    const res = await fetch('http://api.nekos.fun:8080/api/blowjob');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Blowjob)')
                            .setDescription('[Nekos.Fun](https://nekos.fun/)')
                            .setImage(data.image)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.image)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
            }
            if (category == "boobjob") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/boobjob');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Boobjob)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "boobs") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/boobs');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Boobs)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "creampie") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/creampie');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Creampie)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "cum") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/cum');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Cum)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const imageslist = await images('cum');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Cum)')
                        .setDescription('[r/CumHentai](https://www.reddit.com/r/CumHentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "ero") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/ero');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Ero)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "femboy") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const imageslist = await images('femboy');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Femboy)')
                        .setDescription('[r/FemboyHentai](https://www.reddit.com/r/FemboyHentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
                if (option == 2) {
                    const imageslist = await images('femboytwo');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Femboy)')
                        .setDescription('[r/FemboysAndHentai](https://www.reddit.com/r/FemboysAndHentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "femdom") {
                var option = _.sample([1, 2, 3]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/femdom');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Femdom)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const imageslist = await images('femdom');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Femdom)')
                        .setDescription('[r/HentaiFemdom](https://www.reddit.com/r/hentaifemdom/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
                if (option == 3) {
                    const imageslist = await images('femdomtwo');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Femdom)')
                        .setDescription('[r/FemdomHentai](https://www.reddit.com/r/femdomhentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "footjob") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/footjob');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Footjob)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "futanari") {
                const imageslist = await images('futanari');
                var image = _.sample(imageslist);
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Futanari)')
                    .setDescription('[r/Futanari](https://www.reddit.com/r/futanari/)')
                    .setImage(image)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(image)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
            if (category == "gangbang") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/gangbang');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Gangbang)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "genshin") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const imageslist = await images('genshin');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Genshin)')
                        .setDescription('[r/GenshinImpactHentai](https://www.reddit.com/r/GenshinImpactHentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
                if (option == 2) {
                    const imageslist = await images('genshintwo');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Genshin)')
                        .setDescription('[r/GenshinImpactNSFW](https://www.reddit.com/r/GenshinImpactNSFW/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "glasses") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/glasses');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Glasses)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "handjob") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/handjob');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Handjob)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "masturbation") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/masturbation');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Masturbation)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const imageslist = await images('masturbation');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Masturbation)')
                        .setDescription('[r/MasturbationHentai](https://www.reddit.com/r/MasturbationHentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "neko") {
                var option = _.sample([1, 2, 3]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/nsfwNeko');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Neko)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const res = await fetch('https://api.waifu.pics/nsfw/neko');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Neko)')
                            .setDescription('[Waifu.Pics](https://waifu.pics/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 3) {
                    const res = await fetch('https://neko-love.xyz/api/v1/nekolewd');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Neko)')
                            .setDescription('[Neko-Love](https://neko-love.xyz/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
            }
            if (category == "orgy") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/orgy');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Orgy)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "pantsu") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/pantsu');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Pantsu)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "public") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/public');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Public)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "tentacles") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/tentacles');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Tentacles)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const imageslist = await images('tentacles');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Tentacles)')
                        .setDescription('[r/Tentai](https://www.reddit.com/r/Tentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "thighs") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/thighs');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Thighs)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "trap") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://api.waifu.pics/nsfw/trap');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Trap)')
                            .setDescription('[Waifu.Pics](https://waifu.pics/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const imageslist = await images('trap');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Trap)')
                        .setDescription('[r/Trap Hentai](https://www.reddit.com/r/traphentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "uniform") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/uniform');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Uniform)')
                        .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "upskirt") {
                const imageslist = await images('upskirt');
                var image = _.sample(imageslist);
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Upskirt)')
                    .setDescription('[r/UpskirtHentai](https://www.reddit.com/r/UpskirtHentai/)')
                    .setImage(image)
                    .setTimestamp()
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel('View Original Image')
                            .setStyle(ButtonStyle.Link)
                            .setURL(image)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
            if (category == "waifu") {
                const res = await fetch('https://api.waifu.pics/nsfw/waifu');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Waifu)')
                        .setDescription('[Waifu.Pics](https://waifu.pics/)')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "yuri") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/yuri');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Pics (Yuri)')
                            .setDescription('[Hmtai](https://hmtai.herokuapp.com/)')
                            .setImage(data.url)
                            .setTimestamp()
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setLabel('View Original Image')
                                    .setStyle(ButtonStyle.Link)
                                    .setURL(data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    }
                }
                if (option == 2) {
                    const imageslist = await images('yuri');
                    var image = _.sample(imageslist);
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Yuri)')
                        .setDescription('[r/YuriHentai](https://www.reddit.com/r/YuriHentai/)')
                        .setImage(image)
                        .setTimestamp()
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel('View Original Image')
                                .setStyle(ButtonStyle.Link)
                                .setURL(image)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
        } else {
            await interaction.deferReply({ ephemeral: true });
            const embed = new EmbedBuilder()
                .setColor('#FFC0DD')
                .setTitle('Notice')
                .setDescription('This command can only be ran in nsfw channels')
                .setTimestamp()
            await interaction.editReply({ embeds: [embed], ephemeral: true });
        }
	},
};