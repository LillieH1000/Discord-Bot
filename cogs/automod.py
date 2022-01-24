import discord, datetime, requests, json
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

        antiscamresponse = requests.get(f"https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Json-List/main/antiscam.json").json()
        
        if any(word in message_content.split() for word in antiscamresponse["scamjburls"]):
            await message.delete()

        if any(word in message_content.split() for word in antiscamresponse["scamideviceunlockurls"]):
            await message.delete()

        if any(word in message_content.split() for word in antiscamresponse["scamdiscordurls"]):
            await message.delete()

        for word in message_content.split():
            antijbpiracyresponse = requests.get(f"https://api.canister.me/v1/community/repositories/check?queries={word}").json()
            if (antijbpiracyresponse['data'][0]['status'] == "unsafe"):
                await message.delete()

def setup(bot):
    bot.add_cog(automod(bot))