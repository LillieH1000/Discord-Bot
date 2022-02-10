import discord, datetime, json, aiohttp, asyncio
from discord.commands import Option, slash_command
from discord.ext import commands

class automod(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        message_content = message.content.lower()

        async with aiohttp.ClientSession() as session:
            async with session.get(f'https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Json-List/main/antiscam.json') as resp:
                antiscamresponse = await resp.json(content_type='text/plain')
        
                for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                    for filtered in antiscamresponse["scamjburls"]:
                        check = filtered.replace("/", "").replace("\\", "")
                        if word.startswith(check):
                            await message.delete()

                for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                    for filtered in antiscamresponse["scamideviceunlockurls"]:
                        check = filtered.replace("/", "").replace("\\", "")
                        if word.startswith(check):
                            await message.delete()

                for word in message_content.replace("/", "").replace("\\", "").replace("http:", "").replace("https:", "").split():
                    for filtered in antiscamresponse["scamdiscordurls"]:
                        check = filtered.replace("/", "").replace("\\", "")
                        if word.startswith(check):
                            await message.delete()

            for word in message_content.split():
                async with session.get(f'https://api.canister.me/v1/community/repositories/check?queries={word}') as antijbpiracyresp:
                    antijbpiracyresponse = await antijbpiracyresp.json()
                    if (antijbpiracyresponse['data'][0]['status'] == "unsafe"):
                        await message.delete()

def setup(bot):
    bot.add_cog(automod(bot))