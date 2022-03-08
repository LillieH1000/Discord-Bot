import discord, json, httpx, asyncio, urllib.parse
from discord.ext import commands

class automod(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    async def logging(self, filter, word, message):
        filterEmbed = discord.Embed(title="Automod Log", description="Message Deleted", color=0xFFC0DD)
        filterEmbed.add_field(name=f"Filter:", value=filter, inline=False)
        filterEmbed.add_field(name=f"Username:", value=message.author.name, inline=False)
        filterEmbed.add_field(name=f"User ID:", value=message.author.id, inline=False)
        filterEmbed.add_field(name=f"Trigger:", value=word, inline=False)
        filterEmbed.add_field(name=f"Message:", value=message.content, inline=False)
        if message.guild.id == 326739046531596289:
            charizguild = self.bot.get_guild(326739046531596289)
            charizlogs = charizguild.get_channel(818424030297325569)
            await charizlogs.send(embed=filterEmbed)
        else:
            automodlogs = discord.utils.get(message.guild.channels, name="automod-logs")
            await automodlogs.send(embed=filterEmbed)

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        message_content = message.content.lower()

        async with httpx.AsyncClient() as client:
            for word in message_content.split():
                payload = {
                    "threatInfo": {
                        "threatTypes": ["MALWARE", "SOCIAL_ENGINEERING"],
                        "platformTypes": ["ANY_PLATFORM"],
                        "threatEntryTypes": ["URL"],
                        "threatEntries": [
                            {
                                "url": urllib.parse.quote(word)
                            }
                        ]
                    }
                }
                mainconfig = open('config.json')
                configdata = json.load(mainconfig)
                response = await client.post(f'https://safebrowsing.googleapis.com/v4/threatMatches:find?key={configdata["safebrowsingapikey"]}', json=payload)
                if response.status_code == 200:
                    if (response.json()):
                        await message.delete()
                        await self.logging("Google Safe Browsing", word, message)

            for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                antiscamresponse = await client.get(f'https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Json-List/main/antiscam.json')
                for filtered in antiscamresponse.json()["scamjburls"]:
                    check = filtered.replace("/", "").replace("\\", "")
                    if word.startswith(check):
                        await message.delete()
                        await self.logging("Scam Jailbreak Url", word, message)

                for filtered in antiscamresponse.json()["scamideviceunlockurls"]:
                    check = filtered.replace("/", "").replace("\\", "")
                    if word.startswith(check):
                        await message.delete()
                        await self.logging("Scam iDevice Unlock Url", word, message)
                            
                for filtered in antiscamresponse.json()["scamdiscordurls"]:
                    check = filtered.replace("/", "").replace("\\", "")
                    if word.startswith(check):
                        await message.delete()
                        await self.logging("Scam Discord Url", word, message)

def setup(bot):
    bot.add_cog(automod(bot))