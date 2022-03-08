import discord, json, httpx, asyncio
from discord.ext import commands

class automod(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        message_content = message.content.lower()

        async with httpx.AsyncClient() as client:
            antiscamresponse = await client.get(f'https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Json-List/main/antiscam.json')
            
            for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                for filtered in antiscamresponse.json()["scamjburls"]:
                    check = filtered.replace("/", "").replace("\\", "")
                    if word.startswith(check):
                        await message.delete()
                        automodlogs = discord.utils.get(message.guild.channels, name="automod-logs")
                        embed = discord.Embed(title="Message Deleted", color=0xFFC0DD)
                        embed.add_field(name=f"Filter:", value="Scam Jailbreak Url", inline=False)
                        embed.add_field(name=f"Username:", value=message.author.name, inline=False)
                        embed.add_field(name=f"User ID:", value=message.author.id, inline=False)
                        embed.add_field(name=f"Message:", value=message.content, inline=False)
                        await automodlogs.send(embed=embed)

            for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                for filtered in antiscamresponse.json()["scamideviceunlockurls"]:
                    check = filtered.replace("/", "").replace("\\", "")
                    if word.startswith(check):
                        await message.delete()
                        automodlogs = discord.utils.get(message.guild.channels, name="automod-logs")
                        embed = discord.Embed(title="Message Deleted", color=0xFFC0DD)
                        embed.add_field(name=f"Filter:", value="Scam iDevice Unlock Url", inline=False)
                        embed.add_field(name=f"Username:", value=message.author.name, inline=False)
                        embed.add_field(name=f"User ID:", value=message.author.id, inline=False)
                        embed.add_field(name=f"Message:", value=message.content, inline=False)
                        await automodlogs.send(embed=embed)

            for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                for filtered in antiscamresponse.json()["scamdiscordurls"]:
                    check = filtered.replace("/", "").replace("\\", "")
                    if word.startswith(check):
                        await message.delete()
                        automodlogs = discord.utils.get(message.guild.channels, name="automod-logs")
                        embed = discord.Embed(title="Message Deleted", color=0xFFC0DD)
                        embed.add_field(name=f"Filter:", value="Scam Discord Url", inline=False)
                        embed.add_field(name=f"Username:", value=message.author.name, inline=False)
                        embed.add_field(name=f"User ID:", value=message.author.id, inline=False)
                        embed.add_field(name=f"Message:", value=message.content, inline=False)
                        await automodlogs.send(embed=embed)

            for word in message_content.split():
                antijbpiracyresponse = await client.get(f'https://api.canister.me/v1/community/repositories/check?queries={word}')
                if (antijbpiracyresponse.json()['data'][0]['status'] == "unsafe"):
                    await message.delete()
                    automodlogs = discord.utils.get(message.guild.channels, name="automod-logs")
                    embed = discord.Embed(title="Message Deleted", color=0xFFC0DD)
                    embed.add_field(name=f"Filter:", value="Piracy Jailbreak Repo Url", inline=False)
                    embed.add_field(name=f"Username:", value=message.author.name, inline=False)
                    embed.add_field(name=f"User ID:", value=message.author.id, inline=False)
                    embed.add_field(name=f"Message:", value=message.content, inline=False)
                    await automodlogs.send(embed=embed)

def setup(bot):
    bot.add_cog(automod(bot))