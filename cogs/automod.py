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

            for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                for filtered in antiscamresponse.json()["scamideviceunlockurls"]:
                    check = filtered.replace("/", "").replace("\\", "")
                    if word.startswith(check):
                        await message.delete()

            for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                for filtered in antiscamresponse.json()["scamdiscordurls"]:
                    check = filtered.replace("/", "").replace("\\", "")
                    if word.startswith(check):
                        await message.delete()

            for word in message_content.split():
                antijbpiracyresponse = await client.get(f'https://api.canister.me/v1/community/repositories/check?queries={word}')
                if (antijbpiracyresponse.json()['data'][0]['status'] == "unsafe"):
                    await message.delete()

def setup(bot):
    bot.add_cog(automod(bot))