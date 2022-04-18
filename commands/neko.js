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
                .addChoice('Nekos.Life', 'nekos_life')
                .addChoice('Waifu.Pics', 'waifu_pics')
                .addChoice('Nekos.Best', 'nekos_best')),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString('source');
        if (source == "nekos_life") {
            try {
                const response = await axios.get('https://nekos.life/api/v2/img/neko');
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
            } catch (error) {
                console.log(error);
            }
        }
        if (source == "waifu_pics") {
            try {
                const response = await axios.get('https://api.waifu.pics/sfw/neko');
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
            } catch (error) {
                console.log(error);
            }
        }
        if (source == "nekos_best") {
            try {
                const response = await axios.get('https://nekos.best/api/v2/neko');
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
            } catch (error) {
                console.log(error);
            }
        }
	},
};