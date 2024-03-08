import { Client } from "discord.js";

async function invoke(client: Client) {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content) return;

        try {
            // Chariz Server
            if (message.guild.id == "326739046531596289") {
                for (const word of message.content.split(" ")) {
                    const res = await fetch(`https://api.canister.me/v2/jailbreak/repository/safety?uris=${word}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.data[0].safe == false) {
                            await message.delete();
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