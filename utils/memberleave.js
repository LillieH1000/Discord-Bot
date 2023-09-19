const { EmbedBuilder } = require("discord.js");
const dayjs = require("dayjs");
let globals = require("../globals.js");

module.exports = async(client) => {
    client.on("guildMemberRemove", async guildMember => {
        try {
            const createdDate = dayjs(guildMember.user.createdAt).format("MMMM D, YYYY");
            const joinedDate = dayjs(guildMember.user.joinedAt).format("MMMM D, YYYY");
            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setAuthor({ name: `${guildMember.user.displayName} (${guildMember.user.username})`, iconURL: guildMember.user.displayAvatarURL() })
                .setTitle("Member Left")
                .addFields(
                    { name: "Created At:", value: createdDate, inline: true },
                    { name: "Joined At:", value: joinedDate, inline: true },
                )
                .setFooter({ text: `ID: ${guildMember.user.id}` })
                .setTimestamp()
            const guild = guildMember.guild;
            guild.systemChannel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    });
};