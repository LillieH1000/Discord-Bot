const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
var _ = require('underscore');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('Posts a random hentai picture, can only be used in nsfw channels')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Choose which hentai picture type you want')
                .setRequired(true)
                .addChoices(
                    { name: 'Anal', value: 'anal' },
                    { name: 'Ass', value: 'ass' },
                    { name: 'Bdsm', value: 'bdsm' },
                    { name: 'Blowjob', value: 'blowjob' },
                    { name: 'Boobjob', value: 'boobjob' },
                    { name: 'Boobs', value: 'boobs' },
                    { name: 'Creampie', value: 'creampie' },
                    { name: 'Cum', value: 'cum' },
                    { name: 'Ero', value: 'ero' },
                    { name: 'Femdom', value: 'femdom' },
                    { name: 'Footjob', value: 'footjob' },
                    { name: 'Gangbang', value: 'gangbang' },
                    { name: 'Glasses', value: 'glasses' },
                    { name: 'Handjob', value: 'handjob' },
                    { name: 'Masturbation', value: 'masturbation' },
                    { name: 'Neko', value: 'neko' },
                    { name: 'Orgy', value: 'orgy' },
                    { name: 'Pantsu', value: 'pantsu' },
                    { name: 'Public', value: 'public' },
                    { name: 'Tentacles', value: 'tentacles' },
                    { name: 'Thighs', value: 'thighs' },
                    { name: 'Trap', value: 'trap' },
                    { name: 'Uniform', value: 'uniform' },
                    { name: 'Waifu', value: 'waifu' },
                    { name: 'Yuri', value: 'yuri' }
                )),
	async execute(interaction) {
        if (interaction.channel.nsfw) {
            await interaction.deferReply();
            const category = interaction.options.getString('category');
            if (category == "anal") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/anal');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "ass") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/ass');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "bdsm") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/bdsm');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "blowjob") {
                var url = _.sample(["https://hmtai.herokuapp.com/nsfw/blowjob", "https://api.waifu.pics/nsfw/blowjob"]);
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "boobjob") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/boobjob');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "boobs") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/boobs');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "creampie") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/creampie');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "cum") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/cum');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "ero") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/ero');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "femdom") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/femdom');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "footjob") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/footjob');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "gangbang") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/gangbang');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "glasses") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/glasses');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "handjob") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/handjob');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "masturbation") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/masturbation');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "neko") {
                var url = _.sample(["https://hmtai.herokuapp.com/nsfw/nsfwNeko", "https://api.waifu.pics/nsfw/neko"]);
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "orgy") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/orgy');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "pantsu") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/pantsu');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "public") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/public');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "tentacles") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/tentacles');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "thighs") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/thighs');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "trap") {
                const res = await fetch('https://api.waifu.pics/nsfw/trap');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "uniform") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/uniform');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "waifu") {
                const res = await fetch('https://api.waifu.pics/nsfw/waifu');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
            if (category == "yuri") {
                const res = await fetch('https://hmtai.herokuapp.com/nsfw/yuri');
                if (res.ok) {
                    const data = await res.json();
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
                        .setImage(data.url)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(data.url)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                }
            }
        }
	},
};