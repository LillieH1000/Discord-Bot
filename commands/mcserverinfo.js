const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('mcserverinfo')
		.setDescription('Sends info about a minecraft server you enter')
        .addStringOption(option =>
            option.setName('edition')
                .setDescription('Choose the minecraft server edition')
                .setRequired(true)
                .addChoices(
                    { name: 'Bedrock', value: 'bedrock' },
                    { name: 'Java', value: 'java' }
                ))
        .addStringOption(option =>
            option.setName('host')
                .setDescription('Enter the url or ip of the minecraft server')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const edition = interaction.options.getString('edition');
        const host = interaction.options.getString('host');
        if (edition == "bedrock") {
            const embed = new MessageEmbed()
                .setColor('#FFC0DD')
                .addField('Notice', 'Bedrock server info is not completed yet, only Java server info is completed so far', false)
                .setTimestamp()
            await interaction.editReply({ embeds: [embed] });
        }
        if (edition == "java") {
            const res = await fetch('https://api.mcsrvstat.us/2/'.concat(host));
            if (res.ok) {
                const data = await res.json();

                var online = '';
                if (data.online == true) {
                    online = "True";
                } else if (data.online == false) {
                    online = "False";
                }

                var playerslistcount = 0;
                var playerslist = '';
                for (const players of data.players.list) {
                    playerslist += players;
                    playerslistcount += 1;
                    if (data.players.list.length != playerslistcount) {
                        playerslist += "\n";
                    }
                }

                const embed = new MessageEmbed()
                    .setColor('#FFC0DD')
                    .setTitle(host.toString())
                    .addField('Online:', online, false)
                    .addField('Version:', data.version, false)
                    .addField('IP:', data.ip, false)
                    .addField('Port:', data.port.toString(), false)
                    .addField('MOTD:', data.motd.clean[0], false)
                    .addField('Players (Online):', data.players.online.toString(), false)
                    .addField('Players (Max):', data.players.max.toString(), false)
                    .addField('Players (List):', playerslist, false)
                    .setTimestamp()
                await interaction.editReply({ embeds: [embed] });
            }
        }
	},
};