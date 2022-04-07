const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
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
		await interaction.reply({ content: 'There was an error while executing this command', ephemeral: true });
	}
});

/* client.on('messageCreate', async message => {
}); */

client.on('guildMemberAdd', async guildMember => {
	const createdDate = moment(guildMember.user.createdAt).format("MMMM D, YYYY");
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

client.login(token);