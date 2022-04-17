const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
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

// Slash Commands

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

// Member Join

client.on('guildMemberAdd', async guildMember => {
	try {
		const createdDate = moment(guildMember.user.createdAt).format('MMMM D, YYYY');
		const embed = new MessageEmbed()
			.setColor('#FFC0DD')
			.setAuthor({ name: guildMember.user.username, iconURL: guildMember.user.displayAvatarURL() })
			.setTitle('Member Joined')
			.addField('Created At:', createdDate, false)
			.setFooter({ text: 'ID: ' + guildMember.user.id })
			.setTimestamp()
			const guild = guildMember.guild;
			guild.systemChannel.send({ embeds: [embed] });
	} catch (error) {
		console.error(error);
	}
});

// Member Leave

client.on('guildMemberRemove', async guildMember => {
	try {
		const createdDate = moment(guildMember.user.createdAt).format('MMMM D, YYYY');
		const embed = new MessageEmbed()
			.setColor('#FFC0DD')
			.setAuthor({ name: guildMember.user.username, iconURL: guildMember.user.displayAvatarURL() })
			.setTitle('Member Left')
			.addField('Created At:', createdDate, false)
			.setFooter({ text: 'ID: ' + guildMember.user.id })
			.setTimestamp()
			const guild = guildMember.guild;
			guild.systemChannel.send({ embeds: [embed] });
	} catch (error) {
		console.error(error);
	}
});

// YouTube Video Info

client.on('messageCreate', async message => {
	if (message.author.bot) return;

	// YouTube Video Info

	for (const word of message.content.split(" ")) {
		const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
		if (word.match(rx)) {
			try {
				const response = await axios.get('https://returnyoutubedislikeapi.com/votes?videoId='.concat(word.match(rx)[1]));
				const embed = new MessageEmbed()
				.setColor('#FFC0DD')
				.setDescription('Views: ' + response.data.viewCount.toLocaleString() + '\nLikes: ' + response.data.likes.toLocaleString() + '\nDislikes: ' + response.data.dislikes.toLocaleString())
				.setTimestamp()
				await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
			} catch (error) {
				console.error(error);
			}
		}
	}
});

// Pokemon Search

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
    await pokemonsearch(1, 0, interaction);
});

client.on('messageCreate', async message => {
	if (message.author.bot) return;

	if (message.content.startsWith('((') & message.content.includes('))')) {
		await pokemonsearch(0, 1, message);
	}
});

async function pokemonsearch(isInteraction, isMessage, info) {
	try {
		var pokemon = '';
		var game = '';
		if (isInteraction == 1) {
			pokemon += info.customId.split('custommenuid')[0];
			game += info.customId.split('custommenuid')[1];
		}
		if (isMessage == 1) {
			pokemon += info.content.split('))')[0].replace('((', '').toLowerCase();
			game += info.content.split('))')[1];
		}
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
			.addFields(
				{ name: 'Pokedex ID', value: response.data.id.toString(), inline: false },
				{ name: 'Types', value: types, inline: false },
				{ name: 'Abilities', value: abilities, inline: false },
				{ name: 'Base Stats', value: basestats, inline: false },
			)
			.setTimestamp()
		if (isInteraction == 1) {
			if (info.values[0] == 'defaultregular') {
				embed.setThumbnail(response.data.sprites.other.home.front_default);
			}
			if (info.values[0] == 'defaultshiny') {
				embed.setThumbnail(response.data.sprites.other.home.front_shiny);
			}
			if (info.values[0] == 'femaleregular') {
				embed.setThumbnail(response.data.sprites.other.home.front_female);
			}
			if (info.values[0] == 'femaleshiny') {
				embed.setThumbnail(response.data.sprites.other.home.front_shiny_female);
			}
		}
		if (isMessage == 1) {
			embed.setThumbnail(response.data.sprites.other.home.front_default);
		}

		const menu = new MessageSelectMenu().setPlaceholder('Choose Sprite Image');

		if (game != '') {
			embed.addField('Game And Count', game, false);
			menu.setCustomId(response.data.name + 'custommenuid' + game);
		} else {
			menu.setCustomId(response.data.name + 'custommenuid');
		}
		
		if (response.data.sprites.other.home.front_default != null) {
			menu.addOptions([
				{
					label: "Default (Regular)",
					value: "defaultregular",
					description: "Show the regular default pic of the pokemon"
				}
			])
		}
		if (response.data.sprites.other.home.front_shiny != null) {
			menu.addOptions([
				{
					label: "Default (Shiny)",
					value: "defaultshiny",
					description: "Show the shiny default pic of the pokemon"
				}
			])
		}
		if (response.data.sprites.other.home.front_female != null) {
			menu.addOptions([
				{
					label: "Female (Regular)",
					value: "femaleregular",
					description: "Show the regular female pic of the pokemon"
				}
			])
		}
		if (response.data.sprites.other.home.front_shiny_female != null) {
			menu.addOptions([
				{
					label: "Female (Shiny)",
					value: "femaleshiny",
					description: "Show the shiny female pic of the pokemon"
				}
			])
		}

		const row = new MessageActionRow().addComponents(menu);

		if (isInteraction == 1) {
			await info.update({ embeds: [embed], components: [row] });
		}
		if (isMessage == 1) {
			await info.delete();
			await info.channel.send({ embeds: [embed], components: [row] });
		}
	} catch (error) {
		console.error(error);
	}
}

// Run Bot

client.login(token);