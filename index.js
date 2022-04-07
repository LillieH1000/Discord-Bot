const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios')

const intents = new Intents();
intents.add(Intents.FLAGS.GUILDS);

const client = new Client({ intents: intents });

client.once('ready', () => {
	console.log('Ready');
});

client.on('interactionCreate', interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'cat') {
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
				interaction.reply({ embeds: [embed], components: [row] });
			} catch (error) {
			  	console.log(error.response);
			}
		})();
	}
});

client.login(token);