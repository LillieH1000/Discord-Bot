import discord
from discord.commands import slash_command
from discord.commands import Option
from discord.ext import commands
import datetime
import requests
import json

class automod(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        message_content = message.content.lower()

        antiscamresponse = requests.get(f"https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Json-List/main/antiscam.json").json()

        # antijbpiracyresponse = requests.get(f"https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Swear-Json-List/main/antiswear.json").json()
        
        if any(word in message_content for word in antiscamresponse["antiscamjburls"]):
            await message.delete()

def setup(bot):
    bot.add_cog(automod(bot))