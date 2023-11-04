const { EmbedBuilder } = require("discord.js");
const dayjs = require("dayjs");
let customParseFormat = require("dayjs/plugin/customParseFormat");
let globals = require("../globals.js");

module.exports = async(client) => {
    client.on("guildMemberAdd", async guildMember => {
        try {
            dayjs.extend(customParseFormat);
            const createdDate = dayjs(guildMember.user.createdAt).format("MMMM D, YYYY");
            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setAuthor({ name: `${guildMember.user.displayName} (${guildMember.user.username})`, iconURL: guildMember.user.displayAvatarURL() })
                .setTitle("Member Joined")
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