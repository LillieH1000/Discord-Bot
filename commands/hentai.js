const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globalscolours = require('../globals/colours.js');

async function reddit(subreddit, category, interaction) {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=50`);
    if (res.ok) {
        const infoarray = [];
        const data = await res.json();
        data.data.children.forEach((child) => {
            if (child.data.over_18 == true) {
                if (child.data.url.endsWith('jpg') || child.data.url.endsWith('jpeg') || child.data.url.endsWith('png') || child.data.url.endsWith('gif')) {
                    const json = new Object()
                    json.subreddit = child.data.subreddit
                    json.permalink = child.data.permalink
                    json.url = child.data.url
                    infoarray.push(json);
                }
            }
        });

        var info = _.sample(infoarray);

        const embed = new EmbedBuilder()
            .setColor(globalscolours.embed)
            .setTitle(`Hentai Pics (${category.charAt(0).toUpperCase() + category.slice(1)})`)
            .setDescription(`[r/${info.subreddit}](https://www.reddit.com/r/${info.subreddit}/)`)
            .setImage(info.url)
            .setTimestamp()
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('View Original Image')
                    .setStyle(ButtonStyle.Link)
                    .setURL(info.url)
            )
            .addComponents(
                new ButtonBuilder()
                    .setLabel('View Reddit Post')
                    .setStyle(ButtonStyle.Link)
                    .setURL(`https://www.reddit.com${info.permalink}`)
            );
        await interaction.editReply({ embeds: [embed], components: [row] });
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
                .setAutocomplete(true)),
	async execute(interaction) {
        if (interaction.channel.nsfw) {
            await interaction.deferReply();
            const category = interaction.options.getString('category');
            if (!category) {
                const embed = new EmbedBuilder()
                    .setColor(globalscolours.embed)
                    .setTitle('Hentai Categories')
                    .setDescription(`A:\namber\nanal\nass\nayaka\n
                    B:\nbdsm\nblowjob\nboobjob\nboobs\nbyleth\n
                    C:\ncreampie\ncum\n
                    E:\nemilia\nero\neula\n
                    F:\nfemboy\nfemdom\nfootjob\nfutanari\n
                    G:\ngangbang\nganyu\ngenshin\nglasses\n
                    H:\nhandjob\nhutao\n
                    K:\nkeqing\n
                    L:\nlumine\n
                    M:\nmasturbation\n
                    N:\nneko\n
                    O:\norgy\noverwatch\n
                    P:\npantsu\npee\npegging\npublic\n
                    R:\nrem\n
                    T:\ntentacles\nthick\nthighs\ntrap\n
                    U:\nundressing\nuniform\nupskirt\n
                    W:\nwaifu\n
                    Y:\nyaemiko\nyuri`)
                    .setTimestamp()
                await interaction.editReply({ embeds: [embed] });
            }
            if (category == "amber") {
                await reddit('amberhentai', category, interaction);
            }
            if (category == "anal") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/anal');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                    await reddit('hentaianal', category, interaction);
                }
            }
            if (category == "ass") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/ass');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
            if (category == "ayaka") {
                await reddit('ayakahentai', category, interaction);
            }
            if (category == "bdsm") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/bdsm');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                    await reddit('hentaibondage', category, interaction);
                }
            }
            if (category == "blowjob") {
                var option = _.sample([1, 2, 3]);
                if (option == 1) {
                    const res = await fetch("https://hmtai.herokuapp.com/nsfw/blowjob");
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                            .setColor(globalscolours.embed)
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
                            .setColor(globalscolours.embed)
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
                        .setColor(globalscolours.embed)
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
                        .setColor(globalscolours.embed)
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
            if (category == "byleth") {
                await reddit('byleth', category, interaction);
            }
            if (category == "creampie") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/creampie');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
                            .setColor(globalscolours.embed)
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
                    await reddit('cumhentai', category, interaction);
                }
            }
            if (category == "emilia") {
                await reddit('emiliahentai', category, interaction);
            }
            if (category == "ero") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/ero');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
            if (category == "eula") {
                await reddit('eulansfw', category, interaction);
            }
            if (category == "femboy") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    await reddit('femboyhentai', category, interaction);
                }
                if (option == 2) {
                    await reddit('femboysandhentai', category, interaction);
                }
            }
            if (category == "femdom") {
                var option = _.sample([1, 2, 3]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/femdom');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                    await reddit('hentaifemdom', category, interaction);
                }
                if (option == 3) {
                    await reddit('femdomhentai', category, interaction);
                }
            }
            if (category == "footjob") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/footjob');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
                await reddit('futanari', category, interaction);
            }
            if (category == "gangbang") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/gangbang');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
            if (category == "ganyu") {
                await reddit('ganyunsfw', category, interaction);
            }
            if (category == "genshin") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    await reddit('genshinimpacthentai', category, interaction);
                }
                if (option == 2) {
                    await reddit('genshinimpactnsfw', category, interaction);
                }
            }
            if (category == "glasses") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/glasses');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
                        .setColor(globalscolours.embed)
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
            if (category == "hutao") {
                await reddit('hutaonsfw', category, interaction);
            }
            if (category == "keqing") {
                await reddit('keqing', category, interaction);
            }
            if (category == "lumine") {
                await reddit('luminensfw', category, interaction);
            }
            if (category == "masturbation") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/masturbation');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                    await reddit('masturbationhentai', category, interaction);
                }
            }
            if (category == "neko") {
                var option = _.sample([1, 2, 3]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/nsfwNeko');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                            .setColor(globalscolours.embed)
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
                            .setColor(globalscolours.embed)
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
                        .setColor(globalscolours.embed)
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
            if (category == "overwatch") {
                await reddit('overwatch_porn', category, interaction);
            }
            if (category == "pantsu") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/pantsu');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
            if (category == "pee") {
                await reddit('pissinghentai', category, interaction);
            }
            if (category == "pegging") {
                await reddit('pegginghentai', category, interaction);
            }
            if (category == "public") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/public');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                if (option == 2) {
                    await reddit('publichentai', category, interaction);
                }
            }
            if (category == "rem") {
                await reddit('remhentai', category, interaction);
            }
            if (category == "tentacles") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/tentacles');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                    await reddit('tentai', category, interaction);
                }
            }
            if (category == "thick") {
                await reddit('thick_hentai', category, interaction);
            }
            if (category == "thighs") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/thighs');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
                            .setColor(globalscolours.embed)
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
                    await reddit('traphentai', category, interaction);
                }
            }
            if (category == "undressing") {
                await reddit('undressinghentai', category, interaction);
            }
            if (category == "uniform") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/uniform');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                if (option == 2) {
                    await reddit('uniform_hentai', category, interaction);
                }
            }
            if (category == "upskirt") {
                await reddit('upskirthentai', category, interaction);
            }
            if (category == "waifu") {
                const res = await fetch('https://api.waifu.pics/nsfw/waifu');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new EmbedBuilder()
                        .setColor(globalscolours.embed)
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
            if (category == "yaemiko") {
                await reddit('yaemikonsfw', category, interaction);
            }
            if (category == "yuri") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://hmtai.herokuapp.com/nsfw/yuri');
                    if (res.ok) {
                        const data = await res.json();
                        const embed = new EmbedBuilder()
                            .setColor(globalscolours.embed)
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
                    await reddit('yuri', category, interaction);
                }
            }
        } else {
            await interaction.deferReply({ ephemeral: true });
            const embed = new EmbedBuilder()
                .setColor(globalscolours.embed)
                .setTitle('Notice')
                .setDescription('This command can only be ran in nsfw channels')
                .setTimestamp()
            await interaction.editReply({ embeds: [embed], ephemeral: true });
        }
	},
};