const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Posts a random dog picture')
        .addStringOption(option =>
            option.setName('source')
                .setDescription('The input to echo back')
                .setRequired(true)
                .addChoice('Dog.Ceo', 'dog_ceo')
                .addChoice('Nekos.Life', 'nekos_life')
                .addChoice('AlexFlipnote.Dev', 'alexflipnote_dev')),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString('source');
        if (source == "dog_ceo") {
            (async () => {
                try {
                    const response = await axios.get('https://dog.ceo/api/breeds/image/random')
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Dog Pics')
                        .setImage(response.data.message)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(response.data.message)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                } catch (error) {
                    console.log(error.response);
                }
            })();
        }
        if (source == "nekos_life") {
            (async () => {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/woof')
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Dog Pics')
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
                    console.log(error.response);
                }
            })();
        }
        if (source == "alexflipnote_dev") {
            (async () => {
                try {
                    const response = await axios.get('https://api.alexflipnote.dev/dogs')
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Dog Pics')
                        .setImage(response.data.file)
                        .setTimestamp()
                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                                .setLabel('View Original Image')
                                .setStyle('LINK')
                                .setURL(response.data.file)
                        );
                    await interaction.editReply({ embeds: [embed], components: [row] });
                } catch (error) {
                    console.log(error.response);
                }
            })();
        }
	},
};
