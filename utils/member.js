import { EmbedBuilder } from "discord.js";
import { format } from "date-fns";
import globals from "../globals.js";

async function invoke(client) {
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

            // Legacy Update Server
            if (guildMember.guild.id == "1095995920409178112") {
                const channel = guildMember.guild.channels.cache.get("1197666440942198794") || await guildMember.guild.channels.fetch("1197666440942198794");
                channel.send({ embeds: [embed] });
            } else {
                guildMember.guild.systemChannel.send({ embeds: [embed] });
            }
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
                        { name: "Created At:", value: format(newMember.user.createdAt, "MMMM d, yyyy"), inline: true }
                    )
                    .setFooter({ text: `ID: ${newMember.user.id}` })
                    .setTimestamp();

                if (newMember.joinedAt) {
                    embed.addFields(
                        { name: "Joined At:", value: format(newMember.joinedAt, "MMMM d, yyyy"), inline: true }
                    );
                }
                
                // Legacy Update Server
                if (newMember.guild.id == "1095995920409178112") {
                    const channel = newMember.guild.channels.cache.get("1197666440942198794") || await newMember.guild.channels.fetch("1197666440942198794");
                    channel.send({ embeds: [embed] });
                } else {
                    newMember.guild.systemChannel.send({ embeds: [embed] });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    client.on("guildMemberRemove", async guildMember => {
        try {
            const embed = new EmbedBuilder()
                .setColor(globals.colours.embed)
                .setTitle("Member Left")
                .setAuthor({ name: guildMember.user.displayName, iconURL: guildMember.user.displayAvatarURL() })
                .addFields(
                    { name: "Username:", value: guildMember.user.username, inline: false },
                    { name: "Created At:", value: format(guildMember.user.createdAt, "MMMM d, yyyy"), inline: true }
                )
                .setFooter({ text: `ID: ${guildMember.user.id}` })
                .setTimestamp();

            if (guildMember.joinedAt) {
                embed.addFields(
                    { name: "Joined At:", value: format(guildMember.joinedAt, "MMMM d, yyyy"), inline: true }
                );
            }

            // Legacy Update Server
            if (guildMember.guild.id == "1095995920409178112") {
                const channel = guildMember.guild.channels.cache.get("1197666440942198794") || await guildMember.guild.channels.fetch("1197666440942198794");
                channel.send({ embeds: [embed] });
            } else {
                guildMember.guild.systemChannel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };