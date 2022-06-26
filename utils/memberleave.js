const { MessageEmbed } = require('discord.js');
const dayjs = require('dayjs');

module.exports = async(client) => {
    client.on('guildMemberRemove', async guildMember => {
        try {
            const createdDate = dayjs(guildMember.user.createdAt).format('MMMM D, YYYY');
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
};