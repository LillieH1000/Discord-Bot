const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globals = require('../globals.js');

async function response(subreddit, url, category, interaction) {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json?limit=50`);
    if (res.ok) {
        var image;

        if (subreddit != null && url == null) {
            const images = [];
            const data = await res.json();
            data.data.children.forEach((child) => {
                if (child.data.over_18 == true) {
                    if (child.data.url.endsWith('jpg') || child.data.url.endsWith('jpeg') || child.data.url.endsWith('png') || child.data.url.endsWith('gif')) {
                        images.push(child.data.url);
                    }
                }
            });

            image = _.sample(images);
        } else if (subreddit == null && url != null) {
            image = url
        }

        const embed = new EmbedBuilder()
            .setColor(globals.embedcolour)
            .setTitle(`Hentai Pics (${category.charAt(0).toUpperCase() + category.slice(1)})`)
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
                    .setColor(globals.embedcolour)
                    .setTitle('Hentai Categories')
                    .setDescription(`A:\namber\nanal\nayaka\n
                    B:\nbdsm\nblowjob\nbyleth\n
                    C:\ncum\n
                    E:\nemilia\neula\n
                    F:\nfemboy\nfemdom\nfutanari\n
                    G:\nganyu\ngenshin\n
                    H:\nhutao\n
                    K:\nkeqing\n
                    L:\nlumine\n
                    M:\nmasturbation\n
                    N:\nneko\nnilou\n
                    O:\norgy\noverwatch\n
                    P:\npee\npegging\npublic\n
                    R:\nraiden\n
                    S:\nshenhe\n
                    T:\ntentacles\nthick\ntrap\n
                    U:\nundressing\nuniform\nupskirt\n
                    W:\nwaifu\n
                    Y:\nyaemiko\nyuri`)
                    .setTimestamp()
                await interaction.editReply({ embeds: [embed] });
            }
            if (category == "amber") {
                await response('amberhentai', null, category, interaction);
            }
            if (category == "anal") {
                await response('hentaianal', null, category, interaction);
            }
            if (category == "ayaka") {
                await response('ayakahentai', null, category, interaction);
            }
            if (category == "bdsm") {
                await response('hentaibondage', null, category, interaction);
            }
            if (category == "blowjob") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch("https://api.waifu.pics/nsfw/blowjob");
                    if (res.ok) {
                        const data = await res.json();
                        await response(null, data.url, category, interaction);
                    }
                }
                if (option == 2) {
                    const res = await fetch('http://api.nekos.fun:8080/api/blowjob');
                    if (res.ok) {
                        const data = await res.json();
                        await response(null, data.image, category, interaction);
                    }
                }
            }
            if (category == "byleth") {
                await response('byleth', null, category, interaction);
            }
            if (category == "cum") {
                await response('cumhentai', null, category, interaction);
            }
            if (category == "emilia") {
                await response('emiliahentai', null, category, interaction);
            }
            if (category == "eula") {
                await response('eulansfw', null, category, interaction);
            }
            if (category == "femboy") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    await response('femboyhentai', null, category, interaction);
                }
                if (option == 2) {
                    await response('femboysandhentai', null, category, interaction);
                }
            }
            if (category == "femdom") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    await response('hentaifemdom', null, category, interaction);
                }
                if (option == 2) {
                    await response('femdomhentai', null, category, interaction);
                }
            }
            if (category == "futanari") {
                await response('futanari', null, category, interaction);
            }
            if (category == "ganyu") {
                await response('ganyunsfw', null, category, interaction);
            }
            if (category == "genshin") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    await response('genshinimpacthentai', null, category, interaction);
                }
                if (option == 2) {
                    await response('genshinimpactnsfw', null, category, interaction);
                }
            }
            if (category == "hutao") {
                await response('hutaonsfw', null, category, interaction);
            }
            if (category == "keqing") {
                await response('keqing', null, category, interaction);
            }
            if (category == "lumine") {
                await response('luminensfw', null, category, interaction);
            }
            if (category == "masturbation") {
                await response('masturbationhentai', null, category, interaction);
            }
            if (category == "neko") {
                const res = await fetch('https://api.waifu.pics/nsfw/neko');
                if (res.ok) {
                    const data = await res.json();
                    await response(null, data.url, category, interaction);
                }
            }
            if (category == "nilou") {
                await response('nilou_hentai', null, category, interaction);
            }
            if (category == "overwatch") {
                await response('overwatch_porn', null, category, interaction);
            }
            if (category == "pee") {
                await response('pissinghentai', null, category, interaction);
            }
            if (category == "pegging") {
                await response('pegginghentai', null, category, interaction);
            }
            if (category == "public") {
                await response('publichentai', null, category, interaction);
            }
            if (category == "raiden") {
                await response('raidennsfw', null, category, interaction);
            }
            if (category == "shenhe") {
                await response('shenhensfw', null, category, interaction);
            }
            if (category == "tentacles") {
                await response('tentai', null, category, interaction);
            }
            if (category == "thick") {
                await response('thick_hentai', null, category, interaction);
            }
            if (category == "trap") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://api.waifu.pics/nsfw/trap');
                    if (res.ok) {
                        const data = await res.json();
                        await response(null, data.url, category, interaction);
                    }
                }
                if (option == 2) {
                    await response('traphentai', null, category, interaction);
                }
            }
            if (category == "undressing") {
                await response('undressinghentai', null, category, interaction);
            }
            if (category == "uniform") {
                await response('uniform_hentai', null, category, interaction);
            }
            if (category == "upskirt") {
                await response('upskirthentai', null, category, interaction);
            }
            if (category == "waifu") {
                const res = await fetch('https://api.waifu.pics/nsfw/waifu');
                if (res.ok) {
                    const data = await res.json();
                    await response(null, data.url, category, interaction);
                }
            }
            if (category == "yaemiko") {
                await response('yaemikonsfw', null, category, interaction);
            }
            if (category == "yuri") {
                await response('yuri', null, category, interaction);
            }
        } else {
            await interaction.deferReply({ ephemeral: true });
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setTitle('Notice')
                .setDescription('This command can only be ran in nsfw channels')
                .setTimestamp()
            await interaction.editReply({ embeds: [embed], ephemeral: true });
        }
	},
};