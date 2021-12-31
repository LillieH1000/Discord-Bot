import discord
from discord.commands import slash_command
from discord.commands import Option
from discord.ext import commands
import datetime
import requests
import json

class tweaksearch(commands.Cog):
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

        if message.content.startswith("[[") & message.content.endswith("]]"):

            message_content = message.content.replace(" ", "%20")[2:-2]

            response = requests.get(f"https://api.canister.me/v1/community/packages/search?query={message_content}&limit=1").json()
            
            embed = discord.Embed(color=0xFFC0DD)
            embed.add_field(name=f"{response['data'][0]['name']}", value=f"{response['data'][0]['description']}", inline=False)
            embed.add_field(name="Author: ", value=f"{response['data'][0]['author']}", inline=False)
            embed.add_field(name="Repository: ", value=f"{response['data'][0]['repository']['uri']}", inline=False)
            embed.timestamp = datetime.datetime.now()
            await message.reply(embed=embed)

def setup(bot):
    bot.add_cog(tweaksearch(bot))