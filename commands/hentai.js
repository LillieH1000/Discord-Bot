const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
var _ = require('underscore');
var globalsreddit = require('../globals/reddit.js');

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
                    .setColor('#FFC0DD')
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
                const image = await globalsreddit.nsfw('amberhentai');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Amber)')
                    .setDescription('[r/AmberHentai](https://www.reddit.com/r/AmberHentai/)')
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
                    const image = await globalsreddit.nsfw('hentaianal');
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
            if (category == "ayaka") {
                const image = await globalsreddit.nsfw('ayakahentai');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Ayaka)')
                    .setDescription('[r/AyakaHentai](https://www.reddit.com/r/AyakaHentai/)')
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
                    const image = await globalsreddit.nsfw('hentaibondage');
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
            if (category == "byleth") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const image = await globalsreddit.nsfw('byleth');
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Byleth)')
                        .setDescription('[r/Byleth](https://www.reddit.com/r/Byleth/)')
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
                    const image = await globalsreddit.nsfw('bylethr34');
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Byleth)')
                        .setDescription('[r/BylethR34](https://www.reddit.com/r/BylethR34/)')
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
                    const image = await globalsreddit.nsfw('cumhentai');
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
            if (category == "emilia") {
                const image = await globalsreddit.nsfw('emiliahentai');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Emilia)')
                    .setDescription('[r/EmiliaHentai](https://www.reddit.com/r/EmiliaHentai/)')
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
            if (category == "eula") {
                const image = await globalsreddit.nsfw('eulansfw');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Eula)')
                    .setDescription('[r/EulaNSFW](https://www.reddit.com/r/EulaNSFW/)')
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
            if (category == "femboy") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const image = await globalsreddit.nsfw('femboyhentai');
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
                    const image = await globalsreddit.nsfw('femboysandhentai');
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
                    const image = await globalsreddit.nsfw('hentaifemdom');
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
                    const image = await globalsreddit.nsfw('femdomhentai');
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
                const image = await globalsreddit.nsfw('futanari');
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
            if (category == "ganyu") {
                const image = await globalsreddit.nsfw('ganyunsfw');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Ganyu)')
                    .setDescription('[r/GanyuNSFW](https://www.reddit.com/r/GanyuNSFW/)')
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
            if (category == "genshin") {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const image = await globalsreddit.nsfw('genshinimpacthentai');
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
                    const image = await globalsreddit.nsfw('genshinimpactnsfw');
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
            if (category == "hutao") {
                const image = await globalsreddit.nsfw('hutaonsfw');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Hu Tao)')
                    .setDescription('[r/HuTaoNSFW](https://www.reddit.com/r/HuTaoNSFW/)')
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
            if (category == "keqing") {
                const image = await globalsreddit.nsfw('keqingnsfw');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Keqing)')
                    .setDescription('[r/KeqingNSFW](https://www.reddit.com/r/KeqingNSFW/)')
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
            if (category == "lumine") {
                const image = await globalsreddit.nsfw('luminensfw');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Lumine)')
                    .setDescription('[r/LumineNSFW](https://www.reddit.com/r/LumineNSFW/)')
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
                    const image = await globalsreddit.nsfw('masturbationhentai');
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
            if (category == "overwatch") {
                const image = await globalsreddit.nsfw('overwatch_porn');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Overwatch)')
                    .setDescription('[r/Overwatch_Porn](https://www.reddit.com/r/Overwatch_Porn/)')
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
            if (category == "pee") {
                const image = await globalsreddit.nsfw('pissinghentai');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Pee)')
                    .setDescription('[r/Pissing Hentai](https://www.reddit.com/r/pissinghentai/)')
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
            if (category == "pegging") {
                const image = await globalsreddit.nsfw('pegginghentai');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Pegging)')
                    .setDescription('[r/pegginghentai](https://www.reddit.com/r/pegginghentai/)')
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
            if (category == "public") {
                var option = _.sample([1, 2]);
                if (option == 1) {
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
                if (option == 2) {
                    const image = await globalsreddit.nsfw('publichentai');
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Public)')
                        .setDescription('[r/PublicHentai](https://www.reddit.com/r/PublicHentai/)')
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
            if (category == "rem") {
                const image = await globalsreddit.nsfw('remhentai');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Rem)')
                    .setDescription('[r/RemHentai](https://www.reddit.com/r/RemHentai/)')
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
                    const image = await globalsreddit.nsfw('tentai');
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
            if (category == "thick") {
                const image = await globalsreddit.nsfw('thick_hentai');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Thick)')
                    .setDescription('[r/thick_hentai](https://www.reddit.com/r/thick_hentai/)')
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
                    const image = await globalsreddit.nsfw('traphentai');
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
            if (category == "undressing") {
                const image = await globalsreddit.nsfw('undressinghentai');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Undressing)')
                    .setDescription('[r/UndressingHentai](https://www.reddit.com/r/UndressingHentai/)')
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
            if (category == "uniform") {
                var option = _.sample([1, 2]);
                if (option == 1) {
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
                if (option == 2) {
                    const image = await globalsreddit.nsfw('uniform_hentai');
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Uniform)')
                        .setDescription('[r/Uniform_Hentai](https://www.reddit.com/r/Uniform_Hentai/)')
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
            if (category == "upskirt") {
                const image = await globalsreddit.nsfw('upskirthentai');
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
            if (category == "yaemiko") {
                const image = await globalsreddit.nsfw('yaemikonsfw');
                const embed = new EmbedBuilder()
                    .setColor('#FFC0DD')
                    .setTitle('Hentai Pics (Yae Miko)')
                    .setDescription('[r/YaeMikoNSFW](https://www.reddit.com/r/YaeMikoNSFW/)')
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
            if (category == "yuri") {
                var option = _.sample([1, 2, 3]);
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
                    const image = await globalsreddit.nsfw('yuri');
                    const embed = new EmbedBuilder()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics (Yuri)')
                        .setDescription('[r/yuri](https://www.reddit.com/r/yuri/)')
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
                    const image = await globalsreddit.nsfw('yurihentai');
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