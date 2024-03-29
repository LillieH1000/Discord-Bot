import { Client, EmbedBuilder, PermissionsBitField, TextChannel } from "discord.js";
import globals from "../globals.js";

let config: object;

if (process.argv[2] == "dev") {
	config = await import("../../../../Desktop/Stuff/config.json", {
		assert: {
		  type: "json"
		}
	});
} else {
	config = await import("../config.json", {
		assert: {
		  type: "json"
		}
	});
}

async function invoke(client: Client) {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content || !message.guild) return;
    
        try {
            // Legacy Update Server
            if (message.guild.id == "1095995920409178112") {
                message.content = message.content.replace(/</gm, "").replace(/>/gm, "");
                for (const word of message.content.split(" ")) {
                    const res = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${config.safebrowsingapi}`, {
                        method: "post",
                        body: JSON.stringify({
                            "threatInfo": {
                                "threatTypes": ["THREAT_TYPE_UNSPECIFIED", "MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                                "platformTypes": ["ANY_PLATFORM"],
                                "threatEntryTypes": ["THREAT_ENTRY_TYPE_UNSPECIFIED", "URL", "EXECUTABLE"],
                                "threatEntries": [
                                    {
                                        "url": word
                                    }
                                ]
                            }
                        }),
                        headers: {
                            "Content-Type": "application/json"
                        }
                    });
                    if (res.ok) {
                        const data = await res.json() as object;
                        if (data.matches) {
                            if (message.guild.members.me && message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
                                await message.delete();
                            }
                            if (message.member && message.guild.members.me && message.guild.members.me.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                                await message.member.timeout(2419200000, "Message Spam");
                            }

                            const embed = new EmbedBuilder()
                                .setColor(globals.colours.embed)
                                .setTitle("Google Safe Browsing Triggered")
                                .addFields(
                                    { name: "Display Name:", value: message.author.displayName, inline: false },
                                    { name: "Username:", value: message.author.username, inline: false },
                                    { name: "ID:", value: message.author.id, inline: false },
                                    { name: "Action:", value: "Muted and message deleted", inline: false },
                                    { name: "Message:", value: message.content, inline: false }
                                )
                                .setTimestamp();

                            const channel = message.guild.channels.cache.get("1197666541467078787") as TextChannel;
                            if (channel) {
                                await channel.send({
                                    content: "<@&1096003733554479135> <@&1195220849435889705>",
                                    embeds: [embed]
                                });
                            }

                            break;
                        }
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };