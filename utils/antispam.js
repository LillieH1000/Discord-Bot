import { EmbedBuilder } from "discord.js";
import globals from "../globals.js";
let count = new Map();

async function invoke(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;
    
        try {
            // Legacy Update Server
            if (message.guild.id == "1095995920409178112") {
                if (count.has(message.author.id)) {
                    count.set(message.author.id, {
                        count: parseInt(count.get(message.author.id).count) + 1
                    });
                    if (parseInt(count.get(message.author.id).count) == 8) {
                        message.member.timeout(2419200000, { reason: "Message Spam" });

                        const embed = new EmbedBuilder()
                            .setColor(globals.colours.embed)
                            .setTitle("Message Spam Detected")
                            .addFields(
                                { name: "Display Name:", value: message.author.displayName, inline: false },
                                { name: "Username:", value: message.author.username, inline: false },
                                { name: "ID:", value: message.author.id, inline: false },
                                { name: "Action:", value: "Muted", inline: false }
                            )
                            .setTimestamp()

                        message.member.guild.systemChannel.send({
                            content: "<@&1096003733554479135> <@&1195220849435889705>",
                            embeds: [embed]
                        });
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
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };