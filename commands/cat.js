const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cat')
		.setDescription('Posts a random cat picture')
        .addStringOption(option =>
            option.setName('source')
                .setDescription('Choose the cat pictures source')
                .setRequired(true)
                .addChoices(
                    { name: 'Nekos.Life', value: 'nekos_life' },
                    { name: 'AlexFlipnote.Dev', value: 'alexflipnote_dev' },
                    { name: 'Cataas', value: 'cataas_com' }
                )),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString('source');
        if (source == "nekos_life") {
            const res = await fetch('https://nekos.life/api/v2/img/meow');
            if (res.ok) {
                const data = await res.json();
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Cat Pics')
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
            const res = await fetch('https://api.alexflipnote.dev/cats');
            if (res.ok) {
                const data = await res.json();
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Cat Pics')
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
        if (source == "cataas_com") {
            const res = await fetch('https://cataas.com/cat?json=true');
            if (res.ok) {
                const data = await res.json();
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Cat Pics')
                    .setImage('https://cataas.com' + data.url)
                    .setTimestamp()
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('View Original Image')
                            .setStyle('LINK')
                            .setURL('https://cataas.com' + data.url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
	},
};