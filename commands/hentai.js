const { SlashCommandBuilder } = require('discord.js');
var _ = require('underscore');
var globals = require('../globals.js');

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
            var object = new Object()
            var url = new String()
            if (!category) {
                object.interaction = interaction
                object.ephemeral = false
                object.type = 'text'
                object.title = 'Hentai Categories'
                object.description = `A:\namber\nanal\nayaka\n
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
                Y:\nyaemiko\nyuri`
                await globals.response(object);
                return;
            }
            if (category == 'amber') {
                url = await globals.reddit('amberhentai', true);
            }
            if (category == 'anal') {
                url = await globals.reddit('hentaianal', true);
            }
            if (category == 'ayaka') {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    url = await globals.reddit('ayakahentai', true);
                }
                if (option == 2) {
                    url = await globals.reddit('ayaka_hentai', true);
                }
            }
            if (category == 'bdsm') {
                url = await globals.reddit('hentaibondage', true);
            }
            if (category == 'blowjob') {
                const res = await fetch('https://api.waifu.pics/nsfw/blowjob');
                if (res.ok) {
                    const data = await res.json();
                    await response(null, data.url, category, interaction);
                }
            }
            if (category == 'byleth') {
                url = await globals.reddit('byleth', true);
            }
            if (category == 'cum') {
                url = await globals.reddit('cumhentai', true);
            }
            if (category == 'emilia') {
                url = await globals.reddit('emiliahentai', true);
            }
            if (category == 'eula') {
                url = await globals.reddit('eulansfw', true);
            }
            if (category == 'femboy') {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    url = await globals.reddit('femboyhentai', true);
                }
                if (option == 2) {
                    url = await globals.reddit('femboysandhentai', true);
                }
            }
            if (category == 'femdom') {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    url = await globals.reddit('hentaifemdom', true);
                }
                if (option == 2) {
                    url = await globals.reddit('femdomhentai', true);
                }
            }
            if (category == 'futanari') {
                url = await globals.reddit('futanari', true);
            }
            if (category == 'ganyu') {
                url = await globals.reddit('ganyunsfw', true);
            }
            if (category == 'genshin') {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    url = await globals.reddit('genshinimpacthentai', true);
                }
                if (option == 2) {
                    url = await globals.reddit('genshinimpactnsfw', true);
                }
            }
            if (category == 'hutao') {
                url = await globals.reddit('hutaonsfw', true);
            }
            if (category == 'keqing') {
                url = await globals.reddit('keqingnsfw', true);
            }
            if (category == 'lumine') {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    url = await globals.reddit('luminensfw', true);
                }
                if (option == 2) {
                    url = await globals.reddit('lumine_nsfw', true);
                }
            }
            if (category == 'masturbation') {
                url = await globals.reddit('masturbationhentai', true);
            }
            if (category == 'neko') {
                const res = await fetch('https://api.waifu.pics/nsfw/neko');
                if (res.ok) {
                    const data = await res.json();
                    await response(null, data.url, category, interaction);
                }
            }
            if (category == 'nilou') {
                url = await globals.reddit('nilou_hentai', true);
            }
            if (category == 'overwatch') {
                url = await globals.reddit('overwatch_porn', true);
            }
            if (category == 'pee') {
                url = await globals.reddit('pissinghentai', true);
            }
            if (category == 'pegging') {
                url = await globals.reddit('pegginghentai', true);
            }
            if (category == 'public') {
                url = await globals.reddit('publichentai', true);
            }
            if (category == 'raiden') {
                url = await globals.reddit('raidennsfw', true);
            }
            if (category == 'shenhe') {
                url = await globals.reddit('shenhensfw', true);
            }
            if (category == 'tentacles') {
                url = await globals.reddit('tentai', true);
            }
            if (category == 'thick') {
                url = await globals.reddit('thick_hentai', true);
            }
            if (category == 'trap') {
                var option = _.sample([1, 2]);
                if (option == 1) {
                    const res = await fetch('https://api.waifu.pics/nsfw/trap');
                    if (res.ok) {
                        const data = await res.json();
                        await response(null, data.url, category, interaction);
                    }
                }
                if (option == 2) {
                    url = await globals.reddit('traphentai', true);
                }
            }
            if (category == 'undressing') {
                url = await globals.reddit('undressinghentai', true);
            }
            if (category == 'uniform') {
                url = await globals.reddit('uniform_hentai', true);
            }
            if (category == 'upskirt') {
                url = await globals.reddit('upskirthentai', true);
            }
            if (category == 'waifu') {
                const res = await fetch('https://api.waifu.pics/nsfw/waifu');
                if (res.ok) {
                    const data = await res.json();
                    await response(null, data.url, category, interaction);
                }
            }
            if (category == 'yaemiko') {
                url = await globals.reddit('yaemikonsfw', true);
            }
            if (category == 'yuri') {
                url = await globals.reddit('yuri', true);
            }

            object.interaction = interaction
            object.ephemeral = false
            object.type = 'image'
            object.title = `Hentai Pics (${category.charAt(0).toUpperCase() + category.slice(1)})`
            object.url = url
            await globals.response(object);
        } else {
            await interaction.deferReply({ ephemeral: true });
            var object = new Object()
            object.interaction = interaction
            object.ephemeral = true
            object.type = 'text'
            object.title = 'Notice'
            object.description = 'This command can only be ran in nsfw channels'
            await globals.response(object);
        }
	},
};