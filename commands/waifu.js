const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('waifu')
		.setDescription('Posts a random waifu picture')
        .addStringOption(option =>
            option.setName('source')
                .setDescription('Choose the neko pictures source')
                .setRequired(true)
                .addChoices(
                    { name: 'Waifu.Pics', value: 'waifu_pics' },
                    { name: 'Nekos.Best', value: 'nekos_best' }
                )),
	async execute(interaction) {
        await interaction.deferReply();
        const source = interaction.options.getString('source');
        if (source == "waifu_pics") {
            const res = await fetch('https://api.waifu.pics/sfw/waifu');
            if (res.ok) {
                const data = await res.json();
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Waifu Pics')
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
        if (source == "nekos_best") {
            const res = await fetch('https://nekos.best/api/v2/waifu');
            if (res.ok) {
                const data = await res.json();
                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle('Waifu Pics')
                    .setImage(data.results[0].url)
                    .setTimestamp()
                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('View Original Image')
                            .setStyle('LINK')
                            .setURL(data.results[0].url)
                    );
                await interaction.editReply({ embeds: [embed], components: [row] });
            }
        }
	},
};