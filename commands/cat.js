const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Posts a random cat picture')
        .addStringOption(option =>
            option.setName('source')
                .setDescription('The input to echo back')
                .setRequired(true)
                .addChoice('Nekos.Life', 'nekos_life')
                .addChoice('AlexFlipnote.Dev', 'alexflipnote_dev')),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString('source');
        if (source == "nekos_life") {
            (async () => {
                try {
                    const response = await axios.get('https://nekos.life/api/v2/img/meow')
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Cat Pics')
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
                    const response = await axios.get('https://api.alexflipnote.dev/cats')
                    const embed = new MessageEmbed()
                        .setColor('#FFC0DD')
                        .setTitle('Cat Pics')
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
