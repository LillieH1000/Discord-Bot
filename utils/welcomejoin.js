const { EmbedBuilder } = require("discord.js");
const dayjs = require("dayjs");
let utc = require("dayjs/plugin/utc");
let globals = require("../globals.js");

module.exports = async(client) => {
    client.on("guildMemberUpdate", async (oldMember, newMember) => {
        try {
            if (oldMember.pending && !newMember.pending) {
                dayjs.extend(utc);
                const createdDate = dayjs(newMember.user.createdAt).format("MMMM D, YYYY");
                const joinedDate = dayjs(newMember.joinedAt).format("MMMM D, YYYY");
                const embed = new EmbedBuilder()
                    .setColor(globals.colours.embed)
                    .setAuthor({ name: `${newMember.user.displayName} (${newMember.user.username})`, iconURL: newMember.user.displayAvatarURL() })
                    .setTitle("Member Accepted Rules")
                    .addFields(
                        { name: "Created At:", value: createdDate, inline: true },
                        { name: "Joined At:", value: joinedDate, inline: true },
                    )
                    .setFooter({ text: `ID: ${newMember.user.id}` })
                    .setTimestamp()
                const guild = newMember.guild;
                guild.systemChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
        }
    });
};