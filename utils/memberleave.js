import { EmbedBuilder } from "discord.js";
import { format } from "date-fns";
import globals from "../globals.js";

async function invoke(client) {
    client.on("guildMemberRemove", async guildMember => {
        try {
            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Member Left")
                .setAuthor({ name: guildMember.user.displayName, iconURL: guildMember.user.displayAvatarURL() })
                .addFields(
                    { name: "Username:", value: guildMember.user.username, inline: false },
                    { name: "Created At:", value: format(guildMember.user.createdAt, "MMMM d, yyyy"), inline: true },
                    { name: "Joined At:", value: format(guildMember.joinedAt, "MMMM d, yyyy"), inline: true }
                )
                .setFooter({ text: `ID: ${guildMember.user.id}` })
                .setTimestamp();

            guildMember.guild.systemChannel.send({ embeds: [embed] });
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };