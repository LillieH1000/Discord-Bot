import { Client, EmbedBuilder, TextChannel } from "discord.js";
import globals from "../globals.js";
let count = new Map();

async function invoke(client: Client) {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content || !message.guild) return;
    
        // Legacy Update Server
        if (message.guild.id == "1095995920409178112") {
            if (count.has(message.author.id)) {
                count.set(message.author.id, {
                    count: parseInt(count.get(message.author.id).count) + 1
                });
                if (parseInt(count.get(message.author.id).count) == 8) {
                    if (message.member) {
                        await message.member.timeout(2419200000, "Message Spam");
                    }

                    const embed = new EmbedBuilder()
                        .setColor(globals.colours.embed)
                        .setTitle("Anti Spam Triggered")
                        .addFields(
                            { name: "Display Name:", value: message.author.displayName, inline: false },
                            { name: "Username:", value: message.author.username, inline: false },
                            { name: "ID:", value: message.author.id, inline: false },
                            { name: "Action:", value: "Muted, messages not deleted", inline: false }
                        )
                        .setTimestamp();

                    const channel = message.guild.channels.cache.get("1197666541467078787") as TextChannel;
                    if (channel) {
                        await channel.send({
                            content: "<@&1096003733554479135> <@&1195220849435889705>",
                            embeds: [embed]
                        });
                    }
                }
            } else {
                count.set(message.author.id, {
                    count: 1,
                    timeout: setTimeout(() => {
                        count.delete(message.author.id);
                    }, 5000)
                });
            }
        }
    });
}

export { invoke };