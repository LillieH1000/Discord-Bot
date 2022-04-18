const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hentai')
		.setDescription('Posts a random hentai picture, can only be used in nsfw channels')
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Choose which hentai picture type you want')
                .setRequired(true)
                .addChoice('Anal', 'anal')
                .addChoice('Blowjob (Pic)', 'blowjob')
                .addChoice('Blowjob (Gif)', 'blowjobgif')
                .addChoice('Boobs (Pic)', 'boobs')
                .addChoice('Boobs (Gif)', 'boobsgif')
                .addChoice('Cum', 'cum')
                .addChoice('Feet (Pic)', 'feet')
                .addChoice('Feet (Gif)', 'feetgif')
                .addChoice('Femdom', 'femdom')
                .addChoice('Futanari', 'futanari')
                .addChoice('Kitsune', 'kitsune')
                .addChoice('Neko (Pic)', 'neko')
                .addChoice('Neko (Gif)', 'nekogif')
                .addChoice('Pussy (Pic)', 'pussy')
                .addChoice('Pussy (Gif)', 'pussygif')
                .addChoice('Pwank', 'pwank')
                .addChoice('Solo (Pic)', 'solo')
                .addChoice('Solo (Gif)', 'sologif')
                .addChoice('Trap', 'trap')
                .addChoice('Yuri (Pic)', 'yuri')
                .addChoice('Yuri (Gif)', 'yurigif')),
	async execute(interaction) {
        if (interaction.channel.nsfw) {
            await interaction.deferReply();
            const category = interaction.options.getString('category');
            if (category == "anal") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/anal');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "blowjob") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/blowjob');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "blowjobgif") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/bj');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "boobs") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/tits');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "boobsgif") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/boobs');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "cum") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/cum');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "feet") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/feet');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "feetgif") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/feetg');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "femdom") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/femdom');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "futanari") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/futanari');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "kitsune") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/lewdk');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "neko") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/lewd');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "nekogif") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/nsfw_neko_gif');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "pussy") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/pussy_jpg');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "pussygif") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/pussy');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "pwank") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/pwankg');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "solo") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/solo');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "sologif") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/solog');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "trap") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/trap');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "yuri") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/yuri');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
            if (category == "yurigif") {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/les');
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Hentai Pics')
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
	},
};