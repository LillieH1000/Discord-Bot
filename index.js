const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const axios = require('axios');
var moment = require('moment');

const intents = new Intents();
intents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES);

const client = new Client({ intents: intents });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
	}
});

client.on('guildMemberAdd', async guildMember => {
	const createdDate = moment(guildMember.user.createdAt).format('MMMM D, YYYY');
	const embed = new MessageEmbed()
		.setColor('#FFC0DD')
		.setAuthor({ name: guildMember.user.username, iconURL: guildMember.user.displayAvatarURL() })
		.setTitle('Member Joined')
		.addField('Created At:', createdDate, false)
		.setFooter({ text: 'ID: ' + guildMember.user.id })
		.setTimestamp()
	try {
		const guild = guildMember.guild;
		guild.systemChannel.send({ embeds: [embed] });
	} catch (error) {
		console.error(error);
	}
});

client.on('guildMemberRemove', async guildMember => {
	const createdDate = moment(guildMember.user.createdAt).format('MMMM D, YYYY');
	const embed = new MessageEmbed()
		.setColor('#FFC0DD')
		.setAuthor({ name: guildMember.user.username, iconURL: guildMember.user.displayAvatarURL() })
		.setTitle('Member Left')
		.addField('Created At:', createdDate, false)
		.setFooter({ text: 'ID: ' + guildMember.user.id })
		.setTimestamp()
	try {
		const guild = guildMember.guild;
		guild.systemChannel.send({ embeds: [embed] });
	} catch (error) {
		console.error(error);
	}
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;

	// Pokemon Search
	if (message.content.startsWith('((') & message.content.includes('))')) {
		await pokemonsearch(message);
	}

	// YouTube Video Info
	/* if (message.content.includes('test')) {
		await message.reply("test", {allowedMentions: {repliedUser: false}});
	} */
});

async function pokemonsearch(message) {
	try {
		const pokemon = message.content.split('))')[0].replace('((', '').toLowerCase();
		const game = message.content.split('))')[1];
		const response = await axios.get('https://pokeapi.co/api/v2/pokemon/'.concat(pokemon));
			
		var typescount = 0;
		var types = '';
		for (const type of response.data.types) {
			types += type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
			typescount += 1;
			if (response.data.types.length != typescount) {
				types += ', ';
			}
		}

		var abilitiescount = 0;
		var abilities = '';
		for (const ability of response.data.abilities) {
			abilities += ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1);
			if (ability.is_hidden == true) {
            	abilities += ' (Hidden)';
			}
			abilitiescount += 1;
			if (response.data.abilities.length != abilitiescount) {
				abilities += ', ';
			}
		}

		var basestatscount = 0;
		var basestats = '';
		for (const basestat of response.data.stats) {
			basestats += basestat.stat.name.charAt(0).toUpperCase() + basestat.stat.name.slice(1) + ': ' + basestat.base_stat.toString();
			basestatscount += 1;
			if (response.data.stats.length != basestatscount) {
				basestats += '\n';
			}
		}
			
		const embed = new MessageEmbed()
			.setColor('#FFC0DD')
			.setTitle(response.data.name.charAt(0).toUpperCase() + response.data.name.slice(1))
			.setThumbnail(response.data.sprites.other.home.front_default)
			.addFields(
				{ name: 'Pokedex ID', value: response.data.id.toString(), inline: false },
				{ name: 'Types', value: types, inline: false },
				{ name: 'Abilities', value: abilities, inline: false },
				{ name: 'Base Stats', value: basestats, inline: false },
			)
			.setTimestamp()
		if (game != '') {
			embed.addField('Game And Count', game, false)
		}
		await message.delete();
		await message.channel.send({ embeds: [embed] });
	} catch (error) {
		console.error(error);
	}
}

client.login(token);