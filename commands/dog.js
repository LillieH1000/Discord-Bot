const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dog')
		.setDescription('Posts a random dog picture')
        .addStringOption(option =>
            option.setName('source')
                .setDescription('Choose the dog pictures source')
                .setRequired(true)
                .addChoices(
                    { name: 'Dog.Ceo', value: 'dog_ceo' },
                    { name: 'Nekos.Life',  value: 'nekos_life' },
                    { name: 'AlexFlipnote.Dev',  value: 'alexflipnote_dev' }
                )),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString('source');
        if (source == "dog_ceo") {
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            if (res.ok) {
                const data = await res.json();
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Dog Pics')
                    .setImage(data.message)
                    .setTimestamp()
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('View Original Image')
                            .setStyle('LINK')
                            .setURL(data.message)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
        if (source == "nekos_life") {
            const res = await fetch('https://nekos.life/api/v2/img/woof');
            if (res.ok) {
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Dog Pics')
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
        if (source == "alexflipnote_dev") {
            const res = await fetch('https://api.alexflipnote.dev/dogs');
            if (res.ok) {
                const data = await res.json();
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Dog Pics')
                    .setImage(data.file)
                    .setTimestamp()
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('View Original Image')
                            .setStyle('LINK')
                            .setURL(data.file)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
	},
};