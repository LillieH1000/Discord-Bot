const { EmbedBuilder } = require("discord.js");
const { format } = require("date-fns");
let globals = require("../globals.js");

module.exports = async(client) => {
    client.on("guildMemberAdd", async guildMember => {
        try {
            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Member Joined")
                .setAuthor({ name: guildMember.user.displayName, iconURL: guildMember.user.displayAvatarURL() })
                .addFields(
                    { name: "Username:", value: guildMember.user.username, inline: false },
                    { name: "Created At:", value: format(guildMember.user.createdAt, "MMMM d, yyyy"), inline: false }
                )
                .setFooter({ text: `ID: ${guildMember.user.id}` })
                .setTimestamp();

            guildMember.guild.systemChannel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    });

    client.on("guildMemberUpdate", async (oldMember, newMember) => {
        try {
            if (oldMember.pending && !newMember.pending) {
                const embed = new EmbedBuilder()
                    .setColor(globals.colours.embed)
                    .setTitle("Member Accepted Rules")
                    .setAuthor({ name: newMember.user.displayName, iconURL: newMember.user.displayAvatarURL() })
                    .addFields(
                        { name: "Username:", value: newMember.user.username, inline: false },
                        { name: "Created At:", value: format(newMember.user.createdAt, "MMMM d, yyyy"), inline: true },
                        { name: "Joined At:", value: format(newMember.joinedAt, "MMMM d, yyyy"), inline: true }
                    )
                    .setFooter({ text: `ID: ${newMember.user.id}` })
                    .setTimestamp();
                
                newMember.guild.systemChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
        }
    });
};