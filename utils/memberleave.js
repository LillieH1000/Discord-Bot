const { EmbedBuilder } = require("discord.js");
const dayjs = require("dayjs");
var globals = require("../globals.js");

module.exports = async(client) => {
    client.on("guildMemberRemove", async guildMember => {
        try {
            const createdDate = dayjs(guildMember.user.createdAt).format("MMMM D, YYYY");
            const embed = new EmbedBuilder()
                .setColor(globals.embedcolour)
                .setAuthor({ name: guildMember.user.username, iconURL: guildMember.user.displayAvatarURL() })
                .setTitle("Member Left")
                .addFields(
                    { name: "Created At:", value: createdDate, inline: false },
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