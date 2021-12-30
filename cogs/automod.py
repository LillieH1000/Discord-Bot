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

    # Guilds Loader

    guildconfig = open('guilds.json')
    data = json.load(guildconfig)
    s = ""
    t = 1
    for x in data:
        y = ""
        y += "guild"
        y += str(t)
        s += data[y]
        if (t != len(data)):
            s += str(",")
        t = t + 1

    @commands.Cog.listener()
    async def on_message(self, message):
        if message.author.id == self.bot.user.id:
            return

        message_content = message.content.lower()

        antiscamresponse = requests.get(f"https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Swear-Json-List/main/antiscam.json")
        antiscamresponsejson = antiscamresponse.json()

        antiswearresponse = requests.get(f"https://raw.githubusercontent.com/LillieWeeb001/Anti-Scam-Swear-Json-List/main/antiswear.json")
        antiswearresponsejson = antiswearresponse.json()
        
        if any(word in message_content for word in antiscamresponsejson["antiscamurls"]):
            if message.guild.id != 846702751350390825:
                await message.delete()

        if any(word in message_content for word in antiswearresponsejson["antiswear"]):
            if message.guild.id != 416350699794857986:
                if message.guild.id != 881509316392263700:
                    if message.guild.id != 846702751350390825:
                        await message.delete()

def setup(bot):
    bot.add_cog(automod(bot))