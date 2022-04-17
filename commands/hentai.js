const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('Posts a hentai pic you define, can only be used in nsfw channels')
        .addSubcommand(subcommand =>
            subcommand.setName('neko')
                .setDescription('Neko hentai')
                .addStringOption(option =>
                    option.setName('source')
                        .setDescription('Choose the neko hentai source')
                        .setRequired(true)
                        .addChoice('Nekos.Life', 'nekos_life')
                        .addChoice('Waifu.Pics', 'waifu_pics')))
        .addSubcommand(subcommand =>
            subcommand.setName('yuri')
                .setDescription('Yuri hentai')
                .addStringOption(option =>
                    option.setName('source')
                        .setDescription('Choose the yuri hentai source')
                        .setRequired(true)
                        .addChoice('Nekos.Life', 'nekos_life'))),
	async execute(interaction) {
        if (interaction.channel.nsfw) {
            await interaction.deferReply();
            if (interaction.options.getSubcommand() === 'neko') {
                const source = interaction.options.getString('source');
                if (source == "nekos_life") {
                    try {
                        const response = await axios.get('https://nekos.life/api/v2/img/lewd');
                        const embed = new MessageEmbed()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Neko Pics')
                            .setImage(response.data.url)
                            .setTimestamp()
                        const row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setLabel('View Original Image')
                                    .setStyle('LINK')
                                    .setURL(response.data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    } catch (error) {
                        console.log(error);
                    }
                }
                if (source == "waifu_pics") {
                    try {
                        const response = await axios.get('https://api.waifu.pics/nsfw/neko');
                        const embed = new MessageEmbed()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Neko Pics')
                            .setImage(response.data.url)
                            .setTimestamp()
                        const row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setLabel('View Original Image')
                                    .setStyle('LINK')
                                    .setURL(response.data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
            if (interaction.options.getSubcommand() === 'yuri') {
                const source = interaction.options.getString('source');
                if (source == "nekos_life") {
                    try {
                        const response = await axios.get('https://nekos.life/api/v2/img/yuri');
                        const embed = new MessageEmbed()
                            .setColor('#FFC0DD')
                            .setTitle('Hentai Neko Pics')
                            .setImage(response.data.url)
                            .setTimestamp()
                        const row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                    .setLabel('View Original Image')
                                    .setStyle('LINK')
                                    .setURL(response.data.url)
                            );
                        await interaction.editReply({ embeds: [embed], components: [row] });
                    } catch (error) {
                        console.log(error);
                    }
                }
            }
        }
	},
};