import { EmbedBuilder } from "discord.js";
import { format } from "date-fns";
import globals from "../globals.js";

async function invoke(client) {
    client.on("messageDelete", async message => {
        if (message.author.bot || !message.content) return;

        try {
            // Legacy Update Server
            if (message.guild.id == "1095995920409178112") {
                const embed = new EmbedBuilder()
                    .setColor(globals.colours.embed)
                    .setTitle("Message Deleted")
                    .setAuthor({ name: message.author.displayName, iconURL: message.author.displayAvatarURL() })
                    .addFields(
                        { name: "Username:", value: message.author.username, inline: false },
                        { name: "Channel:", value: `<#${message.channel.id}>`, inline: false },
                        { name: "Created At:", value: format(message.createdAt, "MMMM d, yyyy"), inline: false },
                        { name: "Message:", value: message.content, inline: false }
                    )
                    .setFooter({ text: `ID: ${message.author.id}` })
                    .setTimestamp();

                const channel = message.guild.channels.cache.get("1197666507925225662") || await message.guild.channels.fetch("1197666507925225662");
                channel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
        }
    });

    client.on("messageUpdate", async (oldMessage, newMessage) => {
        if (newMessage.author.bot || !newMessage.content) return;

        try {
            // Legacy Update Server
            if (newMessage.guild.id == "1095995920409178112" && oldMessage.content != newMessage.content) {
                const embed = new EmbedBuilder()
                    .setColor(globals.colours.embed)
                    .setTitle("Message Updated")
                    .setAuthor({ name: newMessage.author.displayName, iconURL: newMessage.author.displayAvatarURL() })
                    .addFields(
                        { name: "Username:", value: newMessage.author.username, inline: false },
                        { name: "Channel:", value: `<#${newMessage.channel.id}>`, inline: false },
                        { name: "Old Created At:", value: format(oldMessage.createdAt, "MMMM d, yyyy"), inline: true },
                        { name: "New Created At:", value: format(newMessage.createdAt, "MMMM d, yyyy"), inline: true },
                        { name: "Old Message:", value: oldMessage.content, inline: false },
                        { name: "New Message:", value: newMessage.content, inline: false }
                    )
                    .setFooter({ text: `ID: ${newMessage.author.id}` })
                    .setTimestamp();

                const channel = newMessage.guild.channels.cache.get("1197666507925225662") || await newMessage.guild.channels.fetch("1197666507925225662");
                channel.send({ embeds: [embed] });
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };