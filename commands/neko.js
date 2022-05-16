const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('neko')
		.setDescription('Posts a random neko picture')
        .addStringOption(option =>
            option.setName('source')
                .setDescription('Choose the neko pictures source')
                .setRequired(true)
                .addChoices(
                    { name: 'Nekos.Life', value: 'nekos_life' },
                    { name: 'Waifu.Pics', value: 'waifu_pics' },
                    { name: 'Nekos.Best', value: 'nekos_best' },
                    { name: 'Neko-Love', value: 'neko_love' },
                    { name: 'Hmtai', value: 'hmtai_herokuapp_com' }
                )),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString('source');
        if (source == "nekos_life") {
            const response = await axios.get('https://nekos.life/api/v2/img/neko');
            if (response.status == 200) {
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Neko Pics')
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
            }
        }
        if (source == "waifu_pics") {
            const response = await axios.get('https://api.waifu.pics/sfw/neko');
            if (response.status == 200) {
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Neko Pics')
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
            }
        }
        if (source == "nekos_best") {
            const response = await axios.get('https://nekos.best/api/v2/neko');
            if (response.status == 200) {
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Neko Pics')
                    .setImage(response.data.results[0].url)
                    .setTimestamp()
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('View Original Image')
                            .setStyle('LINK')
                            .setURL(response.data.results[0].url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (source == "neko_love") {
            const response = await axios.get('https://neko-love.xyz/api/v1/neko/');
            if (response.status == 200) {
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Neko Pics')
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
            }
        }
        if (source == "hmtai_herokuapp_com") {
            const response = await axios.get('https://hmtai.herokuapp.com/v2/neko/');
            if (response.status == 200) {
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Neko Pics')
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
            }
        }
	},
};