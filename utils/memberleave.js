const { EmbedBuilder } = require("discord.js");
const { format } = require("date-fns");
let globals = require("../globals.js");

module.exports = async(client) => {
    client.on("guildMemberRemove", async guildMember => {
        try {
            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Member Left")
                .setAuthor({ name: guildMember.user.displayName, iconURL: guildMember.user.displayAvatarURL() })
                .addFields(
                    { name: "Username:", value: guildMember.user.username, inline: false },
                    { name: "Created At:", value: format(guildMember.user.createdAt, "MMMM d, yyyy"), inline: false },
                    { name: "Joined At:", value: format(guildMember.joinedAt, "MMMM d, yyyy"), inline: false }
                )
                .setFooter({ text: `ID: ${guildMember.user.id}` })
                .setTimestamp();

            guildMember.guild.systemChannel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    });
};