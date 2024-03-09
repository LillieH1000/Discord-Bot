import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, EmbedBuilder } from "discord.js";
import globals from "../globals.js";

async function invoke(client: Client) {
    client.on("messageCreate", async message => {
        if (message.author.bot || !message.content || !message.guild) return;

        try {
            // Chariz Server
            if (message.guild.id == "326739046531596289" && message.content.includes("[[") && message.content.includes("]]")) {
                const res = await fetch(`https://api.canister.me/v2/jailbreak/package/search?q=${message.content.split("[[")[1].split("]]")[0]}&limit=1`);
                if (res.ok) {
                    const data = await res.json();
                    
                    const embed = new EmbedBuilder()
                        .setColor(globals.colours.embed)
                        .addFields(
                            { name: data.data[0].name, value: data.data[0].description, inline: false },
                            { name: "Author:", value: data.data[0].author.replace(/<.*>/, ""), inline: true },
                            { name: "Version:", value: data.data[0].version, inline: true },
                            { name: "Price:", value: data.data[0].price, inline: true },
                            { name: "Repository:", value: `[${data.data[0].repository.name}](${data.data[0].repository.uri})`, inline: true },
                            { name: "Bundle ID:", value: data.data[0].package, inline: true }
                        )
                        .setTimestamp();

                    if (data.data[0].icon != null && data.data[0].icon != undefined) {
                        embed.setThumbnail(data.data[0].icon);
                    }

                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setLabel("Add Repo To Package Manager")
                                .setStyle(ButtonStyle.Link)
                                .setURL(`https://repos.slim.rocks/repo/?repoUrl=${data.data[0].repository.uri}`)
                        );

                    await message.reply({ embeds: [embed], components: [row], allowedMentions: { repliedUser: false } });
                }
            }
        } catch (error) {
            console.error(error);
        }
    });
}

export { invoke };